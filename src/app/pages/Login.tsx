import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Phone, UserPlus } from "lucide-react";

type Step = "login" | "forgot" | "otp" | "reset";

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setGoogleLoading(false);
    navigate("/");
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep("otp");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStep("reset");
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStep("login");
  };

  const handleOtpChange = (value: string, index: number) => {
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const Logo = () => (
    <div className="flex flex-col items-center mb-6">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E91E63] to-[#FF5722] flex items-center justify-center shadow-lg mb-3">
        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="0.5" fill="currentColor" strokeWidth="0" />
          <circle cx="12" cy="10" r="0.5" fill="currentColor" strokeWidth="0" />
          <circle cx="15" cy="10" r="0.5" fill="currentColor" strokeWidth="0" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent">
        ChatMe
      </h1>
      <p className="text-gray-500 text-sm mt-1">Share your moments. Connect with vibes.</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]" style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
        <Logo />

        {step === "login" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-1">Welcome Back!</h2>
            <p className="text-center text-gray-600 text-sm mb-5">Login to continue</p>

            {/* Google Sign-In */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 shadow-sm mb-4 transition-all disabled:opacity-70"
            >
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span>{googleLoading ? "Signing in..." : "Continue with Google"}</span>
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4 mb-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setStep("forgot")}
                  className="text-sm font-semibold bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent"
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold py-3.5 rounded-xl shadow-lg"
              >
                Login
              </button>
            </form>

            <Link
              to="/signup"
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50"
            >
              <UserPlus className="w-4 h-4 text-[#E91E63]" />
              <span className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent">
                Create New Account
              </span>
            </Link>
          </>
        )}

        {step === "forgot" && (
          <>
            <button onClick={() => setStep("login")} className="flex items-center gap-2 text-gray-500 mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Login</span>
            </button>
            <h2 className="text-2xl font-bold text-center mb-1">Reset Password</h2>
            <p className="text-center text-gray-600 text-sm mb-6">Enter your phone number to receive an OTP</p>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-70"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <button onClick={() => setStep("forgot")} className="flex items-center gap-2 text-gray-500 mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <h2 className="text-2xl font-bold text-center mb-1">Verify OTP</h2>
            <p className="text-center text-gray-600 text-sm mb-2">We sent a 6-digit code to</p>
            <p className="text-center font-semibold text-gray-800 mb-6">{phone}</p>
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    className="w-11 h-12 text-center text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#E91E63]"
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={otp.join("").length < 6 || loading}
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-70"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Didn't receive it?{" "}
              <button
                onClick={() => handleSendOtp({ preventDefault: () => {} } as React.FormEvent)}
                className="font-semibold bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent"
              >
                Resend
              </button>
            </p>
          </>
        )}

        {step === "reset" && (
          <>
            <h2 className="text-2xl font-bold text-center mb-1">New Password</h2>
            <p className="text-center text-gray-600 text-sm mb-6">Choose a strong password</p>
            <form onSubmit={handleReset} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || newPassword.length < 6}
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-70"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
