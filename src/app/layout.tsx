import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Booking | Premium Travel & Hotel Experiences",
  description: "Book your next luxury getaway with ease. Real-time availability, secure payments, and premium destinations.",
  keywords: ["travel", "booking", "hotel", "saas", "luxury"],
  authors: [{ name: "Nexus Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Nexus Booking | Premium Travel & Hotel Experiences",
    description: "Book your next luxury getaway with ease. Real-time availability, secure payments, and premium destinations.",
    type: "website",
    locale: "en_US",
    url: "https://nexus-booking.com",
    siteName: "Nexus Booking",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.warn("Clerk Publishable Key is missing from .env.local");
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
