/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

"use client";

import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ButtonSwitch } from "@/components/ui/button-switch";
import Image from "next/image";
import "./FolderNavigation.css";
import { getAllFolders } from "@/services/folders";

const buildFolderTree = (folders, parent = null) => {
  return folders
    .filter((folder) => folder.parent === parent)
    .map((folder) => ({
      ...folder,
      children: buildFolderTree(folders, folder.id),
    }));
};

const FolderTreeItem = ({
  folder,
  expandedFolders,
  setExpandedFolders,
  selectedFolderId,
  onFolderSelect,
}) => {
  const hasChildren = folder.children.length > 0;
  const expanded = expandedFolders.has(folder.id);
  const folderRef = useRef(null);

  const toggleExpand = (e) => {
    e.stopPropagation();
    if (!hasChildren) return;
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folder.id)) next.delete(folder.id);
      else next.add(folder.id);
      return next;
    });
  };

  const selectFolder = () => onFolderSelect?.(folder.id);

  useEffect(() => {
    if (selectedFolderId === folder.id && folderRef.current) {
      folderRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedFolderId, folder.id]);

  const chevronFilter =
    selectedFolderId === null
      ? "[filter:invert(17%)_sepia(99%)_saturate(2306%)_hue-rotate(204deg)_brightness(91%)_contrast(104%)]"
      : selectedFolderId === folder.id
      ? "[filter:invert(8%)_sepia(95%)_saturate(3200%)_hue-rotate(216deg)_brightness(82%)_contrast(115%)]"
      : "[filter:invert(53%)_sepia(18%)_saturate(970%)_hue-rotate(177deg)_brightness(91%)_contrast(87%)]";

  return (
    <li className={`relative list-none ${hasChildren ? "has-children" : ""}`}>
      <div ref={folderRef} className="flex h-8 items-center">
        {hasChildren && (
          <button
            type="button"
            onClick={toggleExpand}
            className="mr-1 flex h-4 w-4 items-center justify-center"
          >
            <Image
              src={
                expanded
                  ? "/assets/icons/chevron_down/chevron_down_16px.svg"
                  : "/assets/icons/chevron_right/chevron_right_16px.svg"
              }
              width={16}
              height={16}
              alt=""
              className={chevronFilter}
            />
          </button>
        )}
        <span
          onClick={selectFolder}
          className={`cursor-pointer text-sm transition-colors duration-150 ${
            selectedFolderId === folder.id
              ? "font-medium text-tertiary1-900"
              : "text-tertiary1-800"
          }`}
        >
          {folder.name}
        </span>
      </div>

      {expanded && hasChildren && (
        <ul className="tree">
          {folder.children.map((child) => (
            <FolderTreeItem
              key={child.id}
              folder={child}
              expandedFolders={expandedFolders}
              setExpandedFolders={setExpandedFolders}
              selectedFolderId={selectedFolderId}
              onFolderSelect={onFolderSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const getParentIds = (folders, folderId) => {
  const parents = [];
  let current = folders.find((f) => f.id === folderId);
  while (current && current.parent !== null) {
    parents.push(current.parent);
    current = folders.find((f) => f.id === current.parent);
  }
  return parents;
};

const getExpandableFolderIds = (nodes) => {
  const ids = [];
  const traverse = (folders) => {
    folders.forEach((folder) => {
      if (folder.children.length > 0) {
        ids.push(folder.id);
        traverse(folder.children);
      }
    });
  };
  traverse(nodes);
  return ids;
};

const FolderNavigation = ({
  selectedFolderId,
  onFolderSelect,
  folders: foldersProp,  
  onRefresh,             
}) => {
  const [internalFolders, setInternalFolders] = useState([]);

  const [searchValue, setSearchValue]         = useState("");
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [showDropdown, setShowDropdown]       = useState(false);
  const [expandState, setExpandState]         = useState("expand");

  const dropdownRef = useRef(null);

  const folders = foldersProp ?? internalFolders;

  const folderTree            = folders.length ? buildFolderTree(folders) : [];
  const filteredFolders       = folders.filter((f) =>
    f.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const expandableFolderIds   = getExpandableFolderIds(folderTree);


  useEffect(() => {
    if (foldersProp) return; 
    getAllFolders()
      .then((res) => {
        const data = res || [];
        setInternalFolders(data);
        const tree = buildFolderTree(data);
        setExpandedFolders(new Set(getExpandableFolderIds(tree)));
      })
      .catch(console.error);
  }, [foldersProp]);



  useEffect(() => {
    if (!foldersProp || !foldersProp.length) return;
    const tree = buildFolderTree(foldersProp);
    const ids  = getExpandableFolderIds(tree);
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  }, [foldersProp]);

  useEffect(() => {
    if (!expandableFolderIds.length) return;

    const expandedCount = expandableFolderIds.filter((id) =>
      expandedFolders.has(id)
    ).length;

    if (expandedCount === expandableFolderIds.length) {
      setExpandState("expand");
    } else if (expandedCount === 0) {
      setExpandState("collapse");
    }
  }, [expandedFolders, expandableFolderIds]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-auto rounded-md border border-neutral-300 bg-white p-6">
      <h2 className="mb-5 text-[18px] font-semibold">Folder Navigation</h2>

      <ButtonSwitch
        value={expandState}
        onValueChange={(value) => {
          setExpandState(value);
          setExpandedFolders(
            value === "expand" ? new Set(expandableFolderIds) : new Set()
          );
        }}
        options={[
          { label: "Collapse All", value: "collapse" },
          { label: "Expand All",   value: "expand"   },
        ]}
        className="mb-6"
      />

      <div className="relative mb-6" ref={dropdownRef}>
        {!searchValue && (
          <Image
            src="/assets/icons/Search_20px.svg"
            width={20}
            height={20}
            alt="Search"
            className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 [filter:invert(41%)]"
          />
        )}

        <Input
          value={searchValue}
          placeholder="Search folder"
          className={`h-10 ${
            !searchValue ? "pl-10" : "pl-3"
          }`}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setShowDropdown(true);
          }}
        />

        {showDropdown && (
          <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-neutral-300 bg-white shadow-md">
            {filteredFolders.length === 0 ? (
              <div className="px-3 py-2 text-sm text-neutral-600">
                No folders found
              </div>
            ) : (
              filteredFolders.map((folder) => (
                <button
                  key={folder.id}
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-neutral-100"
                  onClick={() => {
                    setSearchValue(folder.name);
                    onFolderSelect?.(folder.id);
                    setShowDropdown(false);

                    const parents = getParentIds(folders, folder.id);

                    setExpandedFolders(
                      new Set([...parents, folder.id])
                    );
                  }}
                >
                  {folder.name}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="h-auto overflow-y-auto">
        {folders.length === 0 ? (
          <div className="text-sm text-muted-foreground">No folders found.</div>
        ) : (
          <ul className="tree-root">
            {folderTree.map((folder) => (
              <FolderTreeItem
                key={folder.id}
                folder={folder}
                expandedFolders={expandedFolders}
                setExpandedFolders={setExpandedFolders}
                selectedFolderId={selectedFolderId}
                onFolderSelect={onFolderSelect}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FolderNavigation;