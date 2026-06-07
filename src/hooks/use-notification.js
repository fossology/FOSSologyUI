/*
 SPDX-FileCopyrightText: 2025 Antigravity AI

SPDX-License-Identifier: GPL-2.0-only

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
*/

import { toast } from "sonner";

/**
 * Custom hook to handle notifications using sonner.
 * Addresses Issue #157.
 */
export const useNotification = () => {
  const notify = (message, options = {}) => {
    return toast(message, options);
  };

  const success = (message, options = {}) => {
    return toast.success(message, {
      ...options,
      style: {
        background: 'var(--success-bg, #e6ffed)',
        borderColor: 'var(--success-border, #b7eb8f)',
        color: 'var(--success-text, #14532d)',
      },
    });
  };

  const error = (message, options = {}) => {
    return toast.error(message, {
      duration: 5000, // Addresses Issue #154 in the new hook
      ...options,
      style: {
        background: 'var(--error-bg, #fff1f0)',
        borderColor: 'var(--error-border, #ffa39e)',
        color: 'var(--error-text, #721c24)',
      },
    });
  };

  const info = (message, options = {}) => {
    return toast.info(message, options);
  };

  const warning = (message, options = {}) => {
    return toast.warning(message, options);
  };

  return {
    notify,
    success,
    error,
    info,
    warning,
    dismiss: toast.dismiss,
  };
};
