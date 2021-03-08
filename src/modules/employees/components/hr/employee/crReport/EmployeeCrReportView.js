import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Image, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";

import "../css/custom.css";
// import logo from "../../../../../images/logo-dark.png";
import logo from "../../../../images/logo-dark.png";
import cv from "../../../../images/avatar.jpg";
import { isTemplateElement } from "@babel/types";
import { indexOf } from "lodash";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import { RHFInput } from "react-hook-form-input";
import {
  EmployeeCrReportCriteria,
  employeeCrReportSelect,
  employeeCrReportSubmit,
  employeeReasonOfAppraisal,
  getCrReportEmployeeInfoByEmployeeId,
  selectedReasonOfAppraisal,
  getCrReportCriteriaOptionById,
  getCrReportDetailsAction,
} from "../../../../_redux/actions/EmployeeCrReport";
import { GetAllEmployeeList } from "../../../../_redux/actions/EmployeeAction";
import { CircularProgress } from "@material-ui/core";
import { getFormattedCurrentDate } from "../../../../utils/DateHelper";

const EmployeeCrReportView = withRouter(({ history, props }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, setValue } = useForm();

  const criteria = useSelector(
    (state) => state.employeeCrReducer.crReportDetails
  );
  const crReportDetailsLoadingStatus = useSelector(
    (state) => state.employeeCrReducer.crReportDetailsLoadingStatus
  );
  const employeeInfo = useSelector(
    (state) => state.employeeInfo.employeeInfoList
  );

  const appraisal = useSelector(
    (state) => state.employeeCrReducer.appraisalList
  );
  const textBoxShow = useSelector(
    (state) => state.employeeCrReducer.textBoxShow
  );
  const stateInput = useSelector((state) => state.employeeCrReducer.inputData);

  const crReportDetailsById = useSelector(
    (state) => state.employeeCrReducer.crReportDetailsById
  );

  const crReportDetailsByIdLoadingStatus = useSelector(
    (state) => state.employeeCrReducer.crReportDetailsByIdLoadingStatus
  );

  const crReportData = props.location.state.crReport;

  useEffect(() => {
    let crReportId = props.location.state.crReport.intID;

    dispatch(getCrReportCriteriaOptionById(crReportId));
    dispatch(getCrReportDetailsAction(crReportId));
  }, [dispatch]);

  let employeeList = [];
  if (employeeList) {
    employeeInfo.forEach((item) => {
      let items = {
        value: item.intID,
        label: item.strName,
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
    dispatch(employeeCrReportSubmit(stateInput, criteria));
  };

  const searchEmployeeInfo = (employee) => {
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

        {!crReportDetailsLoadingStatus && (
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
                      Employee Name:
                    </label>
                    <label
                      for="Employee Name form-label"
                      class="col-sm-4 col-form-label form-inputlabel"
                    >
                      {crReportDetailsById.strName}
                    </label>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-6">
                  <div class="form-group row">
                    <label
                      for="Employee Name"
                      class="col-sm-4 col-form-label form-inputlabel"
                    >
                      Rank:
                    </label>
                    <label
                      for="Employee Name"
                      class="col-sm-8 col-form-label form-inputlabel"
                    >
                      {crReportDetailsById.strRankName}
                    </label>
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
                      Name of Vessel:
                    </label>
                    <label
                      for="Employee Name"
                      className="col-sm-4 col-form-label form-inputlabel "
                    >
                      {crReportDetailsById.strVesselName}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4 col-6  vessel-name">
                  <div class="form-group row">
                    <label
                      for="Employee Name"
                      className="col-sm-4 col-form-label form-inputlabel"
                    >
                      Start Date:
                    </label>
                    <label
                      for="Employee Name"
                      className="col-sm-8 col-form-label form-inputlabel"
                    >
                      {crReportDetailsById.dteFromDate}
                    </label>
                  </div>
                </div>
                <div className="col-lg-3 col-6 vessel-name">
                  <div className="form-group row">
                    <label
                      for="Employee Name"
                      className="col-sm-4 col-form-label form-inputlabel"
                    >
                      End Date:
                    </label>
                    <label
                      for="Employee Name"
                      className="col-sm-8 col-form-label form-inputlabel"
                    >
                      {crReportDetailsById.dteToDate}
                    </label>
                  </div>
                </div>
              </div>

              <label for="Employee Name" className="col-form-label ">
                Reason of Appraisal:
              </label>
              <label for="Employee Name" className="col-form-label ">
                {crReportDetailsById.strReasonOfAppraisal}
              </label>

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
                                      item.ysnChecked == true
                                        ? "criteriaBackground"
                                        : null
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
                        <label className="form-check-label" for="defaultCheck2">
                          {crReportDetailsById.strOverallPerformance}
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
                        <label
                          className="form-check-label"
                          for="exampleRadios1"
                        >
                          {crReportDetailsById.ysnPromotionRecomanded}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-lg-4 mt-2">
                      <div className="form-group row mt-5">
                        <label
                          for="Employee Name"
                          className="col-sm-4 col-form-label date-label"
                        >
                          Date
                        </label>
                        <label
                          for="Employee Name"
                          className="col-sm-8 col-form-label date-label"
                        >
                          {crReportDetailsById.strPromotionRecomandedDate}
                        </label>
                      </div>
                    </div>
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
                          2. Further employment recommendation:
                        </label>
                      </div>
                      <div className="form-check radio__button ml-4">
                        <label
                          className="form-check-label"
                          for="exampleRadios1"
                        >
                          {crReportDetailsById.ysnFurtherRecomanded}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-lg-4 col-6 mt-2">
                      <div className="form-group row pt-2  mt-3 date-input">
                        <label
                          for="Employee Name"
                          className="col-sm-4 col-form-label date-label"
                        >
                          Date
                        </label>
                        <label
                          for="Employee Name"
                          className="col-sm-8 col-form-label date-label"
                        >
                          {crReportDetailsById.strFurtherRecomandedDate}
                        </label>
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
                    Master/CE whoever is the earliest{" "}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row rivision">
                <div className="col-lg-2">
                  <p> ASLL'FORM-06R3</p>
                </div>
                <div className="col-lg-2">
                  <p> Revision : 3</p>
                </div>
                <div className="col-lg-2">
                  <p>Revision Date:</p>
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
            </Form>
          </div>
        )}
        {crReportDetailsLoadingStatus && <p>Loading .....</p>}
      </div>
    </>
  );
});

export default EmployeeCrReportView;
