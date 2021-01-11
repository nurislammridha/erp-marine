import React, { useEffect } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChangeCertificateIssueAuthorityInput,
  issueAuthoritySubmitAction,
  getIssuingAuthorities,
} from "../../_redux/actions/CertificateIssueAuthorityAction";
// import { Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

const IssueAuthorityAdd = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state.certificateIssueAuthorityInfo.isLoading
  );
  const addStatus = useSelector(
    (state) => state.certificateIssueAuthorityInfo.addStatus
  );
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
  const CertificateIssueAuthirityInput = useSelector(
    (state) =>
      state.certificateIssueAuthorityInfo.CertificateIssueAuthirityInput
  );
  useEffect(() => {
    if (addStatus) {
      dispatch(getIssuingAuthorities());
    }
  }, [addStatus]);
  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeCertificateIssueAuthorityInput(name, value));
  };

  const submiteIssuingAuthority = (data) => {
    dispatch(issueAuthoritySubmitAction(CertificateIssueAuthirityInput));
    dispatch(getIssuingAuthorities());
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
      {/* <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Status:
        </Form.Label>
        <Col sm="9">
          <RHFInput
            as={<Select options={action} />}
            rules={{ required: false }}
            name="isActiveStatus"
            register={register}
            value={action.label}
            setValue={""}
          />
        </Col>
      </Form.Group> */}
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="3"></Form.Label>
        <Col sm="9">
          {!isLoading && (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
          {isLoading && (
            <Button variant="primary" type="submit" disabled={true}>
              <span className="p-2">
                <i className="fa fa-check"></i> Submitting...
              </span>
              <span className="ml-3 spinner spinner-white "></span>
            </Button>
          )}
        </Col>
      </Form.Group>
    </Form>
  );
};

export default IssueAuthorityAdd;
