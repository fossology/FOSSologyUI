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
*/

'use client';

import React, { useState } from "react";
import search from "@/services/search";
import { initialState, entriesOptions } from "../../constants/constants";
import { useNotification } from "@/hooks/use-notification";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
  const { error, success } = useNotification();
  const [searchData, setSearchData] = useState(initialState);
  const [searchResult, setSearchResult] = useState("");
  const [pagesOptions, setPagesOptions] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    search(searchData)
      .then((result) => {
        setSearchResult(result.search);
        success(`Found ${result.search.length} files matching your search.`);
        const arr = [];
        for (let i = 0; i < result.pages; i++) {
          arr.push({ id: i + 1, value: i + 1 });
        }
        setPagesOptions(arr);
      })
      .catch((err) => {
        error(err.message || "An error occurred during search.");
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
    <div className="min-h-screen py-8 max-w-5xl mx-auto px-4">
      <Card className="border-0 shadow-lg bg-[#F9FAFB]">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900">Advanced Search</CardTitle>
          <CardDescription className="text-gray-500">
            Find files across uploads based on filename, license, or copyright.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <RadioGroupItem value="directory" id="directory" className="w-4 h-4 mt-1" />
                  <Label htmlFor="directory" className="text-base text-[#101010]">
                    Containers only (rpms, tars, isos, etc), including directories.
                  </Label>
                </div>

                <div className="flex items-start gap-2">
                  <RadioGroupItem value="containers" id="containers" className="w-4 h-4 mt-1" />
                  <Label htmlFor="containers" className="text-base text-[#101010]">
                    Containers only (rpms, tars, isos, etc), excluding directories.
                  </Label>
                </div>

                <div className="flex items-start gap-2">
                  <RadioGroupItem value="allfiles" id="allfiles" className="w-4 h-4 mt-1" />
                  <Label htmlFor="allfiles" className="text-base text-[#101010]">
                    All Files
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Required search criteria */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="search-criteria">
                <AccordionTrigger className="text-lg font-semibold">
                  Required Search Criteria
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <Label className="mb-2 block">Choose upload to search into:</Label>
                    <Select
                      name="uploadId"
                      onValueChange={(value) => handleChange({ target: { name: "uploadId", value } })}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="All uploads" />
                      </SelectTrigger>
                      <SelectContent>
                        {uploadOptions.map((upload) => (
                          <SelectItem key={upload.id} value={String(upload.id)}>
                            {upload.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Filename to find:</Label>
                    <Input
                      type="text"
                      name="filename"
                      value={searchData.filename}
                      onChange={handleChange}
                      placeholder="Enter filename (e.g. %v3.war)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">File size ≥ (bytes):</Label>
                      <Input
                        type="text"
                        name="filesizemin"
                        value={searchData.filesizemin}
                        onChange={handleChange}
                        placeholder="Min size"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">File size ≤ (bytes):</Label>
                      <Input
                        type="text"
                        name="filesizemax"
                        value={searchData.filesizemax}
                        onChange={handleChange}
                        placeholder="Max size"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Optional filters */}
              <AccordionItem value="optional-filters">
                <AccordionTrigger className="text-lg font-semibold">
                  Optional Search Filters
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <Label className="mb-2 block">License:</Label>
                    <Input
                      type="text"
                      name="license"
                      value={searchData.license}
                      onChange={handleChange}
                      placeholder="e.g. ^AGPL$"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Copyright:</Label>
                    <Input
                      type="text"
                      name="copyright"
                      value={searchData.copyright}
                      onChange={handleChange}
                      placeholder="e.g. Copyright 2024"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Pagination settings */}
            <div className="flex items-center gap-2 text-sm text-gray-700 pt-4">
              <span>Show</span>
              <Select
                name="limit"
                onValueChange={(value) => handleChange({ target: { name: "limit", value } })}
              >
                <SelectTrigger className="h-8 w-[70px]">
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

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading || !searchData.searchType || (!searchData.uploadId?.trim() && !searchData.filename?.trim() && !searchData.filesizemin?.trim() && !searchData.filesizemax?.trim())}
                className="w-full md:w-auto bg-[#004494] text-white h-11 px-12 hover:bg-[#003377]"
              >
                {loading ? "Searching..." : "Search Files"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search results */}
      {searchResult && (
        <Card className="mt-8 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {searchResult.length} Results Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {searchResult.map(({ uploadTreeId, uploadName, folderName, fileName }, index) => (
              <div 
                key={uploadTreeId} 
                className="p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors bg-white shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">{index + 1}.</span>
                  <div className="font-semibold text-gray-800">Folder: {folderName}</div>
                </div>
                <div className="ml-6 mt-1 text-sm text-gray-600 font-mono italic">
                  {uploadName}/{fileName}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchClient;
