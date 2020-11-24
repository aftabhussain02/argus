import React from "react";
import { Button, Modal } from "reactstrap";

export function ConfirmationModal({ visible, onConfirm, onCancel }) {
  return (
    <Modal
      className="modal-dialog-centered modal-danger"
      contentClassName="bg-gradient-danger"
      isOpen={visible}
      toggle={onCancel}
    >
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-notification">
          Your attention is required
        </h6>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={onCancel}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <h4 className="heading mt-4">Are you sure?</h4>
          <p>You can't undo this action, please be sure before proceeding.</p>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          className="btn-white"
          color="default"
          onClick={onConfirm}
          type="button"
        >
          Confirm
        </Button>
        <Button
          className="text-white ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
