import { useState } from "react";
import { useNavigate } from "react-router";
import { X, Type, Smile, Image as ImageIcon, Video, Music, Palette, AlignLeft, AlignCenter, AlignRight, Search, Play, Users, Eye } from "lucide-react";

const STORY_THEMES = [
  { id: 1, name: "Sunset", gradient: "linear-gradient(135deg, #E91E63, #FF5722)" },
  { id: 2, name: "Ocean", gradient: "linear-gradient(135deg, #2196F3, #00BCD4)" },
  { id: 3, name: "Purple Dream", gradient: "linear-gradient(135deg, #9C27B0, #E91E63)" },
  { id: 4, name: "Fire", gradient: "linear-gradient(135deg, #FF5722, #FFC107)" },
  { id: 5, name: "Forest", gradient: "linear-gradient(135deg, #4CAF50, #8BC34A)" },
  { id: 6, name: "Autumn", gradient: "linear-gradient(135deg, #FF9800, #FF5722)" },
  { id: 7, name: "Night Sky", gradient: "linear-gradient(135deg, #1A237E, #512DA8)" },
  { id: 8, name: "Cherry Blossom", gradient: "linear-gradient(135deg, #F48FB1, #FCE4EC)" },
  { id: 9, name: "Mint", gradient: "linear-gradient(135deg, #00BFA5, #B2DFDB)" },
  { id: 10, name: "Peach", gradient: "linear-gradient(135deg, #FFAB91, #FFE0B2)" },
  { id: 11, name: "Lavender", gradient: "linear-gradient(135deg, #7E57C2, #B39DDB)" },
  { id: 12, name: "Rose Gold", gradient: "linear-gradient(135deg, #EC407A, #F8BBD0)" },
];

const TEXT_COLORS = [
  "#FFFFFF", "#000000", "#E91E63", "#9C27B0", "#2196F3",
  "#4CAF50", "#FFC107", "#FF5722", "#795548", "#607D8B"
];

const FONT_FAMILIES = [
  "Arial", "Georgia", "Courier New", "Comic Sans MS", "Impact",
  "Times New Roman", "Verdana", "Trebuchet MS", "Brush Script MT", "Lucida Console"
];

const STORY_SONGS = [
  { id: "1", title: "Blinding Lights", artist: "The Weeknd", emoji: "🎵" },
  { id: "2", title: "As It Was", artist: "Harry Styles", emoji: "🎶" },
  { id: "3", title: "Stay", artist: "The Kid LAROI", emoji: "🎵" },
  { id: "4", title: "Heat Waves", artist: "Glass Animals", emoji: "🎶" },
  { id: "5", title: "Levitating", artist: "Dua Lipa", emoji: "🎵" },
  { id: "6", title: "Peaches", artist: "Justin Bieber", emoji: "🎶" },
  { id: "7", title: "Save Your Tears", artist: "The Weeknd", emoji: "🎵" },
  { id: "8", title: "Drivers License", artist: "Olivia Rodrigo", emoji: "🎶" },
  { id: "9", title: "Industry Baby", artist: "Lil Nas X", emoji: "🎵" },
  { id: "10", title: "Easy On Me", artist: "Adele", emoji: "🎶" },
];

const AUDIENCE_OPTIONS = [
  { id: "everyone", label: "Everyone", icon: <Eye className="w-4 h-4" /> },
  { id: "friends", label: "Friends", icon: <Users className="w-4 h-4" /> },
  { id: "close", label: "Close Friends", icon: <Users className="w-4 h-4" /> },
];

export function CreateStory() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [storyText, setStoryText] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(STORY_THEMES[0]);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("center");
  const [showTextTools, setShowTextTools] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [showSongPicker, setShowSongPicker] = useState(false);
  const [showAudiencePicker, setShowAudiencePicker] = useState(false);
  const [selectedSong, setSelectedSong] = useState<{ title: string; artist: string } | null>(null);
  const [songSearch, setSongSearch] = useState("");
  const [audience, setAudience] = useState("everyone");

  const filteredSongs = STORY_SONGS.filter((s) =>
    s.title.toLowerCase().includes(songSearch.toLowerCase()) ||
    s.artist.toLowerCase().includes(songSearch.toLowerCase())
  );

  const handleImageSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleVideoSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    };
    input.click();
  };

  const handlePost = () => {
    navigate("/");
  };

  const currentAudience = AUDIENCE_OPTIONS.find((a) => a.id === audience)!;

  return (
    <div className="fixed inset-0 bg-black z-50" style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="relative w-full max-w-[480px] h-full mx-auto">
        {/* Story Preview */}
        <div
          className="w-full h-full flex items-center justify-center p-8"
          style={{
            background: selectedImage ? `url(${selectedImage})` : selectedTheme.gradient,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {storyText && (
            <div
              className="w-full absolute"
              style={{ textAlign: textAlign, top: selectedImage ? undefined : "50%", transform: selectedImage ? undefined : "translateY(-50%)", bottom: selectedImage ? "35%" : undefined, left: "1rem", right: "1rem" }}
            >
              <p
                className="text-4xl font-bold break-words"
                style={{ color: textColor, fontFamily, textShadow: "2px 2px 4px rgba(0,0,0,0.4)" }}
              >
                {storyText}
              </p>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
          <button onClick={() => navigate(-1)} className="text-white">
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold text-lg">Create Story</h1>
          {/* Audience */}
          <button
            onClick={() => setShowAudiencePicker(true)}
            className="flex items-center gap-1 bg-black/40 rounded-full px-3 py-1.5 text-white"
          >
            {currentAudience.icon}
            <span className="text-xs font-medium">{currentAudience.label}</span>
          </button>
        </div>

        {/* Song display on story */}
        {selectedSong && (
          <div className="absolute top-16 left-4 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1.5">
            <Music className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-white text-xs font-medium">{selectedSong.title} – {selectedSong.artist}</span>
          </div>
        )}

        {/* Right Tool Panel */}
        <div className="absolute top-20 right-4 flex flex-col gap-3">
          <button
            onClick={() => { setShowTextTools(!showTextTools); setShowColorPicker(false); setShowFontPicker(false); }}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            <Type className="w-6 h-6" />
          </button>
          <button
            onClick={() => { setShowColorPicker(!showColorPicker); setShowTextTools(false); setShowFontPicker(false); }}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            <Palette className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <Smile className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowSongPicker(true)}
            className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center text-white ${selectedSong ? "bg-purple-500/70" : "bg-white/20"}`}
          >
            <Music className="w-6 h-6" />
          </button>
        </div>

        {/* Text Alignment */}
        {showTextTools && (
          <div className="absolute top-20 right-20 bg-black/80 backdrop-blur-sm rounded-2xl p-3 flex flex-col gap-2">
            {[{ align: "left" as const, Icon: AlignLeft }, { align: "center" as const, Icon: AlignCenter }, { align: "right" as const, Icon: AlignRight }].map(({ align, Icon }) => (
              <button key={align} onClick={() => setTextAlign(align)} className={`p-2 rounded-lg ${textAlign === align ? "bg-white/20" : ""}`}>
                <Icon className="w-5 h-5 text-white" />
              </button>
            ))}
          </div>
        )}

        {/* Color Picker */}
        {showColorPicker && (
          <div className="absolute top-40 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4">
            <div className="grid grid-cols-5 gap-2">
              {TEXT_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setTextColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${textColor === color ? "border-white" : "border-transparent"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Song Picker Modal */}
        {showSongPicker && (
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl z-20 modal-enter" style={{ maxHeight: "70vh" }}>
            <div className="sticky top-0 bg-white px-4 pt-4 pb-3">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Add Music</h3>
                <button onClick={() => setShowSongPicker(false)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search songs..."
                  value={songSearch}
                  onChange={(e) => setSongSearch(e.target.value)}
                  className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="overflow-y-auto px-4 pb-6">
              {filteredSongs.map((song) => (
                <button
                  key={song.id}
                  onClick={() => { setSelectedSong({ title: song.title, artist: song.artist }); setShowSongPicker(false); setSongSearch(""); }}
                  className={`w-full flex items-center gap-3 py-3 border-b border-gray-50 text-left ${selectedSong?.title === song.title ? "bg-purple-50 -mx-4 px-4" : ""}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-lg">
                    {song.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{song.title}</p>
                    <p className="text-xs text-gray-500">{song.artist}</p>
                  </div>
                  <Play className="w-4 h-4 text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Audience Picker Modal */}
        {showAudiencePicker && (
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl z-20 p-6 modal-enter">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-4">Story Audience</h3>
            {AUDIENCE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setAudience(opt.id); setShowAudiencePicker(false); }}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl mb-2 transition-all ${audience === opt.id ? "bg-pink-50 ring-2 ring-[#E91E63]" : "bg-gray-50"}`}
              >
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#E91E63]">
                  {opt.icon}
                </div>
                <span className="font-medium text-gray-800">{opt.label}</span>
                {audience === opt.id && <div className="ml-auto w-4 h-4 rounded-full bg-[#E91E63]" />}
              </button>
            ))}
            <button onClick={() => setShowAudiencePicker(false)} className="w-full mt-2 py-3 rounded-2xl bg-gray-100 text-gray-600 font-medium">
              Cancel
            </button>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          {!selectedImage && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Type something..."
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 rounded-full px-6 py-3 text-center text-lg font-semibold focus:outline-none"
                  style={{ fontFamily }}
                />
              </div>
              <div className="mb-4">
                <button
                  onClick={() => { setShowFontPicker(!showFontPicker); setShowTextTools(false); setShowColorPicker(false); }}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full px-4 py-2 text-sm"
                >
                  Font: {fontFamily}
                </button>
                {showFontPicker && (
                  <div className="mt-2 bg-black/80 backdrop-blur-sm rounded-2xl max-h-48 overflow-y-auto">
                    {FONT_FAMILIES.map((font) => (
                      <button
                        key={font}
                        onClick={() => { setFontFamily(font); setShowFontPicker(false); }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-white/10"
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
                {STORY_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`w-12 h-12 rounded-full flex-shrink-0 border-2 ${selectedTheme.id === theme.id ? "border-white" : "border-transparent"}`}
                    style={{ background: theme.gradient }}
                  />
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleImageSelect}
              className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-5 h-5" />
              Photo
            </button>
            <button
              onClick={handleVideoSelect}
              className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5" />
              Video
            </button>
          </div>

          <button
            onClick={handlePost}
            disabled={!selectedImage && !storyText.trim()}
            className={`w-full mt-3 font-bold py-3.5 rounded-full ${selectedImage || storyText.trim() ? "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white" : "bg-white/10 text-white/40"}`}
          >
            Share to Story
          </button>
        </div>
      </div>
    </div>
  );
}
