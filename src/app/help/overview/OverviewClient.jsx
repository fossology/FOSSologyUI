/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

"use client";

import React from "react";
import Image from "@/components/Widgets/Image";
import externalLinks from "@/constants/externalLinks";

const architectureItems = [
  {
    title: "Software Repository",
    desc: "Stores files uploaded for analysis.",
  },
  {
    title: "Database",
    desc: "Stores user accounts, file information, and analysis results.",
  },
  {
    title: "Agents",
    desc: "Perform analysis of files and data found in the Software Repository and Database.",
  },
  {
    title: "Scheduler",
    desc: "Runs the agents while efficiently using system resources.",
  },
  {
    title: "Web GUI",
    desc: "Provides browser-based user interaction with FOSSology.",
  },
  {
    title: "Command Line Utilities",
    desc: "Allows scripting and automation for advanced users.",
  },
];

export default function OverviewPage() {
  return (
    <div className="main-container mx-auto max-w-6xl px-4 py-10 flex flex-col gap-16">

      {/* HERO SECTION */}

      <section className="flex flex-col md:flex-row items-center gap-12 bg-white border border-gray-200 rounded-xl p-8">

        <div className="flex-1">

          <h1 className="text-3xl font-bold text-primary-color mb-4">
            The FOSSology Toolset
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
            FOSSology is a framework designed for open source license compliance
            and software analysis. It helps organizations scan, review and
            manage licensing obligations across software packages.
          </p>

          <ul className="triangle-bullets text-gray-700 space-y-2">
            <li>Find license references in software</li>
            <li>Browse uploaded file hierarchies</li>
            <li>Extract copyrights, URLs and emails</li>
            <li>Classify licenses into customizable categories</li>
            <li>Inspect package metadata (RPM, APT)</li>
          </ul>

        </div>

        <div className="flex-shrink-0">
          <Image
            src="/assets/images/microscope1.svg"
            alt="research illustration"
            width={260}
            height={260}
            className="w-52 md:w-60 h-auto"
          />
        </div>

      </section>

      {/* GUI SECTION */}

      <section className="grid md:grid-cols-2 gap-10 items-center">

        <div className="rounded-xl border border-gray-200  p-8 flex justify-center">
          <Image
            src="/assets/images/websearch.svg"
            alt="FOSSology interface illustration"
            width={260}
            height={260}
            className="h-auto"
          />
        </div>

        <div>

          <h2 className="text-2xl font-semibold text-primary-color mb-4">
            FOSSology Graphical User Interface
          </h2>

          <p className="text-gray-600 leading-relaxed mb-5">
            FOSSology provides a powerful web-based interface that enables teams
            to perform software license compliance tasks directly from the browser.
            Most workflows can be completed without using the command line.
          </p>

          <ul className="triangle-bullets text-gray-700 space-y-2">
            <li>Upload and inspect source code packages</li>
            <li>Navigate software file hierarchies</li>
            <li>Review license detection results</li>
            <li>Organize licenses into review categories</li>
            <li>Manage analysis tasks visually</li>
          </ul>

        </div>

      </section>

      {/* HOW TO BEGIN */}

      <section className="bg-white border border-gray-200 rounded-xl p-8">

        <h2 className="text-2xl font-semibold text-primary-color mb-3">
          How to Begin
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed max-w-2xl">
          The navigation menu at the top provides access to all major
          capabilities within FOSSology. Most features require authentication
          before they become available.
        </p>

        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 border-l-4"
          style={{ borderLeftColor: "var(--color-primary, #0073b7)" }}>

          <p className="font-semibold text-gray-800 mb-1">
            Login
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            Logging in unlocks additional functionality. Depending on your
            account permissions, you may upload software packages, run
            analysis agents, review license findings, or manage user access.
          </p>

        </div>

      </section>

      {/* ARCHITECTURE */}

      <section>

        <h2 className="text-2xl font-semibold text-primary-color mb-3">
          Inside FOSSology
        </h2>

        <p className="text-gray-600 mb-8 max-w-2xl">
          FOSSology is built from several modular components that work
          together to analyze software and manage compliance workflows.
        </p>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* ARCHITECTURE GRID */}

          <div className="grid sm:grid-cols-2 gap-4 flex-1">

            {architectureItems.map(({ title, desc }) => (

              <div
                key={title}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition"
              >

                <p className="font-semibold text-gray-800 mb-1">
                  {title}
                </p>

                <p className="text-sm text-gray-600">
                  {desc}
                </p>

              </div>

            ))}

          </div>

          {/* PIPELINE DIAGRAM */}

          <div className="lg:w-80 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col items-center">

            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
              System Workflow
            </h3>

            <div className="w-full bg-gray-50 rounded-lg p-4 flex justify-center">
              <Image
                src="/assets/images/fossologyFlow1.svg"
                alt="FOSSology architecture workflow diagram"
                width={260}
                height={320}
                className="w-full max-w-[240px] h-auto"
              />
            </div>

            <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
              This diagram illustrates how the Web GUI interacts with the repository,
              scheduler and analysis agents to process uploaded software packages.
            </p>

          </div>

        </div>

      </section>

      {/* HELP / CTA */}

      <section className="flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-white p-8">

        <div>

          <h2 className="text-2xl font-semibold text-primary-color mb-2">
            Need Some Help?
          </h2>

          <p className="text-gray-600 text-sm max-w-md">
            Explore official documentation, FAQs and community resources
            to learn more about FOSSology and its compliance workflows.
          </p>

        </div>

        <a
          href={externalLinks.fossologyWebsite}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm hover:shadow-md transition"
          style={{ background: "var(--color-primary, #0073b7)" }}
        >
          Visit FOSSology Website →
        </a>

      </section>

    </div>
  );
}