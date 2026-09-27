"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Home,
  UserPlus,
} from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [success, setSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateName = (val: string): string => {
    if (!val || val.trim().length === 0) {
      return "Full name is required";
    }
    return "";
  };

  const validateEmail = (val: string): string => {
    if (!val.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (val: string): string => {
    if (!val) {
      return "Password is required";
    }
    if (val.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const validateConfirmPassword = (val: string, currentPassword: string): string => {
    if (!val) {
      return "Confirm password is required";
    }
    if (val !== currentPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFullName(val);
    if (hasSubmitted) {
      const err = validateName(val);
      setErrors((prev) => ({ ...prev, name: err || undefined }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (hasSubmitted) {
      const err = validateEmail(val);
      setErrors((prev) => ({ ...prev, email: err || undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (hasSubmitted) {
      const passErr = validatePassword(val);
      const confirmErr = confirmPassword ? validateConfirmPassword(confirmPassword, val) : errors.confirmPassword;
      setErrors((prev) => ({
        ...prev,
        password: passErr || undefined,
        confirmPassword: confirmErr || undefined,
      }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (hasSubmitted) {
      const err = validateConfirmPassword(val, password);
      setErrors((prev) => ({ ...prev, confirmPassword: err || undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const nameErr = validateName(fullName);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(confirmPassword, password);

    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (passwordErr) newErrors.password = passwordErr;
    if (confirmErr) newErrors.confirmPassword = confirmErr;

    setErrors(newErrors);

    if (!nameErr && !emailErr && !passwordErr && !confirmErr) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-28 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-lg z-10">
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
          <span className="text-xs text-slate-500">Nexus Account Setup</span>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-[#0d1322] rounded-[14px] flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
            Join Nexus to access exclusive hardware deals and warranty management
          </p>
        </div>

        {/* Form Card */}
        <Card className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/40">
          {/* Success Banner */}
          {success && (
            <div
              data-testid="form-success"
              className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Registration successful (demo)</span>
            </div>
          )}

          {/* Form */}
          <form
            data-testid="register-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="register-name" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Full Name
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <Input
                  id="register-name"
                  name="name"
                  type="text"
                  data-testid="register-name"
                  value={fullName}
                  onChange={handleNameChange}
                  placeholder="John Doe"
                  className="pl-10 h-10 bg-slate-950/60 border-slate-700/80 rounded-xl text-slate-100 placeholder:text-slate-500 text-sm focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30 transition-all"
                />
              </div>
              {/* Error Name */}
              {errors.name && (
                <p
                  data-testid="error-name"
                  className="text-xs text-rose-400 font-medium flex items-center gap-1.5 mt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label htmlFor="register-email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  data-testid="register-email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="user@example.com"
                  className="pl-10 h-10 bg-slate-950/60 border-slate-700/80 rounded-xl text-slate-100 placeholder:text-slate-500 text-sm focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30 transition-all"
                />
              </div>
              {/* Error Email */}
              {errors.email && (
                <p
                  data-testid="error-email"
                  className="text-xs text-rose-400 font-medium flex items-center gap-1.5 mt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="register-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  data-testid="register-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="At least 6 characters"
                  className="pl-10 pr-10 h-10 bg-slate-950/60 border-slate-700/80 rounded-xl text-slate-100 placeholder:text-slate-500 text-sm focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Error Password */}
              {errors.password && (
                <p
                  data-testid="error-password"
                  className="text-xs text-rose-400 font-medium flex items-center gap-1.5 mt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="register-confirm-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Confirm Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  data-testid="register-confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Re-enter your password"
                  className="pl-10 pr-10 h-10 bg-slate-950/60 border-slate-700/80 rounded-xl text-slate-100 placeholder:text-slate-500 text-sm focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Error Confirm Password */}
              {errors.confirmPassword && (
                <p
                  data-testid="error-confirm-password"
                  className="text-xs text-rose-400 font-medium flex items-center gap-1.5 mt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              id="register-submit"
              data-testid="register-submit"
              type="submit"
              className="w-full mt-3 h-10 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer Security Badges */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
          <span>Encrypted with SSL 256-bit &bull; Protected demo environment</span>
        </div>
      </div>
    </main>
  );
}
