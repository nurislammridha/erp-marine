import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Image, Button } from "react-bootstrap";
import { Table } from "react-bootstrap";

import "../css/custom.css";
// import logo from "../../../../../images/logo-dark.png";
import logo from "../../../../images/logo-dark.png";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import {
  EmployeeCrReportCriteria,
  employeeCrReportSelect,
  employeeCrReportSubmit,
  employeeReasonOfAppraisal,
  getCrReportEmployeeInfoByEmployeeId,
  selectedReasonOfAppraisal,
} from "../../../../_redux/actions/EmployeeCrReport";
import { GetEmployeeListForDropdown } from "../../../../_redux/actions/EmployeeAction";

const EmployeeCrReport = withRouter(({ history, props }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, setValue } = useForm();
  const criteria = useSelector((state) => state.employeeCrReducer.criteriaList);
  const loadingStaus = useSelector(
    (state) => state.employeeCrReducer.isLoading
  );
  const employeeInfo = useSelector(
    (state) => state.employeeInfo.employeeInfoList
  );
  const submitStatusGet = useSelector(
    (state) => state.employeeCrReducer.submitStatus
  );
  const appraisal = useSelector(
    (state) => state.employeeCrReducer.appraisalList
  );
  const textBoxShow = useSelector(
    (state) => state.employeeCrReducer.textBoxShow
  );
  const stateInput = useSelector((state) => state.employeeCrReducer.inputData);

  console.log('state input cha',stateInput);

  useEffect(() => {
    dispatch(EmployeeCrReportCriteria());
    dispatch(employeeReasonOfAppraisal());
    dispatch(GetEmployeeListForDropdown());
  }, []);

  let employeeList = [];
  if (employeeList) {
    employeeInfo.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strName + "-" + item.strCDCNo,
      };
      employeeList.push(items);
    });
  }

  const appraisalSubmit = (
    item,
    indexParentCriteria,
    indexChild,
    parentCriteria
  ) => {
    dispatch(
      employeeCrReportSelect(
        item,
        indexParentCriteria,
        indexChild,
        parentCriteria
      )
    );
  };

  const getChangeAppraisal = (e) => {
    let data = {
      name: e.target.name,
      value: e.target.value,
    };
    dispatch(selectedReasonOfAppraisal(data));
  };
  const onSubmit = (data) => {
    if (props.location.state !== null) {
      dispatch(
        employeeCrReportSubmit(
          stateInput,
          criteria,
          props.location.state.intEmployeeApplicationId
        )
      );
    } else {
      dispatch(employeeCrReportSubmit(stateInput, criteria));
    }
  };

  const searchEmployeeInfo = (employee) => {
    console.log("employeeId", employee);
    let data = {
      name: employee.label,
      value: employee.value,
    };
    dispatch(getCrReportEmployeeInfoByEmployeeId(data));
  };

  return (
    <>
      <div className="card p-5">
        <div className="container pb-5 mb-4 ml-3">
          <div className="row  border-around">
            <div className="col-lg-8">
              <h3 className="card-label a-lebel text-center pt-5">
                AKIJ SHIPPING LINE LTD.
              </h3>
            </div>

            <div className="col-lg-4 shippingLineLogo">
              <Image src={logo} roundedCircle className="akij-logo-ship" />
            </div>
          </div>
        </div>

        {!loadingStaus && (
          <div className="container">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="employeereport-table"
            >
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-6">
                  <div class="form-group row">
                    <label
                      for="Employee Name form-label"
                      class="col-sm-4 col-form-label form-inputlabel"
                    >
                      Employee Name
                    </label>
                    <div className="col-lg-12">
                      <RHFInput
                        as={<Select options={employeeList} />}
                        rules={{ required: false }}
                        name="intEmployeeId"
                        register={register}
                        value=""
                        onChange={(e) => searchEmployeeInfo(e)}
                        setValue={setValue}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-6">
                  <div class="form-group row">
                    <label
                      for="Employee Name"
                      class="col-sm-2 col-form-label form-inputlabel"
                    >
                      Rank
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        disabled={true}
                        className="form-control form-input"
                        id="inputRank"
                        placeholder="Rank"
                        name="strRank"
                        value={
                          stateInput.strRank !== "" ? stateInput.strRank : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Second Row */}
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-6">
                  <div className="form-group row vessel-name">
                    <label
                      for="Employee Name"
                      className="col-sm-4 col-form-label form-inputlabel "
                    >
                      Name of Vessel
                    </label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        disabled={true}
                        className="form-control form-input"
                        id="inputRank"
                        name="strVesselName"
                        placeholder="Name of Vessel"
                        value={stateInput.strVesselName}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-6  vessel-name">
                  <div class="form-group row">
                    <label
                      for="Employee Name"
                      className="col-sm-2 col-form-label form-inputlabel"
                    >
                      On
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="date"
                        disabled={true}
                        className="form-control form-input"
                        id="inputRank"
                        value={
                          typeof stateInput.dteFromDate !== "undefined"
                            ? stateInput.dteFromDate
                            : null
                        }
                        placeholder="Rank"
                        name="dteFromDate"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6 vessel-name">
                  <div className="form-group row">
                    <label
                      for="Employee Name"
                      className="col-sm-2 col-form-label form-inputlabel"
                    >
                      To
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="date"
                        className="form-control form-input"
                        id="inputRank"
                        value={stateInput.dteToDate}
                        placeholder="Rank"
                        name="dteToDate"
                        onChange={(e) => getChangeAppraisal(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <label for="Employee Name" className="col-form-label ">
                Reason of Appraisal
              </label>
              <div className="form-group row ml-3">
                {appraisal.map((item) => (
                  <div className="col-lg-2 col-6">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="exampleCheck1"
                      name="strReasonOfAppraisal"
                      value={item.name}
                      id={item.id}
                      onChange={(e) => getChangeAppraisal(e)}
                    />
                    <label className="form-check-label" for="exampleCheck1">
                      {item.name}
                    </label>
                  </div>
                ))}

                {textBoxShow && (
                  <div className="col-lg-3">
                    <textarea cols="40" rows="3"></textarea>
                  </div>
                )}
              </div>

              <div className="row mt-5">
                <div className="col-lg-12 ">
                  <Table striped bordered hover criteriaTable responsive>
                    <thead>
                      <tr className="border-left cr-report ">
                        <th>Criteria</th>
                        <th>Excellent</th>
                        <th>Very Good</th>
                        <th>Average</th>
                        <th>Poor</th>
                      </tr>
                    </thead>
                    <tbody className="tbody">
                      {criteria &&
                        criteria.map((parentCriteria, indexParentCriteria) => (
                          <>
                            <tr>
                              <label className="form-control criteriaOptionsInput mt-1">
                                {parentCriteria.strName}
                              </label>

                              {parentCriteria.options.map(
                                (item, indexChild) => (
                                  <td
                                    className={
                                      item.ysnChecked == 0
                                        ? "criteriaTd"
                                        : "criteriaBackground"
                                    }
                                    onClick={() =>
                                      appraisalSubmit(
                                        item,
                                        indexParentCriteria,
                                        indexChild,
                                        parentCriteria
                                      )
                                    }
                                  >
                                    {item.strName}
                                  </td>
                                )
                              )}
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="row result">
                <div className="col-lg-12">
                  <p>
                    {" "}
                    Based On the above tool, how would you describe his/ her
                    overall performance?{" "}
                  </p>

                  <div className="last__checkbox pl-5">
                    <div className="row">
                      <div className="col-lg-3">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="overallPerformance"
                          value="Outstanding"
                          id={1}
                          onChange={(e) => getChangeAppraisal(e)}
                        />
                        <label className="form-check-label" for="defaultCheck2">
                          Outstanding
                        </label>
                      </div>
                      <div className="col-lg-3">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="overallPerformance"
                          value="Meet expections"
                          id={2}
                          onChange={(e) => getChangeAppraisal(e)}
                        />
                        <label className="form-check-label" for="defaultCheck2">
                          Meet expections
                        </label>
                      </div>
                      <div className="col-lg-3">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="overallPerformance"
                          value="Meet some expections"
                          id={3}
                          onChange={(e) => getChangeAppraisal(e)}
                        />
                        <label className="form-check-label" for="defaultCheck2">
                          Meet some expections
                        </label>
                      </div>
                      <div className="col-lg-3">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="overallPerformance"
                          value="Perform bellow expection"
                          id={4}
                          onChange={(e) => getChangeAppraisal(e)}
                        />
                        <label className="form-check-label" for="defaultCheck2">
                          Perform bellow expection
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row additional__comments">
                <div className="col-lg-12">
                  <p>Additional Comments Appraiser: </p>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-check radio__button">
                        <label
                          className="form-check-label"
                          for="exampleRadios1"
                        >
                          1. Promotion recommanded:
                        </label>
                      </div>
                      <div className="form-check radio__button ml-4">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="ysnPromotionRecomanded"
                          value="Yes"
                          id="1"
                          onChange={(e) => getChangeAppraisal(e)}
                        />
                        <label
                          className="form-check-label"
                          for="exampleRadios1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check radio__button ml-5">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="ysnPromotionRecomanded"
                          value="No"
                          id="2"
                          onChange={(e) => getChangeAppraisal(e)}
                        />
                        <label
                          className="form-check-label"
                          for="exampleRadios1"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-lg-4 mt-2">
                      <div className="form-group row mt-5">
                        <label
                          for="Employee Name"
                          className="col-sm-2 col-form-label date-label"
                        >
                          Date
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="date"
                            className="form-control"
                            id="strPromotionRecomandedDate"
                            name="strPromotionRecomandedDate"
                            vaue={stateInput.strPromotionRecomandedDate}
                            placeholder="promotion Recommend Date "
                            onChange={(e) => getChangeAppraisal(e)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-4 ">
                    <label
                      for="Employee Name"
                      className="col-sm-2 col-form-label"
                    >
                    </label>
                    <div className="form-group col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Name"
                        onChange={(e) => getChangeAppraisal(e)}
                      />
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="row additional__comments">
                <div className="col-lg-12">
                  <p>Additional comments of Master/CE:</p>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-check radio__button">
                        <label
                          className="form-check-label"
                          for="exampleRadios1"
                        >
                          2. Furtehr employment recommandation:
                        </label>
                      </div>
                      <div className="form-check radio__button ml-4">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="ysnFurtherRecomanded"
                          value="Yes"
                          id="1"
                          onChange={(e) => getChangeAppraisal(e)}
                        />
                        <label
                          className="form-check-label"
                          for="exampleRadios1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check radio__button ml-5">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="ysnFurtherRecomanded"
                          value="No"
                          id="2"
                          onChange={(e) => getChangeAppraisal(e)}
                        />
                        <label
                          className="form-check-label"
                          for="exampleRadios1"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-lg-4 col-6 mt-2">
                      <div className="form-group row pt-2  mt-3 date-input">
                        <label
                          for="Employee Name"
                          className="col-sm-2 col-form-label date-label"
                        >
                          Date
                        </label>
                        <div class="col-sm-8">
                          <input
                            type="date"
                            className="form-control"
                            id="inputRank"
                            vaue={stateInput.strFurtherRecomandedDate}
                            name="strFurtherRecomandedDate"
                            onChange={(e) => getChangeAppraisal(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-lg-12 nb">
                  <p>
                    {" "}
                    NB: Confidential report shall sent to D.P.A / T.S at the
                    time of sign off the ship-staff of prior to signing off
                    Master/CE whochever is the earliest{" "}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row rivision">
                <div className="col-lg-2">
                  <p> ASLL'FORM-06R3</p>
                </div>
                <div className="col-lg-2">
                  <p> Rivision : 3</p>
                </div>
                <div className="col-lg-2">
                  <p>Rivision Date:</p>
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-2">
                  <p> Page : 1</p>
                </div>
              </div>
              <div className="row rivision">
                <div className="col-lg-12">
                  <p>Uncontrolled when printed or copied</p>
                </div>
              </div>
              {!submitStatusGet && <Button type="submit">Submit form</Button>}
              {submitStatusGet && (
                <Button>
                  Submitting{" "}
                  <span className="ml-3 spinner spinner-white"></span>
                </Button>
              )}
            </Form>
          </div>
        )}
        {loadingStaus && <p>Loading .....</p>}
      </div>
    </>
  );
});

export default EmployeeCrReport;
