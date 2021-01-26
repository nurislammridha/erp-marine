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
  AddEmployeeReferenceAction,
  EmptyEmployeeReferenceAddMessage,
} from "../../../../_redux/actions/EmployeeReferenceAction";
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";

const EmployeeReferenceAdd = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = React.useState({
    strCompanyName: "",
    strPersonName: "",
    strTelephone: "",
    strEmail: "",
    strAddress: "",
    strCountry: "",
    isVisa: "",
    maritimeAccident: "",
    multipleList: [],
    images: "",
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const { intEmployeeId } = props.match.params;

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

  const getFiles = (files) => {
    handleChangeTextInput("images", files[0]);
  };

  const handleChangeTextInput = (name, value) => {
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

  const loading = useSelector((state) => state.employeeReferenceInfo.isLoading);
  const addStatus = useSelector(
    (state) => state.employeeReferenceInfo.addStatus
  );
  const addMessage = useSelector(
    (state) => state.employeeReferenceInfo.addMessage
  );

  useEffect(() => {
    if (typeof addMessage === null || typeof addMessage === "undefined") {
      showToast("error", "Something Went Wrong !");
    } else {
      if (addStatus && addMessage.length > 0) {
        showToast("success", addMessage);

        dispatch(EmptyEmployeeReferenceAddMessage());
        history.push(
          "/employee/employee-reference-add/" + props.match.params.intEmployeeId
        );
      }

      if (!addStatus && addMessage.length > 0) {
        showToast("error", addMessage);
        dispatch(EmptyEmployeeReferenceAddMessage());
      }
    }
  }, [addStatus, addMessage]);

  const addMultipleValue = (e) => {
    //input fields validation
    if (employeeInfo.strCompanyName === "") {
      showToast("error", "Company Name Can't be blank!! ");
      return false;
    }

    if (employeeInfo.strPersonName === "") {
      showToast("error", "Person Name Can't be Blank!! ");
      return false;
    }

    if (employeeInfo.strEmail === "") {
      showToast("error", "Email Can't be blank!! ");
      return false;
    }

    if (employeeInfo.strAddress === "") {
      showToast("error", "Address Can't be blank!! ");
      return false;
    }

    if (employeeInfo.strCountry === "") {
      showToast("error", "Country Can't be blank!! ");
      return false;
    }

    let multipleList = [];
    const employeeInfoData = { ...employeeInfo };
    let employeeInfoDataObj = {
      strCompanyName: employeeInfoData.strCompanyName,
      strPersonName: employeeInfoData.strPersonName,
      strTelephone: employeeInfo.strTelephone,
      strEmail: employeeInfo.strEmail,
      strAddress: employeeInfo.strAddress,
      strCountry: employeeInfo.strCountry,
      isVisa: employeeInfo.isVisa,
      maritimeAccident: employeeInfo.maritimeAccident,
      images: employeeInfo.images.base64,
      imagePreviewUrl: imagePreviewUrl,
    };

    if (
      !checkObjectInArray(
        employeeInfoDataObj,
        employeeInfoData.multipleList,
        "strCompanyName"
      )
    ) {
      setImagePreviewUrl(null);
      multipleList.push(employeeInfoDataObj);
      employeeInfoData["strCompanyName"] = "";
      setValue("strCompanyName", "");

      employeeInfoData["strPersonName"] = "";
      setValue("strPersonName", "");

      employeeInfoData["strTelephone"] = "";
      setValue("strTelephone", "");

      employeeInfoData["strEmail"] = "";
      setValue("strEmail", "");

      employeeInfoData["strAddress"] = "";
      setValue("strAddress", "");

      employeeInfoData["isVisa"] = "";
      setValue("isVisa", "");

      employeeInfoData["maritimeAccident"] = "";
      setValue("maritimeAccident", "");

      employeeInfoData["images"] = "";
      setValue("images", "");

      employeeInfoData["strCountry"] = "";
      setValue("strCountry", "");

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
      dispatch(
        AddEmployeeReferenceAction(
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
            <div className="container">
                <div className="card card-custom gutter-b">
                    <div className="card-header">
                        <div className="card-title">
                            <h3 className="card-label">Manage Employee References
                            {' '}<span className="badge badge-info">Add</span>
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <label className="form-label mt-2" style={{ fontWeight: 'bold' }}>Immegration Information</label>
                        <form className="form form-label-right" onSubmit={handleSubmit(onSubmit)} method="post">
                            <div className="form-group row">
                                <div className="col-lg-2 row ml-1">
                                    <p>Have you ever been denied to foreign visa?</p>
                                    <Form.Check
                                        type="radio"
                                        label="Yes"
                                        name="isVisa"
                                        value="yes"
                                        id="yes1"
                                        // onChange={handleChange}
                                        onChange={(e) =>
                                        handleChangeTextInput("isVisa", e.target.value)
                                        }
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Form.Check
                                        type="radio"
                                        label="No"
                                        name="isVisa"
                                        value="no"
                                        id="no1"
                                        // onChange={handleChange}
                                        onChange={(e) =>
                                        handleChangeTextInput("isVisa", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-lg-4 row ml-1">
                                    <p>Have you been the subject of a court of inquiry or involved in a maritime accident?</p>
                                    <Form.Check
                                        type="radio"
                                        label="Yes"
                                        name="maritimeAccident"
                                        value="yes"
                                        id="yes2"
                                        // onChange={handleChange}
                                        onChange={(e) =>
                                        handleChangeTextInput("maritimeAccident", e.target.value)
                                        }
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Form.Check
                                        type="radio"
                                        label="No"
                                        value="no"
                                        name="maritimeAccident"
                                        id="no2"
                                        // onChange={handleChange}
                                        onChange={(e) =>
                                        handleChangeTextInput("maritimeAccident", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <label className="form-label mt-2" style={{ fontWeight: 'bold' }}>Reference</label>
                            <div className="form-group row">

                                <div className="col-lg-4">
                                    <label className="form-label">
                                    Name Of Company
                                    <small className="validation-symbol"> * </small>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Company Name "
                                        name="strCompanyName"
                                        className="fromStyle"
                                        // onChange={handleChange}
                                        onChange={(e) =>
                                        handleChangeTextInput("strCompanyName", e.target.value)
                                        }
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">
                                    Person Name
                                    <small className="validation-symbol"> * </small>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Person Name"
                                        name="strPersonName"
                                        className="fromStyle"
                                        onChange={(e) =>
                                        handleChangeTextInput("strPersonName", e.target.value)
                                        }
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">
                                    Teelephone
                                    <small className="validation-symbol"> * </small>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Telephone "
                                        name="strTelephone"
                                        className="fromStyle"
                                        onChange={(e) =>
                                        handleChangeTextInput("strTelephone", e.target.value)
                                        }
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">
                                    Email
                                    <small className="validation-symbol"> * </small>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="strEmail"
                                        className="fromStyle"
                                        onChange={(e) =>
                                        handleChangeTextInput("strEmail", e.target.value)
                                        }
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">
                                    Address
                                    <small className="validation-symbol"> * </small>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="strAddress"
                                        className="fromStyle"
                                        // onChange={handleChange}
                                        onChange={(e) =>
                                        handleChangeTextInput("strAddress", e.target.value)
                                        }
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">
                                    Country
                                    <small className="validation-symbol"> * </small>
                                    </label>
                                    <RHFInput
                                        as={<Select options={country} />}
                                        rules={{ required: false }}
                                        name="strCountry"
                                        register={register}
                                        value={country.label}
                                        // onChange={selectHandle}
                                        onChange={(data) =>
                                            handleChangeTextInput("strCountry", data)
                                        }
                                        setValue={setValue}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
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
                                        onDone={getFiles.bind(this)} />

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
                                <button type="button" className="btn btn-outline-primary btn-lg" onClick={() => addMultipleValue()}><i className="fa fa-plus-circle"></i>Add</button>
                                {/* </a> */}
                            </div>
                            <div className="react-bootstrap-table table-responsive">
                                <table className="table table table-head-custom table-vertical-center">
                                    <thead>
                                        <tr>
                                            <td>SL</td>
                                            <td>Name Of Country</td>
                                            <td>Person Name</td>
                                            <td>Teelephone</td>
                                            <td>Email</td>
                                            <td>Address</td>
                                            <td>Country</td>
                                            <td>Attachment</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeInfo.multipleList.length > 0 && employeeInfo.multipleList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strCompanyName}</td>
                                                <td>{item.strPersonName}</td>
                                                <td>{item.strTelephone}</td>
                                                <td>{item.strEmail}</td>
                                                <td>{item.strAddress}</td>
                                                <td>{item.strCountry.label}</td>
                                                {/* <td>{item.images}</td> */}
                                                <td> 
                                                {" "}
                                                <img src={item.imagePreviewUrl} width="40px" />
                                                {/* <img src={`data:image/jpeg;base64,${item.images}`} /> */}
                                                </td>
                                                <td >
                                                    {/* <a className="btn btn-icon btn-light btn-hover-danger btn-sm" onClick={() => multipleListDelete(index)}><i className="fa fa-times-circle"></i></a> */}
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

                                    <tfoot>

                                    </tfoot>

                                </table>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <a onClick={() => {
                                        history.push("/employee/employee-bank-details-add/" + intEmployeeId);
                                    }}>
                                        <button type="button" class="btn btn-secondary btn-lg">Back</button>
                                    </a>
                                </div>

                                <div className="col-sm-2">
                                    {/* <a onClick={() => {
                                        history.push("/employee/employee-record-add");
                                    }}> */}
                                    {loading &&
                                        // <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                                        <button type="submit" class="btn btn-primary btn-lg" disabled={true} >
                                            <span>Next</span>
                                            <span className="ml-3 spinner spinner-white"></span>
                                        </button>
                                    }

                                    {!loading &&
                                        <button type="submit" class="btn btn-primary btn-lg">
                                            <span>Next</span>
                                        </button>
                                    }
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



// <div className="from-group">
// {/* <a > */}
// <button type="button" className="btn btn-outline-primary btn-lg" onClick={() => addMultipleValue()}><i className="fa fa-plus-circle"></i>Add</button>
// {/* </a> */}
// </div>
// <div className="react-bootstrap-table table-responsive">
// <table className="table table table-head-custom table-vertical-center">
//   <thead>
//     <tr>
//       <td>SL</td>
//       <td>Name Of Country</td>
//       <td>Person Name</td>
//       <td>Teelephone</td>
//       <td>Email</td>
//       <td>Address</td>
//       <td>Country</td>
//       <td>Attachment</td>
//       <td>Action</td>
//     </tr>
//   </thead>
//   <tbody>
//     {employeeInfo.multipleList.length > 0 && employeeInfo.multipleList.map((item, index) => (
//       <tr key={index}>
//         <td>{index + 1}</td>
//         <td>{item.strCompanyName}</td>
//         <td>{item.strPersonName}</td>
//         <td>{item.strTelephone}</td>
//         <td>{item.strEmail}</td>
//         <td>{item.strAddress}</td>
//         <td>{item.strCountry.label}</td>
//         {/* <td>{item.images}</td> */}
//         <td>
//           {" "}
//           <img src={item.imagePreviewUrl} width="40px" />
//           {/* <img src={`data:image/jpeg;base64,${item.images}`} /> */}
//         </td>
//         <td >
//           {/* <a className="btn btn-icon btn-light btn-hover-danger btn-sm" onClick={() => multipleListDelete(index)}><i className="fa fa-times-circle"></i></a> */}
//           <a
//             className="btn btn-icon btn-light btn-hover-danger btn-sm"
//             onClick={() => multipleListDelete(index)}
//           >
//             <i className="fa fa-times-circle"></i>
//           </a>
//         </td>
//       </tr>
//     ))}

//   </tbody>

//   <tfoot>

//   </tfoot>

// </table>
// </div>

// <div className="form-group row">
// <div className="col-sm-10">
//   <a onClick={() => {
//     history.push("/employee/employee-bank-details-add/" + intEmployeeId);
//   }}>
//     <button type="button" class="btn btn-secondary btn-lg">Back</button>
//   </a>
// </div>

// <div className="col-sm-2">
//   {/* <a onClick={() => {
//                     history.push("/employee/employee-record-add");
//                 }}> */}
//   {loading && (
//     // <button type="submit" class="btn btn-primary btn-lg">Submit</button>
//     <button
//       type="submit"
//       class="btn btn-primary btn-lg"
//       disabled={true}
//     >
//       <span>Next</span>
//       <span className="ml-3 spinner spinner-white"></span>
//     </button>
//   )}

//   {!loading && (
//     <button type="submit" class="btn btn-primary btn-lg">
//       <span>Next</span>
//     </button>
//   )}
//   {/* </a> */}
// </div>
// </div>

export default EmployeeReferenceAdd;
