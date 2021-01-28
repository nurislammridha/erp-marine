import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, Card, Button } from "react-bootstrap";
import SimpleModal from "../../../master/components/Modal/SimpleModal";

const UserModal = ({ show, setShow }) => {
  return (
    <div>
      <SimpleModal
        show={show}
        handleClose={() => setShow(false)}
        handleShow={() => setShow(true)}
        modalTitle={"Assign Roles"}
      >
        <Form.Group>
          <Form.Label className="formFont pl-1"> Assign Roles</Form.Label>
          <Form.Control className="formHeight" type="text" placeholder="Type" />
        </Form.Group>
        <Button variant="primary">Submit</Button>
      </SimpleModal>
    </div>
  );
};

export default UserModal;
