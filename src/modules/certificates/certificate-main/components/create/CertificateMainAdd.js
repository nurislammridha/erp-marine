import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import DatePicker from "react-datepicker";
import FileBase64 from "react-file-base64";

import {
  deleteProductImagePreview,
  handleChangeProductInputAction,
  getCertificateCategory,
  getCertificateType,
  getCertificateIssueBy,
  getCertificateName,
  MainCertificateCreateAction,
  GetVesselTypeAction,
  getCertificateStatusData,
  certificateMultipleDataAdd,
  certificateMultipleDataDelete,
  certificateMultipleAttachmentDelete,
} from "../../_redux/actions/CertificateMainAction";
import CertificateMasterAdd from "../../../certificate-master/components/create/CertificateMasterAdd";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import CertificateCategoryAdd from "../../../certificate-category/components/create/CertificateCategoryAdd";
import IssueAuthorityAdd from "../../../issue-authority/components/create/IssueAuthorityAdd";
import CertificateTypeAdd from "../../../certificate-types/components/create/CertificateTypeAdd";
import {
  getCertificateChildCategoryData,
  getCertificateParentCategoryData,
  handleCertificateCategoryInput,
} from "../../../certificate-category/_redux/actions/CertificateCategoryAction";
import MultipplePreviewAttachment from "../../../../master/components/previews/MultiplePreviewAttachment";
import { showToast } from "../../../../master/utils/ToastHelper";

const CertificateMainAdd = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();

  const certificateMainInfoChange = (name, value, e = null) => {
    dispatch(handleChangeProductInputAction(name, value, e));
  };

  const addStatus = useSelector((state) => state.vesselInfo.addStatus);
  const addMessage = useSelector((state) => state.vesselInfo.addMessage);
  const serverErrors = useSelector((state) => state.certificateMainInfo.errors);
  const isLoading = useSelector((state) => state.certificateMainInfo.isLoading);
  const certificateInfoInput = useSelector(
    (state) => state.certificateMainInfo.certificateMainInfo
  );
  const certificatesCategoryOption = useSelector(
    (state) => state.certificateMainInfo.certificatesCategoryOptionData
  );
  const certificatesNameOption = useSelector(
    (state) => state.certificateMainInfo.certificatesNameOptionData
  );

  console.log("certificatesNameOption :>> ", certificatesNameOption);

  const certificateParentCategoryList = useSelector(
    (state) => state.CertificateCategoryReducer.certificateParentCategoryList
  );

  const certificateChildCategoryList = useSelector(
    (state) => state.CertificateCategoryReducer.certificateChildCategoryList
  );

  const certificatesTypeOption = useSelector(
    (state) => state.certificateMainInfo.certificatesTypeOptionData
  );

  const certificatesIssueByOption = useSelector(
    (state) => state.certificateMainInfo.certificatesIssueByOptionData
  );

  const certificateStatus = useSelector(
    (state) => state.certificateMainInfo.certificateStatus
  );

  const vesselTypeOption = useSelector(
    (state) => state.certificateMainInfo.vesselTypeOptionData
  );

  useEffect(() => {
    dispatch(GetVesselTypeAction());
    dispatch(getCertificateCategory());
    dispatch(getCertificateType());
    dispatch(getCertificateIssueBy());
    dispatch(getCertificateParentCategoryData());
    dispatch(getCertificateStatusData());
  }, []);

  const onSubmit = async (e) => {
    dispatch(MainCertificateCreateAction(certificateInfoInput));
  };

  const addMultipleData = () => {
    dispatch(certificateMultipleDataAdd(certificateInfoInput));
  };

  const deleteMultipleData = (index) => {
    dispatch(certificateMultipleDataDelete(index));
  };

  const getFiles = (files) => {
    console.log("files", files[0]);

    if (files.length > 0) {
      files.forEach((file) => {
        const filesUpdated = [
          file,
          ...certificateInfoInput.multipleAttachments,
        ];
        dispatch(
          handleChangeProductInputAction("multipleAttachments", filesUpdated)
        );
      });
    }
  };

  const deleteMultipleAttachmentData = (index) => {
    dispatch(certificateMultipleAttachmentDelete(index));
  };

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showIssuedByModal, setShowIssuedByModal] = useState(false);

  return (
    <>
      <div className="container ">
        <div className="card card-custom gutter-b">
          <div className="card-header certificate-cardheader border-bottom-0">
            <div className="card-title">
              <h3 className="card-label">Certificate</h3>
            </div>
          </div>
          <div className="card-body certificate-card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div className="form-group row mt-0 border pb-3 bg-light pt-3 ">
                <div className="col-lg-3">
                  <label className="form-label formFont">Category</label>
                  <RHFInput
                    as={<Select options={certificateParentCategoryList} />}
                    rules={{ required: true }}
                    name="intCategoryID"
                    register={register}
                    value={certificateInfoInput.intParentCategoryID}
                    onChange={(option) => {
                      certificateMainInfoChange("intCategoryName", "");
                      certificateMainInfoChange("intCategoryID", "");
                      certificateMainInfoChange(
                        "intParentCategoryID",
                        option.value
                      );
                      setValue("intCategoryID", "");
                      dispatch(getCertificateChildCategoryData(option.value));
                      dispatch(
                        handleCertificateCategoryInput(
                          "certificateCategoryParent",
                          {
                            label: option.label,
                            value: option.value,
                          }
                        )
                      );
                      dispatch(
                        handleCertificateCategoryInput(
                          "intParentsCategoryID",
                          option.value
                        )
                      );
                      dispatch(getCertificateName(option.value));
                    }}
                    setValue={setValue}
                  />
                </div>

                {/*====Sub Category=====*/}
                <div className="col-lg-3">
                  <label className="form-label formFont">Sub Category</label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={certificateChildCategoryList} />}
                        rules={{ required: true }}
                        name="intCategoryID"
                        register={register}
                        value={certificateInfoInput.intCategoryID}
                        onChange={(option) => {
                          certificateMainInfoChange(
                            "intCategoryName",
                            option.label
                          );
                          certificateMainInfoChange(
                            "intCategoryID",
                            option.value
                          );
                          dispatch(getCertificateName(option.value));
                        }}
                        setValue={setValue}
                      />
                    </div>
                    <div className="float-right">
                      <button
                        className="btn btn-default"
                        type="button"
                        onClick={() => {
                          if (
                            certificateInfoInput.intParentCategoryID === null
                          ) {
                            showToast(
                              "error",
                              "Please select parent category first !"
                            );
                          } else {
                            setShowCategoryModal(true);
                          }
                        }}
                      >
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/*====Sub Category=====*/}

                <div className="col-lg-3">
                  <label className="form-label formFont">
                    Certificate Name
                  </label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={certificatesNameOption} />}
                        // rules={{ required: true }}
                        name="intCertificateID"
                        register={register}
                        value={certificateInfoInput.intCertificateID}
                        onChange={(option) => {
                          certificateMainInfoChange(
                            "intCertificateName",
                            option.label
                          );
                          certificateMainInfoChange(
                            "intCertificateID",
                            option.value
                          );
                        }}
                        setValue={setValue}
                      />
                    </div>
                    <div className="float-right">
                      <button
                        className="btn btn-default"
                        type="button"
                        onClick={() => {
                          setShowCertificateModal(true);
                        }}
                      >
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3">
                  <label className="form-label formFont">
                    Certificate Type
                  </label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={certificatesTypeOption} />}
                        // rules={{ required: true }}
                        name="intCertificateTypeID"
                        register={register}
                        value={certificateInfoInput.intCertificateTypeID}
                        onChange={(option) => {
                          certificateMainInfoChange(
                            "intCertificateTypeName",
                            option.label
                          );
                          certificateMainInfoChange(
                            "intCertificateTypeID",
                            option.value
                          );
                        }}
                        setValue={setValue}
                      />
                    </div>
                    <div className="float-right">
                      <button
                        className="btn btn-default"
                        type="button"
                        onClick={() => {
                          setShowTypeModal(true);
                        }}
                      >
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="col-lg-3">
                  <label className="form-label mt-2">Vesse Name</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Flag"
                    name="strVesselFlag"
                    className="fromStyle formHeight" 
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </div> */}

                <div className="col-lg-3">
                  <label className="form-label mt-2 formFont">Code</label>
                  <Form.Control
                    type="text"
                    name="strCustomeCode"
                    disabled={true}
                    className="fromStyle formHeight"
                    value={certificateInfoInput.strCustomeCode}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strCustomeCode",
                        e.target.value
                      )
                    }
                    ref={register({
                      // required: true,
                      maxLength: 100,
                    })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.strCustomeCode &&
                      errors.strCustomeCode.type === "required" &&
                      "Certificate Code can't be blank"}
                  </div> */}
                </div>

                <div className="col-lg-3">
                  <label className="form-label mt-2 formFont">
                    Ship Folder No (Optional)
                  </label>
                  <Form.Control
                    type="text"
                    name="strShipFolderNo"
                    className="fromStyle formHeight"
                    value={certificateInfoInput.strShipFolderNo}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strShipFolderNo",
                        e.target.value
                      )
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                {/* <div className="col-lg-3">
                  <label className="form-label mt-2">Issueing Authority</label>
                  <Form.Control
                    type="text"
                    name="intIssuingAuthorityID"
                    placeholder="Enter Issue Authority"
                    className="fromStyle formHeight" 
                    value={certificateInfoInput.intIssuingAuthorityID}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "intIssuingAuthorityID",
                        e.target.value
                      )
                    }
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </div> */}

                <div className="col-lg-3 mt-2">
                  <label className="form-label formFont">
                    Issuing Authority
                  </label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={certificatesIssueByOption} />}
                        rules={{ required: true }}
                        name="intIssuingAuthorityID"
                        register={register}
                        value={certificateInfoInput.intIssuingAuthorityID}
                        onChange={(option) => {
                          certificateMainInfoChange(
                            "intIssuingAuthorityName",
                            option.label
                          );
                          certificateMainInfoChange(
                            "intIssuingAuthorityID",
                            option.value
                          );
                        }}
                        setValue={setValue}
                      />
                    </div>
                    <div className="float-right">
                      <button
                        className="btn btn-default"
                        type="button"
                        onClick={() => {
                          setShowIssuedByModal(true);
                        }}
                      >
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>

                  {/* <div className="inputError margin-minus-10">
                    {errors.intIssuingAuthorityID &&
                      errors.intIssuingAuthorityID.type === "required" &&
                      "Certificate Name Can't be blank"}
                  </div> */}
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2 formFont ">
                    Issue Place
                  </label>
                  <Form.Control
                    type="text"
                    name="strIssuedPlace"
                    className="fromStyle formHeight"
                    value={certificateInfoInput.strIssuedPlace}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strIssuedPlace",
                        e.target.value
                      )
                    }
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.strIssuePlace &&
                      errors.strIssuePlace.type === "required" &&
                      "Issue Place can't be blank"}
                  </div>
                </div>

                {/* <div className="col-lg-3">
                  <label className="form-label mt-2 formFont">Location</label>
                  <Form.Control
                    type="text"
                    name="strLocation"
                    className="fromStyle formHeight"
                    value={certificateInfoInput.strLocation}
                    onChange={(e) =>
                      certificateMainInfoChange("strLocation", e.target.value)
                    }Certificate Name
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.strLocation &&
                      errors.strLocation.type === "required" &&
                      "Certificate Issue Location can't be blank"}
                  </div>
                </div> */}

                <div className="col-lg-3 mt-3">
                  <label htmlFor="">{""}</label>
                  <Form.Group controlId="formBasicChecbox">
                    <Form.Check
                      className="forgotPasswordText  "
                      type="checkbox"
                      label="Not on Board"
                      onChange={(e) =>
                        certificateMainInfoChange(
                          "intNotOnBoard",
                          certificateInfoInput.intNotOnBoard == "0" ? "1" : "0"
                        )
                      }
                    />
                  </Form.Group>
                </div>
              </div>

              {/*=====certificate details close===*/}
              <div className="form-group row mt-2 border mb-2 pb-3 bg-light">
                <div className="col-lg-3">
                  <label className="form-label mt-2 formFont">
                    Certificate Issue date
                  </label>
                  <DatePicker
                    name="dteCertificateIssueDate"
                    className="form-control fromStyle formHeight"
                    placeholderText="select issue date"
                    selected={certificateInfoInput.dteCertificateIssueDate}
                    onChange={(e) =>
                      certificateMainInfoChange("dteCertificateIssueDate", e)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.dteCertificateValidUntil &&
                      errors.dteCertificateValidUntil.type === "required" &&
                      "Issue Date can't be blank"}
                  </div>
                </div>

                {certificateInfoInput.intCertificateTypeID !== 4 &&
                  certificateInfoInput.intCertificateTypeID !== null && (
                    <>
                      <div className="col-lg-3">
                        <label className="form-label mt-2">Expiry Date</label>{" "}
                        <div>
                          <DatePicker
                            name="dteCertificateExpiryDate"
                            className="form-control fromStyle formHeight custome-date"
                            placeholderText="select expiry date"
                            disabled={
                              certificateInfoInput.dteCertificateIssueDate
                                ? false
                                : true
                            }
                            minDate={
                              certificateInfoInput.dteCertificateIssueDate
                            }
                            selected={
                              certificateInfoInput.dteCertificateExpiryDate
                            }
                            onChange={(e) =>
                              certificateMainInfoChange(
                                "dteCertificateExpiryDate",
                                e
                              )
                            }
                            ref={register({
                              required: false,
                              maxLength: 100,
                            })}
                          />
                        </div>
                        {/* <div className="inputError margin-minus-8">
                        {errors.dteCertificateExpiryDate &&
                          errors.dteCertificateExpiryDate.type === "required" &&
                          "Expiry Date can't be blank"}
                      </div> */}
                      </div>
                      {/* <div className="col-lg-3">
                        <label className="form-label formFont mt-2">
                          Certificate Valid date
                        </label>
                        <div>
                          <DatePicker
                            name="dteCertificateValidUntil"
                            className="form-control fromStyle formHeight custome-date"
                            placeholderText="select certificate valid date"
                            selected={
                              certificateInfoInput.dteCertificateValidUntil
                            }
                            minDate={
                              certificateInfoInput.dteCertificateIssueDate
                            }
                            onChange={(e) =>
                              certificateMainInfoChange(
                                "dteCertificateValidUntil",
                                e
                              )
                            }
                            ref={register({
                              required: true,
                              maxLength: 100,
                            })}
                          />
                        </div>
                        <div className="inputError margin-minus-8">
                        {errors.dteCertificateValidUntil &&
                          errors.dteCertificateValidUntil.type === "required" &&
                          "Valid Until Date can't be blank"}
                      </div>
                      </div> */}
                    </>
                  )}

                <div className="col-lg-3">
                  <label className="form-label formFont">
                    Extend Until {"  "}
                    <label>
                      <Form.Check
                        id="isExtendedUntil"
                        className="forgotPasswordText  "
                        type="checkbox"
                        value={certificateInfoInput.isExtendedUntil}
                        onChange={(e) =>
                          certificateMainInfoChange(
                            "isExtendedUntil",
                            certificateInfoInput.isExtendedUntil ? false : true
                          )
                        }
                      />
                    </label>
                  </label>
                  <div>
                    <DatePicker
                      name="dteExtendedUntil"
                      className="form-control fromStyle formHeight custome-date"
                      placeholderText="select certificate valid date"
                      minDate={certificateInfoInput.dteCertificateIssueDate}
                      disabled={
                        certificateInfoInput.isExtendedUntil ? false : true
                      }
                      selected={certificateInfoInput.dteExtendedUntil}
                      onChange={(e) =>
                        certificateMainInfoChange("dteExtendedUntil", e)
                      }
                      ref={register({
                        required: true,
                        maxLength: 100,
                      })}
                    />
                  </div>
                  {/* <div className="inputError margin-minus-8">
                    {errors.dteExtendedUntil &&
                      errors.dteExtendedUntil.type === "required" &&
                      "Expiry Date can't be blank"}
                    {
                      (certificateInfoInput.dteCertificateIssueDate < certificateInfoInput.dteExtendedUntil) && errors.dteExtendedUntil === "date can't be smaller"
                    }

                  </div> */}
                </div>
                {certificateInfoInput.intCertificateTypeID !== 3 &&
                  certificateInfoInput.intCertificateTypeID !== 4 &&
                  certificateInfoInput.intCertificateTypeID !== null && (
                    <>
                      <div className="col-lg-3">
                        <label className="form-label formFont mt-2">
                          Endorsement Date
                        </label>
                        <div>
                          <DatePicker
                            name="dteLastEndorsementDate"
                            className="form-control fromStyle formHeight custome-date"
                            placeholderText="select certificate valid date"
                            selected={
                              certificateInfoInput.dteLastEndorsementDate
                            }
                            minDate={
                              certificateInfoInput.dteCertificateIssueDate
                            }
                            onChange={(e) =>
                              certificateMainInfoChange(
                                "dteLastEndorsementDate",
                                e
                              )
                            }
                            ref={register({
                              required: true,
                              maxLength: 100,
                            })}
                          />
                        </div>
                        <div className="inputError margin-minus-8">
                          {errors.dteLastEndorsementDate &&
                            errors.dteLastEndorsementDate.type === "required" &&
                            "Endorsement Date can't be blank"}
                        </div>
                      </div>
                    </>
                  )}
              </div>
              {/*certificate create dates close*/}
              {certificateInfoInput.intParentCategoryID === 4 && (
                <div className="form-group row mt-2 mb-2 border pb-3 bg-light">
                  <div className="col-lg-3">
                    <label className="form-label mt-2">From Survey</label>
                    <Form.Control
                      type="date"
                      name="dteFromSurvey"
                      className="fromStyle formHeight"
                      value={certificateInfoInput.dteFromSurvey}
                      onChange={(e) =>
                        certificateMainInfoChange(
                          "dteFromSurvey",
                          e.target.value
                        )
                      }
                      ref={register({
                        required: false,
                        maxLength: 100,
                      })}
                    />
                    {/* <div className="inputError margin-minus-8">
                      {errors.dteFromSurvey &&
                        errors.dteFromSurvey.type === "required" &&
                        "Expiry Date can't be blank"}
                    </div> */}
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label mt-2">To Survey</label>
                    <Form.Control
                      type="date"
                      name="dteToSurvey"
                      className="fromStyle formHeight"
                      value={certificateInfoInput.dteToSurvey}
                      onChange={(e) =>
                        certificateMainInfoChange("dteToSurvey", e.target.value)
                      }
                      ref={register({
                        required: false,
                        maxLength: 100,
                      })}
                    />
                    {/* <div className="inputError margin-minus-8">
                      {errors.dteToSurvey &&
                        errors.dteToSurvey.type === "required" &&
                        "Expiry Date can't be blank"}
                    </div> */}
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label mt-2">Survey Status</label>
                    <RHFInput
                      as={<Select options={certificateStatus} />}
                      rules={{ required: false }}
                      name="intCertificateStatusID"
                      register={register}
                      value={certificateInfoInput.intCertificateStatusID}
                      onChange={(option) => {
                        certificateMainInfoChange(
                          "strCertificateStatusName",
                          option.label
                        );
                        certificateMainInfoChange(
                          "intCertificateStatusID",
                          option.value
                        );
                      }}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-lg-3">
                    <button
                      type="button"
                      className="btn saveButton text-white mt-11"
                      onClick={() => addMultipleData()}
                    >
                      <span> Add </span>
                    </button>
                  </div>
                  <div className="col-lg-12">
                    <table className="table tbl-standard table-bordered tbl-survey">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>From Survey</th>
                          <th>To Survey</th>
                          <th>Survey Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {certificateInfoInput.certificateDates.map(
                          (date, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{date.dteFromSurvey}</td>
                              <td>{date.dteToSurvey}</td>
                              <td>{date.strCertificateStatusName}</td>
                              <td style={{ width: 70, textAlign: "center" }}>
                                {/* <i className="fa fa-edit text-success mr-2"></i> */}
                                <i
                                  className="fa fa-trash text-danger pointer"
                                  onClick={() => deleteMultipleData(index)}
                                ></i>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="form-group row mt-1 border mt-2 pb-3 bg-light">
                <div className="col-lg-3">
                  <label className="form-label formFont mt-2">
                    Office Remarks
                  </label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    name="strOfficeRemarks"
                    className="fromStyle formHeight"
                    disabled={true}
                    value={certificateInfoInput.strOfficeRemarks}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strOfficeRemarks",
                        e.target.value
                      )
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.strOfficeRemarks &&
                      errors.strOfficeRemarks.type === "required" &&
                      "Expiry Date can't be blank"}
                  </div> */}
                </div>
                <div className="col-lg-3">
                  <label className="form-label formFont mt-2">
                    Ship remarks
                  </label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    name="strShipRemarks"
                    className="fromStyle formHeight"
                    value={certificateInfoInput.strShipRemarks}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strShipRemarks",
                        e.target.value
                      )
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.strShipRemarks &&
                      errors.strShipRemarks.type === "required" &&
                      "Expiry Date can't be blank"}
                  </div> */}
                </div>
              </div>

              <div className="form-group row mt-1 border mt-2 pb-3 bg-light">
                <div className="col-lg-3">
                  <label className="form-label formFont mt-2">
                    Attachments
                  </label>
                  <div className="attachment-file">
                    <FileBase64
                      name="multipleAttachments"
                      multiple={true}
                      onDone={getFiles.bind(this)}
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  {certificateInfoInput.multipleAttachments.length > 0 && (
                    <table className="table tbl-standard table-bordered tbl-survey">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Image Name</th>
                          <th>Image Size</th>
                          <th>Image View</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {certificateInfoInput.multipleAttachments !== null &&
                          certificateInfoInput.multipleAttachments.map(
                            (attachment, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{attachment.name}</td>
                                <td>{attachment.size}</td>
                                <td>
                                  {" "}
                                  <MultipplePreviewAttachment
                                    url={"/" + attachment.name}
                                    base64={attachment.base64}
                                    title="Preview"
                                    height={50}
                                    width={50}
                                  />
                                </td>
                                <td style={{ width: 70, textAlign: "center" }}>
                                  {/* <i className="fa fa-edit text-success mr-2"></i> */}
                                  <i
                                    className="fa fa-trash text-danger pointer"
                                    onClick={() =>
                                      deleteMultipleAttachmentData(index)
                                    }
                                  ></i>
                                </td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <a
                    onClick={() => {
                      history.push("/certificates-main/list");
                    }}
                  >
                    <button type="button" className="cancelButton btn mr-3">
                      Back
                    </button>
                  </a>

                  {isLoading && (
                    <button
                      type="submit"
                      className="mr-4 saveButton text-white btn"
                      disabled={true}
                    >
                      <span>Submitting</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!isLoading && (
                    <button
                      type="submit"
                      className="mr-4 saveButton text-white btn"
                    >
                      <span>Submit</span>
                    </button>
                  )}
                </div>
              </div>
            </form>

            <SimpleModal
              show={showTypeModal}
              handleClose={() => setShowTypeModal(false)}
              handleShow={() => setShowTypeModal(true)}
              modalTitle={"Certificate Type"}
            >
              <CertificateTypeAdd />
            </SimpleModal>

            <SimpleModal
              show={showCertificateModal}
              handleClose={() => setShowCertificateModal(false)}
              handleShow={() => setShowCertificateModal(true)}
              modalTitle={"Certificate Name"}
            >
              <CertificateMasterAdd />
            </SimpleModal>

            <SimpleModal
              show={showCategoryModal}
              handleClose={() => setShowCategoryModal(false)}
              handleShow={() => setShowCategoryModal(true)}
              modalTitle={"Certificate Sub Category"}
            >
              <CertificateCategoryAdd isSubCategory={true} />
            </SimpleModal>

            <SimpleModal
              show={showIssuedByModal}
              handleClose={() => setShowIssuedByModal(false)}
              handleShow={() => setShowIssuedByModal(true)}
              modalTitle={"Issueing Authority"}
            >
              <IssueAuthorityAdd />
            </SimpleModal>
          </div>
        </div>
      </div>
    </>
  );
});

export default CertificateMainAdd;
