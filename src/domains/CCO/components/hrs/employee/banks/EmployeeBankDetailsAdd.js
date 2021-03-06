import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import FileBase64 from 'react-file-base64';
import { checkObjectInArray } from '../../../../utils/Helper';
import { AddEmployeeBankDetailsAction, EmptyEmployeeBankDetailsAddMessage } from '../../../../_redux/actions/EmployeeBankDetailsAction';
import { GetCurrencyData } from '../../../../_redux/actions/CurrencyAction';
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";

const EmployeeBanKDetailsAdd = withRouter(({ history, props }) => {
    const [files, setFiles] = useState([]);
    const { register, handleSubmit, errors, setValue } = useForm();
    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { intEmployeeId } = props.match.params;
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [employeeInfo, setEmployeeInfo] = React.useState({
        strAccountHolderName: '',
        strAccountNumber: '',
        strBankName: '',
        strBankAddress: '',
        strSwiftCode: '',
        strRoutingNumber: '',
        multipleList: [],
        images: ''
    });

    // const enableLoading = () => {
    //     setLoading(true);
    // };

    // const disableLoading = () => {
    //     setLoading(false);
    // };
    const getFiles = (files) => {
        handleChangeTextInput("images", files[0]);
    };

    //check attachment formate with file size
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

    const selectHandle = (item, name) => {
        const employeeInfoData = { ...employeeInfo };
        employeeInfoData[name] = item;
        setEmployeeInfo(employeeInfoData);
        console.log(employeeInfo)
    };

    const handleChecked = (status) => {
        let cloneObj = { ...employeeInfo };
        cloneObj.ysnDefaultAccount = !employeeInfo.ysnDefaultAccount;
        setEmployeeInfo(cloneObj);

    }

    //close attachment preview
    const deleteImagePreview = () => {
        setImagePreviewUrl(null);
        const employeeInfoData = { ...employeeInfo };
        employeeInfoData["images"] = null;
        setEmployeeInfo(employeeInfoData);
    };

    const addStatus = useSelector((state) => state.employeeBankDetailsInfo.addStatus);
    const loading = useSelector((state) => state.employeeBankDetailsInfo.isLoading);
    const addMessage = useSelector((state) => state.employeeBankDetailsInfo.addMessage);
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

    useEffect(() => {
        dispatch(GetCurrencyData());
    }, []);

    useEffect(() => {
        if (addStatus && addMessage.length > 0) {
            history.push("/employee/employee-reference-add/" + intEmployeeId);
        }
    }, [addStatus, addMessage]);

    const addMultipleValue = (e) => {
        //input fields validation
        let message = '';
        if (employeeInfo.strAccountHolderName === "") {
            showToast("error", "Account Holder Name Can't be blank!");
            return false;
        }

        if (employeeInfo.strAccountNumber === "") {
            showToast("error", "Account Number Can't be Blank!");
            return false;
        }
        if (employeeInfo.strBankName === "") {
            showToast("error", "Bank Name Can't be blank!");
            return false;
        }

        if (employeeInfo.strBankAddress === "") {
            showToast("error", "Bank Address Can't be blank!");
            return false;
        }
        // if (employeeInfo.strSwiftCode === "") {
        //     showToast("error", "Bank Swift Code Can't be blank!");
        //     return false;
        // }
        // if (employeeInfo.strRoutingNumber === "") {
        //     showToast("error", "Bank Routing Number Can't be blank!");
        //     return false;
        // }
        //add multiple employee data
        let multipleList = [];
        const employeeInfoData = { ...employeeInfo };
        let employeeInfoDataObj = {
            strAccountHolderName: employeeInfoData.strAccountHolderName,
            strAccountNumber: employeeInfoData.strAccountNumber,
            strBankName: employeeInfo.strBankName,
            strBankAddress: employeeInfo.strBankAddress,
            strSwiftCode: employeeInfo.strSwiftCode,
            strRoutingNumber: employeeInfo.strRoutingNumber,
            ysnDefaultAccount: employeeInfo.ysnDefaultAccount,
            currencyData: employeeInfo.currencyData,
            images: employeeInfo.images.base64,
            imagePreviewUrl: imagePreviewUrl,
        };

        if (
            !checkObjectInArray(
                employeeInfoDataObj,
                employeeInfoData.multipleList,
                "strAccountHolderName"
            )
        ) {
            setImagePreviewUrl(null);
            multipleList.push(employeeInfoDataObj);
            employeeInfoData["strAccountHolderName"] = "";
            setValue("strAccountHolderName", "");

            employeeInfoData["strAccountNumber"] = "";
            setValue("strAccountNumber", "");

            employeeInfoData["strBankName"] = "";
            setValue("strBankName", "");

            employeeInfoData["strBankAddress"] = "";
            setValue("strBankAddress", "");

            employeeInfoData["strSwiftCode"] = "";
            setValue("strSwiftCode", "");

            employeeInfoData["currencyData"] = "";
            setValue("currencyData", "");

            employeeInfoData[""] = "";
            setValue("", "");

            employeeInfoData["strPaidCurrency"] = "";
            setValue("strPaidCurrency", "");

            employeeInfoData["images"] = "";
            setValue("images", "");

            employeeInfoData.multipleList.push(employeeInfoDataObj);
            setEmployeeInfo(employeeInfoData);

        } else {
            showToast("error", "Give Unique Data !");
        }
        return false;
    };
    const multipleListDelete = (index) => {
        let employeeInfoData = { ...employeeInfo };
        employeeInfo.multipleList.splice(index, 1);
        setEmployeeInfo(employeeInfoData);
    };

    const onSubmit = (data) => {
        if (employeeInfo.multipleList.length > 0) {
            dispatch(AddEmployeeBankDetailsAction(employeeInfo, intEmployeeId));
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
                            <h3 className="card-label">Manage Bank Informations
                                {' '}<span className="badge badge-info">Add</span>
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <label className="form-label mt-2" style={{ fontWeight: 'bold' }}>Bank Details</label>
                        <form className="form form-label-right" onSubmit={handleSubmit(onSubmit)} method="post">

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="form-label">Account Holder Name <span className="form-valid">*</span></label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Account Holder Name "
                                        name="strAccountHolderName"
                                        className="fromStyle"
                                        onChange={(e) => handleChangeTextInput('strAccountHolderName', e.target.value)}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">Account Number <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Account Number"
                                        name="strAccountNumber"
                                        className="fromStyle"
                                        onChange={(e) => handleChangeTextInput('strAccountNumber', e.target.value)}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">Bank Name <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Bank Name"
                                        name="strBankName"
                                        className="fromStyle"
                                        onChange={(e) => handleChangeTextInput('strBankName', e.target.value)}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">Bank Address <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        name="strBankAddress"
                                        className="fromStyle"
                                        onChange={(e) => handleChangeTextInput('strBankAddress', e.target.value)}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">Swift Code <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        name="strSwiftCode"
                                        className="fromStyle"
                                        onChange={(e) => handleChangeTextInput('strSwiftCode', e.target.value)}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">Routing Number <small className="validation-symbol"> (Optional) </small> </label>
                                    <Form.Control
                                        type="text"
                                        name="strRoutingNumber"
                                        className="fromStyle"
                                        onChange={(e) => handleChangeTextInput('strRoutingNumber', e.target.value)}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-2">
                                    <label className="form-label">Paid Currency <small className="validation-symbol"> (Optional) </small> </label>
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

                            {/* <div className="form-group row">
                                <div className="col-lg-4">

                                    <FileBase64
                                        name="image"
                                        multiple={true}
                                        onDone={getFiles.bind(this)} />
                                </div>

                            </div> */}
                            <div className="form-group row">
                                <div className="col-lg-8">
                                    <label className="form-label">
                                        Attachment (Optional)
                                     <span className="text-warning pl-2 pr-2 text-sm"> Allowed Format: image(png, jpg, jpeg, gif, webp), pdf, docx. Max Size: 10MB </span>
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
                                            <td>Account Holder Name</td>
                                            <td>Account Number</td>
                                            <td>Bank Name</td>
                                            <td>Bank Address</td>
                                            <td>Swift Code</td>
                                            <td>Routing Number</td>
                                            <td>Paid Currency</td>
                                            <td>Default Account</td>
                                            <td>Attachment</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeInfo.multipleList.length > 0 && employeeInfo.multipleList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strAccountHolderName}</td>
                                                <td>{item.strAccountNumber}</td>
                                                <td>{item.strBankName}</td>
                                                <td>{item.strBankAddress}</td>
                                                <td>{item.strSwiftCode}</td>
                                                <td>{item.strRoutingNumber}</td>
                                                <td>{item.currencyData.label}</td>
                                                <td>{item.ysnDefaultAccount == '1' ? 'yes' : 'no'}</td>
                                                {/* <td>{item.images}</td> */}
                                                <td>
                                                    {" "}
                                                    <img src={item.imagePreviewUrl} width="40px" />
                                                    {/* <img src={`data:image/jpeg;base64,${item.images}`} /> */}
                                                </td>
                                                <td >
                                                    <a className="btn btn-icon btn-light btn-hover-danger btn-sm" onClick={() => multipleListDelete(index)}><i className="fa fa-times-circle"></i></a>
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
                                    {/* <button type="submit" class="btn btn-primary btn-lg">Next</button> */}
                                    {/* </a> */}

                                    {loading &&
                                        <button type="submit" className="btn btn-primary btn-lg" disabled={true} >
                                            <span>Next</span>
                                            <span className="ml-3 spinner spinner-white"></span>
                                        </button>
                                    }

                                    {!loading &&
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            <span>Next</span>
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>




        </>
    )
});

export default EmployeeBanKDetailsAdd;
