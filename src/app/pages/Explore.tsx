import { useState } from "react";
import { Search } from "lucide-react";
import { MediaViewer } from "../components/MediaViewer";

export function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const explorePosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", span: "row-span-1" },
    { id: 2, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop", span: "row-span-1" },
    { id: 3, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop", span: "row-span-2" },
    { id: 4, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop", span: "row-span-1" },
    { id: 5, image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=400&fit=crop", span: "row-span-1" },
    { id: 6, image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=400&fit=crop", span: "row-span-1" },
    { id: 7, image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400&h=600&fit=crop", span: "row-span-2" },
    { id: 8, image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop", span: "row-span-1" },
    { id: 9, image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop", span: "row-span-1" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      {/* Header with Search */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-4 sticky top-0 z-40 shadow-lg">
        <h1 className="text-white font-bold text-2xl mb-3">Explore</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/80 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:bg-white/30"
          />
        </div>
      </header>

      {/* Category Pills */}
      <div className="px-4 py-4 bg-white/10 backdrop-blur-sm">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["Trending", "Style", "Sports", "Travel", "Food", "Music", "Art", "Nature"].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-white/90 hover:bg-white rounded-full text-sm font-medium text-gray-700 whitespace-nowrap shadow-sm"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Explore Grid */}
      <div className="bg-white mt-4 mx-4 rounded-t-3xl shadow-xl pb-20 overflow-hidden">
        <div className="grid grid-cols-3 auto-rows-[130px] gap-1">
          {explorePosts.map((post, index) => (
            <button
              key={post.id}
              onClick={() => {
                setSelectedImageIndex(index);
                setShowMediaViewer(true);
              }}
              className={post.span}
            >
              <img
                src={post.image}
                alt={`Explore post ${post.id}`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Media Viewer Modal */}
      {showMediaViewer && (
        <MediaViewer
          images={explorePosts.map((p) => p.image)}
          initialIndex={selectedImageIndex}
          onClose={() => setShowMediaViewer(false)}
        />
      )}
    </div>
  );
}
