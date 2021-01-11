import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChangeCertificateIssueAuthorityInput,
  issueAuthorityEditAction,
  setIssuingAuthorityEditValue,
} from "../../_redux/actions/CertificateIssueAuthorityAction";
// import { Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

const IssueAuthorityEdit = (props) => {
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(setIssuingAuthorityEditValue(props.editData));
  }, [dispatch]);

  const CertificateIssueAuthirityInput = useSelector(
    (state) =>
      state.certificateIssueAuthorityInfo.CertificateIssueAuthirityInput
  );
  const defaultEditData = useSelector(
    (state) => state.certificateIssueAuthorityInfo.editDefaultData
  );
  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeCertificateIssueAuthorityInput(name, value));
  };

  const submiteIssuingAuthority = (data) => {
    dispatch(
      issueAuthorityEditAction(
        CertificateIssueAuthirityInput,
        props.editData.intIssuingAuthorityID
      )
    );
  };

  return (
    <Form onSubmit={handleSubmit(submiteIssuingAuthority)} method="post">
      <Form.Group as={Row} controlId="formAuthorityName">
        <Form.Label column sm="3">
          Authority Name:
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            placeholder="Type Authority name"
            value={CertificateIssueAuthirityInput.strIssuingAuthorityName}
            name="strIssuingAuthorityName"
            ref={register({
              required: false,
              maxLength: 100,
            })}
            onChange={(e) =>
              handleChangeTextInput("strIssuingAuthorityName", e.target.value)
            }
          />
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
            name="isActive"
            register={register}
            value={action.label}
            onChange={(e) => handleChangeTextInput("isActive", e.value)}
            setValue={setValue}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="3"></Form.Label>
        <Col sm="9">
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default IssueAuthorityEdit;
