import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, X, Image as ImageIcon, Video, Smile, MapPin, Users,
  ChevronDown, CheckCircle, Hash, Globe, Lock, UserCheck, Search, Music,
} from "lucide-react";
import { pickMultipleImages, generateVideoThumbnail } from "../services/capacitor";

const FEELINGS = [
  { emoji: "😊", label: "Happy" }, { emoji: "😢", label: "Sad" },
  { emoji: "😍", label: "In Love" }, { emoji: "🎉", label: "Celebrating" },
  { emoji: "😤", label: "Frustrated" }, { emoji: "🥳", label: "Excited" },
  { emoji: "😴", label: "Tired" }, { emoji: "🤒", label: "Sick" },
  { emoji: "💪", label: "Motivated" }, { emoji: "🙏", label: "Grateful" },
  { emoji: "😎", label: "Cool" }, { emoji: "🤔", label: "Thinking" },
];

const POST_THEMES = [
  { id: 0, name: "None", bg: "bg-white", text: "text-gray-900", gradient: "" },
  { id: 1, name: "Sunset", gradient: "linear-gradient(135deg,#E91E63,#FF5722)", text: "text-white" },
  { id: 2, name: "Ocean", gradient: "linear-gradient(135deg,#2196F3,#00BCD4)", text: "text-white" },
  { id: 3, name: "Forest", gradient: "linear-gradient(135deg,#4CAF50,#8BC34A)", text: "text-white" },
  { id: 4, name: "Purple", gradient: "linear-gradient(135deg,#9C27B0,#E91E63)", text: "text-white" },
  { id: 5, name: "Gold", gradient: "linear-gradient(135deg,#FF9800,#FFC107)", text: "text-white" },
  { id: 6, name: "Night", gradient: "linear-gradient(135deg,#1A237E,#512DA8)", text: "text-white" },
  { id: 7, name: "Rose", gradient: "linear-gradient(135deg,#EC407A,#F8BBD0)", text: "text-white" },
  { id: 8, name: "Mint", gradient: "linear-gradient(135deg,#00BFA5,#B2DFDB)", text: "text-white" },
  { id: 9, name: "Fire", gradient: "linear-gradient(135deg,#FF5722,#FFC107)", text: "text-white" },
  { id: 10, name: "Cherry", gradient: "linear-gradient(135deg,#F44336,#FF8A80)", text: "text-white" },
];

const POPULAR_LOCATIONS = [
  "New York, USA", "London, UK", "Paris, France", "Tokyo, Japan", "Los Angeles, USA",
  "Dubai, UAE", "Sydney, Australia", "Toronto, Canada", "Berlin, Germany", "Rome, Italy",
  "Barcelona, Spain", "Amsterdam, Netherlands", "Singapore", "Seoul, South Korea",
  "Istanbul, Turkey", "Cairo, Egypt", "Moscow, Russia", "Mumbai, India", "São Paulo, Brazil",
  "Mexico City, Mexico", "Lagos, Nigeria", "Nairobi, Kenya", "Addis Ababa, Ethiopia",
  "Bangkok, Thailand", "Jakarta, Indonesia", "Manila, Philippines", "Accra, Ghana",
];

const MOCK_SONGS = [
  { id: "1", title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
  { id: "2", title: "As It Was", artist: "Harry Styles", duration: "2:37" },
  { id: "3", title: "Stay", artist: "The Kid LAROI & Justin Bieber", duration: "2:21" },
  { id: "4", title: "Heat Waves", artist: "Glass Animals", duration: "3:59" },
  { id: "5", title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
  { id: "6", title: "Peaches", artist: "Justin Bieber", duration: "3:18" },
  { id: "7", title: "Save Your Tears", artist: "The Weeknd & Ariana Grande", duration: "3:36" },
  { id: "8", title: "Drivers License", artist: "Olivia Rodrigo", duration: "4:02" },
];

const MOCK_FOLLOWERS = [
  { id: "1", username: "Lusine", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", username: "David", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "3", username: "Ani", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: "4", username: "Narek", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "5", username: "Mari", avatar: "https://i.pravatar.cc/150?img=20" },
  { id: "6", username: "Sona", avatar: "https://i.pravatar.cc/150?img=25" },
  { id: "7", username: "Arman", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: "8", username: "Nare", avatar: "https://i.pravatar.cc/150?img=9" },
];

type Privacy = "public" | "friends" | "private";

export function CreatePost() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [selectedFeeling, setSelectedFeeling] = useState<{ emoji: string; label: string } | null>(null);
  const [location, setLocation] = useState<string>("");
  const [locationSearch, setLocationSearch] = useState("");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showFeelings, setShowFeelings] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(POST_THEMES[0]);
  const [privacy, setPrivacy] = useState<Privacy>("public");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [taggedPeople, setTaggedPeople] = useState<string[]>([]);
  const [showTagPeople, setShowTagPeople] = useState(false);
  const [followerSearch, setFollowerSearch] = useState("");
  const [showSongPicker, setShowSongPicker] = useState(false);
  const [selectedSong, setSelectedSong] = useState<{ title: string; artist: string } | null>(null);
  const [songSearch, setSongSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleMediaPick = async () => {
    const files = await pickMultipleImages();
    if (files.length) {
      setSelectedFiles((prev) => [...prev, ...files]);
      const types = files.map((f) => (f.includes("video") ? "video" : "image"));
      setFileTypes((prev) => [...prev, ...types]);
    }
  };

  const handlePost = async () => {
    setUploading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setUploading(false);
    navigate("/");
  };

  const canPost = caption.trim() || selectedFiles.length > 0;

  const privacyIcons: Record<Privacy, React.ReactNode> = {
    public: <Globe className="w-4 h-4" />,
    friends: <UserCheck className="w-4 h-4" />,
    private: <Lock className="w-4 h-4" />,
  };

  const filteredLocations = POPULAR_LOCATIONS.filter((l) =>
    l.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredFollowers = MOCK_FOLLOWERS.filter((f) =>
    f.username.toLowerCase().includes(followerSearch.toLowerCase())
  );

  const filteredSongs = MOCK_SONGS.filter((s) =>
    s.title.toLowerCase().includes(songSearch.toLowerCase()) ||
    s.artist.toLowerCase().includes(songSearch.toLowerCase())
  );

  const toggleTag = (username: string) => {
    setTaggedPeople((prev) =>
      prev.includes(username) ? prev.filter((u) => u !== username) : [...prev, username]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg" style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top))" }}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg">Create Post</h1>
        <button
          onClick={handlePost}
          disabled={!canPost || uploading}
          className={`font-semibold text-sm px-5 py-2 rounded-full transition-all ${canPost ? "bg-white text-[#E91E63] shadow-md" : "bg-white/20 text-white/50"}`}
        >
          {uploading ? "Posting..." : "Share"}
        </button>
      </header>

      <div className="p-4 space-y-4 pb-8">
        {/* Author + Privacy */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-start gap-3 mb-3">
            <img src="https://i.pravatar.cc/150?img=30" alt="avatar" className="w-11 h-11 rounded-full object-cover border-2 border-pink-500" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-bold text-gray-900">Armenam</span>
                {selectedFeeling && (
                  <span className="text-sm text-gray-600">is feeling {selectedFeeling.emoji} {selectedFeeling.label}</span>
                )}
                {location && (
                  <span className="text-sm text-blue-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{location}
                  </span>
                )}
                {taggedPeople.length > 0 && (
                  <span className="text-sm text-gray-600">with {taggedPeople.join(", ")}</span>
                )}
              </div>
              <button
                onClick={() => setShowPrivacy(!showPrivacy)}
                className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1"
              >
                {privacyIcons[privacy]}
                <span className="text-xs font-medium capitalize text-gray-700">{privacy}</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>
              {showPrivacy && (
                <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
                  {(["public", "friends", "private"] as Privacy[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPrivacy(p); setShowPrivacy(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 ${privacy === p ? "text-[#E91E63]" : "text-gray-700"}`}
                    >
                      {privacyIcons[p]}
                      <span className="font-medium capitalize text-sm">{p}</span>
                      {privacy === p && <CheckCircle className="w-4 h-4 ml-auto text-[#E91E63]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Song display */}
          {selectedSong && (
            <div className="flex items-center gap-2 bg-purple-50 rounded-xl px-3 py-2 mb-3">
              <Music className="w-4 h-4 text-purple-500" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-purple-700">{selectedSong.title}</p>
                <p className="text-xs text-purple-500">{selectedSong.artist}</p>
              </div>
              <button onClick={() => setSelectedSong(null)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}

          {/* Caption */}
          {selectedTheme.id === 0 ? (
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-transparent resize-none focus:outline-none text-gray-800 placeholder-gray-400 text-base"
              rows={4}
            />
          ) : (
            <div className="rounded-xl p-4 mb-2" style={{ background: selectedTheme.gradient }}>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                className={`w-full bg-transparent resize-none focus:outline-none placeholder-white/70 text-base font-semibold ${selectedTheme.text}`}
                rows={4}
              />
            </div>
          )}
        </div>

        {/* Selected Media */}
        {selectedFiles.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className={`grid gap-1 ${selectedFiles.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={file} alt={`Media ${index + 1}`} className="w-full h-full object-cover" />
                  {fileTypes[index] === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
                      setFileTypes((prev) => prev.filter((_, i) => i !== index));
                    }}
                    className="absolute top-2 right-2 bg-gray-900/70 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Action Bar */}
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
          {/* Photo/Video */}
          <button onClick={handleMediaPick} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-[#E91E63]" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800">Photo/Video</p>
              <p className="text-xs text-gray-500">Add from gallery or camera</p>
            </div>
            {selectedFiles.length > 0 && (
              <span className="bg-[#E91E63] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{selectedFiles.length}</span>
            )}
          </button>

          {/* Feeling */}
          <button onClick={() => setShowFeelings(!showFeelings)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Smile className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800">Feeling/Activity</p>
              {selectedFeeling ? (
                <p className="text-xs text-[#E91E63]">{selectedFeeling.emoji} {selectedFeeling.label}</p>
              ) : (
                <p className="text-xs text-gray-500">How are you feeling?</p>
              )}
            </div>
            {selectedFeeling && (
              <button onClick={(e) => { e.stopPropagation(); setSelectedFeeling(null); }}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </button>
          {showFeelings && (
            <div className="px-4 py-3 bg-gray-50">
              <div className="grid grid-cols-4 gap-2">
                {FEELINGS.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => { setSelectedFeeling(f); setShowFeelings(false); }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${selectedFeeling?.label === f.label ? "bg-pink-100 ring-2 ring-[#E91E63]" : "hover:bg-white"}`}
                  >
                    <span className="text-2xl">{f.emoji}</span>
                    <span className="text-xs text-gray-600">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          <button onClick={() => setShowLocationPicker(!showLocationPicker)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800">Add Location</p>
              {location ? (
                <p className="text-xs text-blue-500 truncate">{location}</p>
              ) : (
                <p className="text-xs text-gray-500">Tag your location</p>
              )}
            </div>
            {location && (
              <button onClick={(e) => { e.stopPropagation(); setLocation(""); }}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </button>
          {showLocationPicker && (
            <div className="px-4 py-3 bg-gray-50">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { setLocation(loc); setShowLocationPicker(false); setLocationSearch(""); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left hover:bg-white transition-all ${location === loc ? "bg-pink-50 text-[#E91E63]" : "text-gray-700"}`}
                  >
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-sm">{loc}</span>
                    {location === loc && <CheckCircle className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tag People */}
          <button onClick={() => setShowTagPeople(!showTagPeople)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800">Tag People</p>
              {taggedPeople.length > 0 ? (
                <p className="text-xs text-purple-500">{taggedPeople.join(", ")}</p>
              ) : (
                <p className="text-xs text-gray-500">Who are you with?</p>
              )}
            </div>
          </button>
          {showTagPeople && (
            <div className="px-4 py-3 bg-gray-50">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search followers..."
                  value={followerSearch}
                  onChange={(e) => setFollowerSearch(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredFollowers.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggleTag(f.username)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white transition-all ${taggedPeople.includes(f.username) ? "bg-pink-50" : ""}`}
                  >
                    <img src={f.avatar} alt={f.username} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-gray-800 flex-1 text-left">{f.username}</span>
                    {taggedPeople.includes(f.username) && <CheckCircle className="w-4 h-4 text-[#E91E63]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add Song */}
          <button onClick={() => setShowSongPicker(!showSongPicker)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Music className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800">Add Song</p>
              {selectedSong ? (
                <p className="text-xs text-purple-500">{selectedSong.title} – {selectedSong.artist}</p>
              ) : (
                <p className="text-xs text-gray-500">Add music to your post</p>
              )}
            </div>
            {selectedSong && (
              <button onClick={(e) => { e.stopPropagation(); setSelectedSong(null); }}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </button>
          {showSongPicker && (
            <div className="px-4 py-3 bg-gray-50">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search songs..."
                  value={songSearch}
                  onChange={(e) => setSongSearch(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredSongs.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSelectedSong({ title: s.title, artist: s.artist }); setShowSongPicker(false); setSongSearch(""); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white transition-all text-left ${selectedSong?.title === s.title ? "bg-pink-50" : ""}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Music className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{s.title}</p>
                      <p className="text-xs text-gray-500 truncate">{s.artist}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{s.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hashtags */}
          <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Hash className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800">Add Hashtags</p>
              <p className="text-xs text-gray-500">Reach more people</p>
            </div>
          </button>

          {/* Theme */}
          <button onClick={() => setShowThemes(!showThemes)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={selectedTheme.id !== 0 ? { background: selectedTheme.gradient } : { backgroundColor: "#f3f4f6" }}
            >
              <span className="text-lg">🎨</span>
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800">Post Theme</p>
              <p className="text-xs text-gray-500">{selectedTheme.name}</p>
            </div>
          </button>
          {showThemes && (
            <div className="px-4 py-3 bg-gray-50">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {POST_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => { setSelectedTheme(theme); setShowThemes(false); }}
                    className="flex-shrink-0 flex flex-col items-center gap-1"
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${selectedTheme.id === theme.id ? "ring-2 ring-[#E91E63] ring-offset-1" : ""} ${theme.id === 0 ? "bg-gray-100 border border-gray-300" : ""}`}
                      style={theme.gradient ? { background: theme.gradient } : {}}
                    />
                    <span className="text-xs text-gray-600">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
