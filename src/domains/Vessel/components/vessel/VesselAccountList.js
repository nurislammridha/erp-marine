import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import {
  GetVesselList,
  DeleteVessel,
  VesselEmptyDeleteMessage,
} from "../../_redux/actions/VesselAction";
import { GetVesselAccountDetails } from "../../../CCO/_redux/actions/AdditionDeductionAction";
import { GetVesselAccountList } from "../../_redux/actions/VesselAccountAction";

const VesselAccountList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = React.useState({
    vesselList: [],
  });

  const vesselAccountDetails = useSelector((state) => state.additionDeductionInfo.vesselAccountDetails);
  const vesselAccountList = useSelector((state) => state.vesselAccountInfo.vesselAccountList);
  const deleteMessage = useSelector((state) => state.vesselInfo.deleteMessage);
  const deleteStatus = useSelector((state) => state.vesselInfo.deleteStatus);
  const vesselList = useSelector((state) => state.vesselInfo.vesselList);
  console.log('vesselAccountDetails',vesselAccountDetails);

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
    dispatch(GetVesselAccountList(event.target.value));
    employeeInfoData.vesselId = event.target.value;
    setEmployeeInfo(employeeInfoData);
  };

  useEffect(() => {
    dispatch(GetVesselAccountDetails());
    dispatch(GetVesselAccountList());
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
        dispatch(VesselEmptyDeleteMessage());
        history.push("/vessels/list");
      }

      if (!deleteStatus && deleteMessage.length > 0) {
        toast.error(deleteMessage, {
          autoClose: 2000,
          className: "dangerColor",
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(VesselEmptyDeleteMessage());
      }
    }
  }, [deleteMessage, deleteStatus, dispatch, props]);

  const vesselDelete = async (intID) => {
    // let deleteData = await DeleteVessel(intID);
    dispatch(DeleteVessel(intID));
    dispatch(GetVesselList());
  };
  

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Vessel Transaction History</h3>
            </div>
            <div className="card-toolbar">
              {/* <a
                onClick={() => {
                  history.push("/vessels/add");
                }}
              >
                <button type="button" class="btn btn-primary">
                  New Vessel
                </button>
              </a> */}
            </div>
          </div>
          <div className="card-body">
            <form className="form form-label-right">
              <div className="form-group row">
                {/* <div className="col-lg-2">
                  <input className="form-control" placeholder="Search" />
                </div>
                <div>
                  <label className="form-label">Status</label>
                </div> */}
                {/* <div className="col-lg-2">
                  <select
                    className="form-control"
                    name="status"
                    placeholder="Filter by Status"
                  >
                    <option>All</option>
                    <option value="0">Selling</option>
                    <option value="1">Sold</option>
                  </select>
                </div> */}

                {/* <div>
                  <label className="form-label">Type</label>
                </div> */}
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
                {vesselList &&
                  vesselList.map((item) => (
                    <option value={item.intID} key={item.intID}>
                      {item.strVesselName}
                    </option>
                  ))}
                  <option value={0}>All</option>
              </select>
            </div>

                {/* <div className="col-lg-2">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#E1F0FF", color: "#3699FF" }}
                  >
                    Search
                  </button>
                </div> */}
              </div>
            </form>
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center">
                <thead>
                  <tr>
                    <td>SL</td>
                    <td>Date</td>
                    <td>Type</td>
                    <td>Quantity</td>
                    <td>Amount</td>
                  </tr>
                </thead>
                <tbody>
                  {vesselAccountList &&
                    vesselAccountList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.created_at}</td>
                        <td>{item.strAdditionDeductionTypeName}</td>
                        <td>{item.decQty==null?'1':item.decQty}</td>
                        <td>{parseFloat(item.amount).toFixed(2)} $</td>
                      </tr>
                    ))}
                  {vesselAccountList == null && (
                    <p className="text-danger text-center">No Data Found</p>
                  )}
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default VesselAccountList;
