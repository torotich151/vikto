import { Plus } from "lucide-react";
import { Link } from "react-router";

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasNewStory: boolean;
}

export function Stories() {
  const stories: Story[] = [
    { id: "yours", username: "Your Story", avatar: "https://i.pravatar.cc/150?img=30", hasNewStory: false },
    { id: "john_doe", username: "john_doe", avatar: "https://i.pravatar.cc/150?img=1", hasNewStory: true },
    { id: "jane_smith", username: "jane_smith", avatar: "https://i.pravatar.cc/150?img=2", hasNewStory: true },
    { id: "mike_wilson", username: "mike_wilson", avatar: "https://i.pravatar.cc/150?img=3", hasNewStory: true },
    { id: "sarah_jones", username: "sarah_jones", avatar: "https://i.pravatar.cc/150?img=4", hasNewStory: true },
    { id: "david_lee", username: "david_lee", avatar: "https://i.pravatar.cc/150?img=5", hasNewStory: false },
    { id: "emily_brown", username: "emily_brown", avatar: "https://i.pravatar.cc/150?img=6", hasNewStory: true },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {stories.map((story, index) => (
          <Link
            key={story.id}
            to={index === 0 ? "/create-story" : `/story/${story.username}`}
            className="flex-shrink-0 flex flex-col items-center gap-1"
          >
            <div
              className={`relative ${
                story.hasNewStory || index === 0
                  ? "p-[2px] bg-gradient-to-tr from-[#E91E63] via-[#FF5722] to-[#FFC107] rounded-full"
                  : ""
              }`}
            >
              <div className="bg-white p-[2px] rounded-full">
                <div className="relative w-16 h-16">
                  {index === 0 ? (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                      <img
                        src={story.avatar}
                        alt={story.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                        <Plus className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={story.avatar}
                      alt={story.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-700 max-w-[70px] truncate">
              {index === 0 ? "Your Story" : story.username}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
