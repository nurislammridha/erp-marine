import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import FileBase64 from "react-file-base64";
import { UpdateEmployeeEducationAction, EmptyEmployeeEducationEditMessage} from "../../../../_redux/actions/EmployeeEducationAction";
import { ToastContainer, toast } from "react-toastify";
import { GetEmployeeDetails } from "../../../../_redux/actions/EmployeeAction";
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";

const EmployeeEducationEdit = withRouter(({ history, props }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  toast.configure();
  const {
    intID,
    intEmployeeId,
    intUnitId,
    strCertification,
    intCertificateId,
    strInstitution,
    strResult,
    strYear,
    image,
  } = props;
  const [employeeInfo, setEmployeeInfo] = React.useState({
    intID: intID,
    // strCertification: '',
    certificateData: {
      value: parseInt(intCertificateId),
      label: strCertification,
    },
    strInstitution: strInstitution,
    strYear: strYear,
    strResult: strResult,
    intEmployeeId: intEmployeeId,
    intUnitId: intUnitId,
    image: image
  });

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

  //preview attachment
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    `${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeEducation/${image}`
  );

  const selectHandle = (item, name) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData[name] = item;
    setEmployeeInfo(employeeInfoData);
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const handleChangeTextInput = (name, value) => {
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

  const deleteImagePreview = () => {
    setImagePreviewUrl(null);
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData["image"] = null;
    setEmployeeInfo(employeeInfoData);
  };

  // Callback~
  const getFiles = (files) => {
    handleChangeTextInput("image", files[0]);
  };

  const editStatus = useSelector(
    (state) => state.employeeEducationInfo.editStatus
  );
  const editMessage = useSelector(
    (state) => state.employeeEducationInfo.editMessage
  );

  useEffect(() => {
    const certificateData = {
      value: parseInt(intCertificateId),
      label: strCertification,
    };
    setValue("certificateData", certificateData);
    // dispatch(GetEmployeeEducationDetails(props.match.params.intEmployeeId));
    if (typeof editMessage === null || typeof editMessage === "undefined") {
      disableLoading();
      toast.error("Something Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (editStatus && editMessage.length > 0) {
        disableLoading();
        showToast('success', editMessage)
        // toast.success(editMessage, {
        //   autoClose: 2000,
        //   className: "primaryColor",
        //   position: toast.POSITION.BOTTOM_RIGHT,
        // });
        dispatch(EmptyEmployeeEducationEditMessage());
        dispatch(GetEmployeeDetails(intEmployeeId));
        // history.push("/employee/employee-education-edit" + intEmployeeId);
      }

      if (!editStatus && editMessage.length > 0) {
        disableLoading();
        showToast('error', editMessage)
        // toast.error(editMessage, {
        //   autoClose: 2000,
        //   className: "dangerColor",
        //   position: toast.POSITION.TOP_RIGHT,
        // });
        dispatch(EmptyEmployeeEducationEditMessage());
      }
    }
  }, [employeeInfo, editStatus, editMessage]);

  const onSubmit = (data) => {
    if (employeeInfo.certificateData === "") {
      showToast("error", "certificate Data Can't be Blank");
      return false;
    }

    if (employeeInfo.strInstitution === "") {
      showToast("error", "Institution Can't be Blank");
      return false;
    }
    if (employeeInfo.strYear === "") {
      showToast("error", "Year Can't be Blank");
      return false;
    }
    if (employeeInfo.strResult === "") {
      showToast("error", "Result Can't be Blank");
      return false;
    }
    enableLoading();
    dispatch(UpdateEmployeeEducationAction(employeeInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          {/* 
                    <div>
                        <EmployeeTab props={props} />
                    </div> */}
          <div className="card-body">
            <label className="form-label mt-2" style={{ fontWeight: "bold" }}>
              Education
            </label>
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row">
                <div className="col-lg-4">
                  <label className="form-label">Certification <small className="validation-symbol"> * </small> </label>
                  <RHFInput
                    as={<Select options={certification} />}
                    rules={{ required: false }}
                    name="certificateData"
                    register={register}
                    value={certification.label}
                    onChange={(data) =>
                      handleChangeTextInput("strCertification", data)
                    }
                    setValue={setValue}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label"> Institution <small className="validation-symbol"> * </small> </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Employee Institution "
                    name="strInstitution"
                    className="fromStyle"
                    value={employeeInfo.strInstitution}
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
                  <label className="form-label">Year <small className="validation-symbol"> * </small> </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Year "
                    name="strYear"
                    className="fromStyle"
                    value={employeeInfo.strYear}
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
                  <label className="form-label">Result <small className="validation-symbol"> * </small> </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Result "
                    name="strResult"
                    className="fromStyle"
                    value={employeeInfo.strResult}
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
                      <div className="preview-delete-icon cursor-pointer">
                        <i
                          className="fa fa-times text-danger"
                          onClick={() => deleteImagePreview()}
                        ></i>
                      </div>
                      <img
                        width="140px"
                        src={imagePreviewUrl}
                        className="img img-thumbnail"
                        alt=""
                      />
                    </div>
                  )}
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
              {/* 
                            <div className="from-group">
                                <a >
                                <button type="button" className="btn btn-outline-primary btn-lg" onClick={() => addMultipleValue()}><i className="fa fa-plus-circle"></i>Add</button>
                                </a>
                            </div> */}
              {/* <div className="react-bootstrap-table table-responsive">
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
                                        {employeeInfo.multipleList.length > 0 && employeeInfo.multipleList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strCertification.label}</td>
                                                <td>{item.strInstitution}</td>
                                                <td>{item.strYear}</td>
                                                <td>{item.strResult}</td>
                                                <td>{item.image}</td>
                                                <td> <img src={`data:image/jpeg;base64,${item.image}`} /></td>
                                                <td >
                                                    <a className="btn btn-icon btn-light btn-hover-danger btn-sm" onClick={() => multipleListDelete(index)}><i className="fa fa-times-circle"></i></a>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>

                                    <tfoot>

                                    </tfoot>

                                </table>
                            </div> */}
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
});

export default EmployeeEducationEdit;
