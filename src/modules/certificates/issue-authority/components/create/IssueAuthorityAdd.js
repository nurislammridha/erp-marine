import React from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";

const IssueAuthorityAdd = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const action = [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "In Active",
      value: 2,
    },
  ];

  return (
    <Form>
      <Form.Group as={Row} controlId="formAuthorityName">
        <Form.Label column sm="3">
          Authority Name:
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" placeholder="Type Authority name" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Status:
        </Form.Label>
        <Col sm="9">
          <RHFInput
            as={<Select options={action} />}
            rules={{ required: false }}
            name="intVesselID"
            register={register}
            value={action.label}
            setValue={""}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="3"></Form.Label>
        <Col sm="9">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default IssueAuthorityAdd;
