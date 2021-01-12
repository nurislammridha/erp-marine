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
    getCertificateParentCategoryData,
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

      const certificateParentCategoryList = useSelector(
        (state) => state.CertificateCategoryReducer.certificateParentCategoryList
      );

      useEffect(() => {
        dispatch(getCertificateParentCategoryData());
        dispatch(setCertificateCategoryEditValue(props.editData));
      }, [dispatch]);

      const CertificateCategoryInput = useSelector(
        (state) =>
          state.CertificateCategoryReducer.certificateCategoryInput
      );

      const categoryInputChange = (name, value) => {
        dispatch(handleCertificateCategoryInput(name, value));
      };

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
        <div className="col-md-12">
          <Form.Group as={Row} controlId="formAuthorityName">
          <Form.Label column sm="3">
          Certificate Category Name:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="Certificate Category name"
              value={CertificateCategoryInput.strCertificateCategoryName}
              name="strCertificateCategoryName"
              ref={register({
                required: false,
                maxLength: 100,
              })}
              onChange={(e) =>
                handleChangeTextInput("strCertificateCategoryName", e.target.value)
              }
            />
          </Col>
          </Form.Group>
        </div>
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

        <div className="col-md-12">
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
        </div>

        <div className="col-md-12">
        <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Parent Category:
        </Form.Label>
        <Col sm="9">
          <RHFInput
            as={<Select options={certificateParentCategoryList} />}
            rules={{ required: false }}
            name="intParentsCategoryID"
            register={register}
            value={certificateParentCategoryList.intParentsCategoryID}
            onChange={(option) => {
              categoryInputChange("strCertificateCategoryName", option.label);
              categoryInputChange("intParentsCategoryID", option.value);
            }}
            setValue={setValue}
          />
        </Col>
        </Form.Group>
      </div>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="3"></Form.Label>
          <Col sm="9">

            {/*<Button variant="primary" type="submit">
              Update
            </Button>*/}

            {isLoading && (
              <button type="submit" class="btn btn-primary saveButton text-white" disabled={true}>
                <span className="p-2">Updating...</span>
                <span className="ml-3 spinner spinner-white "></span>
              </button>
            )}
    
            {!isLoading && (
              <button type="submit" class="btn btn-primary saveButton text-white">
                <span>Update</span>
              </button>
            )}
          </Col>
        </Form.Group>
      </Form>
    );
};

export default CertificateCategoryEdit;
