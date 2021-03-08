import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  GetEmployeeList,
  getemployeeSearch,
  DeleteEmployee,
} from "../../../../../_redux/actions/EmployeeAction";
import { Form } from "react-bootstrap";
import "./../../css/custom.css";
import PromotionalModal from "./../../promotional/PromotionalModal";
import PermissionWiseDisplay from "../../../../../../../modules/master/components/permissions/PermissionWiseDisplay";
// import { GetVesselList } from "../../../../../../../modules/vessel/_redux/actions/VesselAction";
// import { generateStringDateFromDate } from "../../../../../../master/utils/DateHelper";
import {
  GetEmployeeApplicationList,
  getGetApplicationMainListAction,
  GetVesselList,
} from "../../../../../_redux/actions/EmployeeApplicationAction";
import PaginationLaravel from "../../../../../../master/pagination/PaginationLaravel";
import { generateStringDateFromDate } from "../../../../../utils/DateHelper";

const EmployeeApplicationList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [promotionalModal, setPromotionalModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [
    selectedEmployeeInformation,
    setSelectedEmployeeInformation,
  ] = useState("");
  const [employeeInfo, setEmployeeInfo] = React.useState({
    employeeInfoList: [],
    isEdit: false,
    employee: "",
    vesselId: "",
  });

  const employeeInfoList = useSelector(
    (state) => state.employeeInfo.employeeInfoList
  );
  const isLoadingStatus = useSelector((state) => state.employeeInfo.isLoading);

  console.log("employeeInfoList", employeeInfoList);
  const deleteMessage = useSelector(
    (state) => state.employeeInfo.deleteMessage
  );
  const deleteStatus = useSelector((state) => state.employeeInfo.deleteStatus);
  const vesselList = useSelector((state) => state.vesselInfo.vesselList);

  const employeeApplicationList = useSelector(
    (state) => state.employeeApplicationReducer.employeeApplicationList
  );

  const applicationPaginatedData = useSelector(
    (state) => state.employeeApplicationReducer.applicationPaginatedData
  );

  const applications = useSelector(
    (state) => state.employeeApplicationReducer.applications
  );
  console.log("employeeApplicationList", employeeApplicationList);
  useEffect(() => {
    dispatch(GetEmployeeList());
    dispatch(GetVesselList());
    dispatch(GetEmployeeApplicationList());
    dispatch(getGetApplicationMainListAction(currentPage));
  }, [dispatch, currentPage]);

  const employeeDelete = async (intID) => {
    // let deleteData = await DeleteVessel(intID);
    dispatch(DeleteEmployee(intID));
    dispatch(GetEmployeeList());
  };
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
    dispatch(getGetApplicationMainListAction(data.page));
  };
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Employee Application List</h3>
            </div>
            <PermissionWiseDisplay
              permission_name={"crew_create"}
              display={false}
            >
              <div className="card-toolbar">
                <a
                  onClick={() => {
                    history.push("/employee/employee-application/add");
                  }}
                >
                  <button type="button" className="btn btn-primary">
                    New Application{" "}
                  </button>
                </a>
              </div>
            </PermissionWiseDisplay>
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
          {!isLoadingStatus && (
            <div className="card-body">
              <form className="form form-label-right"></form>
              <div className="react-bootstrap-table table-responsive">
                <table className="table table table-head-custom table-vertical-center">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Application Type</th>
                      <th>Receiver</th>
                      <th>Employee</th>
                      <th>Rank</th>
                      <th>Vessel</th>
                      <th>Port</th>
                      <th>From Date</th>
                      <th>Rejoining Date</th>
                      <th style={{ width: 150 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications &&
                      applications.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.strTypeName}</td>
                          <td>{item.strReceiverName}</td>
                          <td>{item.strEmployeeName}</td>
                          <td>{item.strRankName}</td>
                          <td>{item.strVesselName}</td>
                          <td>
                            {item.strPortName != null ? item.strPortName : ""}
                          </td>
                          <td>
                            {item.dteFromDate != null
                              ? generateStringDateFromDate(item.dteFromDate)
                              : ""}
                          </td>
                          <td>
                            {item.dteRejoiningDate != null
                              ? generateStringDateFromDate(
                                  item.dteRejoiningDate
                                )
                              : ""}
                          </td>

                          <td>
                            <a
                              className="btn btn-icon btn-light btn-hover-primary btn-sm"
                              title="Edit Application"
                              onClick={() => {
                                history.push(
                                  "/employee/employee-application/edit",
                                  { applicationData: item }
                                );
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </a>
                            &nbsp;
                            <a
                              className="btn btn-icon btn-light btn-hover-info btn-sm"
                              title="Application Details"
                              onClick={() => {
                                history.push(
                                  "/employee/employee-application/show",
                                  { applicationData: item }
                                );
                              }}
                            >
                              <i className="fa fa-eye"></i>
                            </a>
                            &nbsp;
                            {/* <a
                              className="btn btn-icon btn-light btn-hover-info btn-sm"
                              onClick={() => openPromotionModal(item)}
                              title="Promotion Entry"
                            >
                              <i className="fas fa-funnel-dollar"></i>
                            </a>
                            &nbsp; */}
                            <a
                              className="btn btn-icon btn-light btn-hover-danger btn-sm"
                              title="Delete Application"
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
                            </a>
                            &nbsp;
                            <a
                              className="btn btn-icon btn-light btn-hover-success btn-sm"
                              title="Approve Application"
                              onClick={() => {
                                history.push(
                                  "/employee/employee-application/edit",
                                  { applicationData: item }
                                );
                              }}
                            >
                              <i className="fa fa-check"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>{" "}
                {employeeApplicationList == "" && (
                  <h3 className="text-danger text-center">No Data Found</h3>
                )}
              </div>
            </div>
          )}
          {isLoadingStatus && (
            <div className="text-center">
              <span className="spinner spinner-white"></span>
            </div>
          )}
        </div>

        <PaginationLaravel
          changePage={changePage}
          data={applicationPaginatedData}
        />
      </div>

      <PromotionalModal
        isShow={promotionalModal}
        employee={selectedEmployeeInformation}
        handleClose={() => setPromotionalModal(false)}
      />
    </>
  );
});

export default EmployeeApplicationList;
