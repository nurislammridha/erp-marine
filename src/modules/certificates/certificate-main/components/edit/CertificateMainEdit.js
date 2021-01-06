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

const CertificateMainEdit = withRouter(({ history, props }) => {
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

  const handleChangeTextInput = (name, value, e=null) => {
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

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Certificate Main Create</h3>
            </div>
          </div>
          <div className="card-body">
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row mt-5">
              <div className="col-lg-4">
                  <label className="form-label">Vessel Name</label>
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
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Certificate Category</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Category Type"
                    name="certificateCategoryData"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.certificateCategoryData &&
                      errors.certificateCategoryData.type === "required" &&
                      "Certificate category can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Certificate Type</label>
                  <RHFInput
                    as={<Select options={vesselType} />}
                    rules={{ required: true }}
                    name="certificateTypeData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "certificateTypeData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.certificateTypeData &&
                      errors.certificateTypeData.type === "required" &&
                      "Vessel Type Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Vesse Name</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Flag"
                    name="strVesselFlag"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required:true,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Name of Certificates</label>
                  <RHFInput
                    as={<Select options={vesselType} />}
                    rules={{ required: true }}
                    name="certificateNameData"
                    register={register}
                    value=""
                    onChange={(e) => selectHandle(e, "certificateTypeData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.certificateNameData &&
                      errors.certificateNameData.type === "required" &&
                      "Certificate Name Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
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

                <div className="col-lg-4">
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
                <div className="col-lg-4">
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
                <div className="col-lg-4">
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
                <div className="col-lg-4">
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
                <div className="col-lg-4">
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

                <div className="col-lg-4 mt-8">
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
                            { serverErrors['image'].map((error, index) => (
                                    <li key={index}>{error}</li>
                            ))}
                        </div>
                    }
                    {
                        productData.imagePreviewUrl !== null &&
                        <div className="imgPreview" title="Remove">
                            <div className="preview-delete-icon"><i className="fa fa-times text-danger" onClick={() => dispatch(deleteProductImagePreview())}></i></div>
                            <img src={productData.imagePreviewUrl} className="img img-thumbnail" alt="" style={{height:100}} />
                        </div>
                    }
                </Form.Group>
                </div>

                <div className="col-lg-4">
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
                      history.push("/vessels/list");
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
          </div>
        </div>
      </div>
    </>
  );
});

export default CertificateMainEdit;
