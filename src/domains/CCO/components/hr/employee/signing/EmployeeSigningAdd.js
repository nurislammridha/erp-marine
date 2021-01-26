import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  GetCountryDataAction,
  GetVesselList,
  VesselEmptyMessage,
} from "../../../../../Vessel/_redux/actions/VesselAction";
import { RHFInput } from "react-hook-form-input";
import {
  SignEmployee,
  EmptyEmployeeSigningAddMessage,
} from "../../../../_redux/actions/EmployeeSigningAction";
import { GetEmployeeList } from "../../../../_redux/actions/EmployeeAction";

const EmployeeSigningAdd = withRouter(({ history, props }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  toast.configure();

  const [employeeSigningInfo, setEmployeeSigningInfo] = React.useState({
    strVesselName: "",
    employeeData: "",
    vesselData: "",
    strVesselFlag: "",
    countryData: "",
    numDeadWeight: "",
    strBuildYear: "",
    strEngineName: "",
    intTotalCrew: "",
    // signStatusData:{
    //   label:'Sign In',
    //   value:1
    // },
  });

  const handleChange = ({ currentTarget: input }) => {
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
    console.log('item',item,'name',name);
    const employeeSigningInfoData = { ...employeeSigningInfo };
    employeeSigningInfoData[name] = item;
    setEmployeeSigningInfo(employeeSigningInfoData);
  };

  const addStatus = useSelector((state) => state.employeeSigningInfo.addStatus);
  const addMessage = useSelector(
    (state) => state.employeeSigningInfo.addMessage
  );
  const vesselList = useSelector((state) => state.vesselInfo.vesselList);
  const employeeInfoList = useSelector(
    (state) => state.employeeInfo.employeeInfoList
  );

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
      value:2
    }
  ]

  useEffect(() => {
    dispatch(GetVesselList());
    dispatch(GetEmployeeList());
    dispatch(GetCountryDataAction());

    // const signStatusData={
    //   label:'Sign In',
    //   value:1
    // }
    // setValue('signStatusData',signStatusData);
    if (typeof addMessage === null || typeof addMessage === "undefined") {
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
        dispatch(EmptyEmployeeSigningAddMessage());
        history.push("/employee/employee-signing-list");
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        toast.error(addMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(EmptyEmployeeSigningAddMessage());
      }
    }
  }, [addStatus, addMessage]);

  const onSubmit = async (e) => {
    enableLoading();
    dispatch(SignEmployee(employeeSigningInfo));
  };

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
                  value="1"
                  id="ysnSignIn"
                  onChange={handleChange}
                />
              </div> */}

                <div className="col-lg-4">
                  <label className="form-label">Sign In/Out</label>
                  <RHFInput
                    as={<Select options={status} />}
                    rules={{ required: true }}
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
                    rules={{ required: true }}
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
                    rules={{ required: true }}
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
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                   <div className="inputError margin-minus-10">
                    {errors.dteActionDate &&
                      errors.dteActionDate.type === "required" &&
                      "Date Can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Remarks</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Remarks"
                    name="strRemarks"
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
                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Submit</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Submit</span>
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

export default EmployeeSigningAdd;
