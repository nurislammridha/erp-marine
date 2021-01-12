import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChangeCertificateMasterInput,
  certificateMasterSubmitAction,
  getCertificateMasterList,
} from "../../_redux/actions/CertificateListAction";
import { getCertificateCategory } from "../../../certificate-main/_redux/actions/CertificateMainAction";

const CertificateMasterAdd = () => {
    const history = useHistory();
    const { register, handleSubmit, errors, setValue } = useForm();
    
    const isLoading = useSelector((state) => state.CertificateListReducer.isLoading);
    const addStatus = useSelector((state) => state.CertificateListReducer.addStatus);
    const CertificateMasterInput = useSelector((state) => state.CertificateListReducer.certificateMasterInput);
    const CertificatesCategoryOptionData = useSelector((state) => state.certificateMainInfo.certificatesCategoryOptionData);
    console.log('CertificateMasterInput',CertificateMasterInput);
    const dispatch = useDispatch();
    const statusOptions = [
        {
            label: 'Active',
            value: "1"
        },
        {
            label: 'Inactive',
            value: "0"
        }
    ]

    const vesselName = [
        {
            label: 'Akij Noor',
            value: "1"
        },
        {
            label: 'Akij Pearl',
            value: "0"
        }
    ]

  const certificateMainInfoChange = (name, value) => {
    console.log("Name", name, "value", value);
    dispatch(handleChangeCertificateMasterInput(name, value));
  };

  useEffect(() => {
    if (addStatus) {
        dispatch(getCertificateMasterList());
    }
  }, [addStatus]);

  useEffect(() => {
    dispatch(getCertificateCategory());
  }, []);

  const onSubmit = (data) => {
    dispatch(certificateMasterSubmitAction(CertificateMasterInput));
    dispatch(getCertificateMasterList());
  };

    return (
        <>
            <form
                className="form form-label-right"
                onSubmit={handleSubmit(onSubmit)}
                method="post"
            >
                <div className="form-group row mt-5">
                    <div className="col-md-12">
                        <label className="form-label">Certificate  Name</label>
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
                    {/* <div className="col-sm-6">
                        <label className="form-label">Vessel Name</label>
                        <RHFInput
                            as={<Select options={vesselName} />}
                            rules={{ required: false }}
                            name="value"
                            register={register}
                            value={CertificateMasterInput.label}
                            setValue={setValue}
                            onChange={(option) => {
                                certificateMainInfoChange("label", option.label);
                                certificateMainInfoChange("value", option.value);
                              }}
                        />
                    </div> */}
                    <div className="col-sm-6">
                        <label className="form-label">Category Name</label>
                        <RHFInput
                            as={<Select options={CertificatesCategoryOptionData} />}
                            rules={{ required: false }}
                            name="intCategoryID"
                            register={register}
                            value={CertificatesCategoryOptionData.strCertificateCategoryName}
                            setValue={setValue}
                            onChange={(option) => {
                                certificateMainInfoChange("strCertificateCategoryName", option.label);
                                certificateMainInfoChange("intCategoryID", option.value);
                              }}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10"></div>
                </div>

            {!isLoading && (
                <Button variant="primary" type="submit" className="saveButton">
                    Submit
                </Button>
            )}
            {isLoading && (
                <Button variant="primary" type="submit" className="saveButton" disabled={true}>
                <span className="p-2">
                    <i className="fa fa-check"></i> Submitting...
                </span>
                <span className="ml-3 spinner spinner-white "></span>
                </Button>
            )}
            </form>
        </>
    );
};

export default CertificateMasterAdd;
