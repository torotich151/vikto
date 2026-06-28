import { useState, useRef, useCallback } from "react";
import { Search, Edit, Archive, Trash2, Check, CheckCheck, Bell, BellOff, Pin, MoreVertical, X, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router";

interface ChatItem {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  groupMembers?: number;
  muted?: boolean;
  pinned?: boolean;
  archived?: boolean;
  isTyping?: boolean;
  verified?: boolean;
}

const INITIAL_CHATS: ChatItem[] = [
  { id: "1", username: "Lusine", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "Hey! How are you doing? 😊", timestamp: "2m", unread: 3, online: true, pinned: true },
  { id: "2", username: "David", avatar: "https://i.pravatar.cc/150?img=12", lastMessage: "That looks amazing! 🔥", timestamp: "15m", unread: 1, online: true },
  { id: "3", username: "Ani", avatar: "https://i.pravatar.cc/150?img=15", lastMessage: "Are we still meeting tomorrow?", timestamp: "1h", unread: 1, online: false, isTyping: true },
  { id: "4", username: "Narek", avatar: "https://i.pravatar.cc/150?img=3", lastMessage: "Sent a photo 📷", timestamp: "2h", unread: 0, online: false },
  { id: "5", username: "Mari", avatar: "https://i.pravatar.cc/150?img=20", lastMessage: "Thanks a lot! ❤️", timestamp: "3h", unread: 0, online: false, muted: true },
  { id: "6", username: "Sona", avatar: "https://i.pravatar.cc/150?img=25", lastMessage: "See you tomorrow!", timestamp: "5h", unread: 0, online: true },
  { id: "7", username: "Arman", avatar: "https://i.pravatar.cc/150?img=7", lastMessage: "Let's do it 🚀", timestamp: "Yesterday", unread: 0, online: false, verified: true },
  { id: "8", username: "Nare", avatar: "https://i.pravatar.cc/150?img=9", lastMessage: "Ok, sounds good!", timestamp: "Yesterday", unread: 0, online: false },
  { id: "9", username: "ChatMe Team", avatar: "https://i.pravatar.cc/150?img=50", lastMessage: "Welcome to ChatMe! 🎉", timestamp: "Mon", unread: 0, online: true, verified: true },
  { id: "10", username: "Design Group", avatar: "https://i.pravatar.cc/150?img=32", lastMessage: "Aram: Nice work everyone!", timestamp: "Sun", unread: 5, online: false, isGroup: true, groupMembers: 14 },
  { id: "11", username: "Friends Forever", avatar: "https://i.pravatar.cc/150?img=44", lastMessage: "Lusine: Movie tonight? 🎬", timestamp: "Sat", unread: 0, online: false, isGroup: true, groupMembers: 7 },
  { id: "12", username: "Vano", avatar: "https://i.pravatar.cc/150?img=11", lastMessage: "Call me when you're free", timestamp: "Fri", unread: 0, online: false, archived: true },
  { id: "13", username: "Old Friends", avatar: "https://i.pravatar.cc/150?img=33", lastMessage: "Good times 😄", timestamp: "2w", unread: 0, online: false, isGroup: true, archived: true },
];

const STORY_USERS = [
  { id: "yours", username: "Your Note", avatar: "https://i.pravatar.cc/150?img=30", hasPlus: true },
  { id: "1", username: "Lusine", avatar: "https://i.pravatar.cc/150?img=1", online: true },
  { id: "2", username: "David", avatar: "https://i.pravatar.cc/150?img=12", online: true },
  { id: "3", username: "Ani", avatar: "https://i.pravatar.cc/150?img=15", online: false },
  { id: "4", username: "Narek", avatar: "https://i.pravatar.cc/150?img=3", online: true },
  { id: "6", username: "Sona", avatar: "https://i.pravatar.cc/150?img=25", online: true },
];

type Tab = "all" | "unread" | "groups" | "archived";
type ContextAction = "delete" | "archive" | "unarchive" | "mute" | "unmute" | "pin" | "unpin" | "read" | "deleteAll";

export function Messages() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatItem[]>(INITIAL_CHATS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [contextMenu, setContextMenu] = useState<{ chatId: string; x: number; y: number } | null>(null);
  const [selectedChats, setSelectedChats] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [swipeId, setSwipeId] = useState<string | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeStartX = useRef(0);

  const activeChats = chats.filter(c => !c.archived);
  const archivedChats = chats.filter(c => c.archived);

  const filteredChats = (() => {
    let list = tab === "archived" ? archivedChats : activeChats;
    if (tab === "unread") list = list.filter(c => c.unread > 0);
    if (tab === "groups") list = list.filter(c => c.isGroup);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c => c.username.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q));
    }
    // pinned first
    return [...list].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  })();

  const doAction = (action: ContextAction, chatId?: string) => {
    const ids = chatId ? [chatId] : [...selectedChats];
    setChats(prev => {
      let updated = [...prev];
      if (action === "delete" || action === "deleteAll") {
        updated = updated.filter(c => !ids.includes(c.id));
      } else if (action === "archive") {
        updated = updated.map(c => ids.includes(c.id) ? { ...c, archived: true, pinned: false } : c);
      } else if (action === "unarchive") {
        updated = updated.map(c => ids.includes(c.id) ? { ...c, archived: false } : c);
      } else if (action === "mute") {
        updated = updated.map(c => ids.includes(c.id) ? { ...c, muted: true } : c);
      } else if (action === "unmute") {
        updated = updated.map(c => ids.includes(c.id) ? { ...c, muted: false } : c);
      } else if (action === "pin") {
        updated = updated.map(c => ids.includes(c.id) ? { ...c, pinned: true } : c);
      } else if (action === "unpin") {
        updated = updated.map(c => ids.includes(c.id) ? { ...c, pinned: false } : c);
      } else if (action === "read") {
        updated = updated.map(c => ids.includes(c.id) ? { ...c, unread: 0 } : c);
      }
      return updated;
    });
    setContextMenu(null);
    setSelectedChats(new Set());
    setSelectMode(false);
  };

  const handleLongPress = (chat: ChatItem, e: React.TouchEvent | React.MouseEvent) => {
    longPressTimer.current = setTimeout(() => {
      const rect = (e.target as HTMLElement).closest('[data-chatid]')?.getBoundingClientRect();
      setContextMenu({ chatId: chat.id, x: 16, y: rect ? rect.top + 20 : 100 });
      if (navigator.vibrate) navigator.vibrate(30);
    }, 500);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const toggleSelect = (id: string) => {
    setSelectedChats(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const ctx = contextMenu ? chats.find(c => c.id === contextMenu.chatId) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950" onClick={() => { setContextMenu(null); setSwipeId(null); }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 sticky top-0 z-40 shadow-lg" style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top))", paddingBottom: "0.5rem" }}>
        <div className="flex items-center justify-between mb-3">
          {selectMode ? (
            <>
              <button onClick={() => { setSelectMode(false); setSelectedChats(new Set()); }} className="text-white"><X className="w-6 h-6" /></button>
              <span className="text-white font-bold">{selectedChats.size} selected</span>
              <div className="flex gap-3">
                {selectedChats.size > 0 && (
                  <>
                    <button onClick={() => doAction("read")} className="text-white"><CheckCheck className="w-5 h-5" /></button>
                    <button onClick={() => doAction(tab === "archived" ? "unarchive" : "archive")} className="text-white"><Archive className="w-5 h-5" /></button>
                    <button onClick={() => setShowDeleteAllConfirm(true)} className="text-white"><Trash2 className="w-5 h-5" /></button>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-white font-bold text-2xl">Inbox</h1>
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectMode(true)} className="text-white opacity-80"><Check className="w-5 h-5" /></button>
                <Link to="/create" className="text-white opacity-80"><Edit className="w-5 h-5" /></Link>
              </div>
            </>
          )}
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-white/60 rounded-full pl-11 pr-10 py-2.5 text-sm focus:outline-none focus:bg-white/30"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"><X className="w-4 h-4" /></button>}
        </div>
      </header>

      {/* Online friends strip */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {STORY_USERS.map(u => (
            <div key={u.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className="relative">
                <img src={u.avatar} alt={u.username} className={`w-14 h-14 rounded-full object-cover ${u.hasPlus ? "border-2 border-gray-200" : "border-3 border-[#E91E63] p-0.5"}`} />
                {u.hasPlus && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#E91E63] rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white text-[10px] font-bold">+</span>
                  </div>
                )}
                {!u.hasPlus && u.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                )}
              </div>
              <span className="text-[11px] text-gray-600 dark:text-gray-400 w-14 text-center truncate">{u.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-2 z-30">
        <div className="flex">
          {([["all","All"], ["unread","Unread"], ["groups","Groups"], ["archived","Archived"]] as [Tab,string][]).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === t ? "border-[#E91E63] text-[#E91E63]" : "border-transparent text-gray-400 dark:text-gray-500"}`}>
              {label}
              {t === "unread" && activeChats.filter(c=>c.unread>0).length > 0 && (
                <span className="ml-1 bg-[#E91E63] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{activeChats.filter(c=>c.unread>0).length}</span>
              )}
              {t === "archived" && archivedChats.length > 0 && (
                <span className="ml-1 bg-gray-400 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{archivedChats.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mark all read + Delete all */}
      {!selectMode && filteredChats.length > 0 && (
        <div className="bg-white dark:bg-gray-800 flex items-center justify-between px-4 py-2 border-b border-gray-50 dark:border-gray-700">
          <button onClick={() => setChats(prev => prev.map(c => ({ ...c, unread: 0 })))} className="text-xs text-[#E91E63] font-semibold flex items-center gap-1">
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
          <button onClick={() => setShowDeleteAllConfirm(true)} className="text-xs text-red-500 font-semibold flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> Delete all
          </button>
        </div>
      )}

      {/* Chat list */}
      <div className="bg-white dark:bg-gray-800">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300 dark:text-gray-500" />
            </div>
            <p className="font-semibold text-gray-500 dark:text-gray-400">{search ? "No results found" : tab === "archived" ? "No archived chats" : tab === "unread" ? "All caught up!" : "No messages yet"}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{search ? "Try a different name or message" : "Start a conversation"}</p>
          </div>
        ) : (
          filteredChats.map(chat => (
            <ChatRow
              key={chat.id}
              chat={chat}
              selectMode={selectMode}
              selected={selectedChats.has(chat.id)}
              swipeOpen={swipeId === chat.id}
              onSelect={() => toggleSelect(chat.id)}
              onLongPress={e => { setSelectMode(true); toggleSelect(chat.id); cancelLongPress(); setContextMenu(null); }}
              onContextMenu={(e) => { e.preventDefault(); handleLongPress(chat, e); }}
              onSwipeOpen={() => setSwipeId(chat.id)}
              onSwipeClose={() => setSwipeId(null)}
              onArchive={() => doAction(chat.archived ? "unarchive" : "archive", chat.id)}
              onDelete={() => doAction("delete", chat.id)}
              onClick={() => {
                if (selectMode) { toggleSelect(chat.id); return; }
                navigate(`/messages/${chat.id}`);
              }}
            />
          ))
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && ctx && (
        <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setContextMenu(null)}>
          <div
            className="absolute bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-64"
            style={{ top: Math.min(contextMenu.y, window.innerHeight - 320), left: contextMenu.x }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
              <img src={ctx.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{ctx.username}</p>
                <p className="text-xs text-gray-400 truncate max-w-[140px]">{ctx.lastMessage}</p>
              </div>
            </div>
            {[
              { icon: <CheckCheck className="w-4 h-4" />, label: "Mark as read", action: () => doAction("read", ctx.id), color: "text-gray-700 dark:text-gray-200" },
              { icon: <Pin className="w-4 h-4" />, label: ctx.pinned ? "Unpin" : "Pin", action: () => doAction(ctx.pinned ? "unpin" : "pin", ctx.id), color: "text-gray-700 dark:text-gray-200" },
              { icon: ctx.muted ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />, label: ctx.muted ? "Unmute" : "Mute", action: () => doAction(ctx.muted ? "unmute" : "mute", ctx.id), color: "text-gray-700 dark:text-gray-200" },
              { icon: <Archive className="w-4 h-4" />, label: ctx.archived ? "Unarchive" : "Archive", action: () => doAction(ctx.archived ? "unarchive" : "archive", ctx.id), color: "text-blue-500" },
              { icon: <Trash2 className="w-4 h-4" />, label: "Delete chat", action: () => doAction("delete", ctx.id), color: "text-red-500" },
            ].map(item => (
              <button key={item.label} onClick={item.action} className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-50 dark:border-gray-700 last:border-0 ${item.color}`}>
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Delete all confirm */}
      {showDeleteAllConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Delete chats?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              {selectedChats.size > 0 ? `Delete ${selectedChats.size} selected chat(s)?` : "Delete all chats in this tab? This cannot be undone."}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteAllConfirm(false)} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 font-semibold text-gray-700 dark:text-gray-200">Cancel</button>
              <button onClick={() => {
                if (selectedChats.size > 0) doAction("delete");
                else setChats(prev => prev.filter(c => tab === "archived" ? !c.archived : (c.archived || (tab === "groups" ? !c.isGroup : tab === "unread" ? c.unread === 0 : true))));
                setShowDeleteAllConfirm(false);
              }} className="flex-1 py-3 rounded-xl bg-red-500 font-semibold text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatRow({ chat, selectMode, selected, swipeOpen, onSelect, onLongPress, onContextMenu, onSwipeOpen, onSwipeClose, onArchive, onDelete, onClick }: {
  chat: ChatItem; selectMode: boolean; selected: boolean; swipeOpen: boolean;
  onSelect: () => void; onLongPress: (e: any) => void; onContextMenu: (e: any) => void;
  onSwipeOpen: () => void; onSwipeClose: () => void; onArchive: () => void; onDelete: () => void; onClick: () => void;
}) {
  const touchStartX = useRef(0);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
    longPressTimer.current = setTimeout(() => { onLongPress(e); if (navigator.vibrate) navigator.vibrate(30); }, 500);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) onSwipeOpen();
    else if (diff < -40) onSwipeClose();
  };
  const onTouchMove = () => { if (longPressTimer.current) clearTimeout(longPressTimer.current); };

  return (
    <div data-chatid={chat.id} className="relative overflow-hidden border-b border-gray-50 dark:border-gray-700/50">
      {/* Swipe actions */}
      <div className={`absolute right-0 top-0 bottom-0 flex items-center gap-0 transition-all duration-200 ${swipeOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button onClick={onArchive} className="h-full px-5 bg-blue-500 flex flex-col items-center justify-center gap-1 text-white">
          <Archive className="w-5 h-5" /><span className="text-[10px] font-semibold">{chat.archived ? "Unarchive" : "Archive"}</span>
        </button>
        <button onClick={onDelete} className="h-full px-5 bg-red-500 flex flex-col items-center justify-center gap-1 text-white">
          <Trash2 className="w-5 h-5" /><span className="text-[10px] font-semibold">Delete</span>
        </button>
      </div>

      <div
        className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${swipeOpen ? "-translate-x-32" : "translate-x-0"} ${selected ? "bg-pink-50 dark:bg-pink-900/20" : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"} cursor-pointer`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onContextMenu={onContextMenu}
        onClick={onClick}
      >
        {selectMode && (
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? "bg-[#E91E63] border-[#E91E63]" : "border-gray-300 dark:border-gray-500"}`}>
            {selected && <Check className="w-3.5 h-3.5 text-white" />}
          </div>
        )}
        <div className="relative flex-shrink-0">
          <img src={chat.avatar} alt={chat.username} className="w-14 h-14 rounded-full object-cover" />
          {chat.online && !chat.isGroup && <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />}
          {chat.isGroup && <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 text-[9px] text-white font-bold">{chat.groupMembers}</div>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1 min-w-0">
              {chat.pinned && <Pin className="w-3 h-3 text-gray-400 flex-shrink-0" />}
              <span className={`font-semibold text-sm truncate ${chat.unread > 0 ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-200"}`}>{chat.username}</span>
              {chat.verified && (
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#1877F2"/><path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
              {chat.muted && <BellOff className="w-3 h-3 text-gray-300 dark:text-gray-500 flex-shrink-0" />}
            </div>
            <span className={`text-xs flex-shrink-0 ml-2 ${chat.unread > 0 ? "text-[#E91E63] font-semibold" : "text-gray-400 dark:text-gray-500"}`}>{chat.timestamp}</span>
          </div>
          <div className="flex items-center justify-between">
            {chat.isTyping ? (
              <span className="text-xs text-[#E91E63] font-medium">typing...</span>
            ) : (
              <p className={`text-sm truncate ${chat.unread > 0 ? "font-semibold text-gray-800 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}>{chat.lastMessage}</p>
            )}
            {chat.unread > 0 && (
              <div className={`flex-shrink-0 ml-2 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${chat.muted ? "bg-gray-400" : "bg-[#E91E63]"}`}>{chat.unread > 9 ? "9+" : chat.unread}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
