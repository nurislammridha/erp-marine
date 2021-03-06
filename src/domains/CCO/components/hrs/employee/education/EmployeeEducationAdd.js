import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import FileBase64 from "react-file-base64";
import { checkObjectInArray } from "../../../../utils/Helper";
import {
  AddEmployeeEducationAction,
  EmptyEmployeeEducationAddMessage,
} from "../../../../_redux/actions/EmployeeEducationAction";
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";

const EmployeeEducationAdd = withRouter(({ history, props }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = React.useState({
    strCertification: "",
    strInstitution: "",
    strYear: "",
    strResult: "",
    multipleList: [],
    images: "",
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const certification = [
    {
      label: "SSC",
      value: 1,
    },

    {
      label: "HSC",
      value: 2,
    },
    {
      label: "Maritime Training",
      value: 3,
    },
  ];

  const getFiles = (files) => {
    handleChangeTextInput("images", files[0]);
  };

  const handleChangeTextInput = (name, value) => {
    console.log("value", value);
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData[name] = value;

    if (name === "images") {
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
          // reader.onloadend = () => {
          //   setImagePreviewUrl(reader.result);
          // };
          // reader.readAsDataURL(value);
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
    employeeInfoData["images"] = null;
    setEmployeeInfo(employeeInfoData);
  };

  const addStatus = useSelector(
    (state) => state.employeeEducationInfo.addStatus
  );
  const addMessage = useSelector(
    (state) => state.employeeEducationInfo.addMessage
  );
  // const intEmployeeId = useSelector((state) => state.employeeInfo.intEmployeeId);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (typeof addMessage === null || typeof addMessage === "undefined") {
      disableLoading();
      showToast("error", "Something Went Wrong !");
    } else {
      if (addStatus && addMessage.length > 0) {
        disableLoading();
        showToast("success", addMessage);

        dispatch(EmptyEmployeeEducationAddMessage());
        history.push(
          "/employee/employee-record-add/" + props.match.params.intEmployeeId
        );
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        showToast("error", addMessage);
        dispatch(EmptyEmployeeEducationAddMessage());
      }
    }
  }, [addStatus, addMessage]);

  const addMultipleValue = (e) => {
    // console.log('employeeInfo', employeeInfo);
    // return false

    if (employeeInfo.strCertification === "") {
      showToast("error", "Certification Can't be Blank");
      return false;
    }

    if (employeeInfo.strInstitution === "") {
      showToast("error", "Institution Can't be Blank");
      return false;
    }

    let multipleList = [];
    const employeeInfoData = { ...employeeInfo };
    let employeeInfoDataObj = {
      strCertification: employeeInfoData.strCertification,
      strInstitution: employeeInfoData.strInstitution,
      strYear: employeeInfo.strYear,
      strResult: employeeInfo.strResult,
      images: employeeInfo.images.base64,
      imagePreviewUrl: imagePreviewUrl,
    };
    if (
      !checkObjectInArray(
        employeeInfoDataObj,
        employeeInfoData.multipleList,
        "strCertification"
      )
    ) {
      setImagePreviewUrl(null);
      multipleList.push(employeeInfoDataObj);
      employeeInfoData["strCertification"] = "";
      setValue("strCertification", "");

      employeeInfoData["strInstitution"] = "";
      setValue("strInstitution", "");

      employeeInfoData["strYear"] = "";
      setValue("strYear", "");

      employeeInfoData["strResult"] = "";
      setValue("strResult", "");

      employeeInfoData.multipleList.push(employeeInfoDataObj);
      setEmployeeInfo(employeeInfoData);
    } else {
      showToast("error", "Give Unique Data !");
    }
  };

  const multipleListDelete = (index) => {
    let employeeInfoData = { ...employeeInfo };
    employeeInfo.multipleList.splice(index, 1);
    setEmployeeInfo(employeeInfoData);
  };

  const onSubmit = (data) => {
    if (employeeInfo.multipleList.length > 0) {
      enableLoading();
      dispatch(
        AddEmployeeEducationAction(
          employeeInfo,
          props.match.params.intEmployeeId
        )
      );
    } else {
      showToast("error", "Click Add Button for Multiple Listing !");
      return false;
    }
  };

  return (
    <>
      <div className="card-body">
        <label className="form-label mt-2" style={{ fontWeight: "bold" }}>
          Education
        </label>

        <form
          className="form form-label-right"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          encType="multipart/form-data"
        >
          <div className="form-group row">
            <div className="col-lg-4">
              <label className="form-label">
                Certification
                <small className="validation-symbol"> * </small>
              </label>
              <RHFInput
                as={<Select options={certification} />}
                rules={{ required: false }}
                name="strCertification"
                register={register}
                value={certification.label}
                onChange={(data) =>
                  handleChangeTextInput("strCertification", data)
                }
                setValue={setValue}
              />
            </div>
            <div className="col-lg-4">
              <label className="form-label">
                Institution
                <small className="validation-symbol"> * </small>
              </label>
              <Form.Control
                type="text"
                placeholder="Enter Employee Institution "
                name="strInstitution"
                className="fromStyle"
                onChange={(e) =>
                  handleChangeTextInput("strInstitution", e.target.value)
                }
                ref={register({
                  required: false,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-lg-2">
              <label className="form-label">
                Year
                <small className="validation-symbol"> * </small>
              </label>
              <Form.Control
                type="number"
                placeholder="Enter Year "
                name="strYear"
                className="fromStyle"
                onChange={(e) =>
                  handleChangeTextInput("strYear", e.target.value)
                }
                ref={register({
                  required: false,
                  maxLength: 100,
                })}
              />
            </div>

            <div className="col-lg-2">
              <label className="form-label">
                Result
                <small className="validation-symbol"> * </small>
              </label>
              <Form.Control
                type="number"
                placeholder="Enter Result "
                name="strResult"
                className="fromStyle"
                onChange={(e) =>
                  handleChangeTextInput("strResult", e.target.value)
                }
                ref={register({
                  required: false,
                  maxLength: 100,
                })}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-8">
              <label className="form-label">
                Attachment (Optional)
                <span className="text-warning pl-2 pr-2 text-sm">
                  Allowed Format: image(png, jpg, jpeg, gif, webp), pdf, docx.
                  Max Size: 10MB
                </span>
              </label>

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
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>

          <div className="from-group">
            {/* <a > */}
            <button
              type="button"
              className="btn btn-outline-primary btn-lg"
              onClick={() => addMultipleValue()}
            >
              <i className="fa fa-plus-circle"></i>Add
            </button>
            {/* </a> */}
          </div>
          <div className="react-bootstrap-table table-responsive">
            <table className="table table table-head-custom table-vertical-center">
              <thead>
                <tr>
                  <td>SL</td>
                  <td>Certification</td>
                  <td>Institution</td>
                  <td>Year</td>
                  <td>Result</td>
                  <td>Attachment</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {employeeInfo.multipleList.length > 0 &&
                  employeeInfo.multipleList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.strCertification.label}</td>
                      <td>{item.strInstitution}</td>
                      <td>{item.strYear}</td>
                      <td>{item.strResult}</td>
                      {/* <td>{item.images}</td> */}
                      <td>
                        {" "}
                        <img src={item.imagePreviewUrl} width="40px" />
                        {/* <img src={`data:image/jpeg;base64,${item.images}`} /> */}
                      </td>
                      <td>
                        <a
                          className="btn btn-icon btn-light btn-hover-danger btn-sm"
                          onClick={() => multipleListDelete(index)}
                        >
                          <i className="fa fa-times-circle"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>

              <tfoot></tfoot>
            </table>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <a
                onClick={() => {
                  history.push("/employee/employee-add");
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
                        }}>
                        <button type="submit" class="btn btn-primary btn-lg">Next</button>
                        </a> */}
              {loading && (
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
});

export default EmployeeEducationAdd;
