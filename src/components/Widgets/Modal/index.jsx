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

import React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Modal = ({
  id = "modal",
  title = "Confirm Action",
  show = false,
  onClose,
  onConfirm,
  loading = false,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  showInstanceSlot = false,
  instanceSlotText = "Instance slot",
  showCommentField = false,
  comment = "",
  onCommentChange,
}) => {
  if (!show) {
    return null;
  }

  const isDanger = variant === "danger";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      role="presentation"
    >
      <div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="relative w-full max-w-[580px] rounded-[4px] bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7">
          <div className="flex items-center gap-3">
            {isDanger && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <span className="text-xl text-orange-500">
                  ⚠
                </span>
              </div>
            )}

            <h2
              id={`${id}-title`}
              className="text-xl font-semibold text-gray-800"
            >
              {title}
            </h2>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 p-0 text-tertiary1-800 hover:bg-transparent cursor-pointer"
          >
            <img
              src="/assets/icons/Close/Close_24px.svg"
              alt=""
              width={24}
              height={24}
              className="rotate-180"
            />
          </Button>
        </div>

        {/* Body */}
        {(children ||
          showInstanceSlot ||
          showCommentField) && (
          <div className="px-8 pt-5">
            {children}

            {showCommentField && (
              <div className="space-y-2">
                <label
                  htmlFor={`${id}-comment`}
                  className="block text-sm text-gray-700"
                >
                  Please enter a reason for status change
                </label>

                <Textarea
                  id={`${id}-comment`}
                  value={comment}
                  onChange={(event) =>
                    onCommentChange?.(
                      event.target.value
                    )
                  }
                  placeholder="Type your comment here"
                  className="min-h-[56px] resize-none text-sm"
                />
              </div>
            )}

            {showInstanceSlot && (
              <div className="mt-3 flex min-h-[48px] items-center justify-center rounded border border-dashed border-indigo-400 text-sm text-gray-700">
                {instanceSlotText}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-4 px-8 pb-7 pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant={
              isDanger
                ? "destructive"
                : "default"
            }
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;