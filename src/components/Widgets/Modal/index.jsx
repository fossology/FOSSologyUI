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
