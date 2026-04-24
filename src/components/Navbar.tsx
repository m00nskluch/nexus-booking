"use client";

import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2 group">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">N</div>
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Nexus<span className="text-indigo-600">Booking</span></span>
      </Link>
      
      <div className="hidden md:flex space-x-8 font-medium text-slate-600 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Destinations</Link>
        <Link href="/" className="hover:text-indigo-600 transition-colors">Experiences</Link>
        <Link href="/" className="hover:text-indigo-600 transition-colors">Support</Link>
      </div>

      <div className="flex items-center space-x-6">
        <SignedOut>
          <div className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer">
            <SignInButton mode="modal">Sign In</SignInButton>
          </div>
        </SignedOut>
        
        <SignedIn>
          <div className="flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="hidden md:flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 font-semibold transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10 rounded-xl shadow-md border-2 border-indigo-500/20"
                }
              }}
              afterSignOutUrl="/"
            />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
