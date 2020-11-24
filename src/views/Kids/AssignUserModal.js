import React, { useEffect, useState } from "react";
import { getRoles } from "action";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Modal,
  InputGroup,
} from "reactstrap";
import Select from "react-select";
import { NOT_REQUIRED_ROLES } from "constant";
import { fetchAssianableUsers } from "action";
import { createKidAssign } from "action";

function AssignUserModal({ visible, onClose, kid }) {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignTo, setAssignTo] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    getRoles().then(({ data }) => {
      const newRoles = data.roles.filter(
        ({ name }) => !NOT_REQUIRED_ROLES.includes(name.toLowerCase())
      );
      setRoles(newRoles);
    });
    fetchAssianableUsers(kid.id).then(({ data }) => {
      setUsers(data);
    });
  }, [visible]);

  const onAssignPress = () => {
    createKidAssign(assignTo, role, kid.id).then(() => onClose(true));
  };

  return (
    <Modal className="modal-dialog-centered" isOpen={visible} toggle={onClose}>
      <div className="modal-body p-0">
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            Assign New User
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
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Select
                    className="w-100"
                    classNamePrefix="select"
                    getOptionLabel={(data) => data.username}
                    getOptionValue={(data) => data.id}
                    placeholder="Select user..."
                    onChange={(input) => setAssignTo(input.id)}
                    options={users}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Select
                    className="w-100"
                    classNamePrefix="select"
                    getOptionLabel={(data) => data.name}
                    getOptionValue={(data) => data.id}
                    placeholder="Select role..."
                    onChange={(input) => setRole(input.id)}
                    options={roles}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  disables={!role || !assignTo}
                  onClick={onAssignPress}
                >
                  Assign
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
}

export default AssignUserModal;
