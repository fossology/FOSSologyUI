/*
 SPDX-FileCopyrightText: © 2025 FOSSology Contributors
 SPDX-License-Identifier: GPL-2.0-only
*/

"use client";

import { useState } from "react";

const HomeClient = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const features = [
    { icon: "📁", title: "Upload Files", desc: "Upload files into the FOSSology repository" },
    { icon: "📦", title: "Unpack Files", desc: "Unpack zip, tar, bz2, iso and many others" },
    { icon: "🌳", title: "Browse Trees", desc: "Browse upload file trees easily" },
    { icon: "🔍", title: "Scan Licenses", desc: "Scan for software licenses automatically" },
    { icon: "©️",  title: "Scan Copyrights", desc: "Scan for copyrights and author information" },
    { icon: "📊", title: "Compare Trees", desc: "View side-by-side license and bucket differences" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br 
                    from-slate-900 via-blue-950 to-slate-900">

      {/* ── Hero Section ── */}
      <div className="flex flex-col items-center 
                      justify-center pt-16 pb-10 px-4">
        
        {/* Badge */}
        <span className="px-4 py-1 bg-blue-500/20 border 
                         border-blue-400/30 rounded-full text-blue-300 
                         text-sm font-medium mb-6">
          Open Source Compliance Tool
        </span>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white 
                       text-center mb-4">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text 
                           bg-gradient-to-r from-blue-400 
                           to-cyan-400">
            FOSSology
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-center text-lg 
                      max-w-xl mb-12">
          A framework for software analysis, license compliance, 
          and copyright detection at scale.
        </p>

        {/* ── Main Card ── */}
        <div className="flex flex-col lg:flex-row gap-8 
                        w-full max-w-5xl">

          {/* Features Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 
                           rounded-xl p-4 hover:bg-white/10 
                           hover:border-blue-400/40 
                           transition-all duration-200 cursor-default"
              >
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="text-white font-semibold 
                               text-sm mb-1">
                  {f.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Login Card */}
          <div className="w-full lg:w-80 bg-white/5 border 
                          border-white/10 rounded-2xl p-8 
                          backdrop-blur-sm">

            <h2 className="text-white text-xl font-bold mb-1">
              Sign In
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Access your FOSSology account
            </p>

            {/* Warning */}
            <div className="bg-amber-500/10 border border-amber-400/30 
                            rounded-lg px-3 py-2 mb-6">
              <p className="text-amber-300 text-xs">
                ⚠️ HTTP connection — passwords sent as plain text
              </p>
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="text-slate-300 text-sm 
                                font-medium block mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-white/10 border border-white/20 
                           rounded-lg px-4 py-3 text-white 
                           placeholder-slate-500 text-sm
                           focus:outline-none focus:border-blue-400 
                           focus:bg-white/15 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-slate-300 text-sm 
                                font-medium block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white/10 border border-white/20 
                             rounded-lg px-4 py-3 text-white 
                             placeholder-slate-500 text-sm pr-12
                             focus:outline-none focus:border-blue-400 
                             focus:bg-white/15 transition-all duration-200"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                             text-slate-400 hover:text-white 
                             transition-colors text-sm"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 
                         to-cyan-500 hover:from-blue-600 
                         hover:to-cyan-600 text-white font-semibold 
                         py-3 rounded-lg transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg shadow-blue-500/25"
            >
              {isLoading ? "Signing in..." : "Sign In →"}
            </button>

          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="text-center pb-8">
        <p className="text-slate-600 text-sm">
          FOSSology — Open Source License Compliance
        </p>
      </div>

    </div>
  );
};

export default HomeClient;