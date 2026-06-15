/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
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

import React from "react";
import PropTypes from "prop-types";
import {
  Alert as ShadcnAlert,
  AlertDescription,
} from "@/components/ui/alert";

const typeConfig = {
  success: {
    icon: "/assets/icons/Alert/SuccessFilled.svg",
    containerClass: "bg-success-100 border-0",
    textClass: "text-success-500",
    closeColorClass: "bg-success-500",
  },
  danger: {
    icon: "/assets/icons/Alert/ErrorFilled.svg",
    containerClass: "bg-error-100 border-0",
    textClass: "text-error-600",
    closeColorClass: "bg-error-600",
  },
  error: {
    icon: "/assets/icons/Alert/ErrorFilled.svg",
    containerClass: "bg-error-100 border-0",
    textClass: "text-error-600",
    closeColorClass: "bg-error-600",
  },
  info: {
    icon: "/assets/icons/Alert/InfoFilled.svg",
    containerClass: "bg-info-100 border-0",
    textClass: "text-info-500",
    closeColorClass: "bg-info-500",
  },
  warning: {
    icon: "/assets/icons/Alert/WarningFilled.svg",
    containerClass: "bg-warning-100 border-0",
    textClass: "text-warning-500",
    closeColorClass: "bg-warning-500",
  },
};

const Alert = ({ message, type, setShow }) => {
  const config = typeConfig[type] || typeConfig.info;
  return (
    <div className="mt-3 w-full">
      <ShadcnAlert
        className={`relative flex items-start gap-2 rounded px-4 py-2 text-sm pr-10 ${config.containerClass}`}
      >
        {/* Close button — uses CSS mask so the icon color matches the alert type */}
        <button
          type="button"
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 p-1 rounded hover:bg-black/10"
          aria-label="Close"
        >
          <span
            className={`block w-5 h-5 ${config.closeColorClass} [mask-image:url('/assets/icons/Close/Close_20px.svg')] [mask-size:contain] [mask-repeat:no-repeat]`}
          />
        </button>

        {/* Alert type icon from assets */}
        <img
          src={config.icon}
          alt={type}
          width={24}
          height={24}
          className="mt-0.5 shrink-0"
        />

        <AlertDescription className={`text-sm ${config.textClass}`}>
          {message}
        </AlertDescription>
      </ShadcnAlert>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default Alert;
