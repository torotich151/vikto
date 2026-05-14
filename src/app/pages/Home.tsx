import { MessageCircle, Search } from "lucide-react";
import { Link } from "react-router";
import { Stories } from "../components/Stories";
import { Post } from "../components/Post";
import { CreatePostCard } from "../components/CreatePostCard";

export function Home() {
  const posts = [
    {
      id: "1",
      username: "Armenam",
      avatar: "https://i.pravatar.cc/150?img=10",
      images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop"],
      likes: 128,
      caption: "Enjoying the little moments in life 🌸\nGrateful for today and excited for tomorrow ✨\n\n#GoodVibes #HappyDay #Grateful",
      comments: 24,
      timestamp: "2 hours ago",
      location: "Yerevan, Armenia",
      song: "Blinding Lights – The Weeknd",
      views: 1243,
    },
    {
      id: "2",
      username: "David",
      avatar: "https://i.pravatar.cc/150?img=12",
      images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop"],
      likes: 89,
      caption: "Coffee + Good book = Perfect evening ☕📖\nWhat's your perfect combo?",
      comments: 15,
      timestamp: "5 hours ago",
      location: "Tbilisi, Georgia",
      views: 876,
    },
    {
      id: "3",
      username: "Lusine",
      avatar: "https://i.pravatar.cc/150?img=15",
      images: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=800&fit=crop",
      ],
      likes: 234,
      caption: "Weekend adventures 🏔️✨",
      comments: 42,
      timestamp: "8 hours ago",
      song: "As It Was – Harry Styles",
      views: 2100,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-4 sticky top-0 z-40 shadow-lg" style={{ paddingTop: "calc(1rem + env(safe-area-inset-top))" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=30"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <div>
              <h2 className="text-white font-semibold text-lg">Hello, Armenam 👋</h2>
              <p className="text-white/90 text-sm">What's on your mind?</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/explore" className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
              <Search className="w-6 h-6 text-white" />
            </Link>
            <Link to="/messages" className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
              <MessageCircle className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </header>

      {/* Stories */}
      <div className="px-4 py-3">
        <Stories />
      </div>

      {/* Create Post Card */}
      <div className="px-4 pb-3">
        <CreatePostCard />
      </div>

      {/* Feed */}
      <div className="space-y-4 px-4">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      <div className="h-4" />
    </div>
  );
}
