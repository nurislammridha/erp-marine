import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import {
  deleteProductImagePreview,
  handleChangeProductInputAction,
  getCertificateCategory,
  getCertificateType,
  getCertificateIssueBy,
  getCertificateName,
  MainCertificateCreateAction,
  GetVesselTypeAction,
  getMainCertificateSingleData,
} from "../../_redux/actions/CertificateMainAction";
import CertificateCategoryAddModal from "../../../certificate-category/components/create/CertificateCategoryAddModal";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import CertificateCategoryAdd from "../../../certificate-category/components/create/CertificateCategoryAdd";
import CertificateTypeAdd from "../../../certificate-types/components/create/CertificateTypeAdd";
import { useParams } from "react-router-dom";

const CertificateMainEdit = () => {
  const { id } = useParams();
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  toast.configure();

  // self work
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(null);
  //input change with redux
  const certificateMainInfoChange = (name, value, e = null) => {
    dispatch(handleChangeProductInputAction(name, value, e));
  };

  // const enableLoading = () => {
  //   setLoading(true);
  // };

  // const disableLoading = () => {
  //   setLoading(false);
  // };

  const addStatus = useSelector((state) => state.vesselInfo.addStatus);
  const addMessage = useSelector((state) => state.vesselInfo.addMessage);
  const serverErrors = useSelector((state) => state.certificateMainInfo.errors);

  const certificateInfoInput = useSelector(
    (state) => state.certificateMainInfo.certificateMainInfo
  );
  const certificateMainEditInfo = useSelector(
    (state) => state.certificateMainInfo.certificateMainEdit
  );
  const certificatesCategoryOption = useSelector(
    (state) => state.certificateMainInfo.certificatesCategoryOptionData
  );
  const certificatesNameOption = useSelector(
    (state) => state.certificateMainInfo.certificatesNameOptionData
  );
  const certificatesTypeOption = useSelector(
    (state) => state.certificateMainInfo.certificatesTypeOptionData
  );
  const certificatesIssueByOption = useSelector(
    (state) => state.certificateMainInfo.certificatesIssueByOptionData
  );

  const vesselTypeOption = useSelector(
    (state) => state.certificateMainInfo.vesselTypeOptionData
  );

  useEffect(() => {
    dispatch(GetVesselTypeAction());
    dispatch(getCertificateCategory());
    dispatch(getCertificateType());
    dispatch(getCertificateIssueBy());
    dispatch(getCertificateName());
    dispatch(getMainCertificateSingleData(id));
  }, []);

  const onSubmit = async (e) => {
    dispatch(MainCertificateCreateAction(certificateInfoInput));
  };

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showIssuedByModal, setShowIssuedByModal] = useState(false);

  return (
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
            >
              <div className="form-group row mt-1">
                <div className="col-lg-3">
                  <label className="form-label">Vessel</label>
                  <RHFInput
                    as={<Select options={vesselTypeOption} />}
                    rules={{ required: false }}
                    name="intVesselID"
                    register={register}
                    value={certificateInfoInput.intVesselID}
                    onChange={(option) => {
                      certificateMainInfoChange("strVesselName", option.label);
                      certificateMainInfoChange("intVesselID", option.value);
                    }}
                    setValue={setValue}
                  />
                </div>

                <div className="col-lg-3">
                  <SimpleModal
                    show={showCategoryModal}
                    handleClose={() => setShowCategoryModal(false)}
                    handleShow={() => setShowCategoryModal(true)}
                    modalTitle={"Certificate Category"}
                  >
                    <CertificateCategoryAdd />
                  </SimpleModal>
                  <label className="form-label">Category</label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={certificatesCategoryOption} />}
                        rules={{ required: false }}
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

                <div className="col-lg-3">
                  <SimpleModal
                    show={showCertificateModal}
                    handleClose={() => setShowCertificateModal(false)}
                    handleShow={() => setShowCertificateModal(true)}
                    modalTitle={"Certificate Name"}
                  >
                    <div>Add Here Component</div>
                  </SimpleModal>
                  <label className="form-label">Certificate Name</label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={certificatesNameOption} />}
                        // rules={{ required: false }}
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
                  <label className="form-label">Certificate Type</label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={certificatesTypeOption} />}
                        // rules={{ required: false }}
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
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </div> */}

                <div className="col-lg-3">
                  <label className="form-label mt-2">Code</label>
                  <Form.Control
                    type="text"
                    name="strCustomeCode"
                    className="fromStyle"
                    value={certificateInfoInput.strCustomeCode}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strCustomeCode",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.strCustomeCode &&
                      errors.strCustomeCode.type === "required" &&
                      "Code can't be blank"}
                  </div> */}
                </div>

                <div className="col-lg-3">
                  <SimpleModal
                    show={showIssuedByModal}
                    handleClose={() => setShowIssuedByModal(false)}
                    handleShow={() => setShowIssuedByModal(true)}
                    modalTitle={"Issued By"}
                  >
                    <CertificateCategoryAdd />
                  </SimpleModal>

                  <label className="form-label">Issued By</label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={certificatesIssueByOption} />}
                        rules={{ required: false }}
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
                  <label className="form-label mt-2">Issue Place</label>
                  <Form.Control
                    type="text"
                    name="strIssuedPlace"
                    className="fromStyle"
                    value={certificateInfoInput.strIssuedPlace}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strIssuedPlace",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.strIssuePlace &&
                      errors.strIssuePlace.type === "required" &&
                      "Issue Place can't be blank"}
                  </div> */}
                </div>

                <div className="col-lg-3">
                  <label className="form-label mt-2">Location</label>
                  <Form.Control
                    type="text"
                    name="strLocation"
                    className="fromStyle"
                    value={certificateInfoInput.strLocation}
                    onChange={(e) =>
                      certificateMainInfoChange("strLocation", e.target.value)
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.strLocation &&
                      errors.strLocation.type === "required" &&
                      "Location can't be blank"}
                  </div> */}
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
                <div className="col-lg-3">
                  <label className="form-label mt-2">Ship Folder NO</label>
                  <Form.Control
                    type="text"
                    name="strShipFolderNo"
                    className="fromStyle"
                    value={certificateInfoInput.strShipFolderNo}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strShipFolderNo",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.strShipFolderNo &&
                      errors.strShipFolderNo.type === "required" &&
                      "Location can't be blank"}
                  </div> */}
                </div>
                <div className="col-lg-3 mt-3">
                  <label htmlFor="">{""}</label>
                  <Form.Group controlId="formBasicChecbox">
                    <Form.Check
                      className="forgotPasswordText  "
                      type="checkbox"
                      label="isExtendedUntil"
                    />
                  </Form.Group>
                </div>

                <div className="col-lg-3">
                  <label className="form-label mt-2">
                    Certificate Issue date
                  </label>
                  <Form.Control
                    type="date"
                    name="dteCertificateIssueDate"
                    className="fromStyle"
                    value={certificateInfoInput.dteCertificateIssueDate}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "dteCertificateIssueDate",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.dteCertificateValidUntil &&
                      errors.dteCertificateValidUntil.type === "required" &&
                      "Issue Date can't be blank"}
                  </div> */}
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2">
                    Certificate Valid date
                  </label>
                  <Form.Control
                    type="date"
                    name="dteCertificateValidUntil"
                    className="fromStyle"
                    value={certificateInfoInput.dteCertificateValidUntil}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "dteCertificateValidUntil",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.dteCertificateValidUntil &&
                      errors.dteCertificateValidUntil.type === "required" &&
                      "Issue Date can't be blank"}
                  </div> */}
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2">Expiry Date</label>
                  <Form.Control
                    type="date"
                    name="dteExpiryDate"
                    className="fromStyle"
                    value={certificateInfoInput.dteExpiryDate}
                    onChange={(e) =>
                      certificateMainInfoChange("dteExpiryDate", e.target.value)
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.dteExpiryDate &&
                      errors.dteExpiryDate.type === "required" &&
                      "Expiry Date can't be blank"}
                  </div> */}
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2">Extend Date</label>
                  <Form.Control
                    type="date"
                    name="dteExtendedUntil"
                    className="fromStyle"
                    value={certificateInfoInput.dteExtendedUntil}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "dteExtendedUntil",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.dteExtendedUntil &&
                      errors.dteExtendedUntil.type === "required" &&
                      "Expiry Date can't be blank"}
                  </div> */}
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2">Last Survey</label>
                  <Form.Control
                    type="date"
                    name="dteLastSurvey"
                    className="fromStyle"
                    value={certificateInfoInput.dteLastSurvey}
                    onChange={(e) =>
                      certificateMainInfoChange("dteLastSurvey", e.target.value)
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.dteLastSurvey &&
                      errors.dteLastSurvey.type === "required" &&
                      "Expiry Date can't be blank"}
                  </div> */}
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2">Next Survey</label>
                  <Form.Control
                    type="date"
                    name="dteNextSurvey"
                    className="fromStyle"
                    value={certificateInfoInput.dteNextSurvey}
                    onChange={(e) =>
                      certificateMainInfoChange("dteNextSurvey", e.target.value)
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.dteNextSurvey &&
                      errors.dteNextSurvey.type === "required" &&
                      "Expiry Date can't be blank"}
                  </div> */}
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2">Endorsement Date</label>
                  <Form.Control
                    type="date"
                    name="dteLastEndorsementDate"
                    className="fromStyle"
                    value={certificateInfoInput.dteLastEndorsementDate}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "dteLastEndorsementDate",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                  {/* <div className="inputError margin-minus-8">
                    {errors.dteLastEndorsementDate &&
                      errors.dteLastEndorsementDate.type === "required" &&
                      "Expiry Date can't be blank"}
                  </div> */}
                </div>

                <div className="col-lg-3">
                  <label className="form-label mt-2">Issueing Authority</label>
                  <Form.Control
                    type="text"
                    name="intIssuingAuthorityID"
                    placeholder="Enter Issue Authority"
                    className="fromStyle"
                    value={certificateInfoInput.intIssuingAuthorityID}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "intIssuingAuthorityID",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
                  />
                </div>
                {/* <div className="col-lg-3">
                  <label className="form-label mt-2">Last Survey</label>
                  <Form.Control
                    type="date"
                    name="dteLastSurvey"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2">Next Survey</label>
                  <Form.Control
                    type="date"
                    name="dteNextSurvey"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div> */}
                <div className="col-lg-3">
                  <label className="form-label mt-2">Office Remarks</label>
                  <Form.Control
                    type="text"
                    name="strOfficeRemarks"
                    className="fromStyle"
                    value={certificateInfoInput.strOfficeRemarks}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strOfficeRemarks",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
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
                    type="text"
                    name="strShipRemarks"
                    className="fromStyle"
                    value={certificateInfoInput.strShipRemarks}
                    onChange={(e) =>
                      certificateMainInfoChange(
                        "strShipRemarks",
                        e.target.value
                      )
                    }
                    // ref={register({
                    //   required: false,
                    //   maxLength: 100,
                    // })}
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
                      className="fromStyle"
                      ref={register}
                    />
                    {serverErrors["image"] && (
                      <div className="text-danger text-sm">
                        {serverErrors["image"].map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </div>
                    )}
                    {certificateInfoInput.imagePreviewUrl !== null && (
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
                          src={certificateInfoInput.imagePreviewUrl}
                          className="img img-thumbnail"
                          alt=""
                          style={{ height: 100 }}
                        />
                      </div>
                    )}
                  </Form.Group>
                </div> */}
              </div>

              <div className="form-group row">
                <div className="col-sm-10">
                  {/* <a
                    onClick={() => {
                      history.push("/certificates-main/list");
                    }}
                  >
                    <button type="button" class="btn btn-secondary btn-lg mr-2">
                      Back
                    </button>
                  </a> */}
                  {/* <button type="submit" class="btn btn-primary btn-lg">
                    Next
                    </button> */}
                  {/* {loading && ( */}
                  <button type="submit" class="btn btn-primary btn-lg">
                    <span>Submite</span>
                    {/* <span className="ml-3 spinner spinner-white"></span> */}
                  </button>
                  {/* )} */}

                  {/* {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Submit</span>
                    </button>
                  )} */}
                </div>
              </div>
            </form>

            <SimpleModal
              show={showTypeModal}
              handleClose={() => setShowTypeModal(false)}
              handleShow={() => setShowTypeModal(true)}
              modalTitle={"Type Name"}
            >
              <CertificateTypeAdd />
            </SimpleModal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateMainEdit;
