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

import { Eye, EyeOff } from "lucide-react"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
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

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-white py-10 text-gray-800 mx-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12">
        {/* Left: Intro Content */}
        <div>
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            Getting Started with FOSSology
          </h1>

          <p className="text-base font-semibold mb-4">
            <span className="font-bold">FOSSology</span> is a framework for software analysis tools. With it, you can:
          </p>

          <ul className="list-disc list-inside space-y-1 text-sm mb-6">
            <li>Upload files into the fossology repository.</li>
            <li>Unpack files (zip, tar, bz2, iso's, and many others) into its component files.</li>
            <li>Browse upload file trees.</li>
            <li>View file contents and meta data.</li>
            <li>Scan for software licenses.</li>
            <li>Scan for copyrights and other author information.</li>
            <li>View side-by-side license and bucket differences between file trees.</li>
            <li>Tag and attach notes to files.</li>
            <li>Report files based on your own custom classification scheme.</li>
          </ul>

          <h2 className="text-base font-semibold mb-2">Where to Begin</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>The menu at the top contains all the primary capabilities of FOSSology.</li>
            <li>
              Login: Depending on your account&apos;s access rights, you may be able to upload files,
              schedule analysis tasks, or even add new users.
            </li>
          </ul>
        </div>

        {/* Right: Login Form */}
        {!authenticated && (
          <Card className="bg-muted p-6 w-full max-w-md border-0">
            <CardHeader className="p-0 pb-0">
                <CardTitle className="text-2xl font-bold text-foreground">
                  Log in to your account
                </CardTitle>
                <CardDescription className="text-base font-semibold text-foreground mt-2">
                  Hello there! Welcome to FOSSology
                </CardDescription>
                <p className="text-sm font-normal text-foreground mt-2">
                  This login uses HTTP, so passwords are transmitted in plain text. This is not a secure connection.
                </p>
            </CardHeader>

            <CardContent className="p-0 pt-2 space-y-6">
            {showError && (
              <div className="mb-4">
                <AlertBanner
                  type="Error"
                  title="An error occurred"
                  description={errorMessage}
                  showClose={false}
                />
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" className="block mb-2">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleChange("username")}
                  disabled={loading}
                />

              </div>

              <div>
                <Label htmlFor="password" className="block mb-2">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChange("password")}
                    disabled={loading}
                  />


                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 text-base rounded-[4px]"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
}