import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  AddEmployeePersonalAction,
  EmptyEmployeeAddMessage,
  GetEmployeeRank,
} from "../../../../_redux/actions/EmployeeAction";
import "./css/style.css";
import FileBase64 from "react-file-base64";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import EmployeeTab from "../EmployeeTab";

const EmployeeAdd = withRouter(({ history, props }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  toast.configure();

  const [employeeInfo, setEmployeeInfo] = React.useState({
    strName: "",
    image: "",
    strBirthdate: "",
    strHomeTelephone: "",
    strRank: "",
    strAvailabilityDate: "",
    strEmail: "",
    strHeight: "",
    strWeight: "",
    strNationality: "Bangladeshi",
    strEmgrPersonalTel: "",
    strEmgrPersonName: "",
    strEmgrPersonRelation: "",
    strEmgrPersonAddress: "",
    strTradingArea: "",
    strCargoCarried: "",
    strNearestAirport: "",
    strBoilersuit: "",
    strSafetyShoes: "",
    strUniformShirt: "",
    strUniformTrouser: "",
    strWinterJacket: "",
    create_at: "",
    updated_at: "",
    strAmount: "",
    strCDCNo: "",
    isLoading: false,
    strCurrency: "",
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const selectHandleCurrency = (data) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData.strCurrency = data;
    setEmployeeInfo(employeeInfoData);
  };

  const selectHandle = (item, name) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData[name] = item;
    setEmployeeInfo(employeeInfoData);
  };

  const selectAirportHandle = (data) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData.strNearestAirport = data;
    setEmployeeInfo(employeeInfoData);
  };

  const currency = [
    {
      label: "USD",
      value: 1,
    },

    {
      label: "BDT",
      value: 2,
    },
  ];

  const airport = [
    {
      label: "Hazrat Shahjalal International Airport",
      value: 1,
    },

    {
      label: "Shah Amanat International Airport",
      value: 2,
    },
    {
      label: "Shah Mokhdum Airport",
      value: 3,
    },
    {
      label: "Jessore Airport",
      value: 4,
    },
    {
      label: "Barisal Airport",
      value: 5,
    },
    {
      label: "Coxs Bazar Airport",
      value: 6,
    },
    {
      label: "Ishurdi Airport",
      value: 7,
    },
    {
      label: "Saidpur Airport",
      value: 8,
    },
  ];

  // Callback~
  const getFiles = (files) => {
    const imageFile = { ...employeeInfo };
    imageFile.image = files;
    setEmployeeInfo(imageFile);
  };

  const handleChange = ({ currentTarget: input }) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData[input.name] = input.value;
    setEmployeeInfo(employeeInfoData);
  };

  const addStatus = useSelector((state) => state.employeeInfo.addStatus);
  const addMessage = useSelector((state) => state.employeeInfo.addMessage);
  const employeeRank = useSelector((state) => state.employeeInfo.employeeRank);
  const intEmployeeId = useSelector(
    (state) => state.employeeInfo.intEmployeeId
  );
  let Ranks = [];
  if (employeeRank) {
    employeeRank.data.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strRankName,
      };
      Ranks.push(items);
    });
  }

  useEffect(() => {
    dispatch(GetEmployeeRank());
    if (typeof addMessage === null || typeof addMessage === "undefined") {
      disableLoading();
      toast.error("Something Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (addStatus && addMessage.length > 0) {
        disableLoading();
        toast.success(addMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(EmptyEmployeeAddMessage());

        history.push("/employee/employee-education-add/" + intEmployeeId);
      }

      if (!addStatus && addMessage.length > 0) {
        disableLoading();
        toast.error(addMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(EmptyEmployeeAddMessage());
      }
    }
  }, [addStatus, addMessage]);

  const onSubmit = async (e) => {
    enableLoading();
    dispatch(AddEmployeePersonalAction(employeeInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Create New Employee</h3>
            </div>
          </div>
          <div>
            <EmployeeTab props={props} />
          </div>
          <div className="card-body">
            <label className="form-label mt-2" style={{ fontWeight: "bold" }}>
              Personal
            </label>
            <form
              className="form form-label-right"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
            >
              <div className="form-group row">
                <div className="col-lg-4">
                  <label className="form-label">Full Name</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Employee Full Name "
                    name="strName"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.strName &&
                      errors.strName.type === "required" &&
                      "First Name can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Date of Birth</label>
                  <Form.Control
                    type="date"
                    name="strBirthdate"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-10">
                    {errors.strBirthdate &&
                      errors.strBirthdate.type === "required" &&
                      "Birthdate can't be blank"}
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Tel (Home & Mobile)</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Telepone No. "
                    name="strHomeTelephone"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  <div className="inputError margin-minus-8">
                    {errors.strHomeTelephone &&
                      errors.strHomeTelephone.type === "required" &&
                      "Telephone No. can't be blank"}
                  </div>
                </div>

                {/* <div className="col-lg-4">
                                    <label className="form-label mt-2">Rank Applied</label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Rank"
                                        name="strRank"
                                        className="fromStyle"
                                        onChange={handleChange}
                                        ref={register({
                                            required: true,
                                            maxLength: 100,
                                        })}
                                    />
                                    <div className="inputError margin-minus-8">
                                        {errors.strRank &&
                                            errors.strRank.type === "required" &&
                                            "Rank can't be blank"}
                                    </div>
                                </div> */}

                <div className="col-lg-4">
                  <label className="form-label">Rank</label>
                  <RHFInput
                    as={<Select options={Ranks} />}
                    rules={{ required: false }}
                    name="rankData"
                    // value={employeeInfo.strRank}
                    register={register}
                    onChange={(e) => selectHandle(e, "rankData")}
                    setValue={setValue}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">
                    Date of Availability<span></span>
                  </label>
                  <Form.Control
                    type="date"
                    name="strAvailabilityDate"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Email(Personal)</label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="strEmail"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />

                  <div className="inputError margin-minus-8">
                    {errors.strEmail &&
                      errors.strEmail.type === "required" &&
                      "email can't be blank"}
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Height(feet)</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Height eg:5'6"
                    name="strHeight"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Weight(KG)</label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Weight eg:70"
                    name="strWeight"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Nationality</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Nationality"
                    name="strNationality"
                    className="fromStyle"
                    onChange={handleChange}
                    value="Bangladeshi"
                    disabled={true}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">
                    Emergency Person Name
                    <span style={{ color: "red" }}>(Next of keen)</span>
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Emergency Person Name"
                    name="strEmgrPersonName"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">
                    Emergency Person Tel
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Emergency Telephone"
                    name="strEmgrPersonalTel"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">
                    Emergency Person Relation
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Emergency Person Relation"
                    name="strEmgrPersonRelation"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">
                    Emergency Person Address
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Emergency Person Address"
                    name="strEmgrPersonAddress"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <label className="form-label mt-2">Trading Area</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Trading Area"
                    name="strTradingArea"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Cargo Carried</label>
                  <Form.Control
                    type="text"
                    placeholder="Cargo Carried"
                    name="strCargoCarried"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label">Nearest Airport</label>
                  <RHFInput
                    as={<Select options={airport} />}
                    rules={{ required: false }}
                    name="strNearestAirport"
                    register={register}
                    value={airport.label}
                    onChange={selectAirportHandle}
                    setValue={setValue}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">CDC No.</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter CDC No."
                    name="strCDCNo"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>
                <div className="col-lg-4 mt-8">
                  <label className="form-label mt-2">Profile Pic</label>
                  <FileBase64
                    name="image"
                    multiple={true}
                    onDone={getFiles.bind(this)}
                  />
                </div>
              </div>

              <label className="form-label" style={{ fontWeight: "bold" }}>
                SALARY INFORMATION
              </label>
              <div className="form-group row">
                <div className="col-lg-2">
                  <label className="form-label">Currency</label>
                  <RHFInput
                    as={<Select options={currency} />}
                    rules={{ required: false }}
                    name="strCurrency"
                    register={register}
                    value={currency.label}
                    onChange={selectHandleCurrency}
                    setValue={setValue}
                  />
                </div>

                <div className="col-sm-4">
                  <label className="form-label mt-2">
                    Expected Salary Amount
                  </label>
                  <Form.Control
                    type="text"
                    placeholder="0.00"
                    name="strAmount"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-2">
                  <label className="form-label">Salary Type</label>
                  <RHFInput
                    as={<Select options={currency} />}
                    rules={{ required: false }}
                    name="strCurrency"
                    register={register}
                    value={currency.label}
                    onChange={selectHandle}
                    setValue={setValue}
                  />
                </div>
              </div>
              <label className="form-label mt-2" style={{ fontWeight: "bold" }}>
                SAFETY GEAR AND UNIFORM
              </label>
              <div className="form-group row">
                <div className="col-sm-2">
                  <label className="form-label mt-2">Boiler Suit</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Boiler Suit"
                    name="strBoilersuit"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-sm-2">
                  <label className="form-label mt-2">Safety Shoes</label>
                  <Form.Control
                    type="text"
                    placeholder="Safety Shoes"
                    name="strSafetyShoes"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-sm-2">
                  <label className="form-label mt-2">Uniform Shirt</label>
                  <Form.Control
                    type="text"
                    placeholder="Uniform Shirt"
                    name="strUniformShirt"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-sm-2">
                  <label className="form-label mt-2">Uniform Trouser</label>
                  <Form.Control
                    type="text"
                    placeholder="Uniform Trouser"
                    name="strUniformTrouser"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-sm-2">
                  <label className="form-label mt-2">Winter Jacket</label>
                  <Form.Control
                    type="text"
                    placeholder="Winter Jacket"
                    name="strWinterJacket"
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
                <div className="col-sm-10 mb-2">
                  <a
                    onClick={() => {
                      history.push("/employee/employee-list");
                    }}
                  >
                    <button type="button" class="btn btn-secondary btn-lg">
                      Back
                    </button>
                  </a>
                </div>

                <div className="col-sm-2">
                  {/* <a onClick={() => {
                                        history.push("/employee/employee-education-add");
                                    }}> */}
                  {/* {isLoading &&
                                        <button type="submit" class="btn btn-primary btn-lg" disabled>Next...</button>
                                    } */}
                  {loading && (
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      disabled={true}
                    >
                      <span>Next</span>
                      <span className="ml-3 spinner spinner-white"></span>
                    </button>
                  )}

                  {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                      <span>Next</span>
                    </button>
                  )}

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

export default EmployeeAdd;
