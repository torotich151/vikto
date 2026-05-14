import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  ArrowLeft, ChevronRight, Lock, Bell, Moon, Globe, Shield, Download,
  Eye, UserX, Activity, LogOut, CreditCard, Star, User, Users,
} from "lucide-react";
import { AccountSwitcher } from "../components/AccountSwitcher";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#E91E63] peer-checked:to-[#FF5722]" />
    </label>
  );
}

function SettingRow({
  icon,
  iconBg,
  title,
  subtitle,
  href,
  toggle,
  danger,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
  href?: string;
  toggle?: { checked: boolean; onChange: (v: boolean) => void };
  danger?: boolean;
}) {
  const inner = (
    <div className={`flex items-center justify-between px-4 py-3 ${href ? "hover:bg-gray-50" : ""}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className={`font-medium ${danger ? "text-red-500" : "text-gray-900"}`}>{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {toggle ? (
        <Toggle checked={toggle.checked} onChange={toggle.onChange} />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-400" />
      )}
    </div>
  );

  if (href) {
    return <Link to={href}>{inner}</Link>;
  }
  return <div>{inner}</div>;
}

export function Settings() {
  const navigate = useNavigate();
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    privateAccount: false,
    activityStatus: true,
    pushNotifications: true,
    messageNotifications: true,
    storyNotifications: true,
    emailNotifications: false,
  });

  const set = (key: string) => (v: boolean) =>
    setSettings((s) => ({ ...s, [key]: v }));

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center sticky top-0 z-40 shadow-lg">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg ml-4">Settings</h1>
      </header>

      {showAccountSwitcher && <AccountSwitcher onClose={() => setShowAccountSwitcher(false)} />}

      <div className="p-4 space-y-4">
        {/* Profile Summary */}
        <Link to="/profile" className="bg-white rounded-2xl shadow-sm flex items-center gap-4 p-4 hover:bg-gray-50">
          <img
            src="https://i.pravatar.cc/150?img=30"
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
          />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <p className="font-bold text-gray-900">Armenam</p>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#1877F2" />
                <path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">@armenam244 · View profile</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        {/* Account */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Account</p>
          </div>
          <div className="divide-y divide-gray-100">
            <SettingRow
              icon={<User className="w-5 h-5 text-purple-500" />}
              iconBg="bg-purple-100"
              title="Edit Profile"
              subtitle="Update your bio, photo and info"
              href="/edit-profile"
            />
            <SettingRow
              icon={<Lock className="w-5 h-5 text-blue-500" />}
              iconBg="bg-blue-100"
              title="Change Password"
              subtitle="Update your account password"
              href="/change-password"
            />
            <button
              onClick={() => setShowAccountSwitcher(true)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-teal-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Multiple Accounts</p>
                  <p className="text-xs text-gray-500">Switch between up to 10 accounts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <SettingRow
              icon={<Download className="w-5 h-5 text-green-500" />}
              iconBg="bg-green-100"
              title="Download Your Data"
              subtitle="Get a copy of all your data"
            />
          </div>
        </div>

        {/* Subscriptions */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Subscription</p>
          </div>
          <div
            className="px-4 py-4 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white">ChatMe Premium</p>
              <p className="text-xs text-white/60">Unlock exclusive features</p>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xs px-4 py-2 rounded-full">
              Upgrade
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            <SettingRow
              icon={<CreditCard className="w-5 h-5 text-indigo-500" />}
              iconBg="bg-indigo-100"
              title="Manage Plan"
              subtitle="View and manage your subscription"
            />
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Privacy</p>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Private Account</p>
                  <p className="text-xs text-gray-500">Only approved followers can see your posts</p>
                </div>
              </div>
              <Toggle checked={settings.privateAccount} onChange={set("privateAccount")} />
            </div>
            <SettingRow
              icon={<UserX className="w-5 h-5 text-red-500" />}
              iconBg="bg-red-100"
              title="Blocked Accounts"
              subtitle="Manage who you've blocked"
            />
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Activity Status</p>
                  <p className="text-xs text-gray-500">Show when you're active</p>
                </div>
              </div>
              <Toggle checked={settings.activityStatus} onChange={set("activityStatus")} />
            </div>
            <SettingRow
              icon={<Eye className="w-5 h-5 text-teal-500" />}
              iconBg="bg-teal-100"
              title="Who Can See"
              subtitle="Control who can follow and see you"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Notifications</p>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { key: "pushNotifications", icon: <Bell className="w-5 h-5 text-orange-500" />, bg: "bg-orange-100", title: "Push Notifications", sub: "Likes, comments and follows" },
              { key: "messageNotifications", icon: <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>, bg: "bg-purple-100", title: "Message Notifications", sub: "Notify me about new messages" },
              { key: "storyNotifications", icon: <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>, bg: "bg-pink-100", title: "Story Notifications", sub: "When someone replies to your story" },
              { key: "emailNotifications", icon: <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, bg: "bg-blue-100", title: "Email Notifications", sub: "Account updates via email" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
                <Toggle checked={settings[item.key as keyof typeof settings] as boolean} onChange={set(item.key)} />
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Appearance</p>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-xs text-gray-500">Switch to dark theme</p>
                </div>
              </div>
              <Toggle checked={settings.darkMode} onChange={set("darkMode")} />
            </div>
            <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">App Language</p>
                  <p className="text-xs text-gray-500">English</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Legal */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            <Link to="/terms" className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
              <span className="text-gray-700 font-medium">Terms & Conditions</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link to="/privacy-policy" className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
              <span className="text-gray-700 font-medium">Privacy Policy</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-white rounded-2xl shadow-sm px-4 py-4 flex items-center justify-center gap-3 text-red-500 font-bold hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>

        <p className="text-center text-xs text-gray-400 pb-4">ChatMe v1.0.0</p>
      </div>
    </div>
  );
}
