import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
// import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { 
    certificateCategoryEditAction,
    setCertificateCategoryEditValue,
    handleCertificateCategoryInput,
    getCertificateCategoryListData,
} from "../../_redux/actions/CertificateCategoryAction";
import { typeOf } from "react-is";


const CertificateCategoryEdit = (props) => {
  console.log('props', props);
    const history = useHistory();
    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();

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

      {/*useEffect(() => {
        dispatch(setCertificateCategoryEditValue(props.editData));
      }, []);*/}

      useEffect(() => {
        dispatch(setCertificateCategoryEditValue(props.editData));
      }, [dispatch]);

      const CertificateCategoryInput = useSelector(
        (state) =>
          state.CertificateCategoryReducer.certificateCategoryInput
      );

      const status = useSelector((state) => state.CertificateCategoryReducer.editStatus);
      const isLoading = useSelector((state) => state.CertificateCategoryReducer.isLoading);

      const handleChangeTextInput = (name, value) => {
        dispatch(handleCertificateCategoryInput(name, value));
      };

      const updateCertificateCategory = (data) => {
        dispatch(
          certificateCategoryEditAction(
          CertificateCategoryInput,
          props.editData.intCategoryID
      )
        );
      };

      useEffect(() => {
        if(status){
            dispatch(getCertificateCategoryListData());
        }
        
    }, [status])

    return (
        <Form onSubmit={handleSubmit(updateCertificateCategory)} method="post">
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

            {/*<Button variant="primary" type="submit">
              Update
            </Button>*/}

            {isLoading && (
              <button type="submit" class="btn btn-primary saveButton btn-lg" disabled={true}>
                <span className="p-2">Updating...</span>
                <span className="ml-3 spinner spinner-white "></span>
              </button>
            )}
    
            {!isLoading && (
              <button type="submit" class="btn btn-primary saveButton btn-lg">
                <span>Update</span>
              </button>
            )}
          </Col>
        </Form.Group>
      </Form>
    );
};

export default CertificateCategoryEdit;
