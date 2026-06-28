import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MessageCircle, Eye, Shield, Bell, UserCheck, CheckCircle, ChevronRight } from "lucide-react";

type Option3 = "everyone" | "friends" | "nobody";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#E91E63] peer-checked:to-[#FF5722]" />
    </label>
  );
}

function RadioRow({ label, value, current, onChange }: { label: string; value: Option3; current: Option3; onChange: (v: Option3) => void }) {
  return (
    <button
      onClick={() => onChange(value)}
      className={`w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${current === value ? "text-[#E91E63]" : "text-gray-700 dark:text-gray-300"}`}
    >
      <span className="text-sm font-medium capitalize">{label}</span>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${current === value ? "border-[#E91E63] bg-[#E91E63]" : "border-gray-300 dark:border-gray-500"}`}>
        {current === value && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
    </button>
  );
}

export function InboxPrivacy() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    whoCanMessage: "friends" as Option3,
    whoCanSeeReadReceipts: "everyone" as Option3,
    whoCanSeeOnlineStatus: "friends" as Option3,
    readReceipts: true,
    deliveryReceipts: true,
    messageRequests: true,
    typingIndicators: true,
    linkPreviews: true,
    messageReactions: true,
    voiceCalls: "friends" as Option3,
    videoCalls: "friends" as Option3,
    groupInvites: "friends" as Option3,
    forwardMessages: true,
    saveMedia: "friends" as Option3,
  });

  const toggle = (key: string) => (v: boolean) => setSettings((p) => ({ ...p, [key]: v }));
  const radio = (key: string) => (v: Option3) => setSettings((p) => ({ ...p, [key]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    {
      id: "messaging",
      title: "Messaging",
      icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      content: (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Who can message you</p>
          </div>
          <RadioRow label="Everyone" value="everyone" current={settings.whoCanMessage} onChange={radio("whoCanMessage")} />
          <RadioRow label="Friends Only" value="friends" current={settings.whoCanMessage} onChange={radio("whoCanMessage")} />
          <RadioRow label="Nobody" value="nobody" current={settings.whoCanMessage} onChange={radio("whoCanMessage")} />
          <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Message Requests</p>
                <p className="text-xs text-gray-400">Filter messages from non-friends</p>
              </div>
              <Toggle checked={settings.messageRequests} onChange={toggle("messageRequests")} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "receipts",
      title: "Read & Delivery Receipts",
      icon: <Eye className="w-5 h-5 text-green-500" />,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      content: (
        <div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">Read Receipts</p>
              <p className="text-xs text-gray-400">Show when you've read messages (blue ticks)</p>
            </div>
            <Toggle checked={settings.readReceipts} onChange={toggle("readReceipts")} />
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">Delivery Receipts</p>
              <p className="text-xs text-gray-400">Show when messages are delivered</p>
            </div>
            <Toggle checked={settings.deliveryReceipts} onChange={toggle("deliveryReceipts")} />
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Who can see your read receipts</p>
          </div>
          <RadioRow label="Everyone" value="everyone" current={settings.whoCanSeeReadReceipts} onChange={radio("whoCanSeeReadReceipts")} />
          <RadioRow label="Friends Only" value="friends" current={settings.whoCanSeeReadReceipts} onChange={radio("whoCanSeeReadReceipts")} />
        </div>
      ),
    },
    {
      id: "presence",
      title: "Online Status & Typing",
      icon: <UserCheck className="w-5 h-5 text-purple-500" />,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      content: (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Who can see your online status</p>
          </div>
          <RadioRow label="Everyone" value="everyone" current={settings.whoCanSeeOnlineStatus} onChange={radio("whoCanSeeOnlineStatus")} />
          <RadioRow label="Friends Only" value="friends" current={settings.whoCanSeeOnlineStatus} onChange={radio("whoCanSeeOnlineStatus")} />
          <RadioRow label="Nobody" value="nobody" current={settings.whoCanSeeOnlineStatus} onChange={radio("whoCanSeeOnlineStatus")} />
          <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Typing Indicators</p>
                <p className="text-xs text-gray-400">Show "typing..." when you write</p>
              </div>
              <Toggle checked={settings.typingIndicators} onChange={toggle("typingIndicators")} />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Link Previews</p>
                <p className="text-xs text-gray-400">Show previews for links in messages</p>
              </div>
              <Toggle checked={settings.linkPreviews} onChange={toggle("linkPreviews")} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "calls",
      title: "Calls",
      icon: <Bell className="w-5 h-5 text-orange-500" />,
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      content: (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Who can call you</p>
          </div>
          <div className="px-4 pt-2 pb-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Voice Calls</p>
          </div>
          <RadioRow label="Everyone" value="everyone" current={settings.voiceCalls} onChange={radio("voiceCalls")} />
          <RadioRow label="Friends Only" value="friends" current={settings.voiceCalls} onChange={radio("voiceCalls")} />
          <RadioRow label="Nobody" value="nobody" current={settings.voiceCalls} onChange={radio("voiceCalls")} />
          <div className="px-4 pt-3 pb-1 border-t border-gray-100 dark:border-gray-700 mt-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Video Calls</p>
          </div>
          <RadioRow label="Everyone" value="everyone" current={settings.videoCalls} onChange={radio("videoCalls")} />
          <RadioRow label="Friends Only" value="friends" current={settings.videoCalls} onChange={radio("videoCalls")} />
          <RadioRow label="Nobody" value="nobody" current={settings.videoCalls} onChange={radio("videoCalls")} />
        </div>
      ),
    },
    {
      id: "groups",
      title: "Groups & Forwarding",
      icon: <Shield className="w-5 h-5 text-red-500" />,
      iconBg: "bg-red-100 dark:bg-red-900/30",
      content: (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Who can add you to groups</p>
          </div>
          <RadioRow label="Everyone" value="everyone" current={settings.groupInvites} onChange={radio("groupInvites")} />
          <RadioRow label="Friends Only" value="friends" current={settings.groupInvites} onChange={radio("groupInvites")} />
          <RadioRow label="Nobody" value="nobody" current={settings.groupInvites} onChange={radio("groupInvites")} />
          <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Allow Forwarding</p>
                <p className="text-xs text-gray-400">Let others forward your messages</p>
              </div>
              <Toggle checked={settings.forwardMessages} onChange={toggle("forwardMessages")} />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Message Reactions</p>
                <p className="text-xs text-gray-400">Allow emoji reactions on messages</p>
              </div>
              <Toggle checked={settings.messageReactions} onChange={toggle("messageReactions")} />
            </div>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Who can save your media</p>
          </div>
          <RadioRow label="Everyone" value="everyone" current={settings.saveMedia} onChange={radio("saveMedia")} />
          <RadioRow label="Friends Only" value="friends" current={settings.saveMedia} onChange={radio("saveMedia")} />
          <RadioRow label="Nobody" value="nobody" current={settings.saveMedia} onChange={radio("saveMedia")} />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950" style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }}>
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg" style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top))" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-white" /></button>
          <h1 className="text-white font-bold text-lg">Inbox Privacy</h1>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${saved ? "bg-green-400 text-white" : "bg-white text-[#E91E63]"}`}
        >
          {saved ? "✓ Saved!" : "Save"}
        </button>
      </header>

      <div className="p-4 space-y-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl px-4 py-3 flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-300">Control who can reach you and what they can see. Changes take effect immediately.</p>
        </div>

        {sections.map((section) => (
          <div key={section.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <button
              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <div className={`w-10 h-10 rounded-full ${section.iconBg} flex items-center justify-center`}>
                {section.icon}
              </div>
              <span className="font-semibold text-gray-900 dark:text-white text-sm flex-1 text-left">{section.title}</span>
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === section.id ? "rotate-90" : ""}`} />
            </button>
            {expandedSection === section.id && (
              <div className="border-t border-gray-100 dark:border-gray-700">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
