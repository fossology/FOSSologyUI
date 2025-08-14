/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)

 SPDX-License-Identifier: GPL-2.0

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

import React, { useState } from "react";
import search from "@/services/search";
import { initialState, initialMessageSearch, entriesOptions } from "../../constants/constants";
import { Alert } from "@/components/Widgets";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";


const SearchClient = () => {
  const [searchData, setSearchData] = useState(initialState);
  const [searchResult, setSearchResult] = useState("");
  const [pagesOptions, setPagesOptions] = useState();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(initialMessageSearch);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    search(searchData)
      .then((result) => {
        setSearchResult(result.search);
        const arr = [];
        for (let i = 0; i < result.pages; i++) {
          arr.push({ id: i + 1, value: i + 1 });
        }
        setPagesOptions(arr);
      })
      .catch((error) => {
        setMessage({ type: "danger", text: error.message });
        setShowMessage(true);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    setSearchData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === "limit" ? { page: 1 } : {})
    }));
  };

  const uploadOptions = [
    { id: "all", name: "All uploads" },
    { id: "123", name: "Project1_Upload" },
    { id: "456", name: "Log_Analysis_2023" },
    { id: "457", name: "Log_Analysis_2023" },
    { id: "458", name: "Log_Analysis_2023" },
    { id: "459", name: "Log_Analysis_2023" },
    { id: "451", name: "Log_Analysis_2023" },
    { id: "450", name: "Log_Analysis_2023" },
  ]

  return (
    <div className="min-h-screen mx-40 py-8">
      {showMessage && (
        <Alert type={message.type} setShow={setShowMessage} message={message.text} />
      )}

      <h1 className="text-3xl font-semibold text-[#101010] mb-4">Search</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload type */}
        <div className="space-y-4">
          <p className="text-lg font-medium text-[#101010]">Limit search to:</p>
          <RadioGroup
            value={searchData.searchType}
            onValueChange={(val) => setSearchData(prev => ({ ...prev, searchType: val }))}
            className="space-y-2"
          >
            <div className="flex items-start gap-2">
              <RadioGroupItem
                value="directory"
                id="directory"
                className="w-4 h-4 mt-1"
              />
              <Label htmlFor="directory" className="text-base text-[#101010]">
                Containers only (rpms, tars, isos, etc), including directories.
              </Label>
            </div>

              <div className="flex items-start gap-2">
                <RadioGroupItem
                  value="containers"
                  id="containers"
                  className="w-4 h-4 mt-1"
                />
                <Label htmlFor="containers" className="text-base text-[#101010]">
                  Containers only (rpms, tars, isos, etc), excluding directories. The filtering for license or copyright is not supported in this case.
                </Label>
              </div>

            <div className="flex items-start gap-2">
              <RadioGroupItem
                value="allfiles"
                id="allfiles"
                className="w-4 h-4 mt-1"
              />
              <Label htmlFor="allfiles" className="text-base text-[#101010]">
                All Files
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Required search criteria */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="search-criteria">
            <AccordionTrigger className="flex w-full items-center justify-between text-lg font-semibold mb-2 transition-all">
                You must choose one or more search criteria (not case sensitive)
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pb-2">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Choose upload to search into:
                </label>
                <Select
                  name="uploadId"
                  onValueChange={(value) =>
                    handleChange({ target: { name: "uploadId", value } })
                  }
                >
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue placeholder="All uploads" />
                  </SelectTrigger>
                  <SelectContent className="max-h-48 overflow-y-auto">
                    {uploadOptions.map((upload) => (
                      <SelectItem key={upload.id} value={String(upload.id)}>
                        {upload.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Enter the filename to find:
                </label>
                <Input
                  type="text"
                  name="filename"
                  value={searchData.filename}
                  onChange={handleChange}
                  placeholder="Enter filename"
                />
                <p className="text-sm text-[#00669D] mt-1">
                  You can use '%' as a wild-card. For example: '%v3.war', or 'mypkg%.tar'.
                </p>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  File size is ≥
                </label>
                <Input
                  type="text"
                  name="filesizemin"
                  value={searchData.filesizemin}
                  onChange={handleChange}
                  placeholder="Enter file size in bytes"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  File size is ≤
                </label>
                <Input
                  type="text"
                  name="filesizemax"
                  value={searchData.filesizemax}
                  onChange={handleChange}
                  placeholder="Enter file size in bytes"
                  className={"mb-4"}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

        {/* Optional filters */}
        <AccordionItem value="optional-filters">
          <AccordionTrigger
            className="flex w-full items-center justify-between text-lg font-semibold text-left
            [&[data-state=open]>svg]:rotate-180 after:hidden"
          >
            <span>
              You may also choose one or more optional search filters (not case sensitive)
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">License:</label>
                <Input
                  type="text"
                  name="license"
                  value={searchData.license}
                  onChange={handleChange}
                  placeholder="Enter license"
                />
                <p className="text-sm text-[#00669D] mt-1">For example, '^AGPL$'.</p>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">Copyright:</label>
                <Input
                  type="text"
                  name="copyright"
                  value={searchData.copyright}
                  onChange={handleChange}
                  placeholder="Enter copyright"
                />
                <p className="text-sm text-[#00669D] mt-1">
                  For example, 'Copyright 2014-2020 fossology'.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

        {/* Entries dropdown */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Show</span>
          <Select
            name="limit"
            onValueChange={(value) =>
              handleChange({ target: { name: "limit", value } })
            }
          >
            <SelectTrigger className="h-8 py-1 text-sm w-fit">
              <SelectValue placeholder={searchData.limit || entriesOptions[0].entry} />
            </SelectTrigger>
            <SelectContent>
              {entriesOptions.map((opt) => (
                <SelectItem key={opt.entry} value={String(opt.entry)}>
                  {opt.entry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>entries</span>
        </div>

        {/* Submit */}
        <div>
        <Button
          type="submit"
          disabled={loading || !searchData.searchType || !searchData.uploadId?.trim() && !searchData.filename?.trim() && !searchData.filesizemin?.trim() && !searchData.filesizemax?.trim()}
          className="bg-[#004494] text-white h-10 px-8 py-2 rounded text-base font-medium hover:bg-[#00095C] disabled:bg-[#9EB9D3] disabled:text-white"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
        </div>
      </form>

      {/* Search results */}
      {searchResult && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">
            {searchResult.length} files matching your search result.
          </h3>
          {searchResult.map(({ uploadTreeId, uploadName, folderName, fileName }, index) => (
            <div key={uploadTreeId} className="p-4 border border-gray-300 rounded mb-3">
              <div className="font-medium">
                {index + 1}. Folder: {folderName}
              </div>
              <div className="ml-3 text-sm text-gray-700">
                {uploadName}/{fileName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchClient;
