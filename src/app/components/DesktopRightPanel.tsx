import { Link } from "react-router";
import { UserPlus, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";

const SUGGESTIONS = [
  { id: "1", username: "sara_art", name: "Sara Williams", avatar: "https://i.pravatar.cc/150?img=5", mutual: 3 },
  { id: "2", username: "mk_photo", name: "Mike Chen", avatar: "https://i.pravatar.cc/150?img=6", mutual: 5 },
  { id: "3", username: "travel_nia", name: "Nia Johnson", avatar: "https://i.pravatar.cc/150?img=16", mutual: 1 },
  { id: "4", username: "fitness_luka", name: "Luka Petrov", avatar: "https://i.pravatar.cc/150?img=13", mutual: 8 },
  { id: "5", username: "chef_anna", name: "Anna Rossi", avatar: "https://i.pravatar.cc/150?img=47", mutual: 2 },
];

const TRENDING = ["#GoodVibes", "#Photography", "#Travel", "#FitnessGoals", "#ChatMe", "#Technology", "#Food"];

export function DesktopRightPanel() {
  const { darkMode } = useApp();

  return (
    <aside className={`hidden xl:flex flex-col w-80 flex-shrink-0 h-screen sticky top-0 overflow-y-auto px-4 py-6 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
      {/* Suggestions */}
      <div className={`rounded-2xl p-4 mb-4 ${darkMode ? "bg-gray-900" : "bg-white"} shadow-sm`}>
        <div className="flex items-center justify-between mb-3">
          <p className={`font-bold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>Suggested for you</p>
          <Link to="/explore" className="text-xs text-[#E91E63] font-semibold">See all</Link>
        </div>
        <div className="space-y-3">
          {SUGGESTIONS.map(user => (
            <div key={user.id} className="flex items-center gap-3">
              <img src={user.avatar} alt={user.username} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-xs truncate ${darkMode ? "text-white" : "text-gray-900"}`}>{user.name}</p>
                <p className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{user.mutual} mutual friends</p>
              </div>
              <button className="flex items-center gap-1 text-[#E91E63] text-xs font-bold hover:opacity-80 flex-shrink-0">
                <UserPlus className="w-3.5 h-3.5" />
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className={`rounded-2xl p-4 mb-4 ${darkMode ? "bg-gray-900" : "bg-white"} shadow-sm`}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-[#E91E63]" />
          <p className={`font-bold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>Trending</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TRENDING.map(tag => (
            <button key={tag} className="px-3 py-1.5 bg-pink-50 dark:bg-pink-900/20 text-[#E91E63] rounded-full text-xs font-semibold hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="px-2">
        <p className={`text-[11px] leading-6 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
          <Link to="/privacy-policy" className="hover:underline">Privacy</Link> · <Link to="/terms" className="hover:underline">Terms</Link> · <Link to="/settings" className="hover:underline">Settings</Link>
        </p>
        <p className={`text-[11px] mt-1 ${darkMode ? "text-gray-700" : "text-gray-300"}`}>© 2026 ChatMe Inc.</p>
      </div>
    </aside>
  );
}
