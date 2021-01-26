import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  GetEmployeeList,
  getemployeeSearch,
} from "../../../_redux/actions/EmployeeAction";
import {
  DeleteEmployee,
  EmptyEmployeeDeleteMessage,
} from "../../../_redux/actions/EmployeeAction";
import { Form } from "react-bootstrap";

import { GetVesselList } from "../../../../Vessel/_redux/actions/VesselAction";
import { useForm } from "react-hook-form";
import "./css/custom.css";
import PromotionalModal from "./promotional/PromotionalModal";
import { getEmployeeId } from "../../../../../app/modules/Auth/_redux/authCrud";
import PermissionWiseDisplay from '../../../../../modules/master/components/permissions/PermissionWiseDisplay'

const EmployeeList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [promotionalModal, setPromotionalModal] = useState(false);
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
  const deleteMessage = useSelector(
    (state) => state.employeeInfo.deleteMessage
  );
  const deleteStatus = useSelector((state) => state.employeeInfo.deleteStatus);
  const vesselList = useSelector((state) => state.vesselInfo.vesselList);

  // useEffect(() => {
  //     dispatch(GetEmployeeList());
  // }, [dispatch, props]);

  useEffect(() => {
    dispatch(GetEmployeeList());
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
        dispatch(EmptyEmployeeDeleteMessage());
        history.push("/employee/employee-list");
      }

      if (!deleteStatus && deleteMessage.length > 0) {
        toast.error(deleteMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(EmptyEmployeeDeleteMessage());
      }
    }
  }, [deleteMessage, deleteStatus, dispatch, props]);

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
    setEmployeeInfo(employeeInfoData);
  };

  const serchEmployee = () => {
    dispatch(getemployeeSearch(employeeInfo.employee, employeeInfo.vesselId));
  };

  const openPromotionModal = (employee) => {
    setSelectedEmployeeInformation(employee);
    setPromotionalModal(true);
  };
  console.log("employeeInfoList", employeeInfo.employeeInfoList);
  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 className="card-label">Employee List</h3>
            </div>
            <PermissionWiseDisplay permission_name={'crew_create'} display={false}>
            <div className="card-toolbar">
              <a
                onClick={() => {
                  history.push("/employee/employee-add");
                }}
              >
                <button type="button" className="btn btn-primary">
                  New Employee{" "}
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

          <div className="card-body">
            <form className="form form-label-right"></form>
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>CDC No</th>
                    <th>Birthdate</th>
                    <th>Home Telephone</th>
                    <th>Rank</th>
                    <th>Availability Date</th>
                    <th>Email</th>
                    <th style={{ width: 150 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeInfoList &&
                    employeeInfoList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.strName}</td>
                        <td>{item.strCDCNo}</td>
                        <td>{item.strBirthdate}</td>
                        <td>{item.strHomeTelephone}</td>
                        <td>{item.strRank}</td>
                        <td>{item.strAvailabilityDate}</td>
                        <td>{item.strEmail}</td>
                        <td>
                          <a
                            className="btn btn-icon btn-light btn-hover-primary btn-sm"
                            onClick={() => {
                              history.push(
                                "/employee/employee-edit/" + item.intID
                              );
                            }}
                          >
                            <i className="fa fa-edit"></i>
                          </a>
                          &nbsp;
                          <a
                            className="btn btn-icon btn-light btn-hover-info btn-sm"
                            onClick={() => {
                              history.push(
                                "/employee/employee-details/" + item.intID
                              );
                            }}
                          >
                            <i className="fa fa-eye"></i>
                          </a>
                          &nbsp;
                          <a
                            className="btn btn-icon btn-light btn-hover-info btn-sm"
                            onClick={() => openPromotionModal(item)}
                            title="Promotion Entry"
                          >
                            <i className="fas fa-funnel-dollar"></i>
                          </a>
                          &nbsp;
                          <a
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
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  {" "}
                  {employeeInfoList == null && (
                    <p className="text-danger text-center">No Data Found</p>
                  )}
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      <PromotionalModal
        isShow={promotionalModal}
        employee={selectedEmployeeInformation}
        handleClose={() => setPromotionalModal(false)}
      />
    </>
  );
});

export default EmployeeList;
