import { Link, useLocation } from "react-router";
import {
  Home, Compass, MessageCircle, Bell, PlusSquare,
  User, Settings, LogOut, Rss, Film, Search,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const NAV = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/explore", icon: Compass, label: "Explore" },
  { path: "/messages", icon: MessageCircle, label: "Messages" },
  { path: "/notifications", icon: Bell, label: "Notifications" },
  { path: "/create", icon: PlusSquare, label: "Create" },
  { path: "/reels", icon: Film, label: "Reels" },
  { path: "/profile", icon: User, label: "Profile" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export function DesktopSidebar() {
  const location = useLocation();
  const { darkMode } = useApp();

  return (
    <aside className={`hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 h-screen sticky top-0 border-r ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} z-40`}>
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E91E63] to-[#FF5722] flex items-center justify-center shadow-lg shadow-pink-200/50">
            <MessageCircle className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className={`text-2xl font-black tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
            Chat<span className="text-[#E91E63]">Me</span>
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {NAV.map(({ path, icon: Icon, label }) => {
          const isActive = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-[15px] transition-all group ${
                isActive
                  ? "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white shadow-md shadow-pink-200/40"
                  : darkMode
                    ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} strokeWidth={isActive ? 2.5 : 2} />
              <span>{label}</span>
              {label === "Messages" && (
                <span className="ml-auto bg-[#E91E63] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">4</span>
              )}
              {label === "Notifications" && (
                <span className="ml-auto bg-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">7</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className={`px-4 pb-6 pt-4 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <Link to="/profile" className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
          <div className="relative">
            <img src="https://i.pravatar.cc/150?img=30" alt="You" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E91E63]/30" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-bold text-sm truncate ${darkMode ? "text-white" : "text-gray-900"}`}>Armenam</p>
            <p className={`text-xs truncate ${darkMode ? "text-gray-500" : "text-gray-400"}`}>@armenam</p>
          </div>
          <button className={`p-1.5 rounded-xl transition-colors ${darkMode ? "text-gray-500 hover:text-red-400 hover:bg-gray-700" : "text-gray-300 hover:text-red-500 hover:bg-red-50"}`}>
            <LogOut className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </aside>
  );
}
