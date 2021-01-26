import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import FileBase64 from 'react-file-base64';
import { checkObjectInArray } from '../../../../utils/Helper';
import { AddEmployeeDocumentAction, EmptyEmployeeDocumentAddMessage } from '../../../../_redux/actions/EmployeeDocumentAction';
import { ToastContainer, toast } from 'react-toastify';


const EmployeeDocumentAdd = withRouter(({ history, props }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();
    toast.configure();
    const [employeeInfo, setEmployeeInfo] = React.useState({
        strType: '',
        strIssueBy: '',
        strNumber: '',
        strIssueDate: '',
        strExpiryDate: '',
        strCDCNo: '',
        strSID: '',
        multipleList: [],
        images: ''

    });
    const { intEmployeeId } = props.match.params
    const certification = [
        {
            label: 'Passport',
            value: 1
        },

        {
            label: 'National ID',
            value: 2
        },
        {
            label: 'Birth Cirtificate',
            value: 3
        },
    ]


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


    // Callback~
    const getFiles = (files) => {
        const imageFile = { ...employeeInfo };
        imageFile.images = files[0];
        setEmployeeInfo(imageFile);
    }

    const addStatus = useSelector((state) => state.employeeDocumentInfo.addStatus);
    const addMessage = useSelector((state) => state.employeeDocumentInfo.addMessage);



    useEffect(() => {
        if (typeof addMessage === null || typeof addMessage === 'undefined') {
            disableLoading();
            toast.error("Something Went Wrong", {
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
                dispatch(EmptyEmployeeDocumentAddMessage());
                history.push("/employee/employee-certificates-add/" + intEmployeeId);
            }

            if (!addStatus && addMessage.length > 0) {
                disableLoading();
                toast.error(addMessage, {
                    autoClose: 2000,
                    className: "dangerColor",
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(EmptyEmployeeDocumentAddMessage());
            }
        }

    }, [addStatus, addMessage]);



    const addMultipleValue = (e) => {
        // console.log('employeeInfo', employeeInfo);
        // return false

        if (employeeInfo.strType === "") {
            alert("Certification Can't be Blank");
            return false;
        }

        if (employeeInfo.strIssueBy === "") {
            alert("Institution Can't be Blank");
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
            strCDCNo: employeeInfo.strCDCNo,
            strSID: employeeInfo.strSID,
            images: employeeInfo.images.base64,
        };

        if (
            !checkObjectInArray(
                employeeInfoDataObj,
                employeeInfoData.multipleList,
                "strType"
            )
        ) {

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

            employeeInfoData["strCDCNo"] = "";
            setValue("strCDCNo", "");

            employeeInfoData["strSID"] = "";
            setValue("strSID", "");

            employeeInfoData["images"] = "";
            setValue("images", "");

            employeeInfoData.multipleList.push(employeeInfoDataObj);
            setEmployeeInfo(employeeInfoData);

        } else {
            alert('Give Unique Data');
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
            toast.error('Click Add Button for Multiple Listing', {
                autoClose: 2000,
                className: "dangerColor",
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;
        }

    };

    return (
        <>
            <div className="container">
                <div className="card card-custom gutter-b">
                    <div className="card-header">
                        <div className="card-title">
                            <h3 className="card-label">Manage Employee Documents
                            {' '}<span className="badge badge-info">Add</span>
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <label className="form-label mt-2" style={{ fontWeight: 'bold' }}>Document</label>
                        <form className="form form-label-right" onSubmit={handleSubmit(onSubmit)} method="post">

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="form-label">Type</label>
                                    <RHFInput
                                        as={<Select options={certification} />}
                                        rules={{ required: false }}
                                        name="strType"
                                        register={register}
                                        value={certification.label}
                                        onChange={selectHandle}
                                        setValue={setValue}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">Issued By</label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Employee Institution "
                                        name="strIssueBy"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">Number</label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Number "
                                        name="strNumber"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">Issue Date</label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter Result "
                                        name="strIssueDate"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">Expiry Date</label>
                                    <Form.Control
                                        type="date"
                                        name="strExpiryDate"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
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
                                </div>

                                <div className="col-lg-4">
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
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">

                                    <FileBase64
                                        name="image"
                                        multiple={true}
                                        onDone={getFiles.bind(this)} />
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
                                            <td>Type</td>
                                            <td>Issue By</td>
                                            <td>Number</td>
                                            <td>Issue Date</td>
                                            <td>Expiry Date</td>
                                            <td>CDC No</td>
                                            <td>SID</td>
                                            <td>Attachment</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeInfo.multipleList.length > 0 && employeeInfo.multipleList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strType.label}</td>
                                                <td>{item.strIssueBy}</td>
                                                <td>{item.strNumber}</td>
                                                <td>{item.strIssueDate}</td>
                                                <td>{item.strExpiryDate}</td>
                                                <td>{item.strCDCNo}</td>
                                                <td>{item.strSID}</td>
                                                {/* <td>{item.images}</td> */}
                                                <td> <img src={`data:image/jpeg;base64,${item.images}`} /></td>
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
                                        history.push("/employee/employee-record-add/" + intEmployeeId);
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
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>




        </>
    )
});

export default EmployeeDocumentAdd;
