import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import FileBase64 from 'react-file-base64';
import { UpdateEmployeeCertificateAction, EmptyEmployeeCertificateEditMessage } from '../../../../_redux/actions/EmployeeCertificateAction';
import { toast } from 'react-toastify';
import { GetEmployeeDetails } from '../../../../_redux/actions/EmployeeAction';
import { showToast } from "../../../../../../modules/master/utils/ToastHelper";
import { checkAttchmentValidation } from "../../../../../../modules/master/utils/FileHelper";
import PreviewAttachment from '../../../../../../modules/master/components/previews/PreviewAttachment';
import DatePicker from 'react-date-picker';
import moment from 'moment';


const EmployeeCertificateEdit = withRouter(
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
            strCourseName,
            strExpiryDate,
            strIssueBy,
            strIssueDate,
            strNumber,
            intCourseId,


        } = props;


        const [employeeInfo, setEmployeeInfo] = React.useState({
            intID: intID,
            // strCourseName: strCourseName,
            courseData: {
                value: intCourseId,
                label: strCourseName
            },
            intEmployeeId: intEmployeeId,
            strIssueBy: strIssueBy,
            strNumber: strNumber,
            strIssueDate: strIssueDate,
            strExpiryDate: strExpiryDate,
            image: image,
            intUnitId: intUnitId,
        });



        const enableLoading = () => {
            setLoading(true);
        };

        const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
        const disableLoading = () => {
            setLoading(false);
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

        // Callback~
        const getFiles = (files) => {
            // const imageFile = { ...employeeInfo };
            // imageFile.image = files[0];
            // setEmployeeInfo(imageFile);
            handleChangeTextInput("image", files[0]);
        }

        const editStatus = useSelector((state) => state.employeeCertificateInfo.editStatus);
        const editMessage = useSelector((state) => state.employeeCertificateInfo.editMessage);
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
            const courseData = {
                value: intCourseId,
                label: strCourseName
            }
            setValue('courseData', courseData);
            if (typeof editMessage === null || typeof editMessage === 'undefined') {
                disableLoading();
                toast.error("Somthing Went Wrong", {
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
                    dispatch(EmptyEmployeeCertificateEditMessage());
                    // history.push("/employee/employee-bank-details-add/" + intEmployeeId);
                    dispatch(GetEmployeeDetails(intEmployeeId));
                }

                if (!editStatus && editMessage.length > 0) {
                    disableLoading();
                    toast.error(editMessage, {
                        autoClose: 2000,
                        className: "dangerColor",
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    dispatch(EmptyEmployeeCertificateEditMessage());
                }
            }
        }, [editStatus, editMessage]);

        const onSubmit = (data) => {
            // validate first
            if (CourseName.label === "") {
                showToast("error", "Course Name Can't be Blank");
                return false;
            }

            if (employeeInfo.strIssueBy === "") {
                showToast("error", "Give the Name Issued By");
                return false;
            }

            if (employeeInfo.strNumber === "") {
                showToast("error", "Number Can't be Blank");
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

            enableLoading();
            dispatch(UpdateEmployeeCertificateAction(employeeInfo));

        };

        return (
            <>
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header">
                            <div className="card-title">
                                <h3 class="card-label">Edit Certificate</h3>
                            </div>
                        </div>
                        <div className="card-body">
                            <label className="form-label mt-2" style={{ fontWeight: 'bold' }}>Certificates/Courses</label>
                            <form className="form form-label-right" onSubmit={handleSubmit(onSubmit)} method="post">

                                <div className="form-group row">
                                    <div className="col-lg-4">
                                        <label className="form-label">Course Name</label>
                                        <RHFInput
                                            as={<Select options={CourseName} />}
                                            rules={{ required: false }}
                                            name="courseData"
                                            register={register}
                                            value={CourseName.label}
                                            onChange={(e) => selectHandle(e, "courseData")}
                                            setValue={setValue}
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="form-label">Issued By</label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Issued By "
                                            name="strIssueBy"
                                            value={employeeInfo.strIssueBy}
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
                                            value={employeeInfo.strNumber}
                                            onChange={handleChange}
                                            ref={register({
                                                required: false,
                                                maxLength: 100,
                                            })}
                                        />
                                    </div>

                                    <div className="col-lg-4 mt-3">
                                        <label className="form-label">Issue Date</label>
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
                                        <label className="form-label">Expiry Date</label>
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
                                            <div className="imgPreview" title="Remove" style={{ width: "100px" }}>
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
                                                url={`${process.env.REACT_APP_API_PUBLIC_URL}assets/images/asllEmployeeCertificate/${employeeInfo.image}`}
                                            />
                                        )}

                                    </div>

                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <a onClick={() => {
                                            setIsEditMode(false);
                                            setIsAddMode(true);
                                            history.push("/employee/employee-certificates-add/" + intEmployeeId);
                                        }}>
                                            <button type="button" class="btn btn-secondary btn-lg" >Back</button>
                                        </a>
                                    </div>

                                    <div className="col-sm-2">

                                        {loading &&
                                            <button type="submit" class="btn btn-primary btn-lg" disabled={true} >
                                                <span>Updating</span>
                                                <span className="ml-3 spinner spinner-white"></span>
                                            </button>
                                        }

                                        {!loading &&
                                            <button type="submit" class="btn btn-primary btn-lg">
                                                <span>Update</span>
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

export default EmployeeCertificateEdit;
