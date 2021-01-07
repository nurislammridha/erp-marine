import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  GetVesselTypeAction,
  GetCountryDataAction,
  AddVessel,
  VesselEmptyMessage,
} from "../../../../../domains/Vessel/_redux/actions/VesselAction";
import { RHFInput } from "react-hook-form-input";
import { deleteProductImagePreview, handleChangeProductInputAction } from "../../_redux/actions/CertificateMainAction";
import CertificateCategoryAddModal from "../../../certificate-category/components/create/CertificateCategoryAddModal";
import SimpleModal from "../../../../master/components/Modal/SimpleModal";
import CertificateCategoryAdd from "../../../certificate-category/components/create/CertificateCategoryAdd";
import CertificateTypeAdd from "../../../certificate-types/components/create/CertificateTypeAdd";

const CertificateMainAdd = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  toast.configure();

  const [vesselInfo, setVesselInfo] = React.useState({
    strVesselName: "",
    strIMONumber: "",
    vesselTypeData: "",
    strVesselFlag: "",
    countryData: "",
    numDeadWeight: "",
    strBuildYear: "",
    strEngineName: "",
    intTotalCrew: "",
    ysnOwn: false,
  });

  // Callback~
  const getFiles = (files) => {
    console.log("Files", files);
    const imageFile = { ...vesselInfo };
    imageFile.image = files;
    setVesselInfo(imageFile);
  };

  const handleChange = ({ currentTarget: input }) => {
    const vesselInfoData = { ...vesselInfo };
    vesselInfoData[input.name] = input.value;
    setVesselInfo(vesselInfoData);
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const selectHandle = (item, name) => {
    const vesselInfoData = { ...vesselInfo };
    vesselInfoData[name] = item;
    setVesselInfo(vesselInfoData);
  };

  const addStatus = useSelector((state) => state.vesselInfo.addStatus);
  const addMessage = useSelector((state) => state.vesselInfo.addMessage);
  const serverErrors = useSelector((state) => state.certificateMainInfo.errors);
  const productData = useSelector((state) => state.certificateMainInfo.productData);
  const vesselTypeList = useSelector(
    (state) => state.vesselInfo.vesselTypeList
  );
  const countryList = useSelector((state) => state.vesselInfo.countryList);
  let vesselType = [];
  if (vesselTypeList.data) {
    vesselTypeList.data.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strName,
      };
      vesselType.push(items);
    });
  }

  let Country = [];
  if (countryList) {
    countryList.data.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strName,
      };
      Country.push(items);
    });
  }

  const handleChangeTextInput = (name, value, e = null) => {
    dispatch(handleChangeProductInputAction(name, value, e));
  };

  useEffect(() => {
    dispatch(GetVesselTypeAction());
    dispatch(GetCountryDataAction());

    if (typeof addMessage === null || typeof addMessage === "undefined") {
      disableLoading();
      toast.error("Somthing Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      disableLoading();
      if (addStatus && addMessage.length > 0) {
        toast.success(addMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(VesselEmptyMessage());
        history.push("/vessels/list");
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        toast.error(addMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(VesselEmptyMessage());
      }
    }
  }, [addStatus, addMessage]);

  const onSubmit = async (e) => {
    enableLoading();
    dispatch(AddVessel(vesselInfo));
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
              <h3 className="card-label">Certificate</h3>
            </div>
          </div>
          <div className="card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row mt-1">
                {/* <div className="col-lg-3">
                  <label className="form-label">Vessel</label>
                  <RHFInput
                    as={<Select options={vesselType} />}
                    rules={{ required: true }}
                    name="vesselData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "vesselData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.vesselData &&
                      errors.vesselData.type === "required" &&
                      "Vessel Can't be blank"}
                  </div>
                </div> */}

                <div className="col-lg-3">
                  <SimpleModal
                    show={showCategoryModal}
                    handleClose={() => setShowCategoryModal(false)}
                    handleShow={() => setShowCategoryModal(true)}
                    modalTitle={"Certificate"}
                  >
                    <CertificateCategoryAdd />
                  </SimpleModal>
                  <label className="form-label">Category</label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={vesselType} />}
                        rules={{ required: true }}
                        name="certificateTypeData"
                        register={register}
                        onChange={(e) => selectHandle(e, "certificateTypeData")}
                        setValue={setValue}
                      />
                    </div>
                    <div className="float-right">
                      <button className="btn btn-default" type="button" onClick={() => {
                        setShowCategoryModal(true)
                      }}>
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>

                  <div className="inputError margin-minus-10">
                    {errors.certificateTypeData &&
                      errors.certificateTypeData.type === "required" &&
                      "Vessel Type Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-3">
                  <SimpleModal
                    show={showCertificateModal}
                    handleClose={() => setShowCertificateModal(false)}
                    handleShow={() => setShowCertificateModal(true)}
                    modalTitle={"Certificate Name"}
                  >
                    <div>
                      Add Here Component
                    </div>
                  </SimpleModal>
                  <label className="form-label">Certificate Name</label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={vesselType} />}
                        rules={{ required: true }}
                        name="certificateTypeData"
                        register={register}
                        onChange={(e) => selectHandle(e, "certificateTypeData")}
                        setValue={setValue}
                      />
                    </div>
                    <div className="float-right">
                      <button className="btn btn-default" type="button" onClick={() => {
                        setShowCertificateModal(true)
                      }}>
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>

                  <div className="inputError margin-minus-10">
                    {errors.certificateTypeData &&
                      errors.certificateTypeData.type === "required" &&
                      "Vessel Type Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-3">
                  <label className="form-label">Certificate Type</label>
                  <div className="input-area-add">
                    <div className="float-left">
                      <RHFInput
                        as={<Select options={vesselType} />}
                        rules={{ required: true }}
                        name="certificateTypeData"
                        register={register}
                        value=""
                        onChange={(e) => selectHandle(e, "certificateTypeData")}
                        setValue={setValue}
                      />
                    </div>
                    <div className="float-right">
                      <button className="btn btn-default" type="button" onClick={() => {
                        setShowTypeModal(true)
                      }}>
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div className="inputError margin-minus-10">
                    {errors.certificateTypeData &&
                      errors.certificateTypeData.type === "required" &&
                      "Vessel Type Can't be blank"}
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
                    name="strIssueCode"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.strIssueCode &&
                      errors.strIssueCode.type === "required" &&
                      "Code can't be blank"}
                  </div>
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
                        as={<Select options={vesselType} />}
                        rules={{ required: true }}
                        name="certificateNameData"
                        register={register}
                        value=""
                        onChange={(e) => selectHandle(e, "certificateTypeData")}
                        setValue={setValue}
                      />
                    </div>
                    <div className="float-right">
                      <button className="btn btn-default" type="button" onClick={() => {
                        setShowIssuedByModal(true)
                      }}>
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>


                  <div className="inputError margin-minus-10">
                    {errors.certificateNameData &&
                      errors.certificateNameData.type === "required" &&
                      "Certificate Name Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-3">
                  <label className="form-label mt-2">Issue Place</label>
                  <Form.Control
                    type="text"
                    name="strIssuePlace"
                    className="fromStyle"
                    onChange={handleChange}
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
                  <label className="form-label mt-2">Location</label>
                  <Form.Control
                    type="text"
                    name="strLocation"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.strLocation &&
                      errors.strLocation.type === "required" &&
                      "Location can't be blank"}
                  </div>
                </div>
                <div className="col-lg-3 mt-3">
                  <label htmlFor="">{ '' }</label>
                  <Form.Group controlId="formBasicChecbox">
                    <Form.Check
                      className="forgotPasswordText  "
                      type="checkbox"
                      label="Not on Board"
                    />
                  </Form.Group>
                </div>

                <div className="col-lg-3">
                  <label className="form-label mt-2">Issue Date</label>
                  <Form.Control
                    type="date"
                    name="dteIssueDate"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.dteIssueDate &&
                      errors.dteIssueDate.type === "required" &&
                      "Issue Date can't be blank"}
                  </div>
                </div>

                <div className="col-lg-3">
                  <label className="form-label mt-2">Expiry Date</label>
                  <Form.Control
                    type="date"
                    name="dteExpiryDate"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.dteExpiryDate &&
                      errors.dteExpiryDate.type === "required" &&
                      "Expiry Date can't be blank"}
                  </div>
                </div>
                <div className="col-lg-3">
                  <label className="form-label mt-2">Issueing Authority</label>
                  <Form.Control
                    type="text"
                    name="strIssueingAuthority"
                    placeholder="Enter Issue Authority"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-3">
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
                </div>

                <div className="col-lg-3 mt-8">
                  <Form.Group controlId="formGridCity">
                    <Form.Label>
                      Attachment <span className="text-info text-sm">(Optional) </span>
                      <small className="bg-warning text-white pl-3 pr-3">
                        Allowed Format: png, jpg, jpeg, gif, webp
                        </small>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={(e) => handleChangeTextInput('image', e.target.files[0], e)}
                      className="fromStyle"
                      ref={register}
                    />
                    {serverErrors['image'] &&
                      <div className="text-danger text-sm">
                        {serverErrors['image'].map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </div>
                    }
                    {
                      productData.imagePreviewUrl !== null &&
                      <div className="imgPreview" title="Remove">
                        <div className="preview-delete-icon"><i className="fa fa-times text-danger" onClick={() => dispatch(deleteProductImagePreview())}></i></div>
                        <img src={productData.imagePreviewUrl} className="img img-thumbnail" alt="" style={{ height: 100 }} />
                      </div>
                    }
                  </Form.Group>
                </div>

                <div className="col-lg-3">
                  <label className="form-label mt-2">Remarks</label>
                  <Form.Control
                    type="text"
                    name="dteNextSurvey"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-10">
                  <a
                    onClick={() => {
                      history.push("/certificates-main/list");
                    }}
                  >
                    <button type="button" class="btn btn-secondary btn-lg mr-2">
                      Back
                    </button>
                  </a>
                  {/* <button type="submit" class="btn btn-primary btn-lg">
                    Next
                    </button> */}
                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Submit</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
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
              modalTitle={"Type Name"}
            >
              <CertificateTypeAdd />
            </SimpleModal>
            
          </div>
        </div>
      </div>
    </>
  );
});

export default CertificateMainAdd;
