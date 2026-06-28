import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Download, Share2, ZoomIn, ZoomOut } from "lucide-react";

interface PhotoLightboxProps {
  images: string[];
  initialIndex: number;
  username: string;
  avatar: string;
  postId?: string;
  filters?: string[];
  onClose: () => void;
}

export function PhotoLightbox({ images, initialIndex, username, avatar, postId, filters = [], onClose }: PhotoLightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [likes, setLikes] = useState<boolean[]>(images.map(() => false));
  const [likeCounts, setLikeCounts] = useState<number[]>(images.map(() => Math.floor(Math.random() * 200) + 10));
  const [zoom, setZoom] = useState(1);
  const [showHeart, setShowHeart] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [comment, setComment] = useState("");
  const [showCommentBar, setShowCommentBar] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [current]);

  const goPrev = () => { setZoom(1); setCurrent((c) => Math.max(0, c - 1)); };
  const goNext = () => { setZoom(1); setCurrent((c) => Math.min(images.length - 1, c + 1)); };

  const handleLike = () => {
    setLikes((prev) => { const n = [...prev]; n[current] = !n[current]; return n; });
    setLikeCounts((prev) => { const n = [...prev]; n[current] += n[current] ? 1 : -1; return n; });
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      if (!likes[current]) {
        setLikes((prev) => { const n = [...prev]; n[current] = true; return n; });
        setLikeCounts((prev) => { const n = [...prev]; n[current]++; return n; });
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
    setLastTap(now);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = images[current];
    a.download = `photo_${current + 1}.jpg`;
    a.click();
  };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.changedTouches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
  };

  const filter = filters[current] || "none";

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col" onClick={onClose}>
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 z-10 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0" style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top))" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white">
          <X className="w-5 h-5" />
        </button>
        <img src={avatar} alt={username} className="w-9 h-9 rounded-full object-cover border-2 border-white/50" />
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">{username}</p>
          <p className="text-white/60 text-xs">{current + 1} / {images.length}</p>
        </div>
        <button onClick={() => setZoom(z => z === 1 ? 1.8 : 1)} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white">
          {zoom > 1 ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
        </button>
        <button onClick={handleDownload} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white">
          <Download className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Image */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onClick={(e) => { e.stopPropagation(); handleDoubleTap(); }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[current]}
          alt={`Photo ${current + 1}`}
          className="max-w-full max-h-full object-contain transition-transform duration-200 select-none"
          style={{ filter, transform: `scale(${zoom})`, transformOrigin: "center" }}
          draggable={false}
        />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-28 h-28 text-white fill-white drop-shadow-2xl animate-ping" />
          </div>
        )}

        {/* Prev / Next arrows */}
        {current > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {current < images.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 py-2" onClick={(e) => e.stopPropagation()}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${i === current ? "bg-white w-5 h-2" : "bg-white/40 w-2 h-2"}`}
            />
          ))}
        </div>
      )}

      {/* Bottom bar */}
      <div className="bg-black/90 px-4 py-3 z-10" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${likes[current] ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/80 hover:bg-white/20"}`}
          >
            <Heart className={`w-5 h-5 ${likes[current] ? "fill-red-400" : ""}`} />
            <span className="font-semibold text-sm">{likeCounts[current].toLocaleString()}</span>
          </button>
          <button
            onClick={() => setShowCommentBar(!showCommentBar)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-sm">Comment</span>
          </button>
          <div className="flex gap-1">
            {images.map((src, i) => (
              <button key={i} onClick={() => setCurrent(i)}>
                <img
                  src={src}
                  alt=""
                  className={`w-8 h-8 rounded-lg object-cover border-2 transition-all ${i === current ? "border-white" : "border-white/20 opacity-50"}`}
                  style={{ filter: filters[i] || "none" }}
                />
              </button>
            ))}
          </div>
        </div>
        {showCommentBar && (
          <div className="flex items-center gap-2 mt-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-white/15 text-white placeholder-white/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 inbox-selectable"
            />
            <button
              disabled={!comment.trim()}
              className="bg-[#E91E63] text-white px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              Post
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail strip for 5+ images */}
      {images.length >= 5 && (
        <div className="flex gap-1 px-2 pb-2 overflow-x-auto scrollbar-hide" onClick={(e) => e.stopPropagation()}>
          {images.map((src, i) => (
            <button key={i} onClick={() => { setZoom(1); setCurrent(i); }}>
              <img
                src={src}
                alt=""
                className={`w-14 h-14 rounded-xl object-cover border-2 flex-shrink-0 transition-all ${i === current ? "border-white" : "border-transparent opacity-50"}`}
                style={{ filter: filters[i] || "none" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
