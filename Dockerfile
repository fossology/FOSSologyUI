# FOSSology Dockerfile

#  Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)
#  SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

#  SPDX-License-Identifier: GPL-2.0-only

#  This program is free software; you can redistribute it and/or
#  modify it under the terms of the GNU General Public License
#  version 2 as published by the Free Software Foundation.
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.

#  You should have received a copy of the GNU General Public License along
#  with this program; if not, write to the Free Software Foundation, Inc.,
#  51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

# Description: Docker container image recipe

FROM node:22.17-slim

LABEL maintainer="Fossology <fossology@fossology.org>"

ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL

ARG NEXT_PUBLIC_HTTPS
ENV NEXT_PUBLIC_HTTPS=$NEXT_PUBLIC_HTTPS

WORKDIR /fossologyui

RUN npm install -g pnpm@latest-10

COPY . .

RUN pnpm install \
 && pnpm build

EXPOSE 3000

CMD [ "pnpm", "start" ]
