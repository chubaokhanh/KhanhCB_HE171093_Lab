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
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Home,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [success, setSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (hasSubmitted) {
      const err = validateEmail(val);
      setErrors((prev) => ({
        ...prev,
        email: err || undefined,
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (hasSubmitted) {
      const err = validatePassword(val);
      setErrors((prev) => ({
        ...prev,
        password: err || undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    const newErrors: { email?: string; password?: string } = {};
    if (emailErr) newErrors.email = emailErr;
    if (passwordErr) newErrors.password = passwordErr;

    setErrors(newErrors);

    if (!emailErr && !passwordErr) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-28 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-md z-10">
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
          <span className="text-xs text-slate-500">Nexus Security</span>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-[#0d1322] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
            Sign in to access your Nexus account and orders
          </p>
        </div>

        {/* Card Component */}
        <Card className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/40">
          {/* Success Banner */}
          {success && (
            <div
              data-testid="form-success"
              className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Login successful (demo)</span>
            </div>
          )}

          {/* Login Form */}
          <form
            data-testid="login-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="login-email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  data-testid="login-email"
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </Label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  data-testid="login-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="pl-10 h-10 bg-slate-950/60 border-slate-700/80 rounded-xl text-slate-100 placeholder:text-slate-500 text-sm focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30 transition-all"
                />
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

            {/* Submit Button */}
            <Button
              id="login-submit"
              data-testid="login-submit"
              type="submit"
              className="w-full mt-2 h-10 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Social or Quick Demo note */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
              >
                Register now
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
