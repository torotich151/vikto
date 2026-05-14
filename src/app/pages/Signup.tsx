import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";

type Step = "form" | "otp";

export function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep("otp");
  };

  const handleOtpChange = (value: string, index: number) => {
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      document.getElementById(`sotp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107] py-8">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E91E63] to-[#FF5722] flex items-center justify-center shadow-lg mb-2">
            <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="0.5" fill="currentColor" strokeWidth="0" />
              <circle cx="12" cy="10" r="0.5" fill="currentColor" strokeWidth="0" />
              <circle cx="15" cy="10" r="0.5" fill="currentColor" strokeWidth="0" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent">
            ChatMe
          </h1>
        </div>

        {/* SIGN UP FORM */}
        {step === "form" && (
          <>
            <h2 className="text-xl font-bold text-center mb-1">Create Account</h2>
            <p className="text-center text-gray-500 text-sm mb-5">Join the community!</p>
            <form onSubmit={handleSignup} className="space-y-3 mb-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-70"
              >
                {loading ? "Sending OTP..." : "Sign Up"}
              </button>
            </form>
            <p className="text-xs text-gray-400 text-center mb-4">
              By signing up, you agree to our Terms & Privacy Policy.
            </p>
            <div className="text-center border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-600">
                Have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent"
                >
                  Log in
                </Link>
              </p>
            </div>
          </>
        )}

        {/* OTP VERIFICATION STEP */}
        {step === "otp" && (
          <>
            <button onClick={() => setStep("form")} className="flex items-center gap-2 text-gray-500 mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <h2 className="text-2xl font-bold text-center mb-1">Verify Your Phone</h2>
            <p className="text-center text-gray-600 text-sm mb-2">
              We sent a 6-digit code to
            </p>
            <p className="text-center font-semibold text-gray-800 mb-6">{formData.phone}</p>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`sotp-${i}`}
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
                {loading ? "Creating Account..." : "Verify & Create Account"}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Didn't receive it?{" "}
              <button
                onClick={() => {}}
                className="font-semibold bg-gradient-to-r from-[#E91E63] to-[#FF5722] bg-clip-text text-transparent"
              >
                Resend OTP
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
