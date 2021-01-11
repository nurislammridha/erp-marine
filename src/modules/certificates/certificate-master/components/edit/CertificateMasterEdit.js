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
    dispatch(handleChangeCertificateMasterInput(name, value, e));
  };

  useEffect(() => {
      console.log('props.editData', props.editData);
    dispatch(setMasterCertificateEditValue(props.editData));
  }, [dispatch]);

  const CertificateMasterInput = useSelector(
    (state) =>
      state.CertificateListReducer.certificateMasterInput
  );

  const defaultEditData = useSelector(
    (state) => state.CertificateListReducer.editDefaultData
  );

  const submitecertificateMaster = (data) => {
    dispatch(
        certificateMasterEditAction(
        CertificateMasterInput,
        props.editData.intIssuingAuthorityID
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
                        <Form.Control type="text"
                            type="text"
                            value={CertificateMasterInput.strCertificateName}
                            name="strCertificateName"
                            onChange={(e) =>
                                certificateMainInfoChange("strCertificateName", e.target.value)
                              }
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label">Vessel Name</label>
                        <RHFInput
                            as={<Select options={vesselName} />}
                            rules={{ required: false }}
                            name="strVesselName"
                            register={register}
                            value={vesselName.strVesselName}
                            setValue={setValue}
                            onChange={(option) => {
                                certificateMainInfoChange("strVesselName", option.label);
                                certificateMainInfoChange("intVesselID", option.value);
                              }}
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label">Category Name</label>
                        <RHFInput
                            as={<Select options={certificatesCategoryOptionData} />}
                            rules={{ required: false }}
                            name="intCertificateCategoriId"
                            register={register}
                            value={certificatesCategoryOptionData.strCertificateCategoriName}
                            setValue={setValue}
                            onChange={(option) => {
                                certificateMainInfoChange("strCertificateCategoriName", option.label);
                                certificateMainInfoChange("intCategoryID", option.value);
                              }}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10"></div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg">
                    <span>update</span>
                </button>

                {/* {loading && (
                    <button type="submit" class="btn btn-primary btn-lg" disabled={true}>
                        <span>Submitting...</span>
                        <span className="ml-3 spinner spinner-white"></span>
                    </button>
                )}

                {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                        <span>Submit</span>
                    </button>
                )} */}
            </form>
        </>
  )
};

export default CertificateMasterEdit;
