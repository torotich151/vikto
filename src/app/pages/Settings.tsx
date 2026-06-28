import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  ArrowLeft, ChevronRight, Lock, Bell, Moon, Globe, Shield, Download,
  Eye, UserX, Activity, LogOut, CreditCard, Star, User, Users, MessageCircle,
} from "lucide-react";
import { AccountSwitcher } from "../components/AccountSwitcher";
import { useApp } from "../context/AppContext";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#E91E63] peer-checked:to-[#FF5722]" />
    </label>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{title}</p>
    </div>
  );
}

export function Settings() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode, language } = useApp();
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [storyNotifications, setStoryNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const currentLanguage = { en: "English", hy: "Հայերեն", ru: "Русский", fr: "Français", es: "Español", ar: "العربية" }[language] || "English";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950" style={{ paddingBottom: "calc(5.5rem + env(safe-area-inset-bottom))" }}>
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center sticky top-0 z-40 shadow-lg" style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top))" }}>
        <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-white" /></button>
        <h1 className="text-white font-bold text-lg ml-4">Settings</h1>
      </header>

      {showAccountSwitcher && <AccountSwitcher onClose={() => setShowAccountSwitcher(false)} />}

      <div className="p-4 space-y-4">
        {/* Profile */}
        <Link to="/profile" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <img src="https://i.pravatar.cc/150?img=30" alt="Profile" className="w-14 h-14 rounded-full object-cover border-2 border-pink-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="font-bold text-gray-900 dark:text-white">Armenam</p>
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#1877F2" />
                <path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">@armenam244 · View profile</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </Link>

        {/* Account */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <SectionHeader title="Account" />
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <Link to="/edit-profile" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0"><User className="w-5 h-5 text-purple-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Edit Profile</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Update your bio, photo and info</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>

            <Link to="/change-password" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0"><Lock className="w-5 h-5 text-blue-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">OTP verification required</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>

            <button onClick={() => setShowAccountSwitcher(true)} className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0"><Users className="w-5 h-5 text-teal-500" /></div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Multiple Accounts</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Switch between up to 10 accounts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </button>

            <Link to="/download-data" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0"><Download className="w-5 h-5 text-green-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Download Your Data</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get a copy of all your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <SectionHeader title="Subscription" />
          <div className="px-4 py-4 flex items-center gap-4" style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)" }}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white">ChatMe Premium</p>
              <p className="text-xs text-white/60">Unlock exclusive features</p>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xs px-4 py-2 rounded-full flex-shrink-0">Upgrade</button>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0"><CreditCard className="w-5 h-5 text-indigo-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Manage Plan</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">View and manage your subscription</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <SectionHeader title="Privacy" />
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0"><Shield className="w-5 h-5 text-pink-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Private Account</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Only approved followers see your posts</p>
                </div>
              </div>
              <Toggle checked={privateAccount} onChange={setPrivateAccount} />
            </div>
            <Link to="/blocked-accounts" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0"><UserX className="w-5 h-5 text-red-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Blocked Accounts</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage who you've blocked</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0"><Activity className="w-5 h-5 text-indigo-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Activity Status</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Show when you're active</p>
                </div>
              </div>
              <Toggle checked={activityStatus} onChange={setActivityStatus} />
            </div>
            <Link to="/who-can-see" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0"><Eye className="w-5 h-5 text-teal-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Who Can See Me</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Control who can see your profile</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
            <Link to="/inbox-privacy" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0"><MessageCircle className="w-5 h-5 text-blue-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Inbox Privacy</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Messages, calls, read receipts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <SectionHeader title="Notifications" />
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {[
              { icon: <Bell className="w-5 h-5 text-orange-500" />, bg: "bg-orange-100 dark:bg-orange-900/30", title: "Push Notifications", sub: "Likes, comments and follows", val: pushNotifications, set: setPushNotifications },
              { icon: <MessageCircle className="w-5 h-5 text-purple-500" />, bg: "bg-purple-100 dark:bg-purple-900/30", title: "Message Notifications", sub: "Notify on new messages", val: messageNotifications, set: setMessageNotifications },
              { icon: <Eye className="w-5 h-5 text-pink-500" />, bg: "bg-pink-100 dark:bg-pink-900/30", title: "Story Notifications", sub: "Replies to your stories", val: storyNotifications, set: setStoryNotifications },
              { icon: <Globe className="w-5 h-5 text-blue-500" />, bg: "bg-blue-100 dark:bg-blue-900/30", title: "Email Notifications", sub: "Account updates via email", val: emailNotifications, set: setEmailNotifications },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0`}>{item.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</p>
                  </div>
                </div>
                <Toggle checked={item.val} onChange={item.set} />
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <SectionHeader title="Appearance" />
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-600 flex items-center justify-center flex-shrink-0"><Moon className="w-5 h-5 text-white" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{darkMode ? "Dark theme active" : "Switch to dark theme"}</p>
                </div>
              </div>
              <Toggle checked={darkMode} onChange={toggleDarkMode} />
            </div>
            <Link to="/app-language" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0"><Globe className="w-5 h-5 text-blue-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">App Language</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <SectionHeader title="Support" />
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <Link to="/report-problem" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0"><Shield className="w-5 h-5 text-orange-500" /></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Report a Problem</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Bugs, safety, or account issues</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
            <Link to="/terms" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0"><Shield className="w-5 h-5 text-gray-500" /></div>
                <p className="font-medium text-gray-700 dark:text-gray-200">Terms & Conditions</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
            <Link to="/privacy-policy" className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0"><Lock className="w-5 h-5 text-gray-500" /></div>
                <p className="font-medium text-gray-700 dark:text-gray-200">Privacy Policy</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          </div>
        </div>

        {/* Logout */}
        <button onClick={() => navigate("/login")} className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm px-4 py-4 flex items-center justify-center gap-3 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600">ChatMe v1.0.0</p>
      </div>
    </div>
  );
}
