import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Bookmark, MoreVertical, ThumbsUp, Share2, Flag, Eye, MapPin, Music } from "lucide-react";
import { Link } from "react-router";
import { PhotoLightbox } from "./PhotoLightbox";
import { ReportModal } from "./ReportModal";

interface PostProps {
  id: string;
  username: string;
  avatar: string;
  images: string[];
  likes: number;
  caption: string;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
  isSaved?: boolean;
  location?: string;
  song?: string;
  views?: number;
  imageFilter?: string;
}

function PhotoGrid({ images, filters, onClick }: { images: string[]; filters: string[]; onClick: (i: number) => void }) {
  const count = images.length;
  const f = (i: number) => ({ filter: filters[i] || "none" } as React.CSSProperties);

  if (count === 1) {
    return (
      <div className="relative cursor-pointer" onClick={() => onClick(0)}>
        <img src={images[0]} alt="Post" className="w-full max-h-[520px] object-cover" style={f(0)} />
      </div>
    );
  }
  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-0.5">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-square cursor-pointer" onClick={() => onClick(i)}>
            <img src={src} alt="" className="w-full h-full object-cover" style={f(i)} />
          </div>
        ))}
      </div>
    );
  }
  if (count === 3) {
    return (
      <div className="flex gap-0.5">
        <div className="w-1/2 cursor-pointer" onClick={() => onClick(0)}>
          <img src={images[0]} alt="" className="w-full h-full object-cover aspect-[4/5]" style={f(0)} />
        </div>
        <div className="flex-1 flex flex-col gap-0.5">
          {[1, 2].map((i) => (
            <div key={i} className="aspect-square cursor-pointer" onClick={() => onClick(i)}>
              <img src={images[i]} alt="" className="w-full h-full object-cover" style={f(i)} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (count === 4) {
    return (
      <div className="grid grid-cols-2 gap-0.5">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-square cursor-pointer" onClick={() => onClick(i)}>
            <img src={src} alt="" className="w-full h-full object-cover" style={f(i)} />
          </div>
        ))}
      </div>
    );
  }
  // 5+
  return (
    <div className="flex gap-0.5">
      <div className="w-1/2 cursor-pointer" onClick={() => onClick(0)}>
        <img src={images[0]} alt="" className="w-full h-full object-cover" style={{ ...f(0), minHeight: 240 }} />
      </div>
      <div className="flex-1 grid grid-rows-2 gap-0.5">
        <div className="relative aspect-square cursor-pointer" onClick={() => onClick(1)}>
          <img src={images[1]} alt="" className="w-full h-full object-cover" style={f(1)} />
        </div>
        <div className="relative aspect-square cursor-pointer" onClick={() => onClick(2)}>
          <img src={images[2]} alt="" className="w-full h-full object-cover" style={f(2)} />
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-2xl font-bold">+{count - 3}</p>
              <p className="text-white/80 text-xs">more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Post({
  id,
  username,
  avatar,
  images,
  likes,
  caption,
  comments,
  timestamp,
  isLiked = false,
  isSaved = false,
  location,
  song,
  views = 0,
  imageFilter = "none",
}: PostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likesCount, setLikesCount] = useState(likes);
  const [viewsCount] = useState(views + Math.floor(Math.random() * 500) + 100);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [reaction, setReaction] = useState<string | null>(isLiked ? "like" : null);
  const [showReactions, setShowReactions] = useState(false);
  const reactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filters = images.map(() => imageFilter);

  const REACTIONS = [
    { emoji: "👍", label: "Like", color: "text-blue-500" },
    { emoji: "❤️", label: "Love", color: "text-red-500" },
    { emoji: "😂", label: "Haha", color: "text-yellow-500" },
    { emoji: "😮", label: "Wow", color: "text-yellow-500" },
    { emoji: "😢", label: "Sad", color: "text-yellow-500" },
    { emoji: "😡", label: "Angry", color: "text-orange-500" },
  ];

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      if (!liked) { setLiked(true); setLikesCount((c) => c + 1); }
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 900);
    }
    setLastTap(now);
  };

  const handleLikeLongPress = () => {
    reactionTimer.current = setTimeout(() => setShowReactions(true), 400);
  };

  const handleLikeRelease = () => {
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
  };

  const pickReaction = (r: typeof REACTIONS[0]) => {
    setReaction(r.label);
    if (!liked) { setLiked(true); setLikesCount((c) => c + 1); }
    setShowReactions(false);
  };

  const handleLike = () => {
    if (!showReactions) {
      if (liked) { setLiked(false); setLikesCount((c) => c - 1); setReaction(null); }
      else { setLiked(true); setLikesCount((c) => c + 1); setReaction("Like"); }
    }
  };

  const currentReaction = REACTIONS.find((r) => r.label === reaction);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link to={`/user/${username}`} className="flex items-center gap-3">
          <div className="relative">
            <img src={avatar} alt={username} className="w-11 h-11 rounded-full object-cover border-2 border-pink-500" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white block text-sm">{username}</span>
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs text-gray-500 dark:text-gray-400">{timestamp} · 🌍</span>
              {location && (
                <span className="text-xs text-blue-500 flex items-center gap-0.5">
                  <MapPin className="w-3 h-3" />{location}
                </span>
              )}
            </div>
          </div>
        </Link>
        <div className="relative">
          <button onClick={() => setShowPostOptions(!showPostOptions)} className="text-gray-400 dark:text-gray-500 p-1">
            <MoreVertical className="w-5 h-5" />
          </button>
          {showPostOptions && (
            <div className="absolute right-0 top-8 bg-white dark:bg-gray-700 rounded-2xl shadow-xl py-2 w-48 z-20 border border-gray-100 dark:border-gray-600">
              {[
                { icon: <Flag className="w-4 h-4" />, label: "Report", color: "text-red-500", action: () => { setShowReportModal(true); setShowPostOptions(false); } },
                { icon: <Share2 className="w-4 h-4" />, label: "Share", color: "text-gray-700 dark:text-gray-200", action: () => {} },
                { icon: <Bookmark className="w-4 h-4" />, label: "Save", color: "text-gray-700 dark:text-gray-200", action: () => { setSaved(!saved); setShowPostOptions(false); } },
              ].map((item) => (
                <button key={item.label} onClick={item.action} className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-3 ${item.color}`}>
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {showReportModal && <ReportModal onClose={() => setShowReportModal(false)} type="post" />}

      {/* Song */}
      {song && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 rounded-full px-3 py-1.5 w-fit">
            <Music className="w-3.5 h-3.5 text-purple-500 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-xs text-purple-700 dark:text-purple-300 font-medium truncate max-w-[180px]">{song}</span>
          </div>
        </div>
      )}

      {/* Caption */}
      {caption && (
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">{caption}</p>
        </div>
      )}

      {/* Photos */}
      {images.length > 0 && (
        <div className="relative" onDoubleClick={handleDoubleTap} onClick={() => setShowPostOptions(false)}>
          <PhotoGrid images={images} filters={filters} onClick={(i) => setLightboxIdx(i)} />
          {showHeartAnim && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <Heart className="w-28 h-28 text-white fill-white drop-shadow-2xl animate-ping" />
            </div>
          )}
          {/* Views overlay */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs rounded-full px-2.5 py-1">
            <Eye className="w-3 h-3" />
            <span>{viewsCount.toLocaleString()}</span>
          </div>
          {/* Photo count badge */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs rounded-full px-2 py-0.5 font-medium">
              {images.length} photos
            </div>
          )}
        </div>
      )}

      {lightboxIdx !== null && (
        <PhotoLightbox
          images={images}
          initialIndex={lightboxIdx}
          username={username}
          avatar={avatar}
          postId={id}
          filters={filters}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      {/* Stats */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center -space-x-1">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[9px]">👍</div>
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[9px]">❤️</div>
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[9px]">😂</div>
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300">{likesCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{comments} comments</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{viewsCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="px-2 py-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-around relative">
          {/* Reactions popup */}
          {showReactions && (
            <div className="absolute -top-14 left-0 bg-white dark:bg-gray-700 rounded-full shadow-xl px-3 py-2 flex gap-2 z-20 border border-gray-100 dark:border-gray-600">
              {REACTIONS.map((r) => (
                <button key={r.label} onClick={() => pickReaction(r)} className="text-2xl hover:scale-125 transition-transform" title={r.label}>
                  {r.emoji}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleLike}
            onMouseDown={handleLikeLongPress}
            onMouseUp={handleLikeRelease}
            onTouchStart={handleLikeLongPress}
            onTouchEnd={handleLikeRelease}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl flex-1 justify-center transition-all ${liked ? "text-[#E91E63]" : "text-gray-500 dark:text-gray-400"} hover:bg-gray-50 dark:hover:bg-gray-700`}
          >
            {reaction && currentReaction ? (
              <span className="text-lg">{currentReaction.emoji}</span>
            ) : (
              <ThumbsUp className={`w-5 h-5 ${liked ? "fill-[#E91E63]" : ""}`} />
            )}
            <span className="font-semibold text-sm">{reaction || "Like"}</span>
          </button>

          <Link
            to={`/post/${id}`}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex-1 justify-center transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-sm">Comment</span>
          </Link>

          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl flex-1 justify-center transition-all ${saved ? "text-[#E91E63]" : "text-gray-500 dark:text-gray-400"} hover:bg-gray-50 dark:hover:bg-gray-700`}
          >
            <Bookmark className={`w-5 h-5 ${saved ? "fill-[#E91E63]" : ""}`} />
            <span className="font-semibold text-sm">Save</span>
          </button>
        </div>
      </div>

      {/* Comment preview */}
      {comments > 0 && (
        <div className="px-4 pb-4">
          <div className="flex items-start gap-3 mb-2">
            <img src="https://i.pravatar.cc/150?img=20" alt="Commenter" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-2xl px-3 py-2">
              <p className="text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">Lusine </span>
                <span className="text-gray-700 dark:text-gray-300">Beautiful! 😍</span>
              </p>
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                <span>1h</span>
                <button className="font-semibold text-gray-600 dark:text-gray-300 hover:text-[#E91E63]">Like</button>
                <button className="font-semibold text-gray-600 dark:text-gray-300 hover:text-[#E91E63]">Reply</button>
                <span className="ml-auto flex items-center gap-1"><Heart className="w-3 h-3 fill-red-400 text-red-400" /> 12</span>
              </div>
            </div>
          </div>
          <Link to={`/post/${id}`} className="text-sm font-semibold text-[#E91E63] hover:opacity-80">
            View all {comments} comments
          </Link>
        </div>
      )}
    </div>
  );
}
