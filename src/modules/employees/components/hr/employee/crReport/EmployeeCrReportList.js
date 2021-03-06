import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getCrReportList,
  getCrReportListAction,
} from "../../../../_redux/actions/EmployeeCrReport";
import { Form, Image, Button } from "react-bootstrap";
import PaginationLaravel from "../../../../../master/pagination/PaginationLaravel";
import {
  GetEmployeeList,
  getemployeeSearch,
  DeleteEmployee,
} from "../../../../../employees/_redux/actions/EmployeeAction";
import { GetVesselList } from "../../../../_redux/actions/EmployeeApplicationAction";

const EmployeeCrReportList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [isAddMode, setIsAddMode] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editActiveEducation, setEditActiveEducation] = useState(undefined);
  const [records, setRecords] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeInfo, setEmployeeInfo] = React.useState({
    employeeInfoList: [],
    isEdit: false,
    employee: "",
    vesselId: "",
  });

  toast.configure();

  const crReportListData = useSelector(
    (state) => state.employeeCrReducer.crReportList
  );
  const crReportListStatus = useSelector(
    (state) => state.employeeCrReducer.crReportListStatus
  );

  const vesselList = useSelector((state) => state.vesselInfo.vesselList);

  const crReportPaginatedData = useSelector(
    (state) => state.employeeCrReducer.crReportPaginatedData
  );

  const crReports = useSelector((state) => state.employeeCrReducer.crReports);

  useEffect(() => {
    dispatch(getCrReportList());
    dispatch(GetVesselList());
    dispatch(getCrReportListAction(currentPage));
  }, [dispatch, currentPage]);

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

  const selectHandle = (event) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData.vesselId = event.target.value;
    setEmployeeInfo(employeeInfoData);
  };

  const handleChange = ({ currentTarget: input }) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData[input.name] = input.value;
    if (input.value.length == 0) {
      dispatch(GetEmployeeList());
    }
    setEmployeeInfo(employeeInfoData);
  };

  const serchEmployee = () => {
    dispatch(getemployeeSearch(employeeInfo.employee, employeeInfo.vesselId));
  };

  const changePage = (data) => {
    setCurrentPage(data.page);
    dispatch(getCrReportListAction(data.page));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Employee CR Report List</h3>
            </div>
          </div>

          <div className="form-group row m-3">
            <div className="col-lg-3">
              <div>
                <label className="form-label">Vessel</label>
              </div>
              <select
                className="form-control"
                name="vesselId"
                placeholder="Search Any Information"
                onChange={selectHandle}
                value={employeeInfo.vesselId}
              >
                {vesselList &&
                  vesselList.map((item) => (
                    <option value={item.intID} key={item.intID}>
                      {item.strVesselName}
                    </option>
                  ))}
                <option value={0}>All</option>
              </select>
            </div>

            <div className="col-lg-3">
              <div>
                <label className="form-label">Search Any Information</label>
              </div>
              <Form.Control
                type="text"
                placeholder="Search "
                name="employee"
                id="ysnSignIn"
                onChange={handleChange}
              />
            </div>

            <div className="col-lg-3 mt-2">
              <div>
                <label className="form-label"></label>
              </div>
              <button
                className="btn"
                onClick={serchEmployee}
                style={{ backgroundColor: "#E1F0FF", color: "#3699FF" }}
              >
                Search
              </button>
            </div>
          </div>
          {!crReportListStatus && (
            <div className="card-body">
              <form className="form form-label-right"></form>
              <div className="react-bootstrap-table table-responsive">
                <table className="table table table-head-custom table-vertical-center">
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>Employee Name</th>
                      <th>Rank</th>
                      <th>Vessel</th>
                      <th>Further Promotion</th>
                      <th>Promotion Recommend</th>
                      <th style={{ width: 150 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crReports &&
                      crReports.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.strName}</td>
                          <td>{item.strRankName}</td>
                          <td>{item.strVesselName}</td>
                          <td>{item.ysnFurtherRecomanded}</td>
                          <td>{item.ysnPromotionRecomanded}</td>

                          <td>
                            {/* <a
                              className="btn btn-icon btn-light btn-hover-primary btn-sm"
                              onClick={() => {
                                history.push(
                                  "/employee/employee-application/edit",
                                  { applicationData: item }
                                );
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </a> */}
                            {/* &nbsp; */}
                            <a
                              className="btn btn-icon btn-light btn-hover-info btn-sm"
                              onClick={() => {
                                history.push("/employee/cr-report-view/", {
                                  crReport: item,
                                });
                              }}
                            >
                              <i className="fa fa-eye"></i>
                            </a>
                            {/* &nbsp; */}
                            {/* <a
                              className="btn btn-icon btn-light btn-hover-info btn-sm"
                              onClick={() => openPromotionModal(item)}
                              title="Promotion Entry"
                            >
                              <i className="fas fa-funnel-dollar"></i>
                            </a>
                            &nbsp; */}
                            {/* <a
                              className="btn btn-icon btn-light btn-hover-danger btn-sm"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this item?"
                                  )
                                )
                                  employeeDelete(item.intID);
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </a> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    {" "}
                    {crReportListData == null && (
                      <p className="text-danger text-center">No Data Found</p>
                    )}
                  </tfoot>
                </table>
              </div>
            </div>
          )}
          {crReportListStatus && (
            <div className="text-center">
              <h2>Loading....</h2>
            </div>
          )}
        </div>

        <PaginationLaravel
          changePage={changePage}
          data={crReportPaginatedData}
        />
      </div>
    </>
  );
});

export default EmployeeCrReportList;
