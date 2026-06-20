/*
 SPDX-FileCopyrightText: 2025-2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

SPDX-License-Identifier: GPL-2.0-only

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from "@/lib/utils" 

import { 
  Eye, 
  EyeOff, 
  Upload, 
  Archive, 
  FolderTree, 
  FileText, 
  ShieldCheck, 
  UserCheck,
  GitCompare, 
  Tag, 
  FileSpreadsheet, 
  HelpCircle, 
  ChevronRight, 
  AlertTriangle 
} from "lucide-react"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertBanner,
} from '@/components/ui/alert';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import fetchToken from '@/services/auth';
import { getUserSelf } from '@/services/users';
import { fetchAllGroups } from '@/services/groups';
import routes from '@/constants/routes';
import { isAuth } from '@/shared/authHelper';

const features = [
  {
    icon: Upload,
    title: "Upload Files",
    desc: "Upload files directly into the FOSSology repository for tracking."
  },
  {
    icon: Archive,
    title: "Extract Archives",
    desc: "Unpack zip, tar, bz2, iso, and other common archive formats."
  },
  {
    icon: FolderTree,
    title: "Browse File Trees",
    desc: "Inspect upload hierarchies, folders, and component files."
  },
  {
    icon: FileText,
    title: "Inspect Metadata",
    desc: "View file contents, attributes, and critical metadata fields."
  },
  {
    icon: ShieldCheck,
    title: "Scan Licenses",
    desc: "Identify software license compliance across all codebase files."
  },
  {
    icon: UserCheck,
    title: "Scan Copyrights",
    desc: "Extract copyrights, authors, and email information automatically."
  },
  {
    icon: GitCompare,
    title: "Diff Trees",
    desc: "View side-by-side license and bucket differences between trees."
  },
  {
    icon: Tag,
    title: "Tag & Annotate",
    desc: "Tag compliance statuses and attach custom notes to files."
  },
  {
    icon: FileSpreadsheet,
    title: "Custom Reporting",
    desc: "Generate files reports based on your custom classification scheme."
  }
];

export default function HomeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [authenticated, setAuthenticated] = useState(false);
  const [values, setValues] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setAuthenticated(isAuth());
  }, [pathname]);

  const { username, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await fetchToken(values);
      await getUserSelf();
      await fetchAllGroups();
      router.push(routes.browse);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
      setShowError(true);
    }
  };

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setErrorMessage(message);
      setShowError(true);
      router.replace(pathname);
    }
  }, [searchParams, router]);

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="py-12 md:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Info Section */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {/* The Glowing Status Dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open Source Compliance
            </span>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-700 dark:text-slate-200 lg:leading-[1.15]">
              Getting Started with <span className="text-brand-900 dark:text-brand-700">FOSSology</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed font-normal">
              FOSSology is a complete, open-source software compliance framework and toolkit. Easily upload your codebase to scan for software licenses, copyrights, author information, and compliance issues.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Core Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-200/60 dark:border-zinc-800/60 bg-slate-50 dark:bg-zinc-900/40 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors duration-200">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-brand-100/40 dark:bg-brand-900/20 text-brand-900 dark:text-brand-700 shrink-0">
                    <feature.icon className="size-5 text-brand-900 dark:text-brand-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Where to Begin Panel */}
          <div className="border border-border/80 bg-muted/40 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="size-5 text-brand-900 dark:text-brand-700" />
              Where to Begin
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <ChevronRight className="size-4 shrink-0 mt-0.5 text-brand-900 dark:text-brand-700" />
                <span>The menu at the top contains all the primary capabilities of FOSSology.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ChevronRight className="size-4 shrink-0 mt-0.5 text-brand-900 dark:text-brand-700" />
                <span>
                  <strong>Login:</strong> Depending on your account&apos;s access rights, you may be able to upload files, schedule analysis tasks, or even add new users.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Login Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
          {!authenticated && (
            <Card className="w-full max-w-md border border-border bg-card shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <CardHeader className="space-y-2 pt-8 pb-6 px-6 md:px-8 border-b border-border/40">
                <CardTitle className="text-2xl font-bold text-foreground">
                  Log in to your account
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground font-medium">
                  Hello there! Welcome back to FOSSology.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6 pb-8 px-6 md:px-8 space-y-6">
                {/* Secure warning banner */}
                <div className="rounded-lg bg-warning-100 dark:bg-warning-700/10 border border-warning-500/20 px-4 py-3 text-sm text-warning-700 dark:text-warning-400 flex gap-3">
                  <AlertTriangle className="size-5 shrink-0 mt-0.5 text-warning-600 dark:text-warning-500" />
                  <span className="leading-relaxed">
                    This login uses HTTP, so passwords are transmitted in plain text. This is not a secure connection.
                  </span>
                </div>

                {showError && (
                  <AlertBanner
                    type="Error"
                    title="An error occurred"
                    description={errorMessage}
                    showClose={false}
                  />
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label htmlFor="username" className="block text-sm font-semibold text-foreground">
                      Username
                    </label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={handleChange("username")}
                      disabled={loading}
                      className="h-10 text-sm rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={handleChange("password")}
                        disabled={loading}
                        className="h-10 text-sm rounded-lg pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 text-sm font-semibold rounded-lg bg-brand-900 text-white hover:bg-brand-900/90 dark:bg-brand-900 dark:hover:bg-brand-900/80 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-55 active:scale-[0.98] cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}