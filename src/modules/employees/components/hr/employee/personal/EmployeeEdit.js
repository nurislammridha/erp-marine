import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  UpdateEmployeePersonalAction,
  EmptyEmployeeAddMessage,
  GetEmployeeDetails,
  GetEmployeeDetailsActionService,
  GetEmployeeRank,
} from "../../../../_redux/actions/EmployeeAction";
import "./css/style.css";
import FileBase64 from "react-file-base64";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import EmployeeTab from "../EmployeeTab";

const EmployeeEdit = withRouter(({ history, props }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();
  toast.configure();
  //   const {
  //     intID,
  //     strName,
  //     image,
  //     strBirthdate,
  //     strHomeTelephone,
  //     strRank,
  //     strAvailabilityDate,
  //     strEmail,
  //     strHeight,
  //     strWeight,
  //     strNationality,
  //     strEmgrPersonalTel,
  //     strEmgrPersonName,
  //     strEmgrPersonRelation,
  //     strEmgrPersonAddress,
  //     strTradingArea,
  //     strCargoCarried,
  //     strNearestAirport,
  //     intAirportId,
  //     strBoilersuit,
  //     strSafetyShoes,
  //     strUniformShirt,
  //     strUniformTrouser,
  //     strWinterJacket,
  //     created_at,
  //     updated_at,
  //     strAmount,
  //     strCurrency,
  //     strCDCNo,
  //     intCurrencyId,
  //   } = props.location.state.item;

  const [employeeInfo, setEmployeeInfo] = React.useState({
    intID: 0,
    strName: "",
    image: "",
    strBirthdate: "",
    strBirthPlace: "",
    strHomeTelephone: "",
    strRank: "",
    strAvailabilityDate: "",
    strEmail: "",
    strHeight: "",
    strWeight: "",
    strNationality: "",
    strEmgrPersonalTel: "",
    strEmgrPersonName: "",
    strEmgrPersonRelation: "",
    strEmgrPersonAddress: "",
    strTradingArea: "",
    strCargoCarried: "",
    strPermanentAddress: "",
    strPresentAddress: "",
    airportData: {
      value: 0,
      label: "N/A",
    },
    strBoilersuit: "",
    strSafetyShoes: "",
    strUniformShirt: "",
    strUniformTrouser: "",
    strWinterJacket: "",
    created_at: "",
    updated_at: "",
    strAmount: "",
    strCDCNo: "",
    currencyData: {
      value: 0,
      label: "N/A",
    },

    rankData: {
      value: 0,
      label: "N/A",
    },
    strRemarks: "",
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  // const selectHandle = (data) => {
  //   const employeeInfoData = { ...employeeInfo };
  //   employeeInfoData.currencyData = data;
  //   setEmployeeInfo(employeeInfoData);
  // };

  const selectHandle = (item, name) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData[name] = item;
    setEmployeeInfo(employeeInfoData);
  };

  const selectAirportHandle = (data) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData.airportData = data;
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
  const employeeInfoDetails = useSelector(
    (state) => state.employeeInfo.employeeInfoDetails
  );
  // console.log('employeeInfoDetails', employeeInfoDetails);

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
    dispatch(GetEmployeeDetails(props.match.params.intEmployeeId));
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

        history.push("/employee/employee-list");
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

    setEmployeeInformation();
  }, [
    setEmployeeInfo,
    addStatus,
    addMessage,
    setEmployeeInformation,
    setValue,
  ]);

  const setEmployeeInformation = async () => {
    // Set from DB
    const emp = await GetEmployeeDetailsActionService(
      props.match.params.intEmployeeId
    );
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData.intID = emp.intID;
    employeeInfoData.strName = emp.strName;
    employeeInfoData.image = emp.image;
    employeeInfoData.strBirthdate = emp.strBirthdate;
    employeeInfoData.strBirthPlace = emp.strBirthPlace;
    employeeInfoData.strHomeTelephone = emp.strHomeTelephone;
    employeeInfoData.strRank = emp.strRank;
    employeeInfoData.strAvailabilityDate = emp.strAvailabilityDate;
    employeeInfoData.strEmail = emp.strEmail;
    employeeInfoData.strHeight = emp.strHeight;
    employeeInfoData.strWeight = emp.strWeight;
    employeeInfoData.strNationality = emp.strNationality;
    employeeInfoData.strEmgrPersonalTel = emp.strEmgrPersonalTel;
    employeeInfoData.strEmgrPersonName = emp.strEmgrPersonName;
    employeeInfoData.strEmgrPersonRelation = emp.strEmgrPersonRelation;
    employeeInfoData.strEmgrPersonAddress = emp.strEmgrPersonAddress;
    employeeInfoData.strTradingArea = emp.strTradingArea;
    employeeInfoData.strCargoCarried = emp.strCargoCarried;
    employeeInfoData.strPermanentAddress = emp.strPermanentAddress;
    employeeInfoData.strPresentAddress = emp.strPresentAddress;
    employeeInfoData.strRemarks = emp.strRemarks;
    employeeInfoData.airportData = {
      value: emp.intAirportId,
      label: emp.strNearestAirport,
    };
    employeeInfoData.rankData = {
      value: parseInt(emp.intRankId),
      label: emp.strRank,
    };
    employeeInfoData.strBoilersuit = emp.strBoilersuit;
    employeeInfoData.strSafetyShoes = emp.strSafetyShoes;
    employeeInfoData.strUniformShirt = emp.strUniformShirt;
    employeeInfoData.strUniformTrouser = emp.strUniformTrouser;
    employeeInfoData.strWinterJacket = emp.strWinterJacket;
    employeeInfoData.created_at = emp.created_at;
    employeeInfoData.updated_at = emp.updated_at;
    employeeInfoData.strAmount = emp.strAmount;
    employeeInfoData.strCDCNo = emp.strCDCNo;
    employeeInfoData.currencyData = {
      value: emp.intCurrencyId,
      label: emp.strCurrency,
    };

    const airportData = {
      value: parseInt(emp.intAirportId),
      label: emp.strNearestAirport,
    };
    const rankData = {
      value: parseInt(emp.intRankId),
      label: emp.strRank,
    };
    const currencyData = {
      value: parseInt(emp.intCurrencyId),
      label: emp.strCurrency,
    };
    setValue("airportData", airportData);
    setValue("currencyData", currencyData);
    setValue("rankData", rankData);

    setEmployeeInfo(employeeInfoData);
  };

  const onSubmit = async (e) => {
    enableLoading();
    dispatch(UpdateEmployeePersonalAction(employeeInfo));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Edit Employee Information</h3>
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
                    value={employeeInfo.strName}
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
                    value={employeeInfo.strBirthdate}
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
                  <label className="form-label">Place of Birth</label>
                  <Form.Control
                    type="date"
                    name="strBirthPlace"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Tel (Home & Mobile)</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Telepone No. "
                    name="strHomeTelephone"
                    value={employeeInfo.strHomeTelephone}
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

                <div className="col-lg-4">
                  <label className="form-label mt-2">Rank Applied</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Rank"
                    name="strRank"
                    className="fromStyle"
                    value={employeeInfo.strRank}
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
                </div>

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
                    value={employeeInfo.strAvailabilityDate}
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
                    value={employeeInfo.strEmail}
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
                    value={employeeInfo.strHeight}
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
                    value={employeeInfo.strWeight}
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
                    value={employeeInfo.strNationality}
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
                    value={employeeInfo.strEmgrPersonName}
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
                    value={employeeInfo.strEmgrPersonalTel}
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
                    value={employeeInfo.strEmgrPersonRelation}
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
                    value={employeeInfo.strEmgrPersonAddress}
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
                    value={employeeInfo.strTradingArea}
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
                    value={employeeInfo.strCargoCarried}
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
                    name="airportData"
                    value={employeeInfo.airportData}
                    register={register}
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
                    value={employeeInfo.strCDCNo}
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Present Address</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Present Address"
                    name="strPresentAddress"
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="form-label mt-2">Permanent Address</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Permanent Address"
                    name="strPermanentAddress"
                    value={employeeInfo.strPermanentAddress}
                    className="fromStyle"
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
                    value={employeeInfo.strRemarks}
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

                  <div className="inputError margin-minus-8">
                    {errors.strName &&
                      errors.strName.type === "required" &&
                      "Image can't be blank"}
                  </div>
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
                    name="currencyData"
                    value={employeeInfo.currencyData}
                    register={register}
                    value={currency.label}
                    onChange={(e) => selectHandle(e, "currencyData")}
                    setValue={setValue}
                  />
                </div>

                <div className="col-sm-4">
                  <label className="form-label mt-2">Salary Amount</label>
                  <Form.Control
                    type="text"
                    placeholder="0.00"
                    name="strAmount"
                    value={employeeInfo.strAmount}
                    className="fromStyle"
                    onChange={handleChange}
                    ref={register({
                      required: false,
                      maxLength: 100,
                    })}
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
                    value={employeeInfo.strBoilersuit}
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
                    value={employeeInfo.strSafetyShoes}
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
                    value={employeeInfo.strUniformShirt}
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
                    value={employeeInfo.strUniformTrouser}
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
                    value={employeeInfo.strWinterJacket}
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

export default EmployeeEdit;
