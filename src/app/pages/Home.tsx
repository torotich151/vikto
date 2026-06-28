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
    {
      id: "4",
      username: "Narek",
      avatar: "https://i.pravatar.cc/150?img=3",
      images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop"],
      likes: 312,
      caption: "Morning run done 💪 Nothing beats the feeling after a great workout!\n\n#Fitness #MorningRun #HealthyLife",
      comments: 31,
      timestamp: "11 hours ago",
      views: 1580,
    },
    {
      id: "5",
      username: "Ani",
      avatar: "https://i.pravatar.cc/150?img=20",
      images: ["https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=800&fit=crop"],
      likes: 175,
      caption: "Home-cooked pasta night 🍝 Simple ingredients, big flavors!",
      comments: 19,
      timestamp: "Yesterday",
      location: "Yerevan, Armenia",
      views: 932,
    },
  ];

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-950 min-h-full">
      {/* ── Sticky top section: header + stories + create card ── */}
      <div className="sticky top-0 z-40 flex-shrink-0">
        {/* Header */}
        <header
          className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 pt-4 pb-3 shadow-md"
          style={{ paddingTop: "calc(1rem + env(safe-area-inset-top))" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=30"
                alt="Profile"
                className="w-11 h-11 rounded-full border-2 border-white object-cover"
              />
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">Hello, Armenam 👋</h2>
                <p className="text-white/80 text-sm">What's on your mind?</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/explore" className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full">
                <Search className="w-5 h-5 text-white" />
              </Link>
              <Link to="/messages" className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full">
                <MessageCircle className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </header>

        {/* Stories strip */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3">
          <Stories />
        </div>

        {/* Create post card */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3">
          <CreatePostCard />
        </div>
      </div>

      {/* ── Scrollable posts feed ── */}
      <div className="flex-1 space-y-3 pt-3 px-0 pb-4">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
        <div className="h-2" />
      </div>
    </div>
  );
}
