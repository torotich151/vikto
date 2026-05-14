import { Image, Video, Smile } from "lucide-react";
import { Link } from "react-router";

export function CreatePostCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <img
          src="https://i.pravatar.cc/150?img=30"
          alt="Your avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <Link
          to="/create"
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-500 text-sm"
        >
          Share your thoughts...
        </Link>
      </div>
      <div className="flex items-center justify-around border-t border-gray-100 pt-3">
        <Link
          to="/create"
          className="flex items-center gap-2 text-[#E91E63] font-medium text-sm hover:bg-pink-50 px-4 py-2 rounded-lg transition-colors"
        >
          <Image className="w-5 h-5" />
          <span>Photo</span>
        </Link>
        <Link
          to="/create"
          className="flex items-center gap-2 text-[#E91E63] font-medium text-sm hover:bg-pink-50 px-4 py-2 rounded-lg transition-colors"
        >
          <Video className="w-5 h-5" />
          <span>Video</span>
        </Link>
        <button className="flex items-center gap-2 text-[#E91E63] font-medium text-sm hover:bg-pink-50 px-4 py-2 rounded-lg transition-colors">
          <Smile className="w-5 h-5" />
          <span>Feeling</span>
        </button>
      </div>
    </div>
  );
}
