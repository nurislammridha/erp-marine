import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import FileBase64 from "react-file-base64";
import { checkObjectInArray } from "../../../../utils/Helper";
import {
  AddEmployeeDocumentAction,
  EmptyEmployeeDocumentAddMessage,
  GetEmployeeCDCList,
} from "../../../../_redux/actions/EmployeeDocumentAction";
import { ToastContainer, toast } from "react-toastify";
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";
const EmployeeDocumentAdd = withRouter(({ history, props }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  toast.configure();
  const [employeeInfo, setEmployeeInfo] = React.useState({
    strType: "",
    strIssueBy: "",
    strNumber: "",
    strIssueDate: "",
    strExpiryDate: "",
    strCDCNo: "",
    strSID: "",
    multipleList: [],
    images: "",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const { intEmployeeId } = props.match.params;
  const certification = [
    {
      label: "Passport",
      value: 1,
    },

    {
      label: "National ID",
      value: 2,
    },
    {
      label: "Birth Cirtificate",
      value: 3,
    },
    {
      label: "CDC",
      value: 4,
    },
    {
      label: "SID",
      value: 5,
    },
  ];

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

  const selectHandle = (data) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData.strType = data;
    setEmployeeInfo(employeeInfoData);
  };

  const deleteImagePreview = () => {
    setImagePreviewUrl(null);
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData["images"] = null;
    setEmployeeInfo(employeeInfoData);
  };
  // Callback~
  //   const getFiles = (files) => {
  //     const imageFile = { ...employeeInfo };
  //     imageFile.images = files[0];
  //     setEmployeeInfo(imageFile);
  //   };
  const getFiles = (files) => {
    handleChangeTextInput("images", files[0]);
  };
  const addStatus = useSelector(
    (state) => state.employeeDocumentInfo.addStatus
  );
  const addMessage = useSelector(
    (state) => state.employeeDocumentInfo.addMessage
  );
  const employeeCDCList = useSelector(
    (state) => state.employeeDocumentInfo.employeeCDCList
  );

  useEffect(() => {
    dispatch(GetEmployeeCDCList());
    if (typeof addMessage === null || typeof addMessage === "undefined") {
      disableLoading();
      showToast("error", "Something Went Wrong !");
    } else {
      if (addStatus && addMessage.length > 0) {
        disableLoading();
        showToast("success", addMessage);
        dispatch(EmptyEmployeeDocumentAddMessage());
        history.push("/employee/employee-documents-add/" + intEmployeeId);
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        showToast("error", addMessage);
        dispatch(EmptyEmployeeDocumentAddMessage());
      }
    }
  }, [addStatus, addMessage]);

  const addMultipleValue = (e) => {
    // console.log('employeeInfo', employeeInfo);
    // return false

    if (employeeInfo.strType === "") {
      showToast("error", "Type Can't be Blank");
      return false;
    }

    if (employeeInfo.strIssueBy === "") {
      showToast("error", "Issued By Can't be Blank");
      return false;
    }
    if (employeeInfo.strNumber === "") {
      showToast("error", "Number Can't be Blank");
      return false;
    }
    if (employeeInfo.strIssueDate === "") {
      showToast("error", "Issue Date Can't be Blank");
      return false;
    }
    if (employeeInfo.strExpiryDate === "") {
      showToast("error", "Expiry Date Can't be Blank");
      return false;
    }
    if (employeeInfo.strIssueDate > employeeInfo.strExpiryDate) {
      showToast("error", "Expiry Date Can't be Smaller Than Issue Date");
      return false;
    }
    let multipleList = [];
    const employeeInfoData = { ...employeeInfo };
    let employeeInfoDataObj = {
      strType: employeeInfoData.strType,
      strIssueBy: employeeInfoData.strIssueBy,
      strNumber: employeeInfo.strNumber,
      strIssueDate: employeeInfo.strIssueDate,
      strExpiryDate: employeeInfo.strExpiryDate,
      // strCDCNo: employeeInfo.strCDCNo,
      // strSID: employeeInfo.strSID,
      images: employeeInfo.images.base64,
      imagePreviewUrl: imagePreviewUrl,
    };

    if (
      !checkObjectInArray(
        employeeInfoDataObj,
        employeeInfoData.multipleList,
        "strType"
      )
    ) {
      setImagePreviewUrl(null);
      multipleList.push(employeeInfoDataObj);
      employeeInfoData["strType"] = "";
      setValue("strType", "");

      employeeInfoData["strIssueBy"] = "";
      setValue("strIssueBy", "");

      employeeInfoData["strNumber"] = "";
      setValue("strNumber", "");

      employeeInfoData["strIssueDate"] = "";
      setValue("strIssueDate", "");

      employeeInfoData["strExpiryDate"] = "";
      setValue("strExpiryDate", "");

      // employeeInfoData["strCDCNo"] = "";
      // setValue("strCDCNo", "");

      // employeeInfoData["strSID"] = "";
      // setValue("strSID", "");

      //   employeeInfoData["images"] = "";
      //   setValue("images", "");

      employeeInfoData.multipleList.unshift(employeeInfoDataObj);
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
      dispatch(AddEmployeeDocumentAction(employeeInfo, intEmployeeId));
    } else {
      showToast("error", "Click Add Button for Multiple Listing !");
      return false;
    }
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">
                Manage Documents <span className="badge badge-info">Add</span>
              </h3>
            </div>
          </div>
          <div className="card-body">
            <label className="form-label mt-2" style={{ fontWeight: "bold" }}>
              Document
            </label>
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row">
                <div className="col-lg-4">
                  <label className="form-label">
                    Type <small className="validation-symbol"> * </small>
                  </label>
                  <RHFInput
                    as={<Select options={certification} />}
                    rules={{ required: false }}
                    name="strType"
                    register={register}
                    value={certification.label}
                    onChange={(data) => handleChangeTextInput("strType", data)}
                    setValue={setValue}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">
                    Issued By 
                    <small className="validation-symbol"> * </small>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Issued By Name "
                    name="strIssueBy"
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput("strIssueBy", e.target.value)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    Number<small className="validation-symbol"> * </small>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Number "
                    name="strNumber"
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput("strNumber", e.target.value)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    Issue Date
                    <small className="validation-symbol"> * </small>
                  </label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Issued Date "
                    name="strIssueDate"
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput("strIssueDate", e.target.value)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">
                    Expiry date
                    <small className="validation-symbol"> * </small>
                  </label>
                  <Form.Control
                    type="date"
                    name="strExpiryDate"
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput("strExpiryDate", e.target.value)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                {/* <div className="col-lg-4">
                                    <label className="form-label">CDC No</label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter CDC No "
                                        name="strCDCNo"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div> */}
                {/* <div className="col-lg-4">
                                    <label className="form-label">CDC No</label>
                                    <RHFInput
                                        as={<Select options={certification} />}
                                        rules={{ required: false }}
                                        name="strType"
                                        register={register}
                                        value={certification.label}
                                        onChange={selectHandle}
                                        setValue={setValue}
                                    />
                                </div> */}

                {/* <div className="col-lg-4">
                                    <label className="form-label">SID</label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter SID "
                                        name="strSID"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div> */}
              </div>

              <div className="form-group row">
                <div className="col-lg-8">
                  <label className="form-label">
                    Attachment (Optional)
                    <span className="text-warning pl-2 pr-2 text-sm">
                      Allowed Format: image(png, jpg, jpeg, gif, webp), pdf,
                      docx. Max Size: 10MB
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
                        alt="Image"
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
                      <td>Type</td>
                      <td>Issue By</td>
                      <td>Number</td>
                      <td>Issue Date</td>
                      <td>Expiry Date</td>

                      <td>Attachment</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeInfo.multipleList.length > 0 &&
                      employeeInfo.multipleList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.strType.label}</td>
                          <td>{item.strIssueBy}</td>
                          <td>{item.strNumber}</td>
                          <td>{item.strIssueDate}</td>
                          <td>{item.strExpiryDate}</td>
                          {/* <td>{item.strCDCNo}</td>
                                                <td>{item.strSID}</td> */}
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
                      history.push(
                        "/employee/employee-record-add/" + intEmployeeId
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
                  {/* <button type="submit" class="btn btn-primary btn-lg">Next</button> */}
                  {/* </a> */}

                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Save</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Save</span>
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

export default EmployeeDocumentAdd;
