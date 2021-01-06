import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  GetVesselList,
  DeleteVessel,
  VesselEmptyDeleteMessage,
} from "../../../../../domains/Vessel/_redux/actions/VesselAction";

const CertificateMainList = withRouter(({ history, props }) => {
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
              <h3 class="card-label">Certificate Main List</h3>
            </div>
            <div className="card-toolbar">
              <a
                onClick={() => {
                  history.push("/certificates-main/create");
                }}
              >
                <button type="button" class="btn btn-primary">
                  Create Certificate
                </button>
              </a>
            </div>
          </div>
          <div className="card-body">
            <form className="form form-label-right">
            </form>
            <div className="react-bootstrap-table table-responsive">
              <table className="table table table-head-custom table-vertical-center">
                <thead>
                  <tr>
                    <td>SL</td>
                    <td>NAME OF THE CERTIFICATES</td>
                    <td>CERTIFICATE TYPE</td>
                    <td>VESSEL NAME</td>
                    <td>ISSUE DATE</td>
                    <td>EXPIRY DATE</td>
                    <td>ATTACHMENTS</td>
                    <td>REMARKS</td>
                    <td>ACTION</td>
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

export default CertificateMainList;
