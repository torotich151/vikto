import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPass.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (form.newPass !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate(-1), 2000);
  };

  const strength = () => {
    const p = form.newPass;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-emerald-500"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center sticky top-0 z-40 shadow-lg">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg ml-4">Change Password</h1>
      </header>

      <div className="p-4">
        {success ? (
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Password Updated!</h2>
            <p className="text-gray-500 text-sm">Your password has been changed successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-4 space-y-4">
              {[
                { key: "current", label: "Current Password", placeholder: "Enter current password" },
                { key: "newPass", label: "New Password", placeholder: "Enter new password" },
                { key: "confirm", label: "Confirm Password", placeholder: "Re-enter new password" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{label}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={show[key as keyof typeof show] ? "text" : "password"}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => ({ ...s, [key]: !s[key as keyof typeof s] }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {show[key as keyof typeof show] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {key === "newPass" && form.newPass && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`flex-1 h-1 rounded-full ${i <= strength() ? strengthColor[strength()] : "bg-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{strengthLabel[strength()]}</span>
                    </div>
                  )}
                </div>
              ))}

              {error && (
                <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !form.current || !form.newPass || !form.confirm}
              className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-bold py-4 rounded-2xl shadow-lg disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
