"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  UserPlus,
  Check,
  X,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  // Calculate password strength
  const passwordCriteria = useMemo(() => {
    return {
      length: password.length >= 8,
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^a-zA-Z0-9]/.test(password),
    };
  }, [password]);

  const strengthScore = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (passwordCriteria.length) score += 1;
    if (passwordCriteria.hasLetter) score += 1;
    if (passwordCriteria.hasNumber) score += 1;
    if (passwordCriteria.hasSpecial) score += 1;
    return score;
  }, [password, passwordCriteria]);

  const strengthMeta = useMemo(() => {
    switch (strengthScore) {
      case 1:
        return { label: "Weak", color: "bg-rose-500", text: "text-rose-400", width: "w-1/4" };
      case 2:
        return { label: "Fair", color: "bg-amber-500", text: "text-amber-400", width: "w-2/4" };
      case 3:
        return { label: "Good", color: "bg-indigo-400", text: "text-indigo-400", width: "w-3/4" };
      case 4:
        return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-400", width: "w-full" };
      default:
        return { label: "None", color: "bg-slate-700", text: "text-slate-500", width: "w-0" };
    }
  }, [strengthScore]);

  const isPasswordMatch = confirmPassword.length > 0 && password === confirmPassword;
  const isPasswordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage({ type: null, text: "" });

    // Basic Validation
    if (!fullName.trim()) {
      setStatusMessage({
        type: "error",
        text: "Vui lòng nhập họ và tên của bạn.",
      });
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setStatusMessage({
        type: "error",
        text: "Vui lòng nhập địa chỉ email hợp lệ.",
      });
      return;
    }

    if (password.length < 8) {
      setStatusMessage({
        type: "error",
        text: "Mật khẩu phải có tối thiểu 8 ký tự.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setStatusMessage({
        type: "error",
        text: "Mật khẩu xác nhận không trùng khớp.",
      });
      return;
    }

    if (!agreeTerms) {
      setStatusMessage({
        type: "error",
        text: "Bạn cần đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.",
      });
      return;
    }

    setIsLoading(true);

    // Simulated registration delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setStatusMessage({
        type: "success",
        text: "Tài khoản của bạn đã được khởi tạo thành công! Đang chuyển hướng...",
      });

      // Auto redirect to login after 2.5s
      setTimeout(() => {
        router.push("/");
      }, 2500);
    }, 1200);
  };

  const handleQuickFill = () => {
    setFullName("Khai Dev");
    setEmail("khai.dev@nexus.io");
    setPassword("Nexus2026@Pass");
    setConfirmPassword("Nexus2026@Pass");
    setAgreeTerms(true);
    setStatusMessage({
      type: "success",
      text: "Đã tự động điền thông tin mẫu. Nhấp 'Tạo tài khoản' để kiểm tra!",
    });
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/3 -right-28 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-reverse pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative w-full max-w-lg z-10">
        {/* Brand Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center mb-3">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-[#0d1322] rounded-[14px] flex items-center justify-center">
                <UserPlus className="w-7 h-7 text-indigo-400" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Tạo tài khoản Nexus
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Bắt đầu trải nghiệm nền tảng quản lý dự án & đám mây thông minh
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300">
          {/* Status Toast Banner */}
          {statusMessage.type && (
            <div
              className={`mb-5 p-3.5 rounded-xl border flex items-start gap-3 text-xs sm:text-sm animate-in fade-in duration-300 ${
                statusMessage.type === "success"
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                  : "bg-rose-950/40 border-rose-500/30 text-rose-300"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-medium">{statusMessage.text}</p>
                {isSuccess && (
                  <p className="mt-1 text-xs text-emerald-400/80">
                    Nếu không tự động chuyển hướng, hãy nhấn vào{" "}
                    <Link href="/" className="underline font-semibold text-emerald-200">
                      Đăng nhập ngay
                    </Link>
                    .
                  </p>
                )}
              </div>
            </div>
          )}

          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Đăng ký thành công!</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Chào mừng bạn gia nhập Nexus Portal. Bạn có thể đăng nhập ngay bây giờ.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <span>Đi tới trang Đăng nhập</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Họ và tên
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Địa chỉ Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@nexus.dev"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  Mật khẩu
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 8 ký tự"
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-900/60 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Độ mạnh mật khẩu:</span>
                      <span className={`font-medium ${strengthMeta.text}`}>
                        {strengthMeta.label}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strengthMeta.color} ${strengthMeta.width}`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1">
                        {passwordCriteria.length ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <X className="w-3 h-3 text-slate-600" />
                        )}
                        <span>8+ ký tự</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordCriteria.hasLetter ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <X className="w-3 h-3 text-slate-600" />
                        )}
                        <span>Chữ cái (a-z, A-Z)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordCriteria.hasNumber ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <X className="w-3 h-3 text-slate-600" />
                        )}
                        <span>Ít nhất 1 số (0-9)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordCriteria.hasSpecial ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <X className="w-3 h-3 text-slate-600" />
                        )}
                        <span>Ký tự đặc biệt (!@#$)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                  >
                    Xác nhận mật khẩu
                  </label>
                  {isPasswordMatch && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Trùng khớp
                    </span>
                  )}
                  {isPasswordMismatch && (
                    <span className="text-[11px] text-rose-400 flex items-center gap-1">
                      <X className="w-3 h-3" /> Không khớp
                    </span>
                  )}
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    className={`w-full pl-10 pr-11 py-2.5 bg-slate-900/60 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-200 ${
                      isPasswordMismatch
                        ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                        : isPasswordMatch
                        ? "border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20"
                        : "border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900/80 text-indigo-600 focus:ring-indigo-500/30 focus:ring-offset-0 transition-colors cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    Tôi đồng ý với{" "}
                    <span className="text-indigo-400 hover:underline">Điều khoản dịch vụ</span> và{" "}
                    <span className="text-indigo-400 hover:underline">Chính sách bảo mật</span> của Nexus.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                id="register-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 p-px font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 group-hover:bg-transparent transition-colors">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-sm font-medium">Đang tạo tài khoản...</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm font-medium">Đăng ký tài khoản</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>
          )}

          {/* Social Sign Up Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0f172a] px-3 text-slate-500 font-medium">
                Hoặc đăng ký nhanh với
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id="google-register-btn"
              type="button"
              onClick={handleQuickFill}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/70 hover:border-slate-600 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.1-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              id="github-register-btn"
              type="button"
              onClick={handleQuickFill}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/70 hover:border-slate-600 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Quick Demo Autofill */}
          <div className="mt-5 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-[11px] text-slate-500">Tiện ích thử nghiệm:</span>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="w-full text-center text-[11px] py-1.5 px-3 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-800/40 transition-colors cursor-pointer"
            >
              ⚡ Tự động điền dữ liệu mẫu (Quick Autofill Demo)
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-slate-400">
            Đã có tài khoản?{" "}
            <Link
              href="/"
              className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
            <span>Mã hóa SSL 256-bit • Bảo mật thông tin đa tầng</span>
          </div>
        </div>
      </div>
    </main>
  );
}
