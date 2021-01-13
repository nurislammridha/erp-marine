import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getCertificateTypeList,
  handleChangeCertificateTypeInput,
  UpdateCertificateTypeList,
} from "../../_redux/actions/CertificateTypeAction";

const CertificateTypeEdit = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();
  const certificateTypeInput = useSelector(
    (state) => state.certificateTypeInfo.certificateTypeInput
  );
  const isLoading = useSelector((state) => state.certificateTypeInfo.isLoading);
  const editStatus = useSelector(
    (state) => state.certificateTypeInfo.editStatus
  );

  const statusOptions = [
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
    if (editStatus) {
      dispatch(getCertificateTypeList());
    }
  }, [editStatus]);

  const handleChangeTextInput = (name, value) => {
    dispatch(handleChangeCertificateTypeInput(name, value));
  };

  const onSubmit = () => {
    dispatch(UpdateCertificateTypeList(certificateTypeInput));
  };

  return (
    <>
      <form
        className="form form-label-right"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <div className="container">
          <Form.Group as={Row} controlId="formAuthorityName">
            <Form.Label className="formFont pl-1 ml-3" column sm="12">
              Certificate Type Name:
            </Form.Label>
            <Col sm="12">
              <Form.Control
                className="formHeight"
                type="text"
                value={certificateTypeInput.strCertificateTypeName}
                name="strCertificateTypeName"
                ref={register({
                  required: false,
                  maxLength: 100,
                })}
                onChange={(e) =>
                  handleChangeTextInput(
                    "strCertificateTypeName",
                    e.target.value
                  )
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
                as={<Select options={statusOptions} />}
                rules={{ required: false }}
                name="isActive"
                register={register}
                value={statusOptions.value}
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
                  <span className="p-2">Updating...</span>
                  <span className="ml-3 spinner spinner-white "></span>
                </Button>
              )}
            </Col>
          </Form.Group>
        </div>
      </form>
    </>
  );
};

export default CertificateTypeEdit;
