import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-30 z-0" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/2 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d1322] rounded-[10px] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Nexus Store
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 hidden sm:block">
                Premium Tech Hardware
              </span>
            </div>
          </Link>

          {/* Navigation CTA Buttons */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              data-testid="btn-login"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-xl border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer"
              )}
            >
              Login
            </Link>

            <Link
              href="/register"
              data-testid="btn-register"
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-medium px-3.5 sm:px-4 py-2 text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              )}
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-4 backdrop-blur-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Discover Summer Tech Deals 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Curated Hardware for{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              High Performers
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Upgrade your daily setup with battle-tested mechanical keyboards, ergonomic
            peripherals, studio sound monitors, and productivity gear.
          </p>

          {/* Quick Perks Strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 pt-6 border-t border-slate-800/60 max-w-lg mx-auto text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Free Express Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">2-Year Official Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium">30-Day Easy Returns</span>
            </div>
          </div>
        </section>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>Featured Products</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing {products.length} exclusive devices ready to dispatch today
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Showing all items
          </div>
        </div>

        {/* Product Grid Container */}
        {/* Requirement: at 375 px width: 1 column, at 1280 px width: at least 3 columns */}
        <div
          data-testid="product-list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#070a12] py-8 text-center text-xs text-slate-500 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            <span>Nexus Store &bull; Lab 2 Next.js Project</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Nexus Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
