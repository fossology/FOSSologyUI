"use client";

import React from "react";
import { GlobalProvider } from "@/context";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// Global CSS
import "react-virtualized-tree/lib/main.css";
import "@/styles/global.css";

import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-white text-black font-inter">
        <GlobalProvider>
          <Header />
          <main className="flex-grow px-page">{children}</main>
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
