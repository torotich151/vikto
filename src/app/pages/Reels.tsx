import { useState, useRef, useEffect, useCallback } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreVertical,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowLeft,
  X,
  Flag,
  Share2,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

interface Reel {
  id: string;
  username: string;
  avatar: string;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
}

const REELS: Reel[] = [
  {
    id: "1",
    username: "travel_vibes",
    avatar: "https://i.pravatar.cc/150?img=10",
    videoUrl: "",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=1067&fit=crop",
    caption: "Sunset views in Montenegro 🌅✨ #travel #sunset #wanderlust",
    likes: 12500,
    comments: 340,
    shares: 89,
    isLiked: false,
    isSaved: false,
  },
  {
    id: "2",
    username: "foodie_adventures",
    avatar: "https://i.pravatar.cc/150?img=12",
    videoUrl: "",
    thumbnail:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=1067&fit=crop",
    caption: "Best pasta recipe ever! 🍝 You have to try this! #food #cooking #recipe",
    likes: 8900,
    comments: 210,
    shares: 45,
    isLiked: true,
    isSaved: false,
  },
  {
    id: "3",
    username: "fitness_life",
    avatar: "https://i.pravatar.cc/150?img=15",
    videoUrl: "",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=1067&fit=crop",
    caption: "Morning workout routine 💪 Starting the day right! #fitness #health #gym",
    likes: 15600,
    comments: 420,
    shares: 120,
    isLiked: false,
    isSaved: true,
  },
  {
    id: "4",
    username: "artsy_creator",
    avatar: "https://i.pravatar.cc/150?img=25",
    videoUrl: "",
    thumbnail:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=1067&fit=crop",
    caption: "Art is everywhere you look 🎨 #art #creative #design",
    likes: 6700,
    comments: 190,
    shares: 67,
    isLiked: false,
    isSaved: false,
  },
  {
    id: "5",
    username: "nature_lover",
    avatar: "https://i.pravatar.cc/150?img=30",
    videoUrl: "",
    thumbnail:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=1067&fit=crop",
    caption: "Nature never stops amazing me 🌿 #nature #outdoor #explore",
    likes: 21300,
    comments: 580,
    shares: 234,
    isLiked: false,
    isSaved: false,
  },
];

export function Reels() {
  const navigate = useNavigate();
  const [reels, setReels] = useState<Reel[]>(REELS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [heartAnim, setHeartAnim] = useState(false);
  const touchStartY = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTap = useRef<number>(0);

  const currentReel = reels[currentIndex];

  const handleLike = useCallback((id: string) => {
    setReels((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 }
          : r
      )
    );
  }, []);

  const handleSave = useCallback((id: string) => {
    setReels((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isSaved: !r.isSaved } : r))
    );
  }, []);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!currentReel.isLiked) {
        handleLike(currentReel.id);
        setHeartAnim(true);
        setTimeout(() => setHeartAnim(false), 800);
      }
    }
    lastTap.current = now;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < reels.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentIndex < reels.length - 1)
        setCurrentIndex((i) => i + 1);
      if (e.key === "ArrowUp" && currentIndex > 0) setCurrentIndex((i) => i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, reels.length]);

  const formatNum = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  const comments = [
    { id: "1", user: "Lusine", avatar: "https://i.pravatar.cc/150?img=1", text: "Amazing! 😍", time: "2m" },
    { id: "2", user: "Armen", avatar: "https://i.pravatar.cc/150?img=2", text: "This is so beautiful!", time: "5m" },
    { id: "3", user: "user_x", avatar: "https://i.pravatar.cc/150?img=3", text: "🔥🔥🔥", time: "8m" },
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-10 pb-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <button
          className="pointer-events-auto"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg">Reels</h1>
        <button
          className="pointer-events-auto"
          onClick={() => setMuted(!muted)}
        >
          {muted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Main Reel Container */}
      <div
        ref={containerRef}
        className="w-full h-full relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleDoubleTap}
      >
        <img
          src={currentReel.thumbnail}
          alt="Reel"
          className="w-full h-full object-cover"
        />

        {/* Pause/Play overlay */}
        <button
          className="absolute inset-0 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setPaused(!paused);
          }}
        >
          {paused && (
            <div className="w-20 h-20 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          )}
        </button>

        {/* Double-tap heart animation */}
        {heartAnim && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart
              className="w-32 h-32 text-white fill-white animate-ping"
              style={{ animationDuration: "0.6s", animationIterationCount: 1 }}
            />
          </div>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-20">
        {/* Author Avatar */}
        <Link to={`/user/${currentReel.username}`} className="relative mb-1">
          <img
            src={currentReel.avatar}
            alt={currentReel.username}
            className="w-11 h-11 rounded-full border-2 border-white object-cover"
          />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
        </Link>

        {/* Like */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => handleLike(currentReel.id)}
            className="w-11 h-11 flex items-center justify-center"
          >
            <Heart
              className={`w-7 h-7 transition-all ${
                currentReel.isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"
              }`}
              strokeWidth={currentReel.isLiked ? 0 : 2}
            />
          </button>
          <span className="text-white text-xs font-bold">{formatNum(currentReel.likes)}</span>
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center gap-1">
          <button
            className="w-11 h-11 flex items-center justify-center"
            onClick={() => setShowComments(true)}
          >
            <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />
          </button>
          <span className="text-white text-xs font-bold">{formatNum(currentReel.comments)}</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-1">
          <button className="w-11 h-11 flex items-center justify-center">
            <Send className="w-7 h-7 text-white" strokeWidth={2} />
          </button>
          <span className="text-white text-xs font-bold">{formatNum(currentReel.shares)}</span>
        </div>

        {/* Save */}
        <div className="flex flex-col items-center gap-1">
          <button
            className="w-11 h-11 flex items-center justify-center"
            onClick={() => handleSave(currentReel.id)}
          >
            <Bookmark
              className={`w-7 h-7 transition-all ${
                currentReel.isSaved ? "fill-white text-white" : "text-white"
              }`}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* More Options */}
        <button
          className="w-11 h-11 flex items-center justify-center"
          onClick={() => setShowOptions(true)}
        >
          <MoreVertical className="w-7 h-7 text-white" strokeWidth={2} />
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-16 z-20 px-4 pb-8 pt-16 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <Link
          to={`/user/${currentReel.username}`}
          className="flex items-center gap-2 mb-2"
        >
          <span className="text-white font-bold text-base">@{currentReel.username}</span>
          <span className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white text-xs font-bold px-3 py-0.5 rounded-full">
            Follow
          </span>
        </Link>
        <p className="text-white text-sm leading-relaxed line-clamp-2">
          {currentReel.caption}
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="absolute left-0 right-0 top-0 z-30 flex gap-1 px-2 pt-20">
        {reels.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="flex-1 h-0.5 rounded-full overflow-hidden"
          >
            <div
              className={`h-full rounded-full transition-all ${
                i < currentIndex
                  ? "bg-white"
                  : i === currentIndex
                  ? "bg-white"
                  : "bg-white/30"
              }`}
              style={{ width: i < currentIndex ? "100%" : i === currentIndex ? "60%" : "100%" }}
            />
          </button>
        ))}
      </div>

      {/* Options Sheet */}
      {showOptions && (
        <div className="absolute inset-0 z-50" onClick={() => setShowOptions(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <button
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl text-red-500"
              onClick={() => setShowOptions(false)}
            >
              <Flag className="w-5 h-5" />
              <span className="font-medium">Report Reel</span>
            </button>
            <button
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl text-gray-700"
              onClick={() => setShowOptions(false)}
            >
              <Share2 className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </button>
            <button
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl text-gray-700"
              onClick={() => setShowOptions(false)}
            >
              <Bookmark className="w-5 h-5" />
              <span className="font-medium">Save</span>
            </button>
            <button
              className="w-full mt-2 bg-gray-100 py-3 rounded-xl font-medium text-gray-700"
              onClick={() => setShowOptions(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Comments Sheet */}
      {showComments && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowComments(false)} />
          <div className="relative bg-white rounded-t-3xl max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="font-bold text-gray-900">{currentReel.comments} Comments</span>
              <button onClick={() => setShowComments(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3">
                  <img src={c.avatar} alt={c.user} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex-1 bg-gray-50 rounded-2xl px-3 py-2">
                    <span className="font-semibold text-xs text-gray-900">{c.user}</span>
                    <p className="text-sm text-gray-700">{c.text}</p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{c.time}</span>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100 flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/150?img=30"
                alt="You"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                />
              </div>
              {commentText.trim() && (
                <button
                  onClick={() => setCommentText("")}
                  className="text-[#E91E63] font-semibold text-sm"
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
