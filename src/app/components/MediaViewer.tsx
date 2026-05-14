import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useState } from "react";

interface MediaViewerProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  username?: string;
  avatar?: string;
}

export function MediaViewer({
  images,
  initialIndex = 0,
  onClose,
  username,
  avatar,
}: MediaViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full max-w-[480px] h-full flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            {username && avatar ? (
              <div className="flex items-center gap-3">
                <img
                  src={avatar}
                  alt={username}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <span className="text-white font-semibold">{username}</span>
              </div>
            ) : (
              <div></div>
            )}
            <button onClick={onClose} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center relative">
          <img
            src={images[currentIndex]}
            alt="Media"
            className="max-w-full max-h-full object-contain"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-around">
            <button className="text-white flex flex-col items-center gap-1">
              <Heart className="w-7 h-7" />
            </button>
            <button className="text-white flex flex-col items-center gap-1">
              <MessageCircle className="w-7 h-7" />
            </button>
            <button className="text-white flex flex-col items-center gap-1">
              <Send className="w-7 h-7" />
            </button>
            <button className="text-white flex flex-col items-center gap-1">
              <Bookmark className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
