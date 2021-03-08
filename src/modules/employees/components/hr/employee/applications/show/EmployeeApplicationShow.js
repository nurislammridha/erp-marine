import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import "./../../css/custom.css";
import {
  GetEmployeeApplicationList,
  getGetApplicationMainListAction,
} from "../../../../../_redux/actions/EmployeeApplicationAction";
import parse from "html-react-parser";
import { generateStringDateFromDate } from "../../../../../utils/DateHelper";

const EmployeeApplicationShow = withRouter(({ history, props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // test
  }, []);

  const applicationDetails = history.location.state.applicationData;

  return (
    <div className="card p-5">
      <div className="employee-application-show mt-5 ml-5">
        <p>Date:{generateStringDateFromDate(applicationDetails.created_at)}</p>
        <p className="mt-3">To</p>
        <p>{applicationDetails.strReceiverName}</p>
        <p>Akij Shipping Line Ltd.</p>
        <p>Dhaka, Bangladesh</p>
        <h5 className="mt-5 text-bold">
          {" "}
          Through: Master,"{applicationDetails.strVesselName}"
        </h5>
        <h4 className="mt-5 text-bold mb-5">
          {" "}
          Subject:{applicationDetails.strApplicationSubject}
        </h4>
        <p className="mt-5 employeeshow-text">Dear Sir,</p>
        <p>
          {applicationDetails.strApplicationBody != null
            ? parse(applicationDetails.strApplicationBody)
            : ""}
        </p>
        <p className="mt-5">Yours obediently</p>
        <p className="mt-5">Name:{applicationDetails.strEmployeeName}</p>
        <p>Rank:{applicationDetails.strRankName}</p>
        <p>CDC NO:{applicationDetails.strCDCNo}</p>
        <p>{applicationDetails.strVesselName}</p>
      </div>
    </div>
  );
});

export default EmployeeApplicationShow;
