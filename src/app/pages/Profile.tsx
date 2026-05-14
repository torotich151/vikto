import { useState } from "react";
import { Grid, Video, Bookmark, Settings, Bell, MoreVertical, MapPin, Calendar, Link2, Plus } from "lucide-react";
import { Link } from "react-router";
import { MediaViewer } from "../components/MediaViewer";

export function Profile() {
  const [activeTab, setActiveTab] = useState<"posts" | "reels" | "saved">("posts");
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const userPosts = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
  ];

  const highlights = [
    { name: "Sunsets 🌅", image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=100&h=100&fit=crop" },
    { name: "Travel ✈️", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=100&h=100&fit=crop" },
    { name: "Coffee ☕", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop" },
    { name: "Flowers 🌸", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100&h=100&fit=crop" },
    { name: "My Dog 🐶", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&h=100&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-lg">@armenam244</h1>
          <div className="flex items-center gap-3">
            <button>
              <Bell className="w-6 h-6 text-white" />
            </button>
            <div className="relative">
              <button onClick={() => setShowMore(!showMore)}>
                <MoreVertical className="w-6 h-6 text-white" />
              </button>
              {showMore && (
                <div className="absolute right-0 top-8 bg-white rounded-xl shadow-lg py-2 w-44 z-10">
                  <Link to="/settings" className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link to="/edit-profile" className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm">
                    Edit Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Hero */}
      <div className="bg-gradient-to-b from-[#E91E63] to-[#FF5722] px-4 pb-6 pt-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full p-0.5 bg-gradient-to-br from-yellow-400 to-pink-600">
              <img
                src="https://i.pravatar.cc/150?img=30"
                alt="Profile"
                className="w-full h-full rounded-full border-3 border-white object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
          </div>
          <div className="flex-1 text-white pt-2">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-xl">Armenam</h2>
              {/* Blue Verified Badge - Facebook style */}
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
            </div>
            <p className="text-sm text-white/80 mb-2">@armenam244</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mb-4 bg-white/15 backdrop-blur-sm rounded-2xl py-4">
          <div className="text-center">
            <div className="font-bold text-2xl text-white">128</div>
            <div className="text-xs text-white/80">Posts</div>
          </div>
          <div className="text-center border-x border-white/20 px-6">
            <div className="font-bold text-2xl text-white">3.2K</div>
            <div className="text-xs text-white/80">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl text-white">512</div>
            <div className="text-xs text-white/80">Following</div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white px-4 py-4">
        <h3 className="font-bold text-gray-900 mb-1">Digital creator ✨</h3>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          Sharing little moments, big dreams and good vibes 🌸{"\n"}
          Let's enjoy life together 👋
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#E91E63]" />
            <span>Montenegro</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#E91E63]" />
            <span>Joined March 2022</span>
          </div>
          <div className="flex items-center gap-1">
            <Link2 className="w-4 h-4 text-[#E91E63]" />
            <a href="#" className="text-[#E91E63] font-medium">vibehub.me/armenam</a>
          </div>
        </div>

        {/* Own Profile Actions - Edit/Settings only, NO Follow button */}
        <div className="flex gap-2 mb-5">
          <Link
            to="/edit-profile"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-xl text-center text-sm transition-colors"
          >
            Edit Profile
          </Link>
          <Link
            to="/settings"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-xl text-center text-sm transition-colors"
          >
            Settings
          </Link>
          <Link
            to="/create-story"
            className="w-10 h-10 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-xl flex items-center justify-center shadow-md"
          >
            <Plus className="w-5 h-5 text-white" />
          </Link>
        </div>

        {/* Story Highlights */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 border-b border-gray-100">
          {/* Add Highlight */}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#E91E63] transition-colors">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-xs text-gray-500">New</span>
          </div>
          {highlights.map((highlight, index) => (
            <div key={index} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-[#E91E63] to-[#FF5722]">
                <img
                  src={highlight.image}
                  alt={highlight.name}
                  className="w-full h-full rounded-full object-cover border-2 border-white cursor-pointer"
                />
              </div>
              <span className="text-xs text-gray-700 max-w-[64px] text-center truncate">
                {highlight.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="flex">
          {(["posts", "reels", "saved"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[#E91E63] text-[#E91E63]"
                  : "border-transparent text-gray-400"
              }`}
            >
              {tab === "posts" && <Grid className="w-5 h-5" />}
              {tab === "reels" && <Video className="w-5 h-5" />}
              {tab === "saved" && <Bookmark className="w-5 h-5" />}
              <span className="font-medium text-sm capitalize">{tab}</span>
            </button>
          ))}
        </div>
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
            className="aspect-square relative group overflow-hidden"
          >
            <img
              src={post}
              alt={`Post ${index + 1}`}
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            />
            {index === 5 && (
              <div className="absolute top-1.5 right-1.5 bg-white/90 rounded-md p-0.5">
                <Video className="w-3.5 h-3.5 text-[#E91E63]" />
              </div>
            )}
          </button>
        ))}
      </div>

      {showMediaViewer && (
        <MediaViewer
          images={userPosts}
          initialIndex={selectedImageIndex}
          onClose={() => setShowMediaViewer(false)}
          username="armenam244"
          avatar="https://i.pravatar.cc/150?img=30"
        />
      )}
    </div>
  );
}
