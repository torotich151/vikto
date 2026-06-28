import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft, Phone, Video, MoreVertical, Image, Smile,
  Send, Mic, X, Play, Paperclip, Camera, Copy, Check,
  Palette, MapPin, Music, FileVideo, ChevronLeft, ChevronRight,
  CornerUpLeft, Forward, Star, Undo2, Trash2, Heart, ThumbsUp,
  Laugh, Frown, Angry, Meh,
} from "lucide-react";
import { CallingModal } from "../components/CallingModal";
import { ForwardModal } from "../components/ForwardModal";
import { compressImages } from "../utils/imageCompress";

const INBOX_THEMES = [
  { id: "default", name: "Default", class: "bg-gray-50", preview: "#f9fafb" },
  { id: "ocean", name: "Ocean", class: "theme-ocean", preview: "#0077b6" },
  { id: "forest", name: "Forest", class: "theme-forest", preview: "#2d6a4f" },
  { id: "house", name: "House", class: "theme-house", preview: "#e76f51" },
  { id: "aurora", name: "Aurora", class: "theme-aurora", preview: "#7209b7" },
  { id: "desert", name: "Desert", class: "theme-desert", preview: "#d4a373" },
  { id: "space", name: "Space", class: "theme-space", preview: "#03045e" },
  { id: "cherry", name: "Cherry", class: "theme-cherry", preview: "#ff006e" },
  { id: "winter", name: "Winter", class: "theme-winter", preview: "#90e0ef" },
  { id: "lavender", name: "Lavender", class: "theme-lavender", preview: "#9d4edd" },
  { id: "volcano", name: "Volcano", class: "theme-volcano", preview: "#9d0208" },
];

interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  imageUrls?: string[];
  videoUrl?: string;
  audioUrl?: string;
  audioDuration?: number;
  timestamp: string;
  isSent: boolean;
  status?: "sent" | "delivered" | "read";
  replyTo?: { id: string; text?: string; isSent: boolean };
}

const MAX_INBOX_PHOTOS = 5;

function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const phoneRegex = /(\+?[\d\s\-().]{7,})/g;
  const otpRegex = /\b(\d{4,8})\b/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const combined = text.replace(urlRegex, (match, p1, offset) => `\0URL\0${offset}\0${p1}\0`);

  if (combined === text) {
    // No URLs, check email/phone
    const tokens = text.split(/(\s+)/);
    return tokens.map((token, i) => {
      if (emailRegex.test(token)) {
        emailRegex.lastIndex = 0;
        return <a key={i} href={`mailto:${token}`} className="text-blue-400 underline">{token}</a>;
      }
      if (/^\+?[\d\s\-().]{7,}$/.test(token.trim()) && /\d{7,}/.test(token)) {
        return <a key={i} href={`tel:${token.replace(/\s/g, "")}`} className="text-green-400 underline">{token}</a>;
      }
      return token;
    });
  }
  return text;
}

function AutolinkText({ text, isSent }: { text: string; isSent: boolean }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const phoneRegex = /(\+?1?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/g;
  const otpRegex = /\b(\d{4,8})\b/g;

  const linkColor = isSent ? "text-white underline opacity-90" : "text-blue-500 underline";
  const otpColor = isSent ? "bg-white/20 text-white font-mono" : "bg-pink-50 text-[#E91E63] font-mono";

  let processed = text;
  const elements: React.ReactNode[] = [];

  const allMatches: Array<{ start: number; end: number; node: React.ReactNode }> = [];

  let match;
  urlRegex.lastIndex = 0;
  while ((match = urlRegex.exec(processed)) !== null) {
    allMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      node: <a key={`url-${match.index}`} href={match[1]} target="_blank" rel="noopener noreferrer" className={linkColor}>{match[1]}</a>,
    });
  }
  emailRegex.lastIndex = 0;
  while ((match = emailRegex.exec(processed)) !== null) {
    if (!allMatches.find((m) => m.start <= match!.index && m.end >= match!.index + match![0].length)) {
      allMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        node: <a key={`email-${match.index}`} href={`mailto:${match[1]}`} className={linkColor}>{match[1]}</a>,
      });
    }
  }
  phoneRegex.lastIndex = 0;
  while ((match = phoneRegex.exec(processed)) !== null) {
    if (!allMatches.find((m) => m.start <= match!.index && m.end >= match!.index + match![0].length)) {
      allMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        node: <a key={`phone-${match.index}`} href={`tel:${match[1].replace(/\D/g, "")}`} className={linkColor}>{match[1]}</a>,
      });
    }
  }

  allMatches.sort((a, b) => a.start - b.start);

  let last = 0;
  allMatches.forEach((m) => {
    if (m.start > last) {
      // Check for OTP in plain text
      const plain = processed.slice(last, m.start);
      otpRegex.lastIndex = 0;
      let otpMatch;
      let otpLast = 0;
      while ((otpMatch = otpRegex.exec(plain)) !== null) {
        if (otpMatch.index > otpLast) {
          elements.push(<span key={`txt-${last + otpLast}`}>{plain.slice(otpLast, otpMatch.index)}</span>);
        }
        elements.push(
          <OTPChip key={`otp-${last + otpMatch.index}`} code={otpMatch[1]} className={otpColor} />
        );
        otpLast = otpMatch.index + otpMatch[0].length;
      }
      if (otpLast < plain.length) {
        elements.push(<span key={`txt-end-${last}`}>{plain.slice(otpLast)}</span>);
      }
    }
    elements.push(m.node);
    last = m.end;
  });

  if (last < processed.length) {
    const plain = processed.slice(last);
    otpRegex.lastIndex = 0;
    let otpMatch;
    let otpLast = 0;
    while ((otpMatch = otpRegex.exec(plain)) !== null) {
      if (otpMatch.index > otpLast) {
        elements.push(<span key={`txt2-${last + otpLast}`}>{plain.slice(otpLast, otpMatch.index)}</span>);
      }
      elements.push(
        <OTPChip key={`otp2-${last + otpMatch.index}`} code={otpMatch[1]} className={otpColor} />
      );
      otpLast = otpMatch.index + otpMatch[0].length;
    }
    if (otpLast < plain.length) {
      elements.push(<span key={`txt2-end-${last}`}>{plain.slice(otpLast)}</span>);
    }
  }

  return <p className="text-sm leading-relaxed">{elements.length > 0 ? elements : text}</p>;
}

function OTPChip({ code, className }: { code: string; className: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs ${className}`}>
      <span className="tracking-widest font-bold">{code}</span>
      <button onClick={handleCopy} className="ml-1">
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      </button>
    </span>
  );
}

function BulkImageBubble({ images, isSent, onPreview }: { images: string[]; isSent: boolean; onPreview: (url: string) => void }) {
  const [current, setCurrent] = useState(0);
  const n = images.length;
  return (
    <div className={`rounded-2xl overflow-hidden shadow-sm ${isSent ? "rounded-br-sm" : "rounded-bl-sm"}`} style={{ maxWidth: 220 }}>
      <div className="relative cursor-pointer" onClick={() => onPreview(images[current])}>
        <img src={images[current]} alt="shared" className="w-full object-cover" style={{ maxHeight: 220 }} />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold rounded-full px-2 py-0.5">{current + 1}/{n}</div>
      </div>
      <div className="flex gap-1 p-1.5 bg-black/10">
        {images.map((src, i) => (
          <button key={i} onClick={() => setCurrent(i)}>
            <img src={src} alt="" className={`w-8 h-8 rounded-lg object-cover border-2 ${i === current ? "border-white" : "border-transparent opacity-60"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Chat() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hey! How are you doing?", timestamp: "10:30 AM", isSent: false },
    { id: "2", text: "I'm doing great! Thanks for asking 😊", timestamp: "10:32 AM", isSent: true, status: "read" },
    { id: "3", text: "That's awesome! Did you see my new post?", timestamp: "10:33 AM", isSent: false },
    { id: "4", text: "Yes! It looks amazing. Where was that taken?", timestamp: "10:35 AM", isSent: true, status: "read" },
    { id: "5", text: "Montenegro! It's so beautiful there 🌅 Call me at +1 (555) 123-4567 or email me at hello@example.com. Your OTP is 847291", timestamp: "10:36 AM", isSent: false },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(INBOX_THEMES[0]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [callModal, setCallModal] = useState<"audio" | "video" | null>(null);
  const [previewMedia, setPreviewMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [msgMenu, setMsgMenu] = useState<{ msg: Message; y: number } | null>(null);
  const [swipeOffsets, setSwipeOffsets] = useState<Record<string, number>>({});
  const [forwardMsg, setForwardMsg] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const msgTouchStartX = useRef<Record<string, number>>({});
  const longPressTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMedia = async (accept: string, multiple = false) => {
    setShowAttachMenu(false);
    return new Promise<void>((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept;
      input.multiple = multiple;
      input.onchange = async () => {
        const files = input.files;
        if (!files || files.length === 0) return resolve();
        const isVideo = files[0].type.startsWith("video/");
        if (isVideo) {
          // Single video, no compress
          if (files[0].size > 50 * 1024 * 1024) { alert("Video too large. Max 50MB."); return resolve(); }
          const reader = new FileReader();
          reader.onload = () => {
            setMessages((prev) => [...prev, { id: Date.now().toString(), videoUrl: reader.result as string, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isSent: true, status: "sent" }]);
            resolve();
          };
          reader.readAsDataURL(files[0]);
        } else {
          // Images: compress + bulk (max 5)
          try {
            const compressed = await compressImages(files, MAX_INBOX_PHOTOS, { maxWidth: 900, maxHeight: 900, quality: 0.78 });
            if (compressed.length === 1) {
              setMessages((prev) => [...prev, { id: Date.now().toString(), imageUrl: compressed[0], timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isSent: true, status: "sent" }]);
            } else {
              setMessages((prev) => [...prev, { id: Date.now().toString(), imageUrls: compressed, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isSent: true, status: "sent" }]);
            }
          } catch { alert("Failed to process images."); }
          resolve();
        }
      };
      input.click();
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        const msg: Message = {
          id: Date.now().toString(),
          audioUrl: url,
          audioDuration: recordingSeconds,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSent: true,
          status: "sent",
        };
        setMessages((prev) => [...prev, msg]);
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimer.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } catch {
      alert("Microphone permission denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
      recordingTimer.current = null;
    }
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  const formatDuration = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleMessageLongPress = (msg: Message, e: React.TouchEvent | React.MouseEvent) => {
    if (navigator.vibrate) navigator.vibrate(35);
    const el = (e.target as HTMLElement).closest('[data-msgid]');
    const rect = el?.getBoundingClientRect();
    const y = rect ? Math.min(rect.top - 10, window.innerHeight - 300) : 200;
    setMsgMenu({ msg, y: Math.max(60, y) });
  };

  const handleCopySelected = () => {
    const texts = messages
      .filter((m) => selectedMessages.includes(m.id) && m.text)
      .map((m) => m.text)
      .join("\n");
    navigator.clipboard.writeText(texts).catch(() => {});
    setSelectionMode(false);
    setSelectedMessages([]);
  };

  const handleMsgTouchStart = (msgId: string, e: React.TouchEvent) => {
    msgTouchStartX.current[msgId] = e.changedTouches[0].clientX;
    const msg = messages.find(m => m.id === msgId)!;
    longPressTimers.current[msgId] = setTimeout(() => handleMessageLongPress(msg, e), 500);
  };

  const handleMsgTouchMove = (msgId: string, e: React.TouchEvent) => {
    clearTimeout(longPressTimers.current[msgId]);
    const diff = e.changedTouches[0].clientX - (msgTouchStartX.current[msgId] || 0);
    if (diff > 0 && diff < 80) {
      setSwipeOffsets(prev => ({ ...prev, [msgId]: diff }));
    }
  };

  const handleMsgTouchEnd = (msgId: string, e: React.TouchEvent) => {
    clearTimeout(longPressTimers.current[msgId]);
    const diff = e.changedTouches[0].clientX - (msgTouchStartX.current[msgId] || 0);
    if (diff > 50) {
      const msg = messages.find(m => m.id === msgId);
      if (msg) { setReplyTo(msg); if (navigator.vibrate) navigator.vibrate(20); }
    }
    setSwipeOffsets(prev => ({ ...prev, [msgId]: 0 }));
  };

  const doDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    setMsgMenu(null);
  };

  const doUnsendMessage = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, text: "You unsent a message", imageUrl: undefined, imageUrls: undefined, videoUrl: undefined, audioUrl: undefined } : m));
    setMsgMenu(null);
  };

  const doCopyMessage = (text?: string) => {
    if (text) navigator.clipboard.writeText(text).catch(() => {});
    setMsgMenu(null);
  };

  const themeIsLight = selectedTheme.id === "default" || selectedTheme.id === "desert" || selectedTheme.id === "winter";

  const handleSend = () => {
    if (!messageText.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: messageText,
      replyTo: replyTo ? { id: replyTo.id, text: replyTo.text, isSent: replyTo.isSent } : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSent: true,
      status: "sent",
    };
    setMessages((prev) => [...prev, msg]);
    setMessageText("");
    setReplyTo(null);
  };

  return (
    <div className="h-screen flex flex-col max-w-[480px] mx-auto" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} onClick={() => setMsgMenu(null)}>
      {/* Calling modal */}
      {callModal && (
        <CallingModal
          type={callModal}
          username="Lusine"
          avatar="https://i.pravatar.cc/150?img=1"
          onClose={() => setCallModal(null)}
        />
      )}

      {/* Full-screen media preview */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setPreviewMedia(null)}>
          <button className="absolute top-4 right-4 text-white z-10 p-2 bg-black/40 rounded-full">
            <X className="w-6 h-6" />
          </button>
          {previewMedia.type === "image" ? (
            <img src={previewMedia.url} alt="" className="max-w-full max-h-full object-contain" />
          ) : (
            <video src={previewMedia.url} controls className="max-w-full max-h-full" autoPlay />
          )}
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center justify-between shadow-lg flex-shrink-0 z-10">
        {selectionMode ? (
          <>
            <button onClick={() => { setSelectionMode(false); setSelectedMessages([]); }} className="text-white">
              <X className="w-6 h-6" />
            </button>
            <span className="text-white font-semibold">{selectedMessages.length} selected</span>
            <button onClick={handleCopySelected} className="text-white">
              <Copy className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)}>
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="relative">
                <img src="https://i.pravatar.cc/150?img=1" alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 className="font-bold text-white">Lusine</h2>
                <p className="text-xs text-white/80">Active now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-white p-1" onClick={() => setCallModal("audio")}>
                <Phone className="w-5 h-5" />
              </button>
              <button className="text-white p-1" onClick={() => setCallModal("video")}>
                <Video className="w-5 h-5" />
              </button>
              <div className="relative">
                <button className="text-white p-1" onClick={() => setShowMoreMenu(!showMoreMenu)}>
                  <MoreVertical className="w-5 h-5" />
                </button>
                {showMoreMenu && (
                  <div className="absolute right-0 top-8 bg-white rounded-xl shadow-xl py-2 w-48 z-20">
                    <button
                      onClick={() => { setShowThemeMenu(true); setShowMoreMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                    >
                      <Palette className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">Change Theme</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Send Location</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </header>

      {/* Theme Picker Modal */}
      {showThemeMenu && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end" onClick={() => setShowThemeMenu(false)}>
          <div className="w-full max-w-[480px] mx-auto bg-white rounded-t-3xl p-6 modal-enter" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 text-lg mb-4">Chat Theme</h3>
            <div className="grid grid-cols-4 gap-3">
              {INBOX_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => { setSelectedTheme(theme); setShowThemeMenu(false); }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${theme.class} border-4 ${selectedTheme.id === theme.id ? "border-[#E91E63]" : "border-transparent"} shadow-sm`}
                  />
                  <span className="text-xs text-gray-600 text-center">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Forward modal */}
      {forwardMsg && (
        <ForwardModal
          messageText={forwardMsg.text}
          onClose={() => setForwardMsg(null)}
        />
      )}

      {/* Message long-press context menu */}
      {msgMenu && (
        <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setMsgMenu(null)}>
          <div
            className="absolute bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-60"
            style={{ top: msgMenu.y, left: "50%", transform: "translateX(-50%)" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Reaction row — lucide icons */}
            <div className="flex items-center justify-around px-3 py-3 border-b border-gray-100 dark:border-gray-700">
              {[
                { Icon: Heart, color: "text-red-500" },
                { Icon: ThumbsUp, color: "text-blue-500" },
                { Icon: Laugh, color: "text-yellow-500" },
                { Icon: Meh, color: "text-orange-400" },
                { Icon: Frown, color: "text-indigo-400" },
                { Icon: Angry, color: "text-red-600" },
              ].map(({ Icon, color }) => (
                <button key={color} onClick={() => setMsgMenu(null)}
                  className={`p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-125 ${color}`}>
                  <Icon className="w-5 h-5" fill="currentColor" />
                </button>
              ))}
            </div>
            {[
              { Icon: CornerUpLeft, label: "Reply", action: () => { setReplyTo(msgMenu.msg); setMsgMenu(null); }, danger: false },
              { Icon: Copy, label: "Copy", action: () => doCopyMessage(msgMenu.msg.text), danger: false, show: !!msgMenu.msg.text },
              { Icon: Forward, label: "Forward", action: () => { setForwardMsg(msgMenu.msg); setMsgMenu(null); }, danger: false },
              { Icon: Star, label: "Star", action: () => setMsgMenu(null), danger: false },
              ...(msgMenu.msg.isSent ? [{ Icon: Undo2, label: "Unsend", action: () => doUnsendMessage(msgMenu.msg.id), danger: true }] : []),
              { Icon: Trash2, label: "Delete", action: () => doDeleteMessage(msgMenu.msg.id), danger: true },
            ].filter(item => item.show !== false).map(item => (
              <button key={item.label} onClick={item.action}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-100 dark:border-gray-700 first:border-0 ${item.danger ? "text-red-500" : "text-gray-700 dark:text-gray-200"}`}>
                <item.Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto px-4 py-4 space-y-1 ${selectedTheme.class}`}
        style={{ minHeight: 0 }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            data-msgid={msg.id}
            className={`flex ${msg.isSent ? "justify-end" : "justify-start"} py-1 transition-transform`}
            style={{ transform: `translateX(${swipeOffsets[msg.id] || 0}px)` }}
            onTouchStart={e => handleMsgTouchStart(msg.id, e)}
            onTouchMove={e => handleMsgTouchMove(msg.id, e)}
            onTouchEnd={e => handleMsgTouchEnd(msg.id, e)}
            onContextMenu={(e) => { e.preventDefault(); handleMessageLongPress(msg, e); }}
            onClick={() => {
              if (selectionMode) {
                setSelectedMessages(prev => prev.includes(msg.id) ? prev.filter(id => id !== msg.id) : [...prev, msg.id]);
              }
            }}
          >
            {/* Reply arrow hint on swipe */}
            {!msg.isSent && (swipeOffsets[msg.id] || 0) > 20 && (
              <div className="flex items-center justify-center w-7 text-gray-400 mr-1"><span className="text-lg">↩️</span></div>
            )}
            {!msg.isSent && (
              <img src="https://i.pravatar.cc/150?img=1" alt="" className="w-7 h-7 rounded-full mr-2 self-end flex-shrink-0 object-cover" />
            )}
            <div className={`max-w-[78%] ${msg.isSent ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
              {/* Reply preview */}
              {msg.replyTo && (
                <div className={`px-3 py-1.5 rounded-xl text-xs border-l-4 mb-0.5 ${msg.isSent ? "bg-white/20 border-white/60 text-white/80" : "bg-gray-100 dark:bg-gray-700 border-gray-400 text-gray-500 dark:text-gray-400"}`}>
                  <p className="font-semibold text-[10px] mb-0.5">{msg.replyTo.isSent ? "You" : "Lusine"}</p>
                  <p className="truncate max-w-[160px]">{msg.replyTo.text || "📷 Media"}</p>
                </div>
              )}
              {msg.text && (
                <div
                  className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                    msg.isSent
                      ? "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white rounded-br-sm"
                      : `${themeIsLight ? "bg-white" : "bg-white/90"} text-gray-800 rounded-bl-sm`
                  }`}
                >
                  <AutolinkText text={msg.text} isSent={msg.isSent} />
                </div>
              )}
              {msg.imageUrl && (
                <div
                  className={`rounded-2xl overflow-hidden shadow-sm cursor-pointer ${msg.isSent ? "rounded-br-sm" : "rounded-bl-sm"}`}
                  onClick={() => setPreviewMedia({ url: msg.imageUrl!, type: "image" })}
                >
                  <img src={msg.imageUrl} alt="shared" className="max-w-[220px] max-h-[280px] object-cover block" />
                </div>
              )}
              {msg.imageUrls && msg.imageUrls.length > 1 && (
                <BulkImageBubble
                  images={msg.imageUrls}
                  isSent={msg.isSent}
                  onPreview={(url) => setPreviewMedia({ url, type: "image" })}
                />
              )}
              {msg.videoUrl && (
                <div
                  className={`rounded-2xl overflow-hidden shadow-sm cursor-pointer relative ${msg.isSent ? "rounded-br-sm" : "rounded-bl-sm"}`}
                  onClick={() => setPreviewMedia({ url: msg.videoUrl!, type: "video" })}
                >
                  <video src={msg.videoUrl} className="max-w-[220px] max-h-[220px] object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-10 h-10 text-white fill-white" />
                  </div>
                </div>
              )}
              {msg.audioUrl && (
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-sm min-w-[180px] ${
                    msg.isSent
                      ? "bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-br-sm"
                      : `${themeIsLight ? "bg-white" : "bg-white/90"} rounded-bl-sm`
                  }`}
                >
                  <button
                    onClick={() => { const a = new Audio(msg.audioUrl); a.play(); }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.isSent ? "bg-white/20" : "bg-pink-100"}`}
                  >
                    <Play className={`w-4 h-4 ml-0.5 ${msg.isSent ? "text-white" : "text-[#E91E63]"}`} fill="currentColor" />
                  </button>
                  <div className="flex-1 flex items-center gap-0.5">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-0.5 rounded-full ${msg.isSent ? "bg-white/60" : "bg-gray-300"}`}
                        style={{ height: `${4 + Math.random() * 12}px` }}
                      />
                    ))}
                  </div>
                  <span className={`text-xs ${msg.isSent ? "text-white/80" : "text-gray-500"}`}>
                    {formatDuration(msg.audioDuration || 0)}
                  </span>
                </div>
              )}
              <div className={`flex items-center gap-1 mt-1 ${msg.isSent ? "justify-end" : ""}`}>
                <span className={`text-xs ${themeIsLight ? "text-gray-400" : "text-white/60"}`}>{msg.timestamp}</span>
                {msg.isSent && msg.status === "read" && <span className="text-xs text-blue-400">✓✓</span>}
                {msg.isSent && msg.status === "delivered" && <span className="text-xs text-gray-400">✓✓</span>}
                {msg.isSent && msg.status === "sent" && <span className="text-xs text-gray-400">✓</span>}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`border-t ${themeIsLight ? "bg-white border-gray-100" : "bg-white/95 border-white/20"} px-3 pt-2 pb-2 flex-shrink-0`}>
        {/* Reply preview bar */}
        {replyTo && (
          <div className="flex items-center gap-2 mb-2 bg-gray-100 rounded-xl px-3 py-2">
            <div className="w-1 h-8 bg-[#E91E63] rounded-full flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#E91E63]">{replyTo.isSent ? "You" : "Lusine"}</p>
              <p className="text-xs text-gray-600 truncate">{replyTo.text || "📷 Media"}</p>
            </div>
            <button onClick={() => setReplyTo(null)} className="text-gray-400 flex-shrink-0"><X className="w-4 h-4" /></button>
          </div>
        )}
        {isRecording ? (
          <div className="flex items-center gap-3">
            <button onClick={stopRecording} className="text-red-500">
              <X className="w-6 h-6" />
            </button>
            <div className="flex-1 bg-red-50 rounded-full px-4 py-2.5 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-500 font-medium text-sm">Recording {formatDuration(recordingSeconds)}</span>
            </div>
            <button
              onClick={stopRecording}
              className="w-10 h-10 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full flex items-center justify-center"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <div className="relative">
              <button
                className="text-[#E91E63] p-1"
                onClick={() => setShowAttachMenu(!showAttachMenu)}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              {showAttachMenu && (
                <div className="absolute bottom-10 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[170px] z-20">
                  <button
                    onClick={() => handleSendMedia("image/*", true)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700"
                  >
                    <Image className="w-5 h-5 text-[#E91E63]" />
                    <div className="text-left">
                      <p className="text-sm font-medium">Photos</p>
                      <p className="text-xs text-gray-400">Up to {MAX_INBOX_PHOTOS} – auto-compressed</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleSendMedia("video/*")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700"
                  >
                    <FileVideo className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium">Video</span>
                  </button>
                  <button
                    onClick={() => handleSendMedia("image/*", false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700"
                  >
                    <Camera className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">Camera</span>
                  </button>
                  <button
                    onClick={() => handleSendMedia("audio/*")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700"
                  >
                    <Music className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">Audio</span>
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 flex items-end gap-2">
              <textarea
                placeholder="Message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 bg-transparent text-sm focus:outline-none text-gray-800 placeholder-gray-500 resize-none max-h-28 inbox-selectable"
                rows={1}
              />
              <button className="text-gray-400 flex-shrink-0">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            {messageText.trim() ? (
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full flex items-center justify-center shadow-md flex-shrink-0"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button
                onMouseDown={startRecording}
                onTouchStart={startRecording}
                className="w-10 h-10 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full flex items-center justify-center shadow-md flex-shrink-0"
              >
                <Mic className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
