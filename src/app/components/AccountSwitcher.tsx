import { useState } from "react";
import { Plus, Check, ChevronDown, LogOut, X } from "lucide-react";

interface Account {
  id: string;
  username: string;
  name: string;
  avatar: string;
  email: string;
}

const DEFAULT_ACCOUNTS: Account[] = [
  {
    id: "1",
    username: "@armenam244",
    name: "Armenam",
    avatar: "https://i.pravatar.cc/150?img=30",
    email: "armenam@example.com",
  },
];

interface AccountSwitcherProps {
  onClose: () => void;
}

export function AccountSwitcher({ onClose }: AccountSwitcherProps) {
  const [accounts, setAccounts] = useState<Account[]>(DEFAULT_ACCOUNTS);
  const [activeId, setActiveId] = useState("1");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSwitch = (id: string) => {
    setActiveId(id);
    setTimeout(onClose, 300);
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accounts.length >= 10) {
      alert("Maximum 10 accounts allowed.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const newAcc: Account = {
      id: Date.now().toString(),
      username: `@${newUsername}`,
      name: newUsername,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`,
      email: newEmail,
    };
    setAccounts((prev) => [...prev, newAcc]);
    setActiveId(newAcc.id);
    setLoading(false);
    setShowAddForm(false);
    setNewUsername("");
    setNewEmail("");
    setNewPassword("");
    setTimeout(onClose, 300);
  };

  const handleRemove = (id: string) => {
    if (id === "1") return;
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    if (activeId === id) setActiveId("1");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end" onClick={onClose}>
      <div
        className="w-full max-w-[480px] mx-auto bg-white rounded-t-3xl p-6 modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900 text-lg">Switch Accounts</h3>
          <button onClick={onClose} className="text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account List */}
        <div className="space-y-3 mb-4">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                activeId === acc.id ? "bg-pink-50 ring-2 ring-[#E91E63]" : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => handleSwitch(acc.id)}
            >
              <div className="relative">
                <img src={acc.avatar} alt={acc.name} className="w-12 h-12 rounded-full object-cover" />
                {activeId === acc.id && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#E91E63] rounded-full flex items-center justify-center border-2 border-white">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{acc.name}</p>
                <p className="text-xs text-gray-500">{acc.username}</p>
                <p className="text-xs text-gray-400">{acc.email}</p>
              </div>
              {activeId === acc.id && (
                <span className="text-xs font-semibold text-[#E91E63] bg-pink-100 px-2 py-1 rounded-full">Active</span>
              )}
              {acc.id !== "1" && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemove(acc.id); }}
                  className="text-gray-300 hover:text-red-400 transition-colors ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Account */}
        {accounts.length < 10 && !showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center gap-3 p-3 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#E91E63] hover:bg-pink-50 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#E91E63]" />
            </div>
            <span className="font-medium text-gray-600 text-sm">Add Account ({accounts.length}/10)</span>
          </button>
        )}

        {showAddForm && (
          <form onSubmit={handleAddAccount} className="space-y-3 bg-gray-50 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-800 text-sm">Add Another Account</h4>
            <input
              type="text"
              placeholder="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold text-sm disabled:opacity-70"
              >
                {loading ? "Adding..." : "Add Account"}
              </button>
            </div>
          </form>
        )}

        {/* Log out all */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 text-red-500 text-sm font-medium py-2">
          <LogOut className="w-4 h-4" />
          <span>Log out of all accounts</span>
        </button>
      </div>
    </div>
  );
}
