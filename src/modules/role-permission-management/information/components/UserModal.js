import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, Card, Button } from "react-bootstrap";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// import { colourOptions } from "../data";

// const animatedComponents = makeAnimated();
const UserModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="btn-sm">
        Assign Roles
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {/* <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti
            options={colourOptions}
          /> */}
          <Form.Group>
            <Form.Label className="formFont pl-1">Input</Form.Label>
            <Form.Control
              className="formHeight"
              type="text"
              placeholder="Type"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserModal;
