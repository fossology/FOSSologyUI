/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com), Aman Dwivedi (aman.dwivedi5@gmail.com)
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

// src/components/Tooltip/index.jsx
import React from "react";
import PropTypes from "prop-types";
import {
  Tooltip as ShadTooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";
import Image from "next/image";

const Tooltip = ({ title }) => {
  return (
    <ShadTooltip>
      <TooltipTrigger asChild>
        <Image
          src="/assets/icons/Alert/InfoNotFilled.svg"
          alt="Info"
          width="20"
          height="20"
          className="cursor-pointer"
        />
      </TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            className="max-w-46 whitespace-normal break-words leading-snug"
          >{title}
      </TooltipContent>
    </ShadTooltip>
  );
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired
};

export default Tooltip;
