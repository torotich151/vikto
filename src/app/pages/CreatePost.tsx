import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, X, Image as ImageIcon, Video, Smile, MapPin, Users,
  ChevronDown, CheckCircle, Hash, Globe, Lock, UserCheck, Search, Music, Sliders,
} from "lucide-react";
import { compressImages, IMAGE_THEMES } from "../utils/imageCompress";

const FEELINGS = [
  { emoji: "😊", label: "Happy" }, { emoji: "😢", label: "Sad" },
  { emoji: "😍", label: "In Love" }, { emoji: "🎉", label: "Celebrating" },
  { emoji: "😤", label: "Frustrated" }, { emoji: "🥳", label: "Excited" },
  { emoji: "😴", label: "Tired" }, { emoji: "🤒", label: "Sick" },
  { emoji: "💪", label: "Motivated" }, { emoji: "🙏", label: "Grateful" },
  { emoji: "😎", label: "Cool" }, { emoji: "🤔", label: "Thinking" },
];

const POST_THEMES = [
  { id: 0, name: "None", gradient: "" },
  { id: 1, name: "Sunset", gradient: "linear-gradient(135deg,#E91E63,#FF5722)" },
  { id: 2, name: "Ocean", gradient: "linear-gradient(135deg,#2196F3,#00BCD4)" },
  { id: 3, name: "Forest", gradient: "linear-gradient(135deg,#4CAF50,#8BC34A)" },
  { id: 4, name: "Purple", gradient: "linear-gradient(135deg,#9C27B0,#E91E63)" },
  { id: 5, name: "Gold", gradient: "linear-gradient(135deg,#FF9800,#FFC107)" },
  { id: 6, name: "Night", gradient: "linear-gradient(135deg,#1A237E,#512DA8)" },
  { id: 7, name: "Rose", gradient: "linear-gradient(135deg,#EC407A,#F8BBD0)" },
  { id: 8, name: "Mint", gradient: "linear-gradient(135deg,#00BFA5,#B2DFDB)" },
  { id: 9, name: "Fire", gradient: "linear-gradient(135deg,#FF5722,#FFC107)" },
  { id: 10, name: "Cherry", gradient: "linear-gradient(135deg,#F44336,#FF8A80)" },
];

const POPULAR_LOCATIONS = [
  "New York, USA","London, UK","Paris, France","Tokyo, Japan","Los Angeles, USA",
  "Dubai, UAE","Sydney, Australia","Toronto, Canada","Berlin, Germany","Rome, Italy",
  "Barcelona, Spain","Amsterdam, Netherlands","Singapore","Seoul, South Korea",
  "Istanbul, Turkey","Cairo, Egypt","Moscow, Russia","Mumbai, India","São Paulo, Brazil",
  "Mexico City, Mexico","Lagos, Nigeria","Yerevan, Armenia","Bangkok, Thailand","Jakarta, Indonesia",
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
const MAX_PHOTOS = 10;

export function CreatePost() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [selectedImageFilter, setSelectedImageFilter] = useState(IMAGE_THEMES[0]);
  const [selectedFeeling, setSelectedFeeling] = useState<{ emoji: string; label: string } | null>(null);
  const [location, setLocation] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showFeelings, setShowFeelings] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showImageFilters, setShowImageFilters] = useState(false);
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
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const remaining = MAX_PHOTOS - selectedFiles.length;
    if (remaining <= 0) { alert(`Maximum ${MAX_PHOTOS} photos allowed.`); return; }
    setCompressing(true);
    try {
      const compressed = await compressImages(files, remaining, { maxWidth: 1200, maxHeight: 1200, quality: 0.82 });
      setSelectedFiles((prev) => [...prev, ...compressed]);
    } catch (err) {
      console.error("Compression error:", err);
    } finally {
      setCompressing(false);
    }
    e.target.value = "";
  };

  const removePhoto = (idx: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
    if (previewIdx === idx) setPreviewIdx(null);
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

  const filteredLocations = POPULAR_LOCATIONS.filter((l) => l.toLowerCase().includes(locationSearch.toLowerCase()));
  const filteredFollowers = MOCK_FOLLOWERS.filter((f) => f.username.toLowerCase().includes(followerSearch.toLowerCase()));
  const filteredSongs = MOCK_SONGS.filter((s) => s.title.toLowerCase().includes(songSearch.toLowerCase()) || s.artist.toLowerCase().includes(songSearch.toLowerCase()));
  const toggleTag = (u: string) => setTaggedPeople((prev) => prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]);

  // Facebook-style photo grid
  const renderPhotoGrid = () => {
    const n = selectedFiles.length;
    if (n === 0) return null;
    const imgClass = "w-full h-full object-cover";
    const cellClass = "relative overflow-hidden cursor-pointer group";

    const overlay = (idx: number) => (
      <>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
        <button
          onClick={(e) => { e.stopPropagation(); removePhoto(idx); }}
          className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <span className="absolute bottom-1.5 left-1.5 bg-black/50 text-white text-[10px] font-bold rounded px-1">{idx + 1}</span>
      </>
    );

    if (n === 1) return (
      <div className={`${cellClass} aspect-[4/3]`} onClick={() => setPreviewIdx(0)}>
        <img src={selectedFiles[0]} alt="" className={imgClass} style={{ filter: selectedImageFilter.filter }} />
        {overlay(0)}
      </div>
    );
    if (n === 2) return (
      <div className="grid grid-cols-2 gap-0.5 aspect-[4/3]">
        {selectedFiles.map((src, i) => (
          <div key={i} className={cellClass} onClick={() => setPreviewIdx(i)}>
            <img src={src} alt="" className={imgClass} style={{ filter: selectedImageFilter.filter, height: "100%", objectFit: "cover" }} />
            {overlay(i)}
          </div>
        ))}
      </div>
    );
    if (n === 3) return (
      <div className="flex gap-0.5" style={{ height: 240 }}>
        <div className={`w-1/2 ${cellClass}`} onClick={() => setPreviewIdx(0)}>
          <img src={selectedFiles[0]} alt="" className={imgClass} style={{ filter: selectedImageFilter.filter }} />
          {overlay(0)}
        </div>
        <div className="flex-1 flex flex-col gap-0.5">
          {[1, 2].map((i) => (
            <div key={i} className={`flex-1 ${cellClass}`} onClick={() => setPreviewIdx(i)}>
              <img src={selectedFiles[i]} alt="" className={imgClass} style={{ filter: selectedImageFilter.filter }} />
              {overlay(i)}
            </div>
          ))}
        </div>
      </div>
    );
    if (n === 4) return (
      <div className="grid grid-cols-2 gap-0.5" style={{ height: 240 }}>
        {selectedFiles.map((src, i) => (
          <div key={i} className={cellClass} onClick={() => setPreviewIdx(i)}>
            <img src={src} alt="" className={imgClass} style={{ filter: selectedImageFilter.filter }} />
            {overlay(i)}
          </div>
        ))}
      </div>
    );
    // 5+: big left, 2 right stacked, then thumbnail strip below
    return (
      <div>
        <div className="flex gap-0.5" style={{ height: 260 }}>
          <div className={`w-1/2 ${cellClass}`} onClick={() => setPreviewIdx(0)}>
            <img src={selectedFiles[0]} alt="" className={imgClass} style={{ filter: selectedImageFilter.filter }} />
            {overlay(0)}
          </div>
          <div className="flex-1 flex flex-col gap-0.5">
            <div className={`flex-1 ${cellClass}`} onClick={() => setPreviewIdx(1)}>
              <img src={selectedFiles[1]} alt="" className={imgClass} style={{ filter: selectedImageFilter.filter }} />
              {overlay(1)}
            </div>
            <div className={`flex-1 ${cellClass}`} onClick={() => setPreviewIdx(2)}>
              <img src={selectedFiles[2]} alt="" className={imgClass} style={{ filter: selectedImageFilter.filter }} />
              {overlay(2)}
              {n > 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <p className="text-white text-2xl font-bold">+{n - 2}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Thumbnail strip */}
        <div className="flex gap-1.5 p-2 bg-gray-50 overflow-x-auto scrollbar-hide">
          {selectedFiles.map((src, i) => (
            <div key={i} className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 ${previewIdx === i ? "border-[#E91E63]" : "border-transparent"}`} onClick={() => setPreviewIdx(i)}>
              <img src={src} alt="" className="w-14 h-14 object-cover" style={{ filter: selectedImageFilter.filter }} />
              <button onClick={(e) => { e.stopPropagation(); removePhoto(i); }} className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <X className="w-2.5 h-2.5 text-white" />
              </button>
            </div>
          ))}
          {selectedFiles.length < MAX_PHOTOS && (
            <button onClick={() => fileRef.current?.click()} className="flex-shrink-0 w-14 h-14 bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center">
              <span className="text-gray-500 text-xl font-bold">+</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleFileSelect} />

      {/* Full-screen preview */}
      {previewIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setPreviewIdx(null)}>
          <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10" style={{ top: "calc(1rem + env(safe-area-inset-top))" }}>
            <X className="w-6 h-6" />
          </button>
          <img src={selectedFiles[previewIdx]} alt="" className="max-w-full max-h-full object-contain" style={{ filter: selectedImageFilter.filter }} />
          <div className="absolute bottom-4 flex gap-2" style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}>
            {selectedFiles.map((src, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setPreviewIdx(i); }}>
                <img src={src} alt="" className={`w-10 h-10 rounded-lg object-cover border-2 ${i === previewIdx ? "border-white" : "border-transparent opacity-50"}`} style={{ filter: selectedImageFilter.filter }} />
              </button>
            ))}
          </div>
        </div>
      )}

      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg" style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top))" }}>
        <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-white" /></button>
        <div className="text-center">
          <h1 className="text-white font-bold text-lg leading-none">Create Post</h1>
          {selectedFiles.length > 0 && <p className="text-white/70 text-xs">{selectedFiles.length}/{MAX_PHOTOS} photos</p>}
        </div>
        <button
          onClick={handlePost}
          disabled={!canPost || uploading || compressing}
          className={`font-bold text-sm px-5 py-2 rounded-full transition-all ${canPost ? "bg-white text-[#E91E63] shadow-md" : "bg-white/20 text-white/50"}`}
        >
          {uploading ? "Posting..." : compressing ? "Compressing..." : "Share"}
        </button>
      </header>

      <div className="p-4 space-y-3 pb-8">
        {/* Author + Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
          <div className="flex items-start gap-3 mb-3">
            <img src="https://i.pravatar.cc/150?img=30" alt="avatar" className="w-11 h-11 rounded-full object-cover border-2 border-pink-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-bold text-gray-900 dark:text-white">Armenam</span>
                {selectedFeeling && <span className="text-sm text-gray-600 dark:text-gray-300">is feeling {selectedFeeling.emoji} {selectedFeeling.label}</span>}
                {location && <span className="text-sm text-blue-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{location}</span>}
                {taggedPeople.length > 0 && <span className="text-sm text-gray-500 dark:text-gray-400 truncate">with {taggedPeople.join(", ")}</span>}
              </div>
              <div className="relative">
                <button onClick={() => setShowPrivacy(!showPrivacy)} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                  {privacyIcons[privacy]}
                  <span className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">{privacy}</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </button>
                {showPrivacy && (
                  <div className="absolute top-8 left-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl overflow-hidden z-20 w-40">
                    {(["public", "friends", "private"] as Privacy[]).map((p) => (
                      <button key={p} onClick={() => { setPrivacy(p); setShowPrivacy(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-600 ${privacy === p ? "text-[#E91E63]" : "text-gray-700 dark:text-gray-200"}`}>
                        {privacyIcons[p]}
                        <span className="font-medium capitalize text-sm">{p}</span>
                        {privacy === p && <CheckCircle className="w-4 h-4 ml-auto text-[#E91E63]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedSong && (
            <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl px-3 py-2 mb-3">
              <Music className="w-4 h-4 text-purple-500 animate-spin" style={{ animationDuration: "3s" }} />
              <div className="flex-1">
                <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">{selectedSong.title}</p>
                <p className="text-xs text-purple-500">{selectedSong.artist}</p>
              </div>
              <button onClick={() => setSelectedSong(null)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
          )}

          {selectedTheme.id === 0 ? (
            <textarea
              value={caption} onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-transparent resize-none focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 text-base"
              rows={4}
            />
          ) : (
            <div className="rounded-xl p-4 mb-2" style={{ background: selectedTheme.gradient }}>
              <textarea
                value={caption} onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-transparent resize-none focus:outline-none placeholder-white/70 text-base font-semibold text-white"
                rows={4}
              />
            </div>
          )}
        </div>

        {/* Photo Grid */}
        {selectedFiles.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            {renderPhotoGrid()}
            {compressing && (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-blue-600 dark:text-blue-400">Compressing & resizing photos...</p>
              </div>
            )}
          </div>
        )}

        {/* Image Filter Themes (only when photos selected) */}
        {selectedFiles.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <button onClick={() => setShowImageFilters(!showImageFilters)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                <Sliders className="w-5 h-5 text-[#E91E63]" />
              </div>
              <div className="text-left flex-1">
                <p className="font-medium text-gray-800 dark:text-white">Photo Filter</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedImageFilter.name}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showImageFilters ? "rotate-180" : ""}`} />
            </button>
            {showImageFilters && (
              <div className="px-3 pb-3 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide pt-2">
                  {IMAGE_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => { setSelectedImageFilter(theme); }}
                      className={`flex-shrink-0 flex flex-col items-center gap-1 group`}
                    >
                      <div className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImageFilter.id === theme.id ? "border-[#E91E63] scale-105" : "border-transparent"}`}>
                        {selectedFiles[0] ? (
                          <img src={selectedFiles[0]} alt="" className="w-full h-full object-cover" style={{ filter: theme.filter }} />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400" style={{ filter: theme.filter }} />
                        )}
                      </div>
                      <span className={`text-[10px] font-medium ${selectedImageFilter.id === theme.id ? "text-[#E91E63]" : "text-gray-500 dark:text-gray-400"}`}>{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
          {/* Photo/Video */}
          <button onClick={() => fileRef.current?.click()} disabled={selectedFiles.length >= MAX_PHOTOS} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-[#E91E63]" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800 dark:text-white">Photo / Video</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedFiles.length === 0 ? `Add up to ${MAX_PHOTOS} photos — auto-compressed` : `${selectedFiles.length}/${MAX_PHOTOS} added — tap to add more`}
              </p>
            </div>
            {selectedFiles.length > 0 && (
              <span className="bg-[#E91E63] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{selectedFiles.length}</span>
            )}
          </button>

          {/* Feeling */}
          <button onClick={() => setShowFeelings(!showFeelings)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Smile className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800 dark:text-white">Feeling / Activity</p>
              {selectedFeeling ? <p className="text-xs text-[#E91E63]">{selectedFeeling.emoji} {selectedFeeling.label}</p> : <p className="text-xs text-gray-500 dark:text-gray-400">How are you feeling?</p>}
            </div>
            {selectedFeeling && <button onClick={(e) => { e.stopPropagation(); setSelectedFeeling(null); }}><X className="w-4 h-4 text-gray-400" /></button>}
          </button>
          {showFeelings && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <div className="grid grid-cols-4 gap-2">
                {FEELINGS.map((f) => (
                  <button key={f.label} onClick={() => { setSelectedFeeling(f); setShowFeelings(false); }} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${selectedFeeling?.label === f.label ? "bg-pink-100 dark:bg-pink-900/40 ring-2 ring-[#E91E63]" : "hover:bg-white dark:hover:bg-gray-600"}`}>
                    <span className="text-2xl">{f.emoji}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          <button onClick={() => setShowLocationPicker(!showLocationPicker)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800 dark:text-white">Add Location</p>
              {location ? <p className="text-xs text-blue-500 truncate">{location}</p> : <p className="text-xs text-gray-500 dark:text-gray-400">Tag your location</p>}
            </div>
            {location && <button onClick={(e) => { e.stopPropagation(); setLocation(""); }}><X className="w-4 h-4 text-gray-400" /></button>}
          </button>
          {showLocationPicker && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search location..." value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} className="w-full bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white" />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredLocations.map((loc) => (
                  <button key={loc} onClick={() => { setLocation(loc); setShowLocationPicker(false); setLocationSearch(""); }} className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left hover:bg-white dark:hover:bg-gray-600 ${location === loc ? "text-[#E91E63]" : "text-gray-700 dark:text-gray-300"}`}>
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-sm">{loc}</span>
                    {location === loc && <CheckCircle className="w-4 h-4 ml-auto text-[#E91E63]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tag People */}
          <button onClick={() => setShowTagPeople(!showTagPeople)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800 dark:text-white">Tag People</p>
              {taggedPeople.length > 0 ? <p className="text-xs text-purple-500">{taggedPeople.join(", ")}</p> : <p className="text-xs text-gray-500 dark:text-gray-400">Who are you with?</p>}
            </div>
          </button>
          {showTagPeople && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search followers..." value={followerSearch} onChange={(e) => setFollowerSearch(e.target.value)} className="w-full bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white" />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredFollowers.map((f) => (
                  <button key={f.id} onClick={() => toggleTag(f.username)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white dark:hover:bg-gray-600 ${taggedPeople.includes(f.username) ? "bg-pink-50 dark:bg-pink-900/20" : ""}`}>
                    <img src={f.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-gray-800 dark:text-white flex-1 text-left">{f.username}</span>
                    {taggedPeople.includes(f.username) && <CheckCircle className="w-4 h-4 text-[#E91E63]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Song */}
          <button onClick={() => setShowSongPicker(!showSongPicker)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Music className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800 dark:text-white">Add Song</p>
              {selectedSong ? <p className="text-xs text-purple-500">{selectedSong.title} – {selectedSong.artist}</p> : <p className="text-xs text-gray-500 dark:text-gray-400">Add music to your post</p>}
            </div>
            {selectedSong && <button onClick={(e) => { e.stopPropagation(); setSelectedSong(null); }}><X className="w-4 h-4 text-gray-400" /></button>}
          </button>
          {showSongPicker && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search songs..." value={songSearch} onChange={(e) => setSongSearch(e.target.value)} className="w-full bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white" />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredSongs.map((s) => (
                  <button key={s.id} onClick={() => { setSelectedSong({ title: s.title, artist: s.artist }); setShowSongPicker(false); setSongSearch(""); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white dark:hover:bg-gray-600 text-left ${selectedSong?.title === s.title ? "bg-pink-50 dark:bg-pink-900/20" : ""}`}>
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0"><Music className="w-4 h-4 text-purple-500" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{s.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{s.artist}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{s.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hashtags */}
          <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Hash className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800 dark:text-white">Add Hashtags</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Reach more people</p>
            </div>
          </button>

          {/* Post Theme */}
          <button onClick={() => setShowThemes(!showThemes)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={selectedTheme.id !== 0 ? { background: selectedTheme.gradient } : { backgroundColor: "#f3f4f6" }}>
              <span className="text-lg">🎨</span>
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-gray-800 dark:text-white">Post Theme</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{selectedTheme.name}</p>
            </div>
          </button>
          {showThemes && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {POST_THEMES.map((theme) => (
                  <button key={theme.id} onClick={() => { setSelectedTheme(theme); setShowThemes(false); }} className={`flex-shrink-0 flex flex-col items-center gap-1`}>
                    <div className={`w-12 h-12 rounded-full border-3 border-2 transition-all ${selectedTheme.id === theme.id ? "border-[#E91E63] scale-110 shadow-lg" : "border-gray-200 dark:border-gray-600"} ${!theme.gradient ? "bg-white dark:bg-gray-600" : ""}`} style={theme.gradient ? { background: theme.gradient } : {}}>
                      {selectedTheme.id === theme.id && <CheckCircle className="w-4 h-4 text-white m-auto" style={{ marginTop: 10 }} />}
                    </div>
                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{theme.name}</span>
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
