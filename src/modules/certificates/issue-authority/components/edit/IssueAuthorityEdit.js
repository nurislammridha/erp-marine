import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChangeCertificateIssueAuthorityInput,
  issueAuthorityEditAction,
  setIssuingAuthorityEditValue,
  getIssuingAuthorities,
} from "../../_redux/actions/CertificateIssueAuthorityAction";

const IssueAuthorityEdit = (props) => {
  const { register, handleSubmit, setValue } = useForm();
  const [currentPage, setCurrentPage] = useState(15);
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state.certificateIssueAuthorityInfo.isLoading
  );
  const editStatus = useSelector(
    (state) => state.certificateIssueAuthorityInfo.editStatus
  );
  const action = [
    {
      label: "Active",
      value: "1",
    },
    {
      label: "In Active",
      value: "0",
    },
  ];

  useEffect(() => {
    dispatch(setIssuingAuthorityEditValue(props.editData));
    if (editStatus) {
      dispatch(getIssuingAuthorities("", "", currentPage));
    }
  }, [dispatch, editStatus]);

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
          <Form.Label className="formFont pl-1 ml-3" column sm="12">
            Status:
          </Form.Label>
          <Col sm="12">
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
          <Form.Label className="formFont pl-1" column sm="4"></Form.Label>
          <Col sm="12">
            {!isLoading && (
              <Button variant="primary" type="submit" className="saveButton">
                Update
              </Button>
            )}
            {isLoading && (
              <Button
                variant="primary"
                type="submit"
                className="saveButton"
                disabled={true}
              >
                <span className="p-2">
                  <i className="fa fa-check"></i> Updating...
                </span>
                <span className="ml-3 spinner spinner-white "></span>
              </Button>
            )}
          </Col>
        </Form.Group>
      </div>
    </Form>
  );
};

export default IssueAuthorityEdit;
