import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MoreVertical, MapPin, Link2, Flag, UserX, Share2 } from "lucide-react";
import { MediaViewer } from "../components/MediaViewer";

export function UserProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "reels">("posts");

  const userPosts = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=400&fit=crop",
  ];

  const isVerified = ["travel_vibes", "foodie_adventures", "fitness_life"].includes(username || "");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg">@{username}</h1>
        <div className="relative">
          <button onClick={() => setShowOptions(!showOptions)}>
            <MoreVertical className="w-6 h-6 text-white" />
          </button>
          {showOptions && (
            <div className="absolute right-0 top-8 bg-white rounded-xl shadow-xl py-2 w-44 z-20">
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm"
                onClick={() => setShowOptions(false)}
              >
                <Share2 className="w-4 h-4 text-blue-500" />
                Share Profile
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm"
                onClick={() => setShowOptions(false)}
              >
                <UserX className="w-4 h-4 text-orange-500" />
                Block User
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-red-500 text-sm"
                onClick={() => setShowOptions(false)}
              >
                <Flag className="w-4 h-4" />
                Report
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Profile Hero */}
      <div className="bg-gradient-to-b from-[#E91E63] to-[#FF5722] px-4 pb-6 pt-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-24 h-24 rounded-full p-0.5 bg-gradient-to-br from-yellow-400 to-pink-600">
            <img
              src="https://i.pravatar.cc/150?img=10"
              alt={username}
              className="w-full h-full rounded-full border-2 border-white object-cover"
            />
          </div>
          <div className="flex-1 text-white pt-2">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-xl">Travel Enthusiast</h2>
              {isVerified && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1877F2" />
                  <path
                    d="M8 12l2.5 2.5L16 9"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <p className="text-sm text-white/80">@{username}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mb-4 bg-white/15 backdrop-blur-sm rounded-2xl py-4">
          <div className="text-center">
            <div className="font-bold text-2xl text-white">24</div>
            <div className="text-xs text-white/80">Posts</div>
          </div>
          <div className="text-center border-x border-white/20 px-6">
            <div className="font-bold text-2xl text-white">856</div>
            <div className="text-xs text-white/80">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl text-white">432</div>
            <div className="text-xs text-white/80">Following</div>
          </div>
        </div>
      </div>

      {/* Bio & Actions */}
      <div className="bg-white px-4 py-4">
        <p className="text-sm text-gray-700 mb-2 leading-relaxed">
          ✈️ Exploring the world one city at a time{"\n"}
          📸 Photography lover{"\n"}
          🌍 Currently in: Bali
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#E91E63]" />
            <span>Bali, Indonesia</span>
          </div>
          <div className="flex items-center gap-1">
            <Link2 className="w-4 h-4 text-[#E91E63]" />
            <a href="#" className="text-[#E91E63]">portfolio.com</a>
          </div>
        </div>

        {/* Follow / Message - shown on OTHER users' profiles */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
              isFollowing
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                : "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button
            onClick={() => navigate("/messages/chat_1")}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            Message
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 flex sticky top-14 z-30">
        {(["posts", "reels"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? "border-[#E91E63] text-[#E91E63]" : "border-transparent text-gray-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Post Grid */}
      <div className="bg-white grid grid-cols-3 gap-0.5">
        {userPosts.map((post, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImageIndex(index);
              setShowMediaViewer(true);
            }}
            className="aspect-square overflow-hidden"
          >
            <img
              src={post}
              alt={`Post ${index + 1}`}
              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
            />
          </button>
        ))}
      </div>

      {showMediaViewer && (
        <MediaViewer
          images={userPosts}
          initialIndex={selectedImageIndex}
          onClose={() => setShowMediaViewer(false)}
          username={username}
          avatar="https://i.pravatar.cc/150?img=10"
        />
      )}
    </div>
  );
}
