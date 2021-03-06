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
  UpdateEmployeeDocumentAction,
  EmptyEmployeeDocumentEditMessage,
} from "../../../../_redux/actions/EmployeeDocumentAction";
import { ToastContainer, toast } from "react-toastify";
import { GetEmployeeDetails } from "../../../../_redux/actions/EmployeeAction";
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";
import PreviewAttachment from "../../../../../../modules/master/components/previews/PreviewAttachment";
const EmployeeDocumentEdit = withRouter(
  ({ history, props, setIsAddMode, setIsEditMode }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();
    toast.configure();
    const {
      image,
      intEmployeeId,
      intID,
      intUnitId,
      strCDCNo,
      strExpiryDate,
      strIssueBy,
      strIssueDate,
      strNumber,
      strSID,
      strType,
      intTypeId,
    } = props;
    const [employeeInfo, setEmployeeInfo] = React.useState({
      intID: intID,
      intEmployeeId: intEmployeeId,
      intUnitId: intUnitId,
      // strType: strType,
      typeData: {
        value: intTypeId,
        label: strType,
      },
      strIssueBy: strIssueBy,
      strNumber: strNumber,
      strIssueDate: strIssueDate,
      strExpiryDate: strExpiryDate,
      strCDCNo: strCDCNo,
      strSID: strSID,
      image: image,
    });
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

    const enableLoading = () => {
      setLoading(true);
    };

    const disableLoading = () => {
      setLoading(false);
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

    const handleChange = ({ currentTarget: input }) => {
      const employeeInfoData = { ...employeeInfo };
      employeeInfoData[input.name] = input.value;
      setEmployeeInfo(employeeInfoData);
    };
    const selectHandle = (item, name) => {
      const employeeInfoData = { ...employeeInfo };
      employeeInfoData[name] = item;
      setEmployeeInfo(employeeInfoData);
    };

    // Callback~
    // const getFiles = (files) => {
    //   const imageFile = { ...employeeInfo };
    //   imageFile.image = files[0];
    //   setEmployeeInfo(imageFile);
    // };

    const editStatus = useSelector(
      (state) => state.employeeDocumentInfo.editStatus
    );
    const editMessage = useSelector(
      (state) => state.employeeDocumentInfo.editMessage
    );
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const deleteImagePreview = () => {
      setImagePreviewUrl(null);
      const employeeInfoData = { ...employeeInfo };
      employeeInfoData["image"] = null;
      setEmployeeInfo(employeeInfoData);
    };
    const getFiles = (files) => {
      handleChangeTextInput("image", files[0]);
    };
    useEffect(() => {
      const typeData = {
        value: intTypeId,
        label: strType,
      };

      setValue("typeData", typeData);
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
          dispatch(EmptyEmployeeDocumentEditMessage());
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
          dispatch(EmptyEmployeeDocumentEditMessage());
        }
      }
    }, [editStatus, editMessage]);

    const onSubmit = (data) => {
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

      enableLoading();
      dispatch(UpdateEmployeeDocumentAction(employeeInfo));
    };

    return (
      <>
        <div className="container">
          <div className="card card-custom gutter-b">
            <div className="card-header">
              <div className="card-title">
                <h3 class="card-label">Manage Documents
                {' '}<span className="badge badge-info">Edit</span>
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
              >
                <div className="form-group row">
                  <div className="col-lg-4">
                    <label className="form-label">
                      Type
                      <small className="validation-symbol"> * </small>
                    </label>
                    <RHFInput
                      as={<Select options={certification} />}
                      rules={{ required: false }}
                      name="typeData"
                      register={register}
                      value={certification.label}
                      onChange={(e) => selectHandle(e, "typeData")}
                      //   onChange={(e) => handleChangeTextInput(e, "typeData")}
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
                      placeholder="Enter Issued By "
                      name="strIssueBy"
                      className="fromStyle"
                      value={employeeInfo.strIssueBy}
                      onChange={handleChange}
                      ref={register({
                        required: false,
                        maxLength: 100,
                      })}
                    />
                  </div>

                  <div className="col-lg-4">
                    <label className="form-label">
                      Number
                      <small className="validation-symbol"> * </small>
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Number "
                      name="strNumber"
                      className="fromStyle"
                      value={employeeInfo.strNumber}
                      onChange={handleChange}
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
                      placeholder="Enter Result "
                      name="strIssueDate"
                      className="fromStyle"
                      value={employeeInfo.strIssueDate}
                      onChange={handleChange}
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
                      value={employeeInfo.strExpiryDate}
                      onChange={handleChange}
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
                                        value={employeeInfo.strCDCNo}
                                        onChange={handleChange}
                                    // ref={register({
                                    //     required: false,
                                    //     maxLength: 100,
                                    // })}
                                    />
                                </div> */}

                  {/* <div className="col-lg-4">
                                    <label className="form-label">SID</label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter SID "
                                        name="strSID"
                                        className="fromStyle"
                                        value={employeeInfo.strSID}
                                        onChange={handleChange}
                                    // ref={register({
                                    //     required: false,
                                    //     maxLength: 100,
                                    // })}
                                    />
                                </div> */}
                </div>

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
                        setIsEditMode(false);
                        setIsAddMode(true);
                        history.push(
                          "/employee/employee-documents-add/" + intEmployeeId
                        );
                      }}
                    >
                      <button type="button" class="btn btn-secondary btn-lg">
                        Back
                      </button>
                    </a>
                  </div>

                  <div className="col-sm-2">
                    {loading && (
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg"
                        disabled={true}
                      >
                        <span>Update</span>
                        <span className="ml-3 spinner spinner-white"></span>
                      </button>
                    )}

                    {!loading && (
                      <button type="submit" class="btn btn-primary btn-lg">
                        <span>Update</span>
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
  }
);

export default EmployeeDocumentEdit;
