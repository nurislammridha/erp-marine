import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import DatePicker from "react-datepicker";
import FileBase64 from "react-file-base64";
import moment from 'moment';

import {
  deleteProductImagePreview,
  handleChangeProductInputAction,
  getCertificateCategory,
  getCertificateType,
  getCertificateIssueBy,
  getCertificateName,
  MainCertificateUpdateAction,
  GetVesselTypeAction,
  getCertificateStatusData,
  certificateMultipleDataAdd,
  certificateMultipleDataDelete,
  certificateMultipleAttachmentDelete,
  getMainCertificateDeteailByID,
} from "../../_redux/actions/CertificateMainAction";
import CertificateMasterAdd from "../../../certificate-master/components/create/CertificateMasterAdd";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import CertificateCategoryAdd from "../../../certificate-category/components/create/CertificateCategoryAdd";
import IssueAuthorityAdd from "../../../issue-authority/components/create/IssueAuthorityAdd";
import CertificateTypeAdd from "../../../certificate-types/components/create/CertificateTypeAdd";
import {
  getCertificateChildCategoryData,
  getCertificateParentCategoryData,
} from "../../../certificate-category/_redux/actions/CertificateCategoryAction";
import PreviewAttachment from "../../../../master/components/previews/PreviewAttachment";
import LoadingSpinner from "../../../../master/spinner/LoadingSpinner";

const CertificateMainEdit = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();

  const { id } = useParams();

  const certificateMainInfoChange = (name, value, e = null) => {
    dispatch(handleChangeProductInputAction(name, value, e, true));
  };
  const serverErrors = useSelector((state) => state.certificateMainInfo.errors);
  const isLoading = useSelector((state) => state.certificateMainInfo.isLoading);
  const certificateEditInfo = useSelector(
    (state) => state.certificateMainInfo.certificateEditInfo
  );

  const certificatesCategoryOption = useSelector(
    (state) => state.certificateMainInfo.certificatesCategoryOptionData
  );
  const certificatesNameOption = useSelector(
    (state) => state.certificateMainInfo.certificatesNameOptionData
  );
  const isEditLoaded = useSelector(
    (state) => state.certificateMainInfo.isEditLoaded
  );
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

  useEffect(() => {
    dispatch(GetVesselTypeAction());
    dispatch(getCertificateCategory());
    dispatch(getCertificateType());
    dispatch(getCertificateIssueBy());
    dispatch(getCertificateName());
    dispatch(getCertificateParentCategoryData());
    dispatch(getCertificateStatusData());
    dispatch(getMainCertificateDeteailByID(id));
  }, []);

  const onSubmit = async (data) => {
    console.log('data', data);
    
    dispatch(MainCertificateUpdateAction(certificateEditInfo, id));
  };

  const addMultipleData = () => {
    dispatch(certificateMultipleDataAdd(certificateEditInfo, true));
  };

  const deleteMultipleData = (index) => {
    dispatch(certificateMultipleDataDelete(index, true));
  };

  const getFiles = (files) => {
    if (files.length > 0) {
      files.forEach((file) => {
        const filesUpdated = [file, ...certificateEditInfo.multipleAttachments];
        dispatch(
          handleChangeProductInputAction("multipleAttachments", filesUpdated)
        );
      });
    }
  };

  const deleteMultipleAttachmentData = (index) => {
    dispatch(certificateMultipleAttachmentDelete(index, true));
  };

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showIssuedByModal, setShowIssuedByModal] = useState(false);
  const startDate = new Date().toLocaleDateString();

  return (
    <>
      {
        !isEditLoaded &&
        <LoadingSpinner text="Loading Certificate Details"/>
      }
      {isEditLoaded && certificateEditInfo !== null && (
        <>
          <div className="container">
            <div className="card card-custom gutter-b">
              <div className="card-header">
                <div className="card-title">
                  <h3 className="card-label">Certificate Edit</h3>
                </div>
              </div>
              <div className="card-body">
                <form
                  className="form form-label-right"
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  encType="multipart/form-data"
                >
                  <div className="form-group row mt-0 border pb-3 bg-light pt-3">
                    <div className="col-lg-3">
                      <label className="form-label">Category</label>
                      <RHFInput
                        as={<Select options={certificateParentCategoryList} />}
                        rules={{ required: true }}
                        name="intParentCategoryID"
                        register={register}
                        value={certificateEditInfo.parentCategory}
                        onChange={(option) => {
                          certificateMainInfoChange("intCategoryName", "");
                          certificateMainInfoChange("intCategoryID", "");
                          certificateMainInfoChange("parentCategory", {
                            label: option.label,
                            value: option.value,
                          });
                          certificateMainInfoChange("category", '');
                          certificateMainInfoChange(
                            "intParentCategoryID",
                            option.value
                          );
                          setValue("intCategoryID", "");
                          setValue("category", "");
                          dispatch(
                            getCertificateChildCategoryData(option.value)
                          );
                        }}
                        setValue={setValue}
                      />
                    </div>

                    {/*====Sub Category=====*/}
                    <div className="col-lg-3">
                      <label className="form-label">Sub Category</label>
                      <div className="input-area-add">
                        <div className="float-left">
                          <RHFInput
                            as={
                              <Select options={certificateChildCategoryList} />
                            }
                            rules={{ required: true }}
                            name="intCategoryID"
                            register={register}
                            value={certificateEditInfo.category}
                            onChange={(option) => {
                              certificateMainInfoChange("intCategoryName", option.label);
                              certificateMainInfoChange("intCategoryID", option.value);
                              certificateMainInfoChange("category", {
                                label: option.label,
                                value: option.value,
                              });
                            }}
                            setValue={setValue}
                          />
                        </div>
                        <div className="float-right">
                          <button
                            className="btn btn-default"
                            type="button"
                            onClick={() => {
                              setShowCategoryModal(true);
                            }}
                          >
                            <i className="fa fa-plus-circle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/*====Sub Category=====*/}

                    <div className="col-lg-3">
                      <label className="form-label">Certificate Name</label>
                      <div className="input-area-add">
                        <div className="float-left">
                          <RHFInput
                            as={<Select options={certificatesNameOption} defaultValue={"Hello"} />}
                            // rules={{ required: true }}
                            name="intCertificateID"
                            register={register}
                            value={certificateEditInfo.certificate}
                            onChange={(option) => {
                              certificateMainInfoChange(
                                "intCertificateName",
                                option.label
                              );
                              certificateMainInfoChange("certificate", {
                                label: option.label,
                                value: option.value,
                              });
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
                      <label className="form-label">Certificate Type</label>
                      <div className="input-area-add">
                        <div className="float-left">
                          <RHFInput
                            as={<Select options={certificatesTypeOption} />}
                            // rules={{ required: true }}
                            name="intCertificateTypeID"
                            register={register}
                            value={certificateEditInfo.types}
                            onChange={(option) => {
                              certificateMainInfoChange(
                                "intCertificateTypeName",
                                option.label
                              );
                              certificateMainInfoChange("types", {
                                label: option.label,
                                value: option.value,
                              });
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
                        className="fromStyle formHeight"
                        value={certificateEditInfo.strCustomeCode}
                        onChange={(e) =>
                          certificateMainInfoChange(
                            "strCustomeCode",
                            e.target.value
                          )
                        }
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="inputError margin-minus-8">
                        {errors.strCustomeCode &&
                          errors.strCustomeCode.type === "required" &&
                          "Certificate Code can't be blank"}
                      </div>
                    </div>

                    <div className="col-lg-3">
                      <label className="form-label mt-2 formFont">
                        Ship Folder No (Optional)
                      </label>
                      <Form.Control
                        type="text"
                        name="strShipFolderNo"
                        className="fromStyle formHeight"
                        value={certificateEditInfo.strShipFolderNo}
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
                    value={certificateEditInfo.intIssuingAuthorityID}
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

                    <div className="col-lg-3">
                      <label className="form-label">Issuing Authority</label>
                      <div className="input-area-add">
                        <div className="float-left">
                          <RHFInput
                            as={<Select options={certificatesIssueByOption} />}
                            rules={{ required: true }}
                            name="intIssuingAuthorityID"
                            register={register}
                            value={
                              certificateEditInfo.issuing_authority
                            }
                            onChange={(option) => {
                              certificateMainInfoChange(
                                "intIssuingAuthorityName",
                                option.label
                              );
                              certificateMainInfoChange("issuing_authority", {
                                label: option.label,
                                value: option.value,
                              });
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
                          "Certificate Issuing Authority Name Can't be blank"}
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
                        value={certificateEditInfo.strIssuedPlace}
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

                    <div className="col-lg-3">
                      <label className="form-label mt-2 formFont">
                        Location
                      </label>
                      <Form.Control
                        type="text"
                        name="strLocation"
                        className="fromStyle formHeight"
                        value={certificateEditInfo.strLocation}
                        onChange={(e) =>
                          certificateMainInfoChange(
                            "strLocation",
                            e.target.value
                          )
                        }
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
                    </div>
                    <div className="col-lg-3 mt-3">
                      <label htmlFor="">{""}</label>
                      <Form.Group controlId="formBasicChecbox">
                        <Form.Check
                          className="forgotPasswordText  "
                          type="checkbox"
                          label="Not on Board"
                        />
                      </Form.Group>
                    </div>
                  </div>

                  {/*=====certificate details close===*/}
                  <div className="form-group row mt-2 border mb-2 pb-3 bg-light">
                    <div className="col-lg-3">
                      <label className="form-label mt-2">
                        Certificate Issue date
                      </label>
                      <DatePicker
                        name="dteCertificateIssueDate"
                        type="date"
                        disableClock={true}
                        locale="en-US"
                        className="form-control fromStyle formHeight"
                        placeholderText="select issue date"
                        value={certificateEditInfo.dteCertificateIssueDate}
                        onChange={(e) => certificateMainInfoChange("dteCertificateIssueDate", e)}
                        ref={register({
                          required: true,
                          maxLength: 100,
                        })}
                      />
                      <div className="inputError margin-minus-8">
                        {errors.dteCertificateIssueDate &&
                          errors.dteCertificateIssueDate.type === "required" &&
                          "Issue Date can't be blank"}
                      </div>
                    </div>

                    {certificateEditInfo.intCertificateTypeID !== 4 &&
                      certificateEditInfo.intCertificateTypeID !== null && (
                        <>
                          <div className="col-lg-3">
                            <label className="form-label mt-2">
                              Expiry Date
                            </label>{" "}
                            <div>
                              <DatePicker
                                name="dteCertificateExpiryDate"
                                disableClock={true}
                                locale="en-US"
                                dateFormat="yyyy-MM-dd"
                                className="form-control fromStyle formHeight custome-date"
                                placeholderText="select expiry date"
                                disabled={certificateEditInfo.dteCertificateIssueDate ? false : true}
                                minDate={certificateEditInfo.dteCertificateIssueDate}
                                value={certificateEditInfo.dteCertificateExpiryDate}
                                onChange={(e) => certificateMainInfoChange("dteCertificateExpiryDate", e)}
                                ref={register({
                                  required: true,
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
                          <div className="col-lg-3">
                            <label className="form-label mt-2">
                              Certificate Valid date
                            </label>
                            {/* <Form.Control
                              type="date"
                              name="dteCertificateValidUntil"
                              className="fromStyle formHeight"
                              value={certificateEditInfo.dteCertificateValidUntil}
                              onChange={(e) => certificateMainInfoChange("dteCertificateValidUntil", e.target.value)}
                              ref={register({
                                required: false,
                                maxLength: 100,
                              })}
                            /> */}
                            <div>
                              <DatePicker
                                name="dteCertificateValidUntil"
                                dateFormat="yyyy-MM-dd"
                                disableClock={true}
                                locale="en-US"
                                className="form-control fromStyle formHeight custome-date"
                                placeholderText="select certificate valid date"
                                value={certificateEditInfo.dteCertificateValidUntil}
                                onChange={(e) => certificateMainInfoChange("dteCertificateValidUntil", e)}
                                ref={register({
                                  required: true,
                                  maxLength: 100,
                                })}
                              />
                            </div>
                            {/* <div className="inputError margin-minus-8">
                        {errors.dteCertificateValidUntil &&
                          errors.dteCertificateValidUntil.type === "required" &&
                          "Valid Until Date can't be blank"}
                      </div> */}
                          </div>
                        </>
                      )}

                    <div className="col-lg-3">
                      <label className="form-label">
                        Extend Until {"  "}
                        <label>
                          <Form.Check
                            id="isExtendedUntil"
                            className="forgotPasswordText  "
                            type="checkbox"
                            value={certificateEditInfo.isExtendedUntil}
                            onChange={(e) =>
                              certificateMainInfoChange(
                                "isExtendedUntil",
                                certificateEditInfo.isExtendedUntil
                                  ? false
                                  : true
                              )
                            }
                          />
                        </label>
                      </label>
                      <div>
                        <DatePicker
                          name="dteExtendedUntil"
                          dateFormat="yyyy-MM-dd"
                          disableClock={true}
                          locale="en-US"
                          className="form-control fromStyle formHeight custome-date"
                          placeholderText="select certificate valid date"
                          disabled={certificateEditInfo.isExtendedUntil ? false : true}
                          value={certificateEditInfo.dteExtendedUntil}
                          onChange={(e) => certificateMainInfoChange("dteExtendedUntil", e)}
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
                  </div> */}
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label mt-2">
                        Endorsement Date
                      </label>
                      <div>
                        <DatePicker
                          name="dteLastEndorsementDate"
                          dateFormat="yyyy-MM-dd"
                          disableClock={true}
                          locale="en-US"
                          className="form-control fromStyle formHeight custome-date"
                          placeholderText="select certificate valid date"
                          value={certificateEditInfo.dteLastEndorsementDate}
                          onChange={(e) => certificateMainInfoChange("dteLastEndorsementDate", e)}
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
                  </div>
                  {/*certificate create dates close*/}
                  {certificateEditInfo.intParentCategoryID == 4 && (
                    <div className="form-group row mt-2 mb-2 border pb-3 bg-light">
                      <div className="col-lg-3">
                        <label className="form-label mt-2">From Survey</label>
                        <Form.Control
                          type="date"
                          name="dteFromSurvey"
                          className="fromStyle formHeight"
                          value={certificateEditInfo.dteFromSurvey}
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
                          value={certificateEditInfo.dteToSurvey}
                          onChange={(e) =>
                            certificateMainInfoChange(
                              "dteToSurvey",
                              e.target.value
                            )
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
                          value={certificateEditInfo.status}
                          onChange={(option) => {
                            certificateMainInfoChange(
                              "strCertificateStatusName",
                              option.label
                            );
                            certificateMainInfoChange("status", {
                              label: option.label,
                              value: option.value,
                            });
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
                            {certificateEditInfo.certificateDates.map(
                              (date, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{date.dteFromSurvey}</td>
                                  <td>{date.dteToSurvey}</td>
                                  <td>{date.strCertificateStatusName}</td>
                                  <td
                                    style={{ width: 70, textAlign: "center" }}
                                  >
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
                    {/* <div className="col-lg-3">
                  <label className="form-label mt-2">Last Survey</label>
                  <Form.Control
                    type="date"
                    name="dteLastSurvey"
                    className="fromStyle formHeight" 
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2">Next Survey</label>
                  <Form.Control
                    type="date"
                    name="dteNextSurvey"
                    className="fromStyle formHeight" 
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </div> */}
                    <div className="col-lg-3">
                      <label className="form-label mt-2">Office Remarks</label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="strOfficeRemarks"
                        className="fromStyle formHeight"
                        disabled={true}
                        value={certificateEditInfo.strOfficeRemarks}
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
                      <label className="form-label mt-2">Ship remarks</label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="strShipRemarks"
                        className="fromStyle formHeight"
                        value={certificateEditInfo.strShipRemarks}
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

                    {/* <div className="col-lg-3 mt-8">
                  <Form.Group controlId="formGridCity">
                    <Form.Label>
                      Attachment{" "}
                      <span className="text-info text-sm">(Optional) </span>
                      <small className="bg-warning text-white pl-3 pr-3">
                        Allowed Format: png, jpg, jpeg, gif, webp
                      </small>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={(e) =>
                        certificateMainInfoChange("image", e.target.files[0], e)
                      }
                      className="fromStyle formHeight" 
                      ref={register}
                    />
                    {serverErrors["image"] && (
                      <div className="text-danger text-sm">
                        {serverErrors["image"].map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </div>
                    )}
                    {certificateEditInfo.imagePreviewUrl !== null && (
                      <div className="imgPreview" title="Remove">
                        <div className="preview-delete-icon">
                          <i
                            className="fa fa-times text-danger"
                            onClick={() =>
                              dispatch(deleteProductImagePreview())
                            }
                          ></i>
                        </div>
                        <img
                          src={certificateEditInfo.imagePreviewUrl}
                          className="img img-thumbnail"
                          alt=""
                          style={{ height: 100 }}
                        />
                      </div>
                    )}
                  </Form.Group>
                </div> */}
                  </div>

                  <div className="form-group row mt-1 border mt-2 pb-3 bg-light">
                    <div className="col-lg-3">
                      <label className="form-label mt-2">Attachments</label>
                      {/* <Form.Control
                      type="file"
                      name="multipleAttachments[]"
                      className="fromStyle formHeight" 
                      onChange={(e) =>
                        certificateMainInfoChange(
                          "multipleAttachments",
                          e.target.value
                        )
                      }
                      ref={register({
                        required: false,
                        maxLength: 100,
                      })}
                    /> */}
                      <div className="attachment-file">
                        <FileBase64
                          name="multipleAttachments"
                          multiple={true}
                          onDone={getFiles.bind(this)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-8">
                      {certificateEditInfo.multipleAttachments.length > 0 && (
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
                            {certificateEditInfo.multipleAttachments.map(
                              (attachment, index) => (
                                <tr key={index + 1}>
                                  <td>{index + 1}</td>
                                  <td>{attachment.name}</td>
                                  <td>{attachment.size}</td>
                                  <td>
                                    {" "}
                                    <PreviewAttachment
                                      // url={"files/" + attachment.name}
                                      url={attachment.filePreviewUrl ? attachment.filePreviewUrl : "files/" + attachment.name}
                                      title="Preview"
                                      height={50}
                                      width={50}
                                    />
                                  </td>
                                  <td
                                    style={{ width: 70, textAlign: "center" }}
                                  >
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
                          <span>Saving</span>
                          <span className="ml-3 spinner spinner-white"></span>
                        </button>
                      )}

                      {!isLoading && (
                        <button
                          type="submit"
                          className="mr-4 saveButton text-white btn"
                        >
                          <span>Save</span>
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
                  <CertificateCategoryAdd />
                </SimpleModal>

                <SimpleModal
                  show={showIssuedByModal}
                  handleClose={() => setShowIssuedByModal(false)}
                  handleShow={() => setShowIssuedByModal(true)}
                  modalTitle={"Issuing Authority"}
                >
                  <IssueAuthorityAdd />
                </SimpleModal>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
});

export default CertificateMainEdit;
