import { useState } from "react";
import { Heart, MessageCircle, UserPlus, AtSign, Smartphone, MapPin, Bell, LogOut, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router";

type NotifType = "like" | "comment" | "reply" | "follow" | "mention" | "tag" | "device" | "location";

interface Notification {
  id: string;
  type: NotifType;
  user?: {
    username: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  postImage?: string;
  isFollowing?: boolean;
  origin?: string;
  device?: string;
  location?: string;
  read?: boolean;
}

const ICON_MAP: Record<NotifType, { icon: React.ReactNode; bg: string }> = {
  like: { icon: <Heart className="w-4 h-4 text-red-500 fill-red-500" />, bg: "bg-red-100" },
  comment: { icon: <MessageCircle className="w-4 h-4 text-blue-500" />, bg: "bg-blue-100" },
  reply: { icon: <MessageCircle className="w-4 h-4 text-purple-500" />, bg: "bg-purple-100" },
  follow: { icon: <UserPlus className="w-4 h-4 text-green-500" />, bg: "bg-green-100" },
  mention: { icon: <AtSign className="w-4 h-4 text-orange-500" />, bg: "bg-orange-100" },
  tag: { icon: <AtSign className="w-4 h-4 text-pink-500" />, bg: "bg-pink-100" },
  device: { icon: <Smartphone className="w-4 h-4 text-gray-600" />, bg: "bg-gray-100" },
  location: { icon: <MapPin className="w-4 h-4 text-blue-600" />, bg: "bg-blue-100" },
};

export function Notifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "mentions" | "security">("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "like",
      user: { username: "john_doe", avatar: "https://i.pravatar.cc/150?img=1" },
      message: "liked your post.",
      timestamp: "2h",
      postImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop",
      origin: "/post/1",
      read: false,
    },
    {
      id: "2",
      type: "follow",
      user: { username: "jane_smith", avatar: "https://i.pravatar.cc/150?img=2" },
      message: "started following you.",
      timestamp: "5h",
      isFollowing: false,
      origin: "/user/jane_smith",
      read: false,
    },
    {
      id: "3",
      type: "comment",
      user: { username: "mike_wilson", avatar: "https://i.pravatar.cc/150?img=3" },
      message: 'commented: "Amazing shot! 🔥"',
      timestamp: "1d",
      postImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop",
      origin: "/post/2",
      read: true,
    },
    {
      id: "4",
      type: "reply",
      user: { username: "sarah_jones", avatar: "https://i.pravatar.cc/150?img=4" },
      message: 'replied to your comment: "So true! ❤️"',
      timestamp: "2d",
      postImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop",
      origin: "/post/1",
      read: true,
    },
    {
      id: "5",
      type: "mention",
      user: { username: "david_lee", avatar: "https://i.pravatar.cc/150?img=5" },
      message: "mentioned you in a comment.",
      timestamp: "3d",
      postImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop",
      origin: "/post/3",
      read: true,
    },
    {
      id: "6",
      type: "tag",
      user: { username: "anna_k", avatar: "https://i.pravatar.cc/150?img=6" },
      message: "tagged you in a post.",
      timestamp: "4d",
      postImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=100&h=100&fit=crop",
      origin: "/post/4",
      read: true,
    },
    {
      id: "7",
      type: "device",
      message: "New login from iPhone 15 Pro",
      timestamp: "2d",
      device: "iPhone 15 Pro · Safari · New York, US",
      read: false,
    },
    {
      id: "8",
      type: "location",
      message: "Login from a new location",
      timestamp: "3d",
      location: "London, United Kingdom · 2 days ago",
      read: true,
    },
  ]);

  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});
  const [securityExpanded, setSecurityExpanded] = useState<string | null>(null);

  const toggleFollow = (id: string) => {
    setFollowingStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const handleNotifClick = (notif: Notification) => {
    markRead(notif.id);
    if (notif.type === "device" || notif.type === "location") {
      setSecurityExpanded(securityExpanded === notif.id ? null : notif.id);
      return;
    }
    if (notif.origin) {
      navigate(notif.origin);
    }
  };

  const securityNotifs = notifications.filter((n) => n.type === "device" || n.type === "location");
  const mentionNotifs = notifications.filter((n) => n.type === "mention" || n.type === "tag");
  const allNotifs = notifications;

  const displayNotifs = activeTab === "all" ? allNotifs : activeTab === "mentions" ? mentionNotifs : securityNotifs;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-4 sticky top-0 z-40 shadow-lg" style={{ paddingTop: "calc(1rem + env(safe-area-inset-top))" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-white font-bold text-2xl">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-white text-[#E91E63] text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </div>
          <button className="text-white/80 text-sm font-medium" onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}>
            Mark all read
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {(["all", "mentions", "security"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all capitalize ${
                activeTab === tab ? "bg-white text-[#E91E63]" : "bg-white/20 text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Notifications List */}
      <div className="bg-white mt-4 mx-4 rounded-t-3xl shadow-xl pb-nav">
        {displayNotifs.length === 0 && (
          <div className="flex flex-col items-center py-12">
            <Bell className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">No notifications here</p>
          </div>
        )}
        {displayNotifs.map((notif) => (
          <div key={notif.id}>
            <div
              className={`flex items-center gap-3 px-4 py-4 border-b border-gray-50 cursor-pointer transition-colors ${
                !notif.read ? "bg-pink-50/50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleNotifClick(notif)}
            >
              {/* Left: avatar or icon */}
              <div className="relative flex-shrink-0">
                {notif.user ? (
                  <img src={notif.user.avatar} alt={notif.user.username} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className={`w-12 h-12 rounded-full ${ICON_MAP[notif.type].bg} flex items-center justify-center`}>
                    {ICON_MAP[notif.type].icon}
                  </div>
                )}
                {notif.user && (
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${ICON_MAP[notif.type].bg} flex items-center justify-center border-2 border-white`}>
                    {ICON_MAP[notif.type].icon}
                  </div>
                )}
                {!notif.read && (
                  <div className="absolute top-0 left-0 w-3 h-3 bg-[#E91E63] rounded-full border-2 border-white" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug">
                  {notif.user && <span className="font-semibold text-gray-900">{notif.user.username} </span>}
                  <span className="text-gray-700">{notif.message}</span>{" "}
                  <span className="text-gray-400 text-xs">{notif.timestamp}</span>
                </p>
                {(notif.device || notif.location) && (
                  <p className="text-xs text-gray-400 mt-0.5">{notif.device || notif.location}</p>
                )}
              </div>

              {/* Right: post image or action */}
              {notif.postImage && (
                <img src={notif.postImage} alt="Post" className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
              )}
              {notif.type === "follow" && (
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFollow(notif.id); }}
                  className={`px-4 py-1.5 rounded-xl font-semibold text-xs flex-shrink-0 transition-all ${
                    followingStates[notif.id]
                      ? "bg-gray-100 text-gray-700"
                      : "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white shadow-sm"
                  }`}
                >
                  {followingStates[notif.id] ? "Following" : "Follow"}
                </button>
              )}
              {(notif.type === "device" || notif.type === "location") && (
                <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${securityExpanded === notif.id ? "rotate-90" : ""}`} />
              )}
            </div>

            {/* Security expanded panel */}
            {securityExpanded === notif.id && (
              <div className="bg-red-50 px-4 py-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-red-700 mb-2">
                  {notif.type === "device" ? "⚠️ New Device Login" : "📍 New Location Detected"}
                </p>
                <p className="text-xs text-gray-600 mb-3">{notif.device || notif.location}</p>
                <p className="text-xs text-gray-500 mb-3">If this wasn't you, secure your account immediately.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl bg-red-500 text-white text-xs font-semibold flex items-center justify-center gap-1">
                    <LogOut className="w-3.5 h-3.5" />
                    Logout this session
                  </button>
                  <button className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold">
                    That was me
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
