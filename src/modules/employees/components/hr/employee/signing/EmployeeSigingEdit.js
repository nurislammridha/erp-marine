import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import { SignEmployeeUpdate, EmptyEmployeeSigningEditMessage } from "../../../../_redux/actions/EmployeeSigningAction";
import { GetEmployeeListForDropdown } from "../../../../_redux/actions/EmployeeAction";
import { GetCountryDataAction } from "../../../../../../domains/Vessel/_redux/actions/VesselAccountAction";
import { GetVesselList } from "../../../../_redux/actions/EmployeeApplicationAction";

const EmployeeSigningEdit = withRouter(({ history, props }) => {
    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    toast.configure();

    const {
        ysnSignIn,
        strVesselName,
        strName,
        intID,
        dteActionDate,
        intEmployeeId,
        intVesselId
    } = props.location.state.item;

    const [employeeSigningInfo, setEmployeeSigningInfo] = React.useState({
        intID: intID,
        vesselData: {
            label: strVesselName,
            value: intVesselId
        },
        employeeData: {
            label: strName,
            value: intEmployeeId
        },
        signStatusData:{
            label:ysnSignIn=='1'?'Sign In':'Sign Out',
            value:ysnSignIn=='1'?1:0
          },
        dteActionDate: dteActionDate,
        ysnSignIn: ysnSignIn == "1" ? true : false
    });

    const handleChange = ({ currentTarget: input }) => {
        console.log('input.value', input.value);
        const employeeSigningInfoData = { ...employeeSigningInfo };
        employeeSigningInfoData[input.name] = input.value;
        setEmployeeSigningInfo(employeeSigningInfoData);
    };

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const selectHandle = (item, name) => {
        const employeeSigningInfoData = { ...employeeSigningInfo };
        employeeSigningInfoData[name] = item;
        setEmployeeSigningInfo(employeeSigningInfoData);
    };

    const editStatus = useSelector((state) => state.employeeSigningInfo.editStatus);
    const editMessage = useSelector((state) => state.employeeSigningInfo.editMessage);
    const vesselList = useSelector((state) => state.vesselInfo.vesselList);
    const employeeInfoList = useSelector((state) => state.employeeInfo.employeeInfoList);
    console.log('employeeInfoList',employeeInfoList);
    let vessel = [];
    if (vesselList) {
        vesselList.forEach((item) => {
            let items = {
                value: item.intID,
                label: item.strVesselName,
            };
            vessel.push(items);
        });
    }

    let employee = [];
    if (employeeInfoList) {
        employeeInfoList.forEach((item) => {
            let items = {
                value: item.intID,
                label: item.strName,
                label: item.strName + "-" + item.strCDCNo,
            };
            employee.push(items);
        });
    }

    const status=[
        {
          label:'Sign In',
          value:1
        },
        {
          label:'Sign Out',
          value:0
        }
      ]

    useEffect(() => {
        dispatch(GetVesselList());
        dispatch(GetEmployeeListForDropdown());
        dispatch(GetCountryDataAction());

        const vesselData = {
            label: strVesselName,
            value: intVesselId
        }
        const employeeData = {
            label: strName,
            value: intEmployeeId
        }
        const signStatusData={
            label:ysnSignIn=='1'?'Sign In':'Sign Out',
            value:ysnSignIn=='1'?1:0
          }

        setValue('signStatusData',signStatusData);
        setValue('vesselData', vesselData);
        setValue('employeeData', employeeData);

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
                dispatch(EmptyEmployeeSigningEditMessage());
                history.push("/employee/employee-signing-list");
            }

            if (!editStatus && editMessage.length > 0) {
                disableLoading();
                toast.error(editMessage, {
                    autoClose: 2000,
                    className: "dangerColor",
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(EmptyEmployeeSigningEditMessage());
            }
        }
    }, [editStatus, editMessage]);



    const onSubmit = async (e) => {
        enableLoading();
        dispatch(SignEmployeeUpdate(employeeSigningInfo));
    };

    const handleChecked = (status) => {
        console.log('status', status.currentTarget.value);
        console.log('status checked', status.target.checked);
        let cloneObj = { ...employeeSigningInfo };
        cloneObj.ysnSignIn = !employeeSigningInfo.ysnSignIn;
        setEmployeeSigningInfo(cloneObj);
    }

    return (
        <>
            <div className="container">
                <div className="card card-custom gutter-b">
                    <div className="card-header">
                        <div className="card-title">
                            <h3 class="card-label">Employee Signing</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <form
                            className="form form-label-right"
                            onSubmit={handleSubmit(onSubmit)}
                            method="post"
                        >
                            {/* <div className="col-lg-2 row">
                                <Form.Check
                                    type="checkbox"
                                    label="SIGN IN"
                                    name="ysnSignIn"
                                    // value="1"
                                    checked={employeeSigningInfo.ysnSignIn}
                                    id="ysnSignIn"
                                    // onChange={handleChange}
                                    onChange={handleChecked}
                                />
                            </div> */}

            <div className="col-lg-4">
                  <label className="form-label">Sign In/Out</label>
                  <RHFInput
                    as={<Select options={status} />}
                    rules={{ required: false }}
                    name="signStatusData"
                    register={register}
                    value={employeeSigningInfo.value}
                    onChange={(e) => selectHandle(e, "signStatusData")}
                    setValue={setValue}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.signStatusData &&
                      errors.signStatusData.type === "required" &&
                      "Sign In/Out Can't be blank"}
                  </div>
                </div>
                            <div className="form-group row mt-4">
                                <div className="col-lg-4">
                                    <label className="form-label">Employee</label>
                                    <RHFInput
                                        as={<Select options={employee} />}
                                        rules={{ required: false }}
                                        name="employeeData"
                                        register={register}
                                        value={employee.value}
                                        onChange={(e) => selectHandle(e, "employeeData")}
                                        setValue={setValue}
                                    />

                                    <div className="inputError margin-minus-10">
                                        {errors.employeeData &&
                                            errors.employeeData.type === "required" &&
                                            "Employee Can't be blank"}
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label">Vessel</label>
                                    <RHFInput
                                        as={<Select options={vessel} />}
                                        rules={{ required: false }}
                                        name="vesselData"
                                        register={register}
                                        value=""
                                        onChange={(e) => selectHandle(e, "vesselData")}
                                        setValue={setValue}
                                    />

                                    <div className="inputError margin-minus-10">
                                        {errors.vesselData &&
                                            errors.vesselData.type === "required" &&
                                            "Vessel Can't be blank"}
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label mt-2">Action Date</label>
                                    <Form.Control
                                        type="date"
                                        name="dteActionDate"
                                        className="fromStyle"
                                        value={employeeSigningInfo.dteActionDate}
                                        onChange={handleChange}
                                        ref={register({
                                            required: false,
                                            maxLength: 100,
                                        })}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <label className="form-label mt-2">Remarks</label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Remarks"
                                        name="strRemarks"
                                        className="fromStyle"
                                        value={employeeSigningInfo.strRemarks}
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
                                    <a
                                        onClick={() => {
                                            history.push("/vessels/list");
                                        }}
                                    >
                                        <button type="button" class="btn btn-secondary btn-lg mr-2">
                                            Back
                    </button>
                                    </a>
                                    {/* <button type="submit" class="btn btn-primary btn-lg">
                    Next
                    </button> */}
                                    {loading &&
                                        <button type="submit" class="btn btn-primary btn-lg" disabled={true} >
                                            <span>Update</span>
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
    );
});

export default EmployeeSigningEdit;
