import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Heart, Smile, Image as ImageIcon, ThumbsUp, Eye, X, Send } from "lucide-react";

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  imageUrl?: string;
  likes: number;
  timestamp: string;
  isAuthor?: boolean;
  isLiked?: boolean;
  replies?: Comment[];
}

const MAX_FILE_SIZE_MB = 2;

export function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      username: "Lusine",
      avatar: "https://i.pravatar.cc/150?img=4",
      text: "Beautiful view! 😍",
      likes: 12,
      timestamp: "2h",
      replies: [
        {
          id: "1-1",
          username: "Armenam",
          avatar: "https://i.pravatar.cc/150?img=30",
          text: "Thank you so much! ❤️",
          likes: 5,
          timestamp: "2h",
          isAuthor: true,
        },
      ],
    },
    {
      id: "2",
      username: "David",
      avatar: "https://i.pravatar.cc/150?img=3",
      text: "This is amazing! 🔥",
      likes: 8,
      timestamp: "1h",
    },
    {
      id: "3",
      username: "Ani",
      avatar: "https://i.pravatar.cc/150?img=6",
      text: "Love the colors! 🌅",
      likes: 3,
      timestamp: "1h",
    },
    {
      id: "4",
      username: "Narek",
      avatar: "https://i.pravatar.cc/150?img=5",
      text: "Where is this place?",
      likes: 0,
      timestamp: "2h",
      replies: [
        {
          id: "4-1",
          username: "Armenam",
          avatar: "https://i.pravatar.cc/150?img=30",
          text: "It's in Montenegro 🇲🇪",
          likes: 4,
          timestamp: "2h",
          isAuthor: true,
        },
      ],
    },
  ]);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCommentImage(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handlePostComment = () => {
    if (!commentText.trim() && !commentImage) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      username: "Armenam",
      avatar: "https://i.pravatar.cc/150?img=30",
      text: commentText,
      imageUrl: commentImage || undefined,
      likes: 0,
      timestamp: "now",
      isAuthor: true,
    };

    if (replyingTo) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyingTo
            ? { ...c, replies: [...(c.replies || []), newComment] }
            : c
        )
      );
      setShowReplies((prev) => ({ ...prev, [replyingTo]: true }));
      setReplyingTo(null);
    } else {
      setComments((prev) => [newComment, ...prev]);
    }

    setCommentText("");
    setCommentImage(null);
  };

  const handleLikeComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked }
          : c
      )
    );
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex gap-3 ${isReply ? "" : "mb-4"}`}>
      <img
        src={comment.avatar}
        alt={comment.username}
        className={`${isReply ? "w-8 h-8" : "w-10 h-10"} rounded-full object-cover flex-shrink-0`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-semibold text-sm text-gray-900">{comment.username}</span>
              {comment.isAuthor && (
                <span className="text-xs font-semibold text-[#E91E63] bg-pink-50 px-2 py-0.5 rounded-full">Author</span>
              )}
              <span className="text-xs text-gray-400">{comment.timestamp}</span>
            </div>
            {comment.text && <p className="text-sm text-gray-800 mb-1">{comment.text}</p>}
            {comment.imageUrl && (
              <img
                src={comment.imageUrl}
                alt="Comment media"
                className="rounded-xl max-w-[200px] max-h-[200px] object-cover mb-1 cursor-pointer"
              />
            )}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <button
                className={`font-medium hover:text-gray-700 ${comment.isLiked ? "text-[#E91E63]" : ""}`}
                onClick={() => handleLikeComment(comment.id)}
              >
                Like
              </button>
              {!isReply && (
                <button
                  className="font-medium hover:text-gray-700"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  Reply
                </button>
              )}
            </div>
          </div>
          <button onClick={() => handleLikeComment(comment.id)} className="flex items-center gap-1 text-gray-400 flex-shrink-0">
            <Heart className={`w-4 h-4 ${comment.isLiked ? "fill-red-500 text-red-500" : ""}`} />
            {comment.likes > 0 && <span className="text-xs">{comment.likes}</span>}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107] flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center sticky top-0 z-40 shadow-lg flex-shrink-0" style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top))" }}>
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg flex-1">Comments</h1>
        <div className="flex items-center gap-1 text-white/80">
          <Eye className="w-4 h-4" />
          <span className="text-sm">{(128 + Math.floor(Math.random() * 200)).toLocaleString()} views</span>
        </div>
      </header>

      {/* Comments Container */}
      <div className="bg-white rounded-t-3xl mt-4 mx-4 shadow-xl flex-1 flex flex-col overflow-hidden">
        {/* Post Summary */}
        <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center -space-x-1">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-3 h-3 text-white fill-white" />
              </div>
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white fill-white" />
              </div>
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs">😂</div>
            </div>
            <span className="text-sm text-gray-700 ml-1 font-medium">128 Likes</span>
            <span className="text-sm text-gray-500 ml-auto">{comments.length} Comments</span>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-nav" style={{ minHeight: 0 }}>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <CommentItem comment={comment} />
              {comment.replies && comment.replies.length > 0 && (
                <>
                  {!showReplies[comment.id] ? (
                    <button
                      onClick={() => setShowReplies({ ...showReplies, [comment.id]: true })}
                      className="text-sm font-medium text-[#E91E63] ml-13 mt-1 flex items-center gap-1 ml-12"
                    >
                      ↳ View {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                    </button>
                  ) : (
                    <div className="ml-12 mt-2 border-l-2 border-pink-100 pl-3 space-y-3">
                      {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} isReply />
                      ))}
                      <button
                        onClick={() => setShowReplies({ ...showReplies, [comment.id]: false })}
                        className="text-xs font-medium text-gray-400"
                      >
                        Hide replies
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
          {replyingTo && (
            <div className="flex items-center gap-2 mb-2 bg-pink-50 rounded-lg px-3 py-1.5">
              <span className="text-xs text-[#E91E63] font-medium flex-1">
                Replying to {comments.find((c) => c.id === replyingTo)?.username}
              </span>
              <button onClick={() => setReplyingTo(null)}>
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          )}
          {commentImage && (
            <div className="relative mb-2 w-20">
              <img src={commentImage} alt="Preview" className="w-20 h-20 object-cover rounded-xl" />
              <button
                onClick={() => setCommentImage(null)}
                className="absolute -top-1.5 -right-1.5 bg-gray-700 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?img=30" alt="Your avatar" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
              <button className="text-gray-400 flex-shrink-0" onClick={handlePickImage}>
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="text-gray-400 flex-shrink-0">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handlePostComment}
              disabled={!commentText.trim() && !commentImage}
              className="w-9 h-9 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full flex items-center justify-center disabled:opacity-40 flex-shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">Max 2MB per media file</p>
        </div>
      </div>
    </div>
  );
}
