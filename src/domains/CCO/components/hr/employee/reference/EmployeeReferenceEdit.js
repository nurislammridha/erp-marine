import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import FileBase64 from "react-file-base64";
import { checkObjectInArray } from "../../../../utils/Helper";
import {
  UpdateEmployeeReferenceAction,
  EmptyEmployeeReferenceEditMessage,
} from "../../../../_redux/actions/EmployeeReferenceAction";
import { ToastContainer, toast } from "react-toastify";
import EmployeeTab from "../EmployeeTab";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { GetEmployeeDetails } from "../../../../_redux/actions/EmployeeAction";
import PreviewAttachment from "../../../../../../modules/master/components/previews/PreviewAttachment";

const EmployeeReferenceEdit = withRouter(({ history, props }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  toast.configure();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const {
    image,
    intEmployeeId,
    intID,
    intUnitId,
    strAddress,
    strCompanyName,
    strCountry,
    strEmail,
    strPersonName,
    isVisa,
    maritimeAccident,
    strTelephone,
  } = props;
  const [employeeInfo, setEmployeeInfo] = React.useState({
    image: image,
    intEmployeeId: intEmployeeId,
    intID: intID,
    intUnitId: intUnitId,
    strCompanyName: strCompanyName,
    strPersonName: strPersonName,
    strTelephone: strTelephone,
    strEmail: strEmail,
    strAddress: strAddress,
    strCountry: strCountry,
    isVisa: isVisa,
    maritimeAccident: maritimeAccident,
    multipleList: [],
  });

  const country = [
    {
      label: "Bangladesh",
      value: 1,
    },

    {
      label: "USA",
      value: 2,
    },
    {
      label: "Nepal",
      value: 3,
    },
  ];

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const handleChange = ({ currentTarget: input }) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData[input.name] = input.value;
    setEmployeeInfo(employeeInfoData);
  };

  const handleChangeTextInput = (name, value) => {
    console.log("value", value);
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData[name] = value;

    if (name === "image") {
      const attachment = value;
      const { type } = attachment;

      const validatedData = checkAttchmentValidation(attachment);
      if (validatedData.isValidated) {
        let reader = new FileReader();
        if (type === "application/pdf") {
          setImagePreviewUrl("/media/default/icons/pdf.png");
        } else if (type === "application/msword") {
          setImagePreviewUrl("/media/default/icons/word.png");
        } else {
          setImagePreviewUrl("/media/default/icons/image.jpg");
        }
      } else {
        showToast("error", validatedData.message);
      }
      setEmployeeInfo(employeeInfoData);
    } else {
      setEmployeeInfo(employeeInfoData);
    }
  };
  const deleteImagePreview = () => {
    setImagePreviewUrl(null);
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData["image"] = null;
    setEmployeeInfo(employeeInfoData);
  };
  const selectHandle = (data) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData.strCountry = data;
    setEmployeeInfo(employeeInfoData);
  };

  // Callback~

  const getFiles = (files) => {
    handleChangeTextInput("image", files[0]);
  };

  // const getFiles = (files) => {
  //     const imageFile = { ...employeeInfo };
  //     imageFile.image = files[0];
  //     setEmployeeInfo(imageFile);
  // }

  const editStatus = useSelector(
    (state) => state.employeeReferenceInfo.editStatus
  );
  const editMessage = useSelector(
    (state) => state.employeeReferenceInfo.editMessage
  );

  useEffect(() => {
    if (typeof editMessage === null || typeof editMessage === "undefined") {
      disableLoading();
      toast.error("Something Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      disableLoading();
      if (editStatus && editMessage.length > 0) {
        toast.success(editMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(EmptyEmployeeReferenceEditMessage());
        // history.push("/employee/employee-certificates-add/" + intEmployeeId);
        dispatch(GetEmployeeDetails(intEmployeeId));
      }

      if (!editStatus && editMessage.length > 0) {
        disableLoading();
        toast.error(editMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(EmptyEmployeeReferenceEditMessage());
      }
    }
  }, [editStatus, editMessage]);

  const onSubmit = (data) => {
    if (employeeInfo.strCompanyName === "") {
        showToast("error", "Company Name can't be Blank");
        return false;
    }

    if (employeeInfo.strPersonName === "") {
        showToast("error", "Person Name Can't be Blank");
        return false;
    }
    if (employeeInfo.strTelephone === "") {
      showToast("error", "Telephone Can't be blank");
      return false;
  }

  if (employeeInfo.strEmail === "") {
      showToast("error", "Email Can't be blank");
      return false;
  }
  if (employeeInfo.strAddress === "") {
      showToast("error", "Address Can't be blank");
      return false;
  }
  if (employeeInfo.strCountry === "") {
      showToast("error", "Country Can't be blank");
      return false;
  }
  
  enableLoading();
  dispatch(UpdateEmployeeReferenceAction(employeeInfo, intEmployeeId));
 
};
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">
                Manage Employee Records{" "}
                <span className="badge badge-info">Edit</span>
              </h3>
            </div>
          </div>
          <div className="card-body">
            <label className="form-label mt-2" style={{ fontWeight: "bold" }}>
              Immegration Information
            </label>
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row">
                <div className="col-lg-2 row">
                  <p>Have you ever been denied to foreign visa?</p>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="isVisa"
                    value="yes"
                    id="yes1"
                    onChange={handleChange}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isVisa"
                    value="no"
                    id="no1"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-lg-4 row">
                  <p>
                    Have you been the subject of a court of inquiry or involved
                    in a maritime accident?
                  </p>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="maritimeAccident"
                    value="yes"
                    id="yes2"
                    onChange={handleChange}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Form.Check
                    type="radio"
                    label="No"
                    value="no"
                    name="maritimeAccident"
                    id="no2"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label className="form-label mt-2" style={{ fontWeight: "bold" }}>
                Reference
              </label>
              <div className="form-group row">
                <div className="col-lg-4">
                  <label className="form-label">
                    Name Of Company <span className="form-valid">*</span>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Company Name "
                    name="strCompanyName"
                    value={employeeInfo.strCompanyName}
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">
                    Person Name <span className="form-valid">*</span>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Person Name"
                    name="strPersonName"
                    value={employeeInfo.strPersonName}
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    Teelephone <span className="form-valid">*</span>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Telephone "
                    name="strTelephone"
                    value={employeeInfo.strTelephone}
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    Email <span className="form-valid">*</span>
                  </label>
                  <Form.Control
                    type="text"
                    name="strEmail"
                    value={employeeInfo.strEmail}
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">
                    Address <span className="form-valid">*</span>{" "}
                  </label>
                  <Form.Control
                    type="text"
                    name="strAddress"
                    value={employeeInfo.strAddress}
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    Country <span className="form-valid">*</span>{" "}
                  </label>
                  <RHFInput
                    as={<Select options={country} />}
                    rules={{ required: false }}
                    name="strCountry"
                    value={employeeInfo.strCountry}
                    register={register}
                    value={country.label}
                    onChange={selectHandle}
                    setValue={setValue}
                  />
                </div>
              </div>

              {/* <div className="form-group row">
                                <div className="col-lg-4">
                                    <FileBase64
                                        name="image"
                                        multiple={true}
                                        onDone={getFiles.bind(this)} />
                                </div>

                            </div> */}
              <div className="form-group row">
                <div className="col-lg-4">
                  <FileBase64
                    name="image"
                    multiple={true}
                    onDone={getFiles.bind(this)}
                  />

                  {imagePreviewUrl !== null && (
                    <div className="imgPreview" title="Remove">
                      <div className="preview-delete-icon">
                        <i
                          className="fa fa-times text-danger"
                          onClick={() => deleteImagePreview()}
                        ></i>
                      </div>
                      <img
                        src={imagePreviewUrl}
                        className="img img-thumbnail"
                        alt="Image"
                      />
                    </div>
                  )}
                  {imagePreviewUrl === null && (
                    <PreviewAttachment
                      url={`${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeDocument/${employeeInfo.image}`}
                    />
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <a
                    onClick={() => {
                      history.push(
                        "/employee/employee-bank-details-add/" + intEmployeeId
                      );
                    }}
                  >
                    <button type="button" class="btn btn-secondary btn-lg">
                      Back
                    </button>
                  </a>
                </div>

                <div className="col-sm-2">
                  {/* <a onClick={() => {
                                        history.push("/employee/employee-record-add");
                                    }}> */}
                  {loading && (
                    // <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Next</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Next</span>
                    </button>
                  )}
                  {/* </a> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

{/* <div className="col-lg-4">
<label className="form-label">Name Of Company</label>
<small className="validation-symbol"> * </small>
<Form.Control
    type="text"
    placeholder="Enter Company Name "
    name="strCompanyName"
    value={employeeInfo.strCompanyName}
    className="fromStyle"
    onChange={handleChange}
    ref={register({
        required: false,
        maxLength: 100,
    })}
/>
</div>
<div className="col-lg-4">
<label className="form-label">Person Name</label>
<small className="validation-symbol"> * </small>
<Form.Control
    type="text"
    placeholder="Enter Person Name"
    name="strPersonName"
    value={employeeInfo.strPersonName}
    className="fromStyle"
    onChange={handleChange}
    ref={register({
        required: false,
        maxLength: 100,
    })}
/>
</div>

<div className="col-lg-4">
<label className="form-label">Teelephone</label>
<small className="validation-symbol"> * </small>
<Form.Control
    type="text"
    placeholder="Enter Telephone "
    name="strTelephone"
    value={employeeInfo.strTelephone}
    className="fromStyle"
    onChange={handleChange}
    ref={register({
        required: false,
        maxLength: 100,
    })}
/>
</div>

<div className="col-lg-4">
<label className="form-label">Email</label>
<small className="validation-symbol"> * </small>
<Form.Control
    type="text"
    name="strEmail"
    value={employeeInfo.strEmail}
    className="fromStyle"
    onChange={handleChange}
    ref={register({
        required: false,
        maxLength: 100,
    })}
/>
</div>
<div className="col-lg-4">
<label className="form-label">Address</label>
<small className="validation-symbol"> * </small>
<Form.Control
    type="text"
    name="strAddress"
    value={employeeInfo.strAddress}
    className="fromStyle"
    onChange={handleChange}
    ref={register({
        required: false,
        maxLength: 100,
    })}
/>
</div>

<div className="col-lg-4">
<label className="form-label">Country</label>
<small className="validation-symbol"> * </small>
<RHFInput
    as={<Select options={country} />}
    rules={{ required: false }}
    name="strCountry"
    value={employeeInfo.strCountry}
    register={register}
    value={country.label}
    onChange={selectHandle}
    setValue={setValue}
/>
</div>
</div> */}


export default EmployeeReferenceEdit;
