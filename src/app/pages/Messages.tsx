import { useState } from "react";
import { Search, Edit } from "lucide-react";
import { Link } from "react-router";

interface Chat {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export function Messages() {
  const storyUsers = [
    { id: "yours", username: "Your note", avatar: "https://i.pravatar.cc/150?img=30", hasPlus: true },
    { id: "1", username: "Lusine", avatar: "https://i.pravatar.cc/150?img=1", online: true },
    { id: "2", username: "David", avatar: "https://i.pravatar.cc/150?img=12", online: true },
    { id: "3", username: "Ani", avatar: "https://i.pravatar.cc/150?img=15", online: true },
    { id: "4", username: "Narek", avatar: "https://i.pravatar.cc/150?img=3", online: true },
  ];

  const chats: Chat[] = [
    {
      id: "1",
      user: { username: "Lusine", avatar: "https://i.pravatar.cc/150?img=1" },
      lastMessage: "Hey! How are you doing? 😊",
      timestamp: "2m",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      user: { username: "David", avatar: "https://i.pravatar.cc/150?img=12" },
      lastMessage: "That looks amazing! 🔥",
      timestamp: "15m",
      unread: 1,
      online: true,
    },
    {
      id: "3",
      user: { username: "Ani", avatar: "https://i.pravatar.cc/150?img=15" },
      lastMessage: "Are we still meeting tomorrow? 😊",
      timestamp: "1h",
      unread: 1,
      online: false,
    },
    {
      id: "4",
      user: { username: "Narek", avatar: "https://i.pravatar.cc/150?img=3" },
      lastMessage: "Sent a photo",
      timestamp: "2h",
      unread: 0,
      online: false,
    },
    {
      id: "5",
      user: { username: "Mari", avatar: "https://i.pravatar.cc/150?img=20" },
      lastMessage: "Thanks a lot! ❤️",
      timestamp: "3h",
      unread: 0,
      online: false,
    },
  ];

  const [activeTab, setActiveTab] = useState<"messages" | "requests" | "groups">("messages");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white font-bold text-2xl">Inbox</h1>
          <div className="flex items-center gap-3">
            <button className="text-white">
              <Edit className="w-6 h-6" />
            </button>
            <Link to="/explore" className="text-white">
              <Search className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/80 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:bg-white/30"
          />
        </div>
      </header>

      {/* Story Circles */}
      <div className="bg-white px-4 py-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {storyUsers.map((user) => (
            <div key={user.id} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                {user.hasPlus && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#E91E63] rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                )}
                {user.online && !user.hasPlus && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <span className="text-xs text-gray-700 max-w-[70px] text-center truncate">
                {user.username}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4">
        <div className="flex gap-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("messages")}
            className={`pb-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === "messages"
                ? "border-[#E91E63] text-[#E91E63]"
                : "border-transparent text-gray-400"
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`pb-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === "requests"
                ? "border-[#E91E63] text-[#E91E63]"
                : "border-transparent text-gray-400"
            }`}
          >
            Requests
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`pb-3 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === "groups"
                ? "border-[#E91E63] text-[#E91E63]"
                : "border-transparent text-gray-400"
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="bg-white pb-20">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            to={`/messages/${chat.id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="relative flex-shrink-0">
              <img
                src={chat.user.avatar}
                alt={chat.user.username}
                className="w-14 h-14 rounded-full object-cover"
              />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900">{chat.user.username}</span>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <p className={`text-sm truncate ${chat.unread > 0 ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread > 0 && (
              <div className="flex-shrink-0 w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{chat.unread}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
