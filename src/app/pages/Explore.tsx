import { useState } from "react";
import { Search, UserPlus, Check, Users, Hash, X, TrendingUp } from "lucide-react";
import { Link } from "react-router";

const SUGGESTED_USERS = [
  { id: "u1", username: "sara_art", name: "Sara Williams", avatar: "https://i.pravatar.cc/150?img=5", followers: "12.4K", mutual: 3, verified: false },
  { id: "u2", username: "mk_photo", name: "Mike Chen", avatar: "https://i.pravatar.cc/150?img=6", followers: "8.1K", mutual: 5, verified: true },
  { id: "u3", username: "travel_nia", name: "Nia Johnson", avatar: "https://i.pravatar.cc/150?img=16", followers: "34.2K", mutual: 1, verified: false },
  { id: "u4", username: "fitness_luka", name: "Luka Petrov", avatar: "https://i.pravatar.cc/150?img=13", followers: "5.6K", mutual: 8, verified: false },
  { id: "u5", username: "chef_anna", name: "Anna Rossi", avatar: "https://i.pravatar.cc/150?img=47", followers: "22.7K", mutual: 2, verified: true },
  { id: "u6", username: "dj_maxim", name: "Maxim K.", avatar: "https://i.pravatar.cc/150?img=8", followers: "9.3K", mutual: 4, verified: false },
];

const GROUPS = [
  { id: "g1", name: "Photography Pro", avatar: "https://i.pravatar.cc/150?img=32", members: 1240, desc: "Share your best shots" },
  { id: "g2", name: "Fitness & Health", avatar: "https://i.pravatar.cc/150?img=44", members: 3820, desc: "Workout tips & motivation" },
  { id: "g3", name: "Travel Diaries", avatar: "https://i.pravatar.cc/150?img=52", members: 892, desc: "Adventures around the world" },
  { id: "g4", name: "Tech Talks", avatar: "https://i.pravatar.cc/150?img=60", members: 5100, desc: "Latest in technology" },
];

const CHANNELS = [
  { id: "c1", name: "ChatMe News", avatar: "https://i.pravatar.cc/150?img=50", subscribers: "120K", desc: "Official ChatMe updates", verified: true },
  { id: "c2", name: "Daily Motivation", avatar: "https://i.pravatar.cc/150?img=36", subscribers: "89K", desc: "Inspiring content daily", verified: false },
  { id: "c3", name: "World News", avatar: "https://i.pravatar.cc/150?img=55", subscribers: "450K", desc: "Breaking news & stories", verified: true },
  { id: "c4", name: "Music Vibes", avatar: "https://i.pravatar.cc/150?img=28", subscribers: "67K", desc: "New releases every day", verified: false },
];

const EXPLORE_POSTS = [
  { id: 1, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", span: "row-span-1", user: "sara_art", likes: 1240 },
  { id: 2, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop", span: "row-span-1", user: "chef_anna", likes: 892 },
  { id: 3, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop", span: "row-span-2", user: "fitness_luka", likes: 3401 },
  { id: 4, img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop", span: "row-span-1", user: "mk_photo", likes: 567 },
  { id: 5, img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=400&fit=crop", span: "row-span-1", user: "chef_anna", likes: 2103 },
  { id: 6, img: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=400&fit=crop", span: "row-span-1", user: "travel_nia", likes: 4210 },
  { id: 7, img: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400&h=600&fit=crop", span: "row-span-2", user: "sara_art", likes: 789 },
  { id: 8, img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop", span: "row-span-1", user: "dj_maxim", likes: 1823 },
  { id: 9, img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop", span: "row-span-1", user: "mk_photo", likes: 993 },
];

const CATEGORIES = ["All", "Trending", "Style", "Sports", "Travel", "Food", "Music", "Art", "Nature", "Tech"];

export function Explore() {
  const [search, setSearch] = useState("");
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set());
  const [subscribedChannels, setSubscribedChannels] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState("All");
  const [exploreSection, setExploreSection] = useState<"people" | "groups" | "channels">("people");

  const toggleFollow = (id: string) => setFollowed(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleGroup = (id: string) => setJoinedGroups(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleChannel = (id: string) => setSubscribedChannels(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filteredUsers = search
    ? SUGGESTED_USERS.filter(u => u.username.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase()))
    : SUGGESTED_USERS;
  const filteredGroups = search ? GROUPS.filter(g => g.name.toLowerCase().includes(search.toLowerCase())) : GROUPS;
  const filteredChannels = search ? CHANNELS.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : CHANNELS;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 sticky top-0 z-40 shadow-lg" style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top))", paddingBottom: "0.75rem" }}>
        <h1 className="text-white font-bold text-2xl mb-3">Explore</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
          <input
            type="text"
            placeholder="Search people, groups, channels..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-white/60 rounded-full pl-11 pr-10 py-2.5 text-sm focus:outline-none focus:bg-white/30"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"><X className="w-4 h-4" /></button>}
        </div>
      </header>

      {/* Category pills */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-2.5">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-[#E91E63] text-white shadow-sm" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* People / Groups / Channels tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4">
        <div className="flex gap-1">
          {([["people", "People", <UserPlus className="w-3.5 h-3.5" />], ["groups", "Groups", <Users className="w-3.5 h-3.5" />], ["channels", "Channels", <Hash className="w-3.5 h-3.5" />]] as any[]).map(([sec, label, icon]) => (
            <button key={sec} onClick={() => setExploreSection(sec)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-colors ${exploreSection === sec ? "border-[#E91E63] text-[#E91E63]" : "border-transparent text-gray-400 dark:text-gray-500"}`}>
              {icon}{label}
            </button>
          ))}
        </div>
      </div>

      {/* People section */}
      {exploreSection === "people" && (
        <div className="bg-white dark:bg-gray-800 mb-3">
          <div className="px-4 pt-3 pb-1 flex items-center justify-between">
            <p className="font-bold text-gray-900 dark:text-white text-sm">People You May Know</p>
            <span className="text-xs text-gray-400">{filteredUsers.length} results</span>
          </div>
          {filteredUsers.map(user => (
            <div key={user.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-700">
              <Link to={`/user/${user.username}`}>
                <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <Link to={`/user/${user.username}`} className="font-semibold text-gray-900 dark:text-white text-sm truncate">{user.name}</Link>
                  {user.verified && <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#1877F2"/><path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">@{user.username} · {user.followers} followers</p>
                {user.mutual > 0 && <p className="text-xs text-[#E91E63] mt-0.5">{user.mutual} mutual friends</p>}
              </div>
              <button onClick={() => toggleFollow(user.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs transition-all ${followed.has(user.id) ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300" : "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white shadow-sm"}`}>
                {followed.has(user.id) ? <><Check className="w-3.5 h-3.5" /> Following</> : <><UserPlus className="w-3.5 h-3.5" /> Follow</>}
              </button>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <div className="text-center py-10 text-gray-400"><p className="font-medium">No users found</p><p className="text-sm mt-1">Try a different search</p></div>
          )}
        </div>
      )}

      {/* Groups section */}
      {exploreSection === "groups" && (
        <div className="bg-white dark:bg-gray-800 mb-3">
          <div className="px-4 pt-3 pb-1"><p className="font-bold text-gray-900 dark:text-white text-sm">Discover Groups</p></div>
          {filteredGroups.map(group => (
            <div key={group.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-700">
              <img src={group.avatar} alt={group.name} className="w-12 h-12 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{group.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{group.members.toLocaleString()} members</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{group.desc}</p>
              </div>
              <button onClick={() => toggleGroup(group.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-xs transition-all ${joinedGroups.has(group.id) ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300" : "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white"}`}>
                {joinedGroups.has(group.id) ? "Joined" : "Join"}
              </button>
            </div>
          ))}
          {filteredGroups.length === 0 && (
            <div className="text-center py-10 text-gray-400"><p className="font-medium">No groups found</p></div>
          )}
        </div>
      )}

      {/* Channels section */}
      {exploreSection === "channels" && (
        <div className="bg-white dark:bg-gray-800 mb-3">
          <div className="px-4 pt-3 pb-1"><p className="font-bold text-gray-900 dark:text-white text-sm">Top Channels</p></div>
          {filteredChannels.map(ch => (
            <div key={ch.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-700">
              <img src={ch.avatar} alt={ch.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{ch.name}</p>
                  {ch.verified && <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#1877F2"/><path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">{ch.subscribers} subscribers</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{ch.desc}</p>
              </div>
              <button onClick={() => toggleChannel(ch.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-xs transition-all ${subscribedChannels.has(ch.id) ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300" : "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white"}`}>
                {subscribedChannels.has(ch.id) ? "Following" : "Follow"}
              </button>
            </div>
          ))}
          {filteredChannels.length === 0 && (
            <div className="text-center py-10 text-gray-400"><p className="font-medium">No channels found</p></div>
          )}
        </div>
      )}

      {/* Trending posts */}
      <div className="bg-white dark:bg-gray-800">
        <div className="px-4 pt-3 pb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#E91E63]" />
          <p className="font-bold text-gray-900 dark:text-white text-sm">Trending Posts</p>
        </div>
        <div className="grid grid-cols-3 auto-rows-[120px] gap-0.5">
          {EXPLORE_POSTS.map((post) => (
            <div key={post.id} className={`relative overflow-hidden cursor-pointer group ${post.span}`}>
              <img src={post.img} alt="" className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-[10px] font-semibold truncate">@{post.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
