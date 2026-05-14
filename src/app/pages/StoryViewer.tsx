import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { X, Heart, Send, MoreVertical, Pause, Play, Eye, Users, Music, ChevronRight } from "lucide-react";

interface Viewer {
  id: string;
  username: string;
  avatar: string;
  timestamp: string;
}

interface Story {
  id: string;
  image: string;
  timestamp: string;
  views: number;
  viewers: Viewer[];
  song?: string;
  text?: string;
}

const MOCK_VIEWERS: Viewer[] = [
  { id: "1", username: "Lusine", avatar: "https://i.pravatar.cc/150?img=1", timestamp: "2m ago" },
  { id: "2", username: "David", avatar: "https://i.pravatar.cc/150?img=12", timestamp: "15m ago" },
  { id: "3", username: "Ani", avatar: "https://i.pravatar.cc/150?img=15", timestamp: "1h ago" },
  { id: "4", username: "Narek", avatar: "https://i.pravatar.cc/150?img=3", timestamp: "2h ago" },
  { id: "5", username: "Mari", avatar: "https://i.pravatar.cc/150?img=20", timestamp: "3h ago" },
  { id: "6", username: "Sona", avatar: "https://i.pravatar.cc/150?img=25", timestamp: "4h ago" },
];

const IS_OWNER = true; // In a real app this would compare with current user

export function StoryViewer() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messageText, setMessageText] = useState("");
  const [showViewers, setShowViewers] = useState(false);
  const [viewerSearch, setViewerSearch] = useState("");

  const stories: Story[] = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
      timestamp: "2h ago",
      views: 234,
      viewers: MOCK_VIEWERS,
      song: "Blinding Lights – The Weeknd",
      text: "Beautiful mountains 🏔️",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=1200&fit=crop",
      timestamp: "5h ago",
      views: 189,
      viewers: MOCK_VIEWERS.slice(0, 4),
    },
  ];

  const currentStory = stories[currentStoryIndex];
  const filteredViewers = currentStory.viewers.filter((v) =>
    v.username.toLowerCase().includes(viewerSearch.toLowerCase())
  );

  useEffect(() => {
    if (isPaused || showViewers) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            return 0;
          } else {
            navigate(-1);
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused, currentStoryIndex, navigate, stories.length, showViewers]);

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      navigate(-1);
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full max-w-[480px] h-full">
        <img src={currentStory.image} alt="Story" className="w-full h-full object-cover" />

        {/* Gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 pt-3" style={{ paddingTop: "calc(0.5rem + env(safe-area-inset-top))" }}>
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white story-progress"
                style={{
                  width: index < currentStoryIndex ? "100%" : index === currentStoryIndex ? `${progress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute left-0 right-0 px-4 flex items-center justify-between" style={{ top: "calc(1.2rem + env(safe-area-inset-top))" }}>
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?img=10" alt={username} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
            <div>
              <p className="text-white font-semibold text-sm">{username}</p>
              <p className="text-white/80 text-xs">{currentStory.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentStory.song && (
              <div className="flex items-center gap-1 bg-black/40 rounded-full px-2 py-1">
                <Music className="w-3 h-3 text-white" />
                <span className="text-white text-xs truncate max-w-[80px]">{currentStory.song}</span>
              </div>
            )}
            <button onClick={() => setIsPaused(!isPaused)} className="text-white">
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>
            <button className="text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button onClick={() => navigate(-1)} className="text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Story text overlay */}
        {currentStory.text && (
          <div className="absolute left-4 right-4 text-center" style={{ top: "45%" }}>
            <p className="text-white text-2xl font-bold drop-shadow-lg">{currentStory.text}</p>
          </div>
        )}

        {/* Touch Areas for Navigation */}
        <div className="absolute inset-0 flex" style={{ top: "10%", bottom: "20%" }}>
          <div className="flex-1" onClick={handlePrevious} />
          <div className="flex-1" onClick={handleNext} />
        </div>

        {/* Owner: views + viewers panel trigger */}
        {IS_OWNER ? (
          <div className="absolute bottom-20 left-0 right-0 px-4">
            <button
              onClick={() => { setShowViewers(true); setIsPaused(true); }}
              className="flex items-center gap-2 text-white bg-black/40 rounded-full px-4 py-2"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">{currentStory.views} views</span>
              <Users className="w-4 h-4 ml-1" />
              <span className="text-sm">{currentStory.viewers.length} viewers</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </button>
          </div>
        ) : (
          /* Non-owner: reply input */
          <div className="absolute bottom-0 left-0 right-0 p-4" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}>
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-4 py-3">
                <input
                  type="text"
                  placeholder={`Reply to ${username}...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-transparent text-white placeholder-white/70 text-sm focus:outline-none"
                />
              </div>
              {messageText.trim() ? (
                <button onClick={handleSendMessage} className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white p-3 rounded-full">
                  <Send className="w-5 h-5" />
                </button>
              ) : (
                <button className="text-white p-3">
                  <Heart className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Viewers Panel (owner only) */}
        {showViewers && (
          <div
            className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl z-10 modal-enter"
            style={{ maxHeight: "65vh" }}
          >
            <div className="sticky top-0 bg-white px-4 pt-4 pb-3 border-b border-gray-100">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">Viewers</h3>
                  <p className="text-xs text-gray-500">{currentStory.views} views · {currentStory.viewers.length} accounts</p>
                </div>
                <button onClick={() => { setShowViewers(false); setIsPaused(false); }}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search viewers..."
                  value={viewerSearch}
                  onChange={(e) => setViewerSearch(e.target.value)}
                  className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "calc(65vh - 140px)" }}>
              {filteredViewers.length === 0 ? (
                <p className="text-center text-gray-400 py-8 text-sm">No viewers found</p>
              ) : (
                filteredViewers.map((viewer) => (
                  <div key={viewer.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                    <img src={viewer.avatar} alt={viewer.username} className="w-11 h-11 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{viewer.username}</p>
                      <p className="text-xs text-gray-400">{viewer.timestamp}</p>
                    </div>
                    <Eye className="w-4 h-4 text-gray-300" />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
