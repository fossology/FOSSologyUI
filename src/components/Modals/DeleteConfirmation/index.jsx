import PropTypes from "prop-types";
import React from "react";
import Spinner from "react-bootstrap/Spinner";

import { Button } from "../../Widgets";

const DeleteConfirmation = ({ callBack, loading }) => {
  return (
    <>
      <div
        className="modal fade"
        id="deleteConfirmationModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are you sure ?</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Do you really want to delete this group ? This process can not be
              undone.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary border-dark border-rounded px-4 py-2 mr-2"
                data-dismiss="modal"
                onClick={() => {}}
              >
                Cancel
              </button>
              <Button
                type="button"
                onClick={() => callBack()}
                className="btn btn-danger border-dark border-rounded px-5 py-2"
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
                  "YES"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DeleteConfirmation.propTypes = {
  callBack: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default DeleteConfirmation;
