import React, { useState, useEffect } from "react";
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
import { useHistory, Link } from "react-router-dom";

const IssueAuthorityAdd = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(15);
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state.certificateIssueAuthorityInfo.isLoading
  );
  const addStatus = useSelector(
    (state) => state.certificateIssueAuthorityInfo.addStatus
  );
  const CertificateIssueAuthirityInput = useSelector(
    (state) =>
      state.certificateIssueAuthorityInfo.CertificateIssueAuthirityInput
  );
  useEffect(() => {
    if (addStatus) {
      dispatch(getIssuingAuthorities("", "", currentPage));
    }
  }, [addStatus]);
  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeCertificateIssueAuthorityInput(name, value));
  };

  const submiteIssuingAuthority = (data) => {
    dispatch(issueAuthoritySubmitAction(CertificateIssueAuthirityInput));
  };

  return (
    <Form onSubmit={handleSubmit(submiteIssuingAuthority)} method="post">
      <div className="container">
        <Form.Group as={Row} controlId="formAuthorityName">
          <Form.Label className="formFont pl-1 ml-3" column sm="12">
            Authority Name:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              className="formHeight"
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
          <Col sm="12">
            {!isLoading && (
              <Button variant="primary" type="submit" className="saveButton">
                Submit
              </Button>
            )}
            {isLoading && (
              <Button
                variant="primary"
                type="submit"
                className="saveButton"
                disabled={true}
              >
                <span className="p-2"> Submitting...</span>
                <span className="ml-3 spinner spinner-white "></span>
              </Button>
            )}
          </Col>
        </Form.Group>
      </div>
    </Form>
  );
};

export default IssueAuthorityAdd;
