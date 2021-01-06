import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  GetVesselItemList,
  DeleteVesselItem,
  VesselEmptyDeleteMessage,
} from "../../_redux/actions/VesselItemAction";

const VesselItemList = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = React.useState({
    vesselList: [],
  });

  const vesselItemList = useSelector((state) => state.vesselItemInfo.vesselItemList);
  const deleteMessage = useSelector((state) => state.vesselItemInfo.deleteMessage);
  const deleteStatus = useSelector((state) => state.vesselItemInfo.deleteStatus);
  console.log('vesselItemList',vesselItemList);

  useEffect(() => {
    dispatch(GetVesselItemList());
  }, []);

  useEffect(() => {
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
    dispatch(DeleteVesselItem(intID));
    dispatch(GetVesselItemList());
  };

  return (
    <>
      <div className="container">
        <div className="card card-custom gutter-b">
          <div className="card-header">
            <div className="card-title">
              <h3 class="card-label">Vessel Item list</h3>
            </div>
            <div className="card-toolbar">
              <a
                onClick={() => {
                  history.push("/vessel-items/add");
                }}
              >
                <button type="button" class="btn btn-primary">
                  New Item
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
                    <td>Item Name</td>
                    <td>Item Type Name</td>
                    <td>Default Sales Price</td>
                    <td>Default Purchase Price</td>
                    <td>Available Quantity</td>
                  </tr>
                </thead>
                <tbody>
                  {vesselItemList &&
                    vesselItemList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.strVesselItemName}</td>
                        <td>{item.strItemTypeName}</td>
                        <td>{item.decDefaultSalePrice}</td>
                        <td>{item.decDefaultPurchasePrice}</td>
                        <td>{item.decQtyAvailable}</td>
                        <td>
                          {/* <a
                            className="btn btn-icon btn-light btn-hover-info btn-sm"
                            onClick={() => {
                              history.push("/vessels/edit", { vessel: item });
                            }}
                          >
                            <i className="fa fa-edit"></i>
                          </a>
                          &nbsp;&nbsp;&nbsp; */}
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
                  {vesselItemList == null && (
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

export default VesselItemList;
