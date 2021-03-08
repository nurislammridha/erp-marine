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
import { AddEmployeeCertificateAction, EmptyEmployeeCertificateAddMessage, GetEmployeeCourseList } from '../../../../_redux/actions/EmployeeCertificateAction';
import { ToastContainer, toast } from 'react-toastify';
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";
import { GetEmployeeDetails } from '../../../../_redux/actions/EmployeeAction';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import { format } from 'date-fns';


const EmployeeCertificateAdd = withRouter(({ history, props }) => {
    const [date, setDate] = useState();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();
    toast.configure();
    const [employeeInfo, setEmployeeInfo] = React.useState({
        strCourseName: '',
        strIssueBy: '',
        strNumber: '',
        strIssueDate: '',
        strIssueFormattedDate: '',
        strExpiryDate: '',
        strExpiryFormattedDate: '',
        multipleList: [],
        images: ''
    });

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const { intEmployeeId } = props.match.params;

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
        employeeInfoData.strCourseName = data;
        setEmployeeInfo(employeeInfoData);
    };

    //datehandling
    const handleDate = (name, value) => {
        const dateValue = moment(value).format('YYYY-MM-DD');
        const employeeInfoData = { ...employeeInfo };
        employeeInfoData[name] = dateValue;
        if (name === "strExpiryDate") {
            employeeInfoData["strExpiryFormattedDate"] = new Date(dateValue);
        } else {
            employeeInfoData["strIssueFormattedDate"] = new Date(dateValue);
        }
        setEmployeeInfo(employeeInfoData);
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

    // Callback~
    const getFiles = (files) => {
        // const imageFile = { ...employeeInfo };
        // imageFile.images = files[0];
        // setEmployeeInfo(imageFile);
        handleChangeTextInput("images", files[0]);
    }

    const addStatus = useSelector((state) => state.employeeCertificateInfo.addStatus);
    const addMessage = useSelector((state) => state.employeeCertificateInfo.addMessage);
    const courseList = useSelector((state) => state.employeeCertificateInfo.courseList);

    let CourseName = [];
    if (courseList) {
        courseList.forEach((item) => {
            let items = {
                value: item.intID,
                label: item.strCourseName,
            };
            CourseName.push(items);
        });
    }

    useEffect(() => {
        dispatch(GetEmployeeCourseList());
        if (typeof addMessage === null || typeof addMessage === 'undefined') {
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
                dispatch(EmptyEmployeeCertificateAddMessage());
                dispatch(GetEmployeeDetails(props.match.params.intEmployeeId))

            }

            if (!addStatus && addMessage.length > 0) {
                disableLoading();
                toast.error(addMessage, {
                    autoClose: 2000,
                    className: "dangerColor",
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(EmptyEmployeeCertificateAddMessage());
            }
        }
    }, [addStatus, addMessage]);



    const addMultipleValue = (e) => {
        console.log(employeeInfo.strIssueDate)
        console.log(employeeInfo.strExpiryDate)
        let message = '';


        if (employeeInfo.strCourseName === "") {
            showToast("error", "Course Name Can't be Blank");
            return false;
        }

        if (employeeInfo.strNumber === "") {
            showToast("error", "Number Can't be Blank");
            return false;
        }

        if (employeeInfo.strIssueBy === "") {
            showToast("error", "Give the Name Issued By");
            return false;
        }

        if (employeeInfo.strIssueDate === "") {
            showToast("error", "Issue Date Can't be blank");
            return false;
        }

        if (employeeInfo.strExpiryDate === "") {
            showToast("error", "Expiry Date Can't be blank");
            return false;
        }

        if (employeeInfo.strIssueDate > employeeInfo.strExpiryDate) {
            showToast("error", "Issue date cannot be before Expiry date!");
            return false;
        }


        if (message.length > 0) {
            toast.error(message, {
                autoClose: 2000,
                className: "dangerColor",
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;
        }

        let multipleList = [];
        const employeeInfoData = { ...employeeInfo };
        let employeeInfoDataObj = {
            strCourseName: employeeInfoData.strCourseName,
            strIssueBy: employeeInfoData.strIssueBy,
            strNumber: employeeInfo.strNumber,
            strIssueDate: employeeInfo.strIssueDate,
            strExpiryDate: employeeInfo.strExpiryDate,
            images: employeeInfo.images.base64,
            imagePreviewUrl: imagePreviewUrl,
        };

        if (
            !checkObjectInArray(
                employeeInfoDataObj,
                employeeInfoData.multipleList,
                "strCourseName"
            )
        ) {

            multipleList.push(employeeInfoDataObj);
            employeeInfoData["strCourseName"] = "";
            setValue("strCourseName", "");

            setImagePreviewUrl(null);
            multipleList.push(employeeInfoDataObj);
            employeeInfoData["strCertification"] = "";
            setValue("strCertification", "");

            employeeInfoData["strIssueBy"] = "";
            setValue("strIssueBy", "");

            employeeInfoData["strNumber"] = "";
            setValue("strNumber", "");

            employeeInfoData["strIssueDate"] = "";
            setValue("strIssueDate", "");

            employeeInfoData["strExpiryDate"] = "";
            setValue("strExpiryDate", "");

            employeeInfoData["images"] = "";
            setValue("images", "");

            employeeInfoData.multipleList.push(employeeInfoDataObj);
            setEmployeeInfo(employeeInfoData);

        } else {
            toast.error("Please Provide Unique Data", {
                autoClose: 2000,
                className: "dangerColor",
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;
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
            dispatch(AddEmployeeCertificateAction(employeeInfo, intEmployeeId));
        } else {
            disableLoading();
            toast.error('Click Preview Button Before Save', {
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
                            <h3 class="card-label">Manage Certificates
                            {' '}<span className="badge badge-info">Add</span>
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <label className="form-label mt-2" style={{ fontWeight: 'bold' }}>Certificates/Courses</label>
                        <form className="form form-label-right" onSubmit={handleSubmit(onSubmit)} method="post">

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="form-label">
                                        Course Name
                                        <span className="text-danger">*</span>
                                    </label>
                                    {/* <Form.Control
                                        type="text"
                                        placeholder="Enter Course Name "
                                        name="strCourseName"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    /> */}

                                    <RHFInput
                                        as={<Select options={CourseName} />}
                                        rules={{ required: true }}
                                        name="strCourseName"
                                        register={register}
                                        value={CourseName.label}
                                        onChange={selectHandle}
                                        setValue={setValue}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">
                                        Issued By
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Issued By "
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
                                    <label className="form-label">
                                        Number
                                        <span className="text-danger">*</span>
                                    </label>
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

                                <div className="col-lg-4 mt-3">
                                    <label className="form-label">
                                        Issue Date
                                        <span className="text-danger">*</span>
                                    </label>
                                    <br />
                                    <DatePicker
                                        type="date"
                                        name="strIssueDate"
                                        className="fromStyle"
                                        onChange={(value) => handleDate('strIssueDate', value)}
                                        value={employeeInfo.strIssueFormattedDate}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}

                                    />

                                </div>
                                <div className="col-lg-4 mt-3">
                                    <label className="form-label">
                                        Expiry Date
                                        <span className="text-danger">*</span>
                                    </label>
                                    <br />
                                    <DatePicker

                                        type="date"
                                        name="strExpiryDate"
                                        minDate={employeeInfo.strIssueFormattedDate}
                                        onChange={(value) => handleDate('strExpiryDate', value)}
                                        value={employeeInfo.strExpiryFormattedDate}
                                        className="fromStyle"
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-4 mt-3">

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
                                    <i className="fa fa-plus-circle"></i>Preview
                                </button>
                                {/* </a> */}
                            </div>
                            <div className="react-bootstrap-table table-responsive mt-3">
                                <table className="table table table-head-custom table-vertical-center">
                                    <thead>
                                        <tr>
                                            <td>SL</td>
                                            <td>Course Name</td>
                                            <td>Issue By</td>
                                            <td>Number</td>
                                            <td>Issue Date</td>
                                            <td>Expiry Date</td>
                                            <td>Attachment</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeInfo.multipleList.length > 0 && employeeInfo.multipleList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strCourseName.label}</td>
                                                <td>{item.strIssueBy}</td>
                                                <td>{item.strNumber}</td>
                                                <td>{item.strIssueDate}</td>
                                                <td>{item.strExpiryDate}</td>
                                                {/* <td>{item.images}</td> */}
                                                <td>
                                                    {" "}
                                                    <img src={item.imagePreviewUrl} width="40px" />
                                                    {/* <img src={`data:image/jpeg;base64,${item.images}`} /> */}
                                                </td>
                                                <td >
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
                                    {/* <a onClick={() => {
                                        history.push("/employee/employee-certificates-add" + intEmployeeId);
                                    }}>
                                        <button type="button" class="btn btn-secondary btn-lg">Back</button>
                                    </a> */}
                                </div>

                                <div className="col-sm-2">
                                    {/* <a onClick={() => {
                                        history.push("/employee/employee-record-add");
                                    }}> */}
                                    {/* <button type="submit" class="btn btn-primary btn-lg">Next</button> */}
                                    {/* </a> */}

                                    {loading &&
                                        <button type="submit" class="btn btn-primary btn-lg" disabled={true} >
                                            <span>Saving</span>
                                            <span className="ml-3 spinner spinner-white"></span>
                                        </button>
                                    }

                                    {!loading &&
                                        <button type="submit" class="btn btn-primary btn-lg" onClick={() => onSubmit()}>
                                            <span>Save</span>
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

export default EmployeeCertificateAdd;
