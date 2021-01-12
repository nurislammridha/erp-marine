import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
// import { Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { certificateMasterEditAction, handleChangeCertificateMasterInput, setMasterCertificateEditValue } from "../../_redux/actions/CertificateListAction";

const CertificateMasterEdit = (props) => {

const isLoading = useSelector((state) => state.CertificateCategoryReducer.isLoading);
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const action = [
    {
      label: "Active",
      value:"1",
    },
    {
      label: "In Active",
      value: "0",
    },
  ];
  const vesselName = [
    {
        label: 'Akij Noor',
        value: "1"
    },
    {
        label: 'Akij Pearl',
        value: "0"
    }
];

const certificatesCategoryOptionData = useSelector((state) => state.certificateMainInfo.certificatesCategoryOptionData);
  const certificateMainInfoChange = (name, value, e = null) => {
    console.log('Name',name,"value",value);
    dispatch(handleChangeCertificateMasterInput(name, value));
  };

  useEffect(() => {
      console.log('props.editData', props.editData);
    dispatch(setMasterCertificateEditValue(props.editData));
  }, [dispatch]);

  const CertificateMasterInput = useSelector(
    (state) =>
      state.CertificateListReducer.certificateMasterInput
  );

  const submitecertificateMaster = (data) => {
    dispatch(
        certificateMasterEditAction(
        CertificateMasterInput,
        props.editData.intCertificateID
      )
    );
  };

  return (
    <>
            <form
                className="form form-label-right"
                onSubmit={handleSubmit(submitecertificateMaster)}
                method="post"
            >
                <div className="form-group row mt-5">
                    <div className="col-md-12">
                        <label className="form-label">Certificate Name</label>
                        <Form.Control className="formFont pl-1"
                            className="formHeight"
                            type="text"
                            value={CertificateMasterInput.strCertificateName}
                            name="strCertificateName"
                            onChange={(e) =>
                                certificateMainInfoChange("strCertificateName", e.target.value)
                              }
                        />
                    </div>
                    
                    <div className="col-sm-6">
                        <label className="form-label">Category Name</label>
                        <RHFInput
                            as={<Select options={certificatesCategoryOptionData} />}
                            rules={{ required: false }}
                            name="intCategoryID"
                            register={register}
                            value={certificatesCategoryOptionData.strCertificateCategoryName}
                            onChange={(option) => {
                                certificateMainInfoChange("strCertificateCategoryName", option.label);
                                certificateMainInfoChange("intCategoryID", option.value);
                              }}
                            setValue={setValue}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10"></div>
                </div>
                {isLoading && (
                <button type="submit" class="btn btn-primary saveButton" disabled={true}>
                    <span className="p-2"><i className="fa fa-check"></i>  updating...</span>
                    <span className="ml-3 spinner spinner-white "></span>
                </button>
                )}

                {!isLoading && (
                <button type="submit" class="btn btn-primary saveButton">
                    <span>update</span>
                </button>
                )}
            </form>
        </>
  )
};

export default CertificateMasterEdit;
