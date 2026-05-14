import { useState, useEffect } from "react";
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface CallingModalProps {
  type: "audio" | "video";
  username: string;
  avatar: string;
  onClose: () => void;
  incoming?: boolean;
}

export function CallingModal({ type, username, avatar, onClose, incoming = false }: CallingModalProps) {
  const [callState, setCallState] = useState<"ringing" | "connected" | "ended">(incoming ? "ringing" : "ringing");
  const [micOn, setMicOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(false);
  const [videoOn, setVideoOn] = useState(type === "video");
  const [duration, setDuration] = useState(0);
  const [localVideoRef] = useState(() => null);

  useEffect(() => {
    if (!incoming) {
      // Auto-connect after 2s for demo
      const t = setTimeout(() => setCallState("connected"), 2000);
      return () => clearTimeout(t);
    }
  }, [incoming]);

  useEffect(() => {
    if (callState === "connected") {
      const t = setInterval(() => setDuration((d) => d + 1), 1000);
      return () => clearInterval(t);
    }
  }, [callState]);

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleHangup = () => {
    setCallState("ended");
    setTimeout(onClose, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-[360px] mx-4 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-3xl overflow-hidden shadow-2xl">
        {/* Background video glow effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full blur-3xl" />
        </div>

        <div className="relative p-8 flex flex-col items-center">
          {/* Call type badge */}
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-6">
            {type === "video" ? (
              <Video className="w-3 h-3 text-white/70" />
            ) : (
              <Phone className="w-3 h-3 text-white/70" />
            )}
            <span className="text-white/70 text-xs font-medium">
              {type === "video" ? "Video Call" : "Voice Call"}
            </span>
          </div>

          {/* Avatar */}
          <div className={`relative mb-4 ${callState === "ringing" ? "ring-pulse" : ""}`}>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full opacity-40 blur" />
            <img
              src={avatar}
              alt={username}
              className="relative w-28 h-28 rounded-full object-cover border-4 border-white/20"
            />
            {callState === "ringing" && (
              <>
                <div className="absolute -inset-4 border-2 border-[#E91E63]/30 rounded-full animate-ping" />
                <div className="absolute -inset-8 border-2 border-[#E91E63]/15 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
              </>
            )}
          </div>

          {/* Name & status */}
          <h2 className="text-white font-bold text-2xl mb-2">{username}</h2>
          <p className="text-white/60 text-sm mb-8">
            {callState === "ringing" && !incoming && "Calling..."}
            {callState === "ringing" && incoming && "Incoming call..."}
            {callState === "connected" && formatDuration(duration)}
            {callState === "ended" && "Call ended"}
          </p>

          {/* Controls */}
          {callState === "ringing" && incoming ? (
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleHangup}
                  className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <PhoneOff className="w-7 h-7 text-white" />
                </button>
                <span className="text-white/60 text-xs">Decline</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setCallState("connected")}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Phone className="w-7 h-7 text-white" />
                </button>
                <span className="text-white/60 text-xs">Accept</span>
              </div>
            </div>
          ) : callState === "ringing" ? (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleHangup}
                className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <PhoneOff className="w-7 h-7 text-white" />
              </button>
              <span className="text-white/60 text-xs">Cancel</span>
            </div>
          ) : (
            <div className="w-full space-y-4">
              {/* Secondary controls */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => setMicOn(!micOn)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${micOn ? "bg-white/20" : "bg-red-500"}`}
                  >
                    {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
                  </button>
                  <span className="text-white/50 text-xs">{micOn ? "Mute" : "Unmute"}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => setSpeakerOn(!speakerOn)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${speakerOn ? "bg-blue-500" : "bg-white/20"}`}
                  >
                    {speakerOn ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-white" />}
                  </button>
                  <span className="text-white/50 text-xs">Speaker</span>
                </div>
                {type === "video" && (
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => setVideoOn(!videoOn)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${videoOn ? "bg-white/20" : "bg-red-500"}`}
                    >
                      {videoOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
                    </button>
                    <span className="text-white/50 text-xs">{videoOn ? "Video off" : "Video on"}</span>
                  </div>
                )}
              </div>
              {/* End call */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={handleHangup}
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <PhoneOff className="w-7 h-7 text-white" />
                  </button>
                  <span className="text-white/60 text-xs">End Call</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
