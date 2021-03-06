import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
// import moment from 'moment';
import FileBase64 from 'react-file-base64';
import { checkObjectInArray } from '../../../../utils/Helper';
import { AddEmployeeRecordAction, EmptyEmployeeRecordAddMessage } from '../../../../_redux/actions/EmployeeRecordAction';
import { GetVesselTypeAction } from '../../../../../Vessel/_redux/actions/VesselAction';



const EmployeeRecordAdd = withRouter(({ history, props }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();
    toast.configure();
    const [employeeInfo, setEmployeeInfo] = React.useState({
        strRank: '',
        strShipManager: '',
        strVesselName: '',
        strFlag: '',
        strVesselType: '',
        strDWT: '',
        strEngineName: '',
        strFromDate: '',
        strToDate: '',
        strDuration: '',
        strReason: '',
        multipleList: [],

    });

    const certification = [
        {
            label: 'SSC',
            value: 1
        },

        {
            label: 'HSC',
            value: 2
        },
        {
            label: 'Maritime Training',
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
        // countDuration(employeeInfoData);
    };

    const selectHandle = (item, name) => {
        const employeeInfoData = { ...employeeInfo };
        employeeInfoData.strVesselType = item;
        setEmployeeInfo(employeeInfoData);
    };

    const addStatus = useSelector((state) => state.employeeRecordInfo.addStatus);
    const addMessage = useSelector((state) => state.employeeRecordInfo.addMessage);
    const vesselTypeList = useSelector((state) => state.vesselInfo.vesselTypeList);

    let vesselType = [];
    if (vesselTypeList.data) {
        vesselTypeList.data.forEach((item) => {
            let items = {
                value: item.intID,
                label: item.strName,
            };
            vesselType.push(items);
        });
    }


    useEffect(() => {
        dispatch(GetVesselTypeAction());

        if (typeof addMessage === null || typeof addMessage === 'undefined') {
            disableLoading();
            toast.error("Something Went Wrong", {
                autoClose: 2000,
                className: "dangerColor",
                position: toast.POSITION.TOP_RIGHT,
            });

        } else {
            if (addStatus && addMessage.length > 0) {
                toast.success(addMessage, {
                    autoClose: 2000,
                    className: "primaryColor",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                dispatch(EmptyEmployeeRecordAddMessage());
                history.push("/employee/employee-documents-add/" + props.match.params.intEmployeeId);
            }

            if (!addStatus && addMessage.length > 0) {
                toast.error(addMessage, {
                    autoClose: 2000,
                    className: "dangerColor",
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(EmptyEmployeeRecordAddMessage());
            }
        }
    }, [addStatus, addMessage]);

    const countDuration = (employeeInfoData) => {
        // console.log('from Date', employeeInfoData.strFromDate, 'to Date', employeeInfoData.strToDate)
        // const startDate = moment(employeeInfoData.strFromDate);
        // const timeEnd = moment(employeeInfoData.strToDate);
        // const diff = timeEnd.diff(startDate);
        // const diffDuration = moment.duration(diff);

        // console.log("Total Duration in millis:", diffDuration.asMilliseconds());
        // console.log("Days:", diffDuration.days());
        // console.log("Hours:", diffDuration.hours());
        // console.log("Minutes:", diffDuration.minutes());
        // console.log("Seconds:", diffDuration.seconds());
    }


    const addMultipleValue = (e) => {
        // console.log('employeeInfo', employeeInfo);
        // return false
        let message = '';
        if (employeeInfo.strRank === "") {
            message += "Rank Can't be Blank";
        }

        if (employeeInfo.strShipManager === "") {
            message += "Ship Manager Can't be Blank, ";
        }

        if (employeeInfo.strVesselName === "") {
            message += "Vessel Name Can't be Blank, ";
        }

        if (employeeInfo.strFromDate === "") {
            message += "From Date Can't be Blank, ";
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
            strRank: employeeInfoData.strRank,
            strShipManager: employeeInfoData.strShipManager,
            strVesselName: employeeInfoData.strVesselName,
            strFlag: employeeInfoData.strFlag,
            strVesselType: employeeInfoData.strVesselType.label,
            strDWT: employeeInfoData.strDWT,
            strEngineName: employeeInfoData.strEngineName,
            strFromDate: employeeInfoData.strFromDate,
            strToDate: employeeInfoData.strToDate,
            strDuration: employeeInfoData.strDuration,
            strReason: employeeInfoData.strReason
        };

        if (
            !checkObjectInArray(
                employeeInfoDataObj,
                employeeInfoData.multipleList,
                "strRank"
            )
        ) {

            multipleList.push(employeeInfoDataObj);
            employeeInfoData["strRank"] = "";
            setValue("strRank", "");

            employeeInfoData["strShipManager"] = "";
            setValue("strShipManager", "");

            employeeInfoData["strVesselName"] = "";
            setValue("strVesselName", "");

            employeeInfoData["strFlag"] = "";
            setValue("strFlag", "");

            employeeInfoData["strVesselType"] = "";
            setValue("strVesselType", "");

            employeeInfoData["strDWT"] = "";
            setValue("strDWT", "");

            employeeInfoData["strEngineName"] = "";
            setValue("strEngineName", "");

            employeeInfoData["strFromDate"] = "";
            setValue("strFromDate", "");

            employeeInfoData["strToDate"] = "";
            setValue("strToDate", "");

            employeeInfoData["strDuration"] = "";
            setValue("strDuration", "");

            employeeInfoData["strReason"] = "";
            setValue("strReason", "");

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
            dispatch(AddEmployeeRecordAction(employeeInfo, props.match.params.intEmployeeId));
        } else {
            disableLoading();
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
                            <h3 className="card-label">Manage Employee Records
                            {' '}<span className="badge badge-info">Add</span>
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <label className="form-label mt-2" style={{ fontWeight: 'bold' }}>Record <small className="validation-symbol"> * </small> </label>
                        <form className="form form-label-right" onSubmit={handleSubmit(onSubmit)} method="post">

                            <div className="form-group row">
                                <div className="col-lg-2">
                                    <label className="form-label">Rank <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Rank "
                                        name="strRank"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-2">
                                    <label className="form-label">Ship Manager <small className="validation-symbol"> * </small></label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Shipo Manager "
                                        name="strShipManager"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">Vessel Name <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Vassel Name "
                                        name="strVesselName"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-2">
                                    <label className="form-label">Flag <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Flag "
                                        name="strFlag"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-2">
                                    <label className="form-label">Vessel Type <small className="validation-symbol"> * </small> </label>
                                    <RHFInput
                                        as={<Select options={vesselType} />}
                                        rules={{ required: false }}
                                        name="strVesselType"
                                        register={register}
                                        value=""
                                        onChange={(e) => selectHandle(e, "strVesselType")}
                                        setValue={setValue}
                                    />

                                    <div className="inputError margin-minus-10">
                                        {errors.vesselType &&
                                            errors.vesselType.type === "required" &&
                                            "Vessel Type Can't be blank"}
                                    </div>
                                </div>

                                <div className="col-lg-2">
                                    <label className="form-label">DWT <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter DWT "
                                        name="strDWT"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-2">
                                    <label className="form-label">Engine Name/KW <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Engine Name "
                                        name="strEngineName"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-2">
                                    <label className="form-label">From <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter Flag "
                                        name="strFromDate"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-2">
                                    <label className="form-label">To <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter Flag "
                                        name="strToDate"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className="form-label">Duration <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Duration "
                                        name="strDuration"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">Reason For Leaving <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Reason "
                                        name="strReason"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
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
                                            <td>Rank</td>
                                            <td>Ship Mangr.</td>
                                            <td>Vessel</td>
                                            <td>Flag</td>
                                            <td>Vessel Type</td>
                                            <td>DWT</td>
                                            <td>Enagine Name/KW</td>
                                            <td>From</td>
                                            <td>To</td>
                                            <td>Duration</td>
                                            <td>Reason</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeInfo.multipleList.length > 0 && employeeInfo.multipleList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.strRank}</td>
                                                <td>{item.strShipManager}</td>
                                                <td>{item.strVesselName}</td>
                                                <td>{item.strFlag}</td>
                                                <td>{item.strVesselType.label}</td>
                                                <td>{item.strDWT}</td>
                                                <td>{item.strEngineName}</td>
                                                <td>{item.strFromDate}</td>
                                                <td>{item.strToDate}</td>
                                                <td>{item.strDuration}</td>
                                                <td>{item.strReason}</td>
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
                                        history.push("/employee/employee-education-add/" + props.match.params.intEmployeeId);
                                    }}>
                                        <button type="button" class="btn btn-secondary btn-lg">Back</button>
                                    </a>
                                </div>

                                <div className="col-sm-2">
                                    {/* <a onClick={() => {
                                        history.push("/employee/employee-record-add");
                                    }}> */}
                                    {employeeInfo.multipleList.length > 0 && loading &&
                                        // <button type="submit" class="btn btn-primary btn-lg">Next</button>

                                        <button type="submit" class="btn btn-primary btn-lg" disabled={true} >
                                            <span>Next</span>
                                            <span className="ml-3 spinner spinner-white"></span>
                                        </button>

                                    }

                                    {employeeInfo.multipleList.length > 0 && !loading &&
                                        // <button type="submit" class="btn btn-primary btn-lg">Next</button>

                                        <button type="submit" class="btn btn-primary btn-lg">
                                            <span>Next</span>
                                        </button>

                                    }


                                    {employeeInfo.multipleList.length == 0 &&
                                        <button type="submit" class="btn btn-primary btn-lg">Skip</button>
                                    }
                                    {/* </a> */}
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>




        </>
    )
});

export default EmployeeRecordAdd;
