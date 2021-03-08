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
import { UpdateEmployeeRecordAction, EmptyEmployeeRecordEditMessage } from '../../../../_redux/actions/EmployeeRecordAction';
import { GetEmployeeDetails } from '../../../../_redux/actions/EmployeeAction';
import { GetVesselTypeAction } from '../../../../../certificates/certificate-main/_redux/actions/CertificateMainAction';
// import { GetVesselTypeAction } from '../../../../../../modules/vessel/_redux/actions/VesselAccountAction';



const EmployeeRecordEdit = withRouter(({ history, props }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();
    toast.configure();
    const { created_at,
        intEmployeeId,
        intID,
        intUnitId,
        strDWT,
        strDuration,
        strEngineName,
        strFlag,
        strFromDate,
        strRank,
        strReason,
        strShipManager,
        strToDate,
        strVesselName,
        strVesselType,
        intVesselTypeId, } = props
    const [employeeInfo, setEmployeeInfo] = React.useState({
        intID: intID,
        intUnitId: intUnitId,
        strRank: strRank,
        strShipManager: strShipManager,
        strVesselName: strVesselName,
        strFlag: strFlag,
        // strVesselType: strVesselType,
        vesselData: {
            value: intVesselTypeId,
            label: strVesselType
        },
        strDWT: strDWT,
        strEngineName: strEngineName,
        strFromDate: strFromDate,
        strToDate: strToDate,
        strDuration: strDuration,
        strReason: strReason,
        intEmployeeId: intEmployeeId,

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
        employeeInfoData[name] = item;
        setEmployeeInfo(employeeInfoData);
    };

    const editStatus = useSelector((state) => state.employeeRecordInfo.editStatus);
    const editMessage = useSelector((state) => state.employeeRecordInfo.editMessage);
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

        const vesselData = {
            value: intVesselTypeId,
            label: strVesselType
        }

        setValue('vesselData', vesselData);
        if (typeof editMessage === null || typeof editMessage === 'undefined') {
            disableLoading();
            toast.error("Something Went Wrong", {
                autoClose: 2000,
                className: "dangerColor",
                position: toast.POSITION.TOP_RIGHT,
            });

        } else {
            if (editStatus && editMessage.length > 0) {
                disableLoading();
                toast.success(editMessage, {
                    autoClose: 2000,
                    className: "primaryColor",
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                dispatch(EmptyEmployeeRecordEditMessage());
                // history.push("/employee/employee-documents-add/" + props.match.params.intEmployeeId);
                dispatch(GetEmployeeDetails(intEmployeeId));
            }

            if (!editStatus && editMessage.length > 0) {
                disableLoading();
                toast.error(editMessage, {
                    autoClose: 2000,
                    className: "dangerColor",
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(EmptyEmployeeRecordEditMessage());
            }
        }
    }, [editStatus, editMessage]);

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

    const multipleListDelete = (index) => {
        let employeeInfoData = { ...employeeInfo };
        employeeInfo.multipleList.splice(index, 1);
        setEmployeeInfo(employeeInfoData);
    };

    const onSubmit = (data) => {
        enableLoading();
        dispatch(UpdateEmployeeRecordAction(employeeInfo));
    };

    return (
        <>
            <div className="container">
                <div className="card card-custom gutter-b">
                    <div className="card-header">
                        <div className="card-title">
                            <h3 class="card-label">Edit Employee</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <label className="form-label mt-2" style={{ fontWeight: 'bold' }}>Record</label>
                        <form className="form form-label-right" onSubmit={handleSubmit(onSubmit)} method="post">

                            <div className="form-group row">
                                <div className="col-lg-2">
                                    <label className="form-label">Rank <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Rank "
                                        name="strRank"
                                        value={employeeInfo.strRank}
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
                                <div className="col-lg-2">
                                    <label className="form-label">Ship Manager <small className="validation-symbol"> * </small> </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Shipo Manager "
                                        name="strShipManager"
                                        className="fromStyle"
                                        value={employeeInfo.strShipManager}
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
                                        value={employeeInfo.strVesselName}
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
                                        value={employeeInfo.strFlag}
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
                                        name="vesselData"
                                        register={register}
                                        value={employeeInfo.vesselData}
                                        onChange={(e) => selectHandle(e, "vesselData")}
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
                                        value={employeeInfo.strDWT}
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
                                        value={employeeInfo.strEngineName}
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
                                        value={employeeInfo.strFromDate}
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
                                        value={employeeInfo.strToDate}
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
                                        value={employeeInfo.strDuration}
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
                                        value={employeeInfo.strReason}
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>
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
                                    {loading &&
                                        // <button type="submit" class="btn btn-primary btn-lg">Next</button>

                                        <button type="submit" class="btn btn-primary btn-lg" disabled={true} >
                                            <span>Update</span>
                                            <span className="ml-3 spinner spinner-white"></span>
                                        </button>

                                    }

                                    {!loading &&
                                        // <button type="submit" class="btn btn-primary btn-lg">Next</button>

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

export default EmployeeRecordEdit;
