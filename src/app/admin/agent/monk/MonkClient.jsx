/*
 SPDX-FileCopyrightText: 2026 Tiyasa Kundu (tiyasakundu20@gmail.com)

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

import React, { useState } from "react";

// Widgets
import { Spinner } from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert";

// Helper
import { handleError } from "@/shared/helper";

const MonkClient = () => {
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({
    type: "success",
    text: "",
  });

  const handleRenew = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: call renewMonkRevision()

      setMessage({
        type: "success",
        text: "You have renewed the monk revision.",
      });
    } catch (error) {
      handleError(error, setMessage);
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const alertType =
    message.type === "danger" || message.type === "error"
      ? "Error"
      : message.type === "success"
      ? "Success"
      : "Info";

  return (
    <div>
      {showMessage && (
        <div className="mb-4">
          <AlertBanner
            type={alertType}
            description={message.text}
            showClose
            onClose={() => setShowMessage(false)}
          />
        </div>
      )}

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Monk
      </h1>

      <form onSubmit={handleRenew} className="space-y-6">
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            variant="default"
            size="default"
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Renew monk revision"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MonkClient;