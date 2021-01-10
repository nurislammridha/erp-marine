import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
// import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { 
    certificatecategorySubmitAction,
    setCertificateCategoryEditValue,
    handleCertificateCategoryInput,
} from "../../_redux/actions/CertificateCategoryAction";


const CertificateCategoryEdit = (props) => {
    const history = useHistory();
    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();

    const action = [
        {
          label: "Active",
          value: 0,
        },
        {
          label: "In Active",
          value: 1,
        },
      ];

      useEffect(() => {
        // dispatch(setCertificateCategoryEditValue(props.editData));
      }, []);

      const CertificateCategoryInput = useSelector(
        (state) =>
          state.CertificateCategoryReducer.certificateCategoryInput
      );
      const handleChangeTextInput = (name, value) => {
        dispatch(handleCertificateCategoryInput(name, value));
      };

      const submiteCategory = (data) => {
        dispatch(certificatecategorySubmitAction(CertificateCategoryInput));
      };

    return (
        <Form onSubmit={handleSubmit(submiteCategory)} method="post">
        <Form.Group as={Row} controlId="formAuthorityName">
          <Form.Label column sm="3">
          Certificate Category Name:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="Certificate Category name"
              value={CertificateCategoryInput.strCertificateCategoriName}
              name="strCertificateCategoriName"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("strCertificateCategoriName", e.target.value)
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
};

export default CertificateCategoryEdit;
