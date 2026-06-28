import { useState } from "react";
import { X, Search, Send, Check } from "lucide-react";

const FOLLOWERS = [
  { id: "1", username: "Lusine", name: "Lusine Mkrtchyan", avatar: "https://i.pravatar.cc/150?img=1", online: true },
  { id: "2", username: "David", name: "David Vardanyan", avatar: "https://i.pravatar.cc/150?img=12", online: true },
  { id: "3", username: "Ani", name: "Ani Grigoryan", avatar: "https://i.pravatar.cc/150?img=15", online: false },
  { id: "4", username: "Narek", name: "Narek Harutyunyan", avatar: "https://i.pravatar.cc/150?img=3", online: false },
  { id: "5", username: "Mari", name: "Mari Petrosyan", avatar: "https://i.pravatar.cc/150?img=20", online: false },
  { id: "6", username: "Sona", name: "Sona Danielyan", avatar: "https://i.pravatar.cc/150?img=25", online: true },
  { id: "7", username: "Arman", name: "Arman Sargsyan", avatar: "https://i.pravatar.cc/150?img=7", online: false },
  { id: "8", username: "Nare", name: "Nare Hovhannisyan", avatar: "https://i.pravatar.cc/150?img=9", online: false },
  { id: "9", username: "Vano", name: "Vano Karapetyan", avatar: "https://i.pravatar.cc/150?img=11", online: false },
  { id: "10", username: "Sara", name: "Sara Williams", avatar: "https://i.pravatar.cc/150?img=5", online: true },
];

interface Props {
  messageText?: string;
  onClose: () => void;
}

export function ForwardModal({ messageText, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sent, setSent] = useState(false);

  const filtered = search.trim()
    ? FOLLOWERS.filter(f =>
        f.username.toLowerCase().includes(search.toLowerCase()) ||
        f.name.toLowerCase().includes(search.toLowerCase())
      )
    : FOLLOWERS;

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSend = () => {
    if (selected.size === 0) return;
    setSent(true);
    setTimeout(() => { onClose(); }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-end" onClick={onClose}>
      <div
        className="w-full bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white text-lg">Forward to</h2>
          <button onClick={onClose} className="text-gray-400 dark:text-gray-500 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview of forwarded message */}
        {messageText && (
          <div className="mx-4 mt-3 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border-l-4 border-[#E91E63]">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5 font-semibold">Forwarding</p>
            <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2">{messageText}</p>
          </div>
        )}

        {/* Search */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search followers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E91E63]/40 dark:text-white"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Selected chips */}
        {selected.size > 0 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {[...selected].map(id => {
              const f = FOLLOWERS.find(u => u.id === id)!;
              return (
                <div key={id} className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="relative">
                    <img src={f.avatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-[#E91E63]" />
                    <button onClick={() => toggle(id)} className="absolute -top-1 -right-1 w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center">
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                  </div>
                  <span className="text-[10px] text-gray-600 dark:text-gray-400 w-10 text-center truncate">{f.username}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Followers list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No followers found</p>
            </div>
          ) : (
            filtered.map(follower => {
              const isSelected = selected.has(follower.id);
              return (
                <button
                  key={follower.id}
                  onClick={() => toggle(follower.id)}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="relative flex-shrink-0">
                    <img src={follower.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                    {follower.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{follower.name}</p>
                    <p className="text-xs text-gray-400">@{follower.username} · {follower.online ? "Online" : "Offline"}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${isSelected ? "bg-[#E91E63] border-[#E91E63]" : "border-gray-300 dark:border-gray-600"}`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Send button */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}>
          {sent ? (
            <div className="w-full py-3.5 rounded-2xl bg-green-500 flex items-center justify-center gap-2 text-white font-bold">
              <Check className="w-5 h-5" />
              Forwarded!
            </div>
          ) : (
            <button
              onClick={handleSend}
              disabled={selected.size === 0}
              className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-base transition-all ${
                selected.size > 0
                  ? "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white shadow-lg shadow-pink-200/50"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
              Send{selected.size > 0 ? ` to ${selected.size}` : ""}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
