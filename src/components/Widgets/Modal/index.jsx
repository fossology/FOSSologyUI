/*
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

import React from "react";
import { Button, Spinner } from "@/components/Widgets";

const Modal = ({ 
  id = "modal", 
  title = "Confirm Action", 
  show = false, 
  onClose, 
  onConfirm, 
  loading = false, 
  children, 
  confirmText = "Confirm", 
  cancelText = "Cancel"
}) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop show">
      <div className="modal d-block" tabIndex="-1" role="dialog" id={id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                onClick={onClose}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <Button type="button" className="btn-secondary" onClick={onClose}>
                {cancelText}
              </Button>
              <Button type="button" onClick={onConfirm}>
                {loading ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  confirmText
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
