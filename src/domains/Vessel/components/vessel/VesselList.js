import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  GetVesselList,
  DeleteVessel,
  VesselEmptyDeleteMessage,
} from "../../_redux/actions/VesselAction";

const VesselList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = React.useState({
    vesselList: [],
  });

  const vesselList = useSelector((state) => state.vesselInfo.vesselList);
  const deleteMessage = useSelector((state) => state.vesselInfo.deleteMessage);
  const deleteStatus = useSelector((state) => state.vesselInfo.deleteStatus);

  useEffect(() => {
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
              <h3 class="card-label">Vessel list</h3>
            </div>
            <div className="card-toolbar">
              <a
                onClick={() => {
                  history.push("/vessels/add");
                }}
              >
                <button type="button" class="btn btn-primary">
                  New Vessel
                </button>
              </a>
            </div>
          </div>
          <div className="card-body">
            <form className="form form-label-right">
              {/* <div className="form-group row">
                <div className="col-lg-2">
                  <input className="form-control" placeholder="Search" />
                </div>
                <div>
                  <label className="form-label">Status</label>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-control"
                    name="status"
                    placeholder="Filter by Status"
                  >
                    <option>All</option>
                    <option value="0">Selling</option>
                    <option value="1">Sold</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Type</label>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-control"
                    name="status"
                    placeholder="Filter by Status"
                  >
                    <option>All</option>
                    <option value="0">Selling</option>
                    <option value="1">Sold</option>
                  </select>
                </div>

                <div className="col-lg-2">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#E1F0FF", color: "#3699FF" }}
                  >
                    Search
                  </button>
                </div>
              </div> */}
            </form>
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center">
                <thead>
                  <tr>
                    <td>SL</td>
                    <td>Vessel Name</td>
                    <td>IMO</td>
                    <td>Type</td>
                    <td>Build Er</td>
                    <td>DWT</td>
                    <td>Yard Country</td>
                    <td>Total Employee</td>
                    <td>Own Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {vesselList &&
                    vesselList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.strVesselName}</td>
                        <td>{item.strIMONumber}</td>
                        <td>{item.strVesselTypeName}</td>
                        <td>{item.strBuildYear}</td>
                        <td>{item.numDeadWeight}</td>
                        <td>{item.strYardCountryName}</td>
                        <td>{item.intTotalCrew}</td>
                        <td>
                          {item.ysnOwn == "1" ? (
                            <button
                              type="button"
                              className="badge badge-primary border-0"
                            >
                              Own Vessel
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="badge badge-danger border-0"
                            >
                              Other's Vessel
                            </button>
                          )}
                        </td>
                        <td>
                          <a
                            className="btn btn-icon btn-light btn-hover-info btn-sm"
                            onClick={() => {
                              history.push("/vessels/edit", { vessel: item });
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
                                  "Are you sure you wish to delete this item?"
                                )
                              )
                                vesselDelete(item.intID);
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  {vesselList == null && (
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

export default VesselList;
