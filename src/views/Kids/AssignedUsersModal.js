import React, { useEffect, useState } from "react";
// reactstrap components
import { Button, Media, Modal, Table } from "reactstrap";
import { kidAssignedUsers, deleteKidAssigned } from "action/KidsActions";
import { ConfirmationModal } from "components/Common";
import AssignUserModal from "./AssignUserModal";

function AssignedUsersModal({ visible, onClose, kid }) {
  const [users, setUsers] = useState([]);

  const [removeAssignedId, setRemoveAssignedId] = useState(null);

  const [addNewModalVisible, setAddNewModalVisible] = useState(false);

  useEffect(() => {
    getAssignedUser();
  }, [kid]);

  const getAssignedUser = () => {
    kidAssignedUsers(kid?.id).then(({ data }) => {
      setUsers(data);
    });
  };

  const onPressRemove = () => {
    deleteKidAssigned(removeAssignedId).then(() => {
      getAssignedUser();
      toggleConfirmModal();
    });
  };

  const toggleConfirmModal = (id = null) => setRemoveAssignedId(id);

  const toggleAddNewModal = (reFetch = false) => {
    if (reFetch) {
      getAssignedUser();
    }
    setAddNewModalVisible(!addNewModalVisible);
  };

  const UserRender = ({ assignedTo, id, srno }) => {
    return (
      <tr>
        <td>{srno}</td>
        <th scope="row">
          <Media className="align-items-center">
            {/* <a
              className="avatar rounded-circle mr-3"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <img
                alt="..."
                src={generateImageUrl(user.avatar.formats.thumbnail.url)}
              />
            </a> */}
            <Media>
              <span className="mb-0 text-sm">{assignedTo?.username}</span>
            </Media>
          </Media>
        </th>
        <td className="text-right">
          <Button
            onClick={() => toggleConfirmModal(id)}
            className="btn-icon btn-2"
            color="danger"
            type="button"
          >
            <span className="btn-inner--icon">
              <i className="ni ni-fat-remove" />
            </span>
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Modal className="modal-dialog-centered" isOpen={visible} toggle={onClose}>
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-default">
          Assigned Users List
        </h6>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={onClose}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Sr.</th>
              <th scope="col">Name</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {users.map((data, index) => (
              <UserRender {...data} key={data.id} srno={index + 1} />
            ))}
          </tbody>
        </Table>
      </div>
      <div className="modal-footer">
        <Button color="primary" type="button" onClick={toggleAddNewModal}>
          Assign New
        </Button>
        <Button
          className="ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
      <ConfirmationModal
        visible={removeAssignedId !== null}
        onClose={toggleConfirmModal}
        onConfirm={onPressRemove}
      />
      <AssignUserModal
        kid={kid}
        visible={addNewModalVisible}
        onClose={toggleAddNewModal}
      />
    </Modal>
  );
}

export default AssignedUsersModal;
