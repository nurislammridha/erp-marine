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
  EmptyEmployeeBankDetailsEditMessage,
  UpdateEmployeeBankDetailsAction,
} from "../../../../_redux/actions/EmployeeBankDetailsAction";
import { toast } from "react-toastify";
import { GetEmployeeDetails } from "../../../../_redux/actions/EmployeeAction";
import { GetCurrencyData } from "../../../../_redux/actions/CurrencyAction";
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";
import PreviewAttachment from "../../../../../../modules/master/components/previews/PreviewAttachment";

const EmployeeBanKDetailsEdit = withRouter(({ history, props }) => {
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
    strAccountHolderName,
    strAccountNumber,
    strBankAddress,
    strBankName,
    strRoutingNumber,
    strSwiftCode,
    intPaidCurrencyID,
    strPaidCurrencyName,
    ysnDefaultAccount,
  } = props;

  const [employeeInfo, setEmployeeInfo] = React.useState({
    image: image,
    intEmployeeId: intEmployeeId,
    intID: intID,
    intUnitId: intUnitId,
    strAccountHolderName: strAccountHolderName,
    strAccountNumber: strAccountNumber,
    strBankAddress: strBankAddress,
    strBankName: strBankName,
    strRoutingNumber: strRoutingNumber,
    currencyData: {
      value: intPaidCurrencyID,
      label: strPaidCurrencyName,
    },
    strSwiftCode: strSwiftCode,
    ysnDefaultAccount: ysnDefaultAccount == "1" ? true : false,
  });

  // const { intEmployeeId } = props.match.params;

  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    `${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeBankDetails/${image}`
  );
  //   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  const selectHandle = (item, name) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData[name] = item;
    setEmployeeInfo(employeeInfoData);
  };

  const editStatus = useSelector(
    (state) => state.employeeBankDetailsInfo.editStatus
  );
  const editMessage = useSelector(
    (state) => state.employeeBankDetailsInfo.editMessage
  );
  const currencyList = useSelector((state) => state.currencyInfo.currencyList);

  let Currency = [];
  if (currencyList) {
    currencyList.forEach((item) => {
      let items = {
        value: item.intCurrencyID,
        label: item.strCurrencyName,
      };
      Currency.push(items);
    });
  }

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

  const handleChecked = (status) => {
    let cloneObj = { ...employeeInfo };
    cloneObj.ysnDefaultAccount = !employeeInfo.ysnDefaultAccount;
    setEmployeeInfo(cloneObj);
  };

  useEffect(() => {
    const currencyData = {
      label: strPaidCurrencyName,
      value: intPaidCurrencyID,
    };
    setValue("currencyData", currencyData);
    dispatch(GetCurrencyData());
    if (typeof editMessage === null || typeof editMessage === "undefined") {
      disableLoading();
      showToast("error", "Something Went Wrong");
    } else {
      if (editStatus && editMessage.length > 0) {
        disableLoading();
        showToast("success", editMessage);

        dispatch(EmptyEmployeeBankDetailsEditMessage());
        // history.push("/employee/employee-reference-add/" + intEmployeeId);
        dispatch(GetEmployeeDetails(intEmployeeId));
      }
      if (!editStatus && editMessage.length > 0) {
        disableLoading();
        showToast("success", editMessage);
        dispatch(EmptyEmployeeBankDetailsEditMessage());
      }
    }
  }, [editStatus, editMessage]);

  const onSubmit = (data) => {
    //input field validation
    // if (CourseName.label === "") {
    //     showToast("error", "Course Name Can't be Blank");
    //     return false;
    // }

    if (employeeInfo.strAccountHolderName === "") {
      showToast("error", "Account Holder name can't be Blank");
      return false;
    }

    if (employeeInfo.strAccountNumber === "") {
      showToast("error", "Account Number Can't be Blank");
      return false;
    }

    if (employeeInfo.strBankName === "") {
      showToast("error", "Bank Name Can't be blank");
      return false;
    }

    if (employeeInfo.strBankAddress === "") {
      showToast("error", "Bank Address Can't be blank");
      return false;
    }
    if (employeeInfo.strSwiftCode === "") {
      showToast("error", "Swift Code Can't be blank");
      return false;
    }
    if (employeeInfo.strRoutingNumber === "") {
      showToast("error", "Routing Number Can't be blank");
      return false;
    }
    if (employeeInfo.currencyData === "") {
      showToast("error", "Currency Data Can't be blank");
      return false;
    }

    enableLoading();
    dispatch(UpdateEmployeeBankDetailsAction(employeeInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">
                Manage Bank Informations{" "}
                <span className="badge badge-info">Edit</span>
              </h3>
            </div>
          </div>
          <div className="card-body">
            <label className="form-label mt-2" style={{ fontWeight: "bold" }}>
              Bank Details
            </label>
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row">
                <div className="col-lg-4">
                  <label className="form-label">
                    Account Holder Name{" "}
                    <small className="validation-symbol"> * </small>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Account Holder Name "
                    name="strAccountHolderName"
                    value={employeeInfo.strAccountHolderName}
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput(
                        "strAccountHolderName",
                        e.target.value
                      )
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">
                    Account Number{" "}
                    <small className="validation-symbol"> * </small>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Account Number"
                    name="strAccountNumber"
                    value={employeeInfo.strAccountNumber}
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput("strAccountNumber", e.target.value)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    Bank Name <small className="validation-symbol"> * </small>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Bank Name "
                    name="strBankName"
                    value={employeeInfo.strBankName}
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput("strBankName", e.target.value)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    Bank Address{" "}
                    <small className="validation-symbol"> * </small>{" "}
                  </label>
                  <Form.Control
                    type="text"
                    name="strBankAddress"
                    value={employeeInfo.strBankAddress}
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput("strBankAddress", e.target.value)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label">
                    Swift Code <small className="validation-symbol"> * </small>{" "}
                  </label>
                  <Form.Control
                    type="text"
                    name="strSwiftCode"
                    value={employeeInfo.strSwiftCode}
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput("strSwiftCode", e.target.value)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">
                    Routing Number{" "}
                    <small className="validation-symbol"> * </small>{" "}
                  </label>
                  <Form.Control
                    type="text"
                    name="strRoutingNumber"
                    value={employeeInfo.strRoutingNumber}
                    className="fromStyle"
                    onChange={(e) =>
                      handleChangeTextInput("strRoutingNumber", e.target.value)
                    }
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-2">
                  <label className="form-label">
                    Paid Currency{" "}
                    <small className="validation-symbol"> * </small>{" "}
                  </label>
                  <RHFInput
                    as={<Select options={Currency} />}
                    rules={{ required: false }}
                    name="currencyData"
                    register={register}
                    value={Currency.label}
                    onChange={(e) => selectHandle(e, "currencyData")}
                    setValue={setValue}
                  />
                </div>
                <div className="col-lg-2 mt-6">
                  <Form.Check
                    type="checkbox"
                    label="Default Account"
                    name="ysnDefaultAccount"
                    checked={employeeInfo.ysnDefaultAccount}
                    id="ysnDefaultAccount"
                    onChange={handleChecked}
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
                        url={`${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeBankDetails/${employeeInfo.image}`}
                        className="img img-thumbnail"
                        alt=""
                      />
                    </div>
                  )}

                  {/* <div className="card-body">
                    <label
                      className="form-label mt-2"
                      style={{ fontWeight: "bold" }}
                    >
                      Bank Details
                    </label>
                    <form
                      className="form form-label-right"
                      onSubmit={handleSubmit(onSubmit)}
                      method="post"
                    >
                      <div className="form-group row">
                        <div className="col-lg-4">
                          <label className="form-label">
                            Account Holder Name{" "}
                            <span className="form-valid">*</span>
                          </label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Account Holder Name "
                            name="strAccountHolderName"
                            value={employeeInfo.strAccountHolderName}
                            className="fromStyle"
                            onChange={(e) =>
                              handleChangeTextInput(
                                "strAccountHolderName",
                                e.target.value
                              )
                            }
                            ref={register({
                              required: false,
                              maxLength: 100,
                            })}
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="form-label">
                            Account Number <span className="form-valid">*</span>
                          </label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Account Number"
                            name="strAccountNumber"
                            value={employeeInfo.strAccountNumber}
                            className="fromStyle"
                            onChange={(e) =>
                              handleChangeTextInput(
                                "strAccountNumber",
                                e.target.value
                              )
                            }
                            ref={register({
                              required: false,
                              maxLength: 100,
                            })}
                          />
                        </div>

                        <div className="col-lg-4">
                          <label className="form-label">
                            Bank Name <span className="form-valid">*</span>
                          </label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Bank Name "
                            name="strBankName"
                            value={employeeInfo.strBankName}
                            className="fromStyle"
                            onChange={(e) =>
                              handleChangeTextInput(
                                "strBankName",
                                e.target.value
                              )
                            }
                            ref={register({
                              required: false,
                              maxLength: 100,
                            })}
                          />
                        </div>

                        <div className="col-lg-4">
                          <label className="form-label">
                            Bank Address <span className="form-valid">*</span>
                          </label>
                          <Form.Control
                            type="text"
                            name="strBankAddress"
                            value={employeeInfo.strBankAddress}
                            className="fromStyle"
                            onChange={(e) =>
                              handleChangeTextInput(
                                "strBankAddress",
                                e.target.value
                              )
                            }
                            ref={register({
                              required: false,
                              maxLength: 100,
                            })}
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="form-label">
                            Swift Code <span className="form-valid">*</span>
                          </label>
                          <Form.Control
                            type="text"
                            name="strSwiftCode"
                            value={employeeInfo.strSwiftCode}
                            className="fromStyle"
                            onChange={(e) =>
                              handleChangeTextInput(
                                "strSwiftCode",
                                e.target.value
                              )
                            }
                            ref={register({
                              required: false,
                              maxLength: 100,
                            })}
                          />
                        </div>

                        <div className="col-lg-4">
                          <label className="form-label">
                            Routing Number <span className="form-valid">*</span>
                          </label>
                          <Form.Control
                            type="text"
                            name="strRoutingNumber"
                            value={employeeInfo.strRoutingNumber}
                            className="fromStyle"
                            onChange={(e) =>
                              handleChangeTextInput(
                                "strRoutingNumber",
                                e.target.value
                              )
                            }
                            ref={register({
                              required: false,
                              maxLength: 100,
                            })}
                          />
                        </div>
                        <div className="col-lg-2">
                          <label className="form-label">
                            Paid Currency <span className="form-valid">*</span>
                          </label>
                          <RHFInput
                            as={<Select options={Currency} />}
                            rules={{ required: false }}
                            name="currencyData"
                            register={register}
                            value={Currency.label}
                            onChange={(e) => selectHandle(e, "currencyData")}
                            setValue={setValue}
                          />
                        </div>
                        <div className="col-lg-2 mt-6">
                          <Form.Check
                            type="checkbox"
                            label="Default Account"
                            name="ysnDefaultAccount"
                            checked={employeeInfo.ysnDefaultAccount}
                            id="ysnDefaultAccount"
                            onChange={handleChecked}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-lg-8">
                          <label className="form-label">
                            Attachment (Optional)
                            <span className="text-warning pl-2 pr-2 text-sm">
                              Allowed Format: image(png, jpg, jpeg, gif, webp),
                              pdf, docx. Max Size: 10MB
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
                      <div className="form-group row">
                        <div className="col-sm-10">
                          <a
                            onClick={() => {
                              history.push(
                                "/employee/employee-certificates-add/" +
                                  intEmployeeId
                              );
                            }}
                          >
                            <button
                              type="button"
                              class="btn btn-secondary btn-lg"
                            >
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
                            <button
                              type="submit"
                              class="btn btn-primary btn-lg"
                            >
                              <span>Update</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div> */}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <a
                    onClick={() => {
                      history.push(
                        "/employee/employee-certificates-add/" + intEmployeeId
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
});

export default EmployeeBanKDetailsEdit;
