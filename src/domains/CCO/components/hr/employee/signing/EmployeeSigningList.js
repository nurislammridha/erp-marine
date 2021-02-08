import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  GetEmployeeSigningList,
  GetEmployeeInfoBySearchAction,
  DeleteEmployeeSigning,
  EmptyEmployeeSigningDeleteMessage,
  getemployeeSigingSearch,
} from "../../../../_redux/actions/EmployeeSigningAction";
import { generateStringDateFromDate } from "../../../../utils/DateHelper";
import { GetVesselList } from "../../../../../Vessel/_redux/actions/VesselAction";

const EmployeeSigningList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = React.useState({
    employeeSigningInfoList: [],
    vesselId: '',
    employee: "",
  });

  const employeeSigningInfoList = useSelector(
    (state) => state.employeeSigningInfo.employeeSigningInfoList
  );
  const deleteMessage = useSelector(
    (state) => state.employeeSigningInfo.deleteMessage
  );
  const deleteStatus = useSelector(
    (state) => state.employeeSigningInfo.deleteStatus
  );
  const vesselList = useSelector((state) => state.vesselInfo.vesselList);

  const selectHandle = (event) => {
    const employeeInfoData = { ...employeeInfo };
    employeeInfoData.vesselId = event.target.value;
    setEmployeeInfo(employeeInfoData);
    // serchEmployee();
  };

  useEffect(() => {
    dispatch(GetEmployeeSigningList());
    dispatch(GetVesselList());

    if (typeof deleteMessage === null || typeof deleteMessage === "undefined") {
      toast.error("Something Went Wrong", {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (deleteStatus && deleteMessage.length > 0) {
        toast.success(deleteMessage, {
          autoClose: 2000,
          className: "primaryColor",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(EmptyEmployeeSigningDeleteMessage());
      }

      if (!deleteStatus && deleteMessage.length > 0) {
        toast.error(deleteMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(EmptyEmployeeSigningDeleteMessage());
      }
    }
  }, [deleteMessage, deleteStatus, dispatch, props]);

  const deleteData = (intID) => {
    dispatch(DeleteEmployeeSigning(intID));
    dispatch(GetEmployeeSigningList());
  };


  const serchEmployee = () => {
    dispatch(getemployeeSigingSearch(employeeInfo.vesselId));
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Employee Signing List</h3>
            </div>
            <div className="card-toolbar">
              <a
                onClick={() => {
                  history.push("/employee/employee-signing-add");
                }}
              >
                <button type="button" class="btn btn-primary">
                  Sign Employee{" "}
                </button>
              </a>
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-lg-3">
                <div>
                  <label className="form-label">Vessel</label>
                </div>
                <select
                  className="form-control employee-list-input"
                  name="vesselId"
                  placeholder="Search Any Information"
                  onChange={selectHandle}
                  value={employeeInfo.vesselId}
                >
                  <option value={0}>All</option>
                  {vesselList &&
                    vesselList.map((item) => (
                      <option value={item.intID} key={item.intID}>{item.strVesselName}</option>
                    ))}
                </select>
              </div>
              <div className="col-lg-3 mt-2">
                <div>
                  <label className="form-label"></label>
                </div>
                <button
                  className="btn btn-sm"
                  onClick={serchEmployee}
                  style={{ backgroundColor: "#E1F0FF", color: "#3699FF" }}
                >
                  Search
              </button>
              </div>
            </div>

            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center">
                <thead>
                  <tr>
                    <td>SL</td>
                    <td>Name</td>
                    <td>Vessel Name</td>
                    <td>Action Date</td>
                    <td>Status</td>
                    {/* <td>Action</td> */}
                  </tr>
                </thead>
                <tbody>
                  {employeeSigningInfoList &&
                    employeeSigningInfoList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.strName}</td>
                        <td>{item.strVesselName}</td>
                        <td>
                          {generateStringDateFromDate(item.dteActionDate)}
                        </td>
                        <td>
                          {item.ysnSignIn == "0" ? (
                            <button
                              type="button"
                              className="badge badge-danger border-0"
                            >
                              Signed Out
                            </button>
                          ) : (
                              <button
                                type="button"
                                className="badge badge-primary border-0"
                              >
                                Signed In
                            </button>
                            )}
                        </td>
                        <td>
                          <a
                            className="btn btn-icon btn-light btn-hover-info btn-sm"
                            onClick={() => {
                              history.push(
                                "/employee/employee-signing-edit/" + item.intID,
                                { item }
                              );
                            }}
                          >
                            <i className="fa fa-edit"></i>
                          </a>
                          &nbsp;&nbsp;&nbsp;
                          <a
                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete sign in/out data"
                                )
                              )
                                deleteData(item.intID);
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  {" "}
                  {employeeSigningInfoList == null && (
                    <p className="text-danger text-center">No Data Found</p>
                  )}
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default EmployeeSigningList;
