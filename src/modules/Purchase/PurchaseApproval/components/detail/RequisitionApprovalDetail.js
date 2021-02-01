import React from 'react';
import { Form, Button } from "react-bootstrap";

const RequisitionApprovalDetail = () => {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-md-3">
                        Requisition No
                    <h5>value</h5>
                    </div>
                    <div className="col-md-3">
                        Requisition Date
                    <h5>value</h5>
                    </div>
                    <div className="col-md-3">
                        Due Date
                    <h5>value</h5>
                    </div>
                    <div className="col-md-3">
                        Department
                    <h5>value</h5>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-3">
                        Reference
                    <h5>value</h5>
                    </div>
                    <div className="col-md-3">
                        Requisition Category
                    <h5>value</h5>
                    </div>
                    <div className="col-md-3">
                        Approved By
                    <h5>value</h5>
                    </div>
                    <div className="col-md-3">
                        Approved Date
                    <h5>value</h5>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="react-bootstrap-table table-responsive">
                    <table className="table table table-head-custom table-vertical-center  voyageTable">
                        <thead>
                            <tr>
                                <th scope="col">ITEM ID</th>
                                <th scope="col">ITEM NAME</th>
                                <th scope="col">ITEM CATEGORY</th>
                                <th scope="col">ITEM SUB CATEGORY</th>
                                <th scope="col">UOM</th>
                                <th scope="col">STOCK QTY</th>
                                <th scope="col">REQ QTY</th>
                                <th scope="col">APPROVED QTY</th>
                                <th scope="col">REMARKS</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr>
                                {/* <td onClick={(id) => getVesselBookingID(item)}>{vesselPaginateData.from + index}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strCargoName !== null && item.strCargoName !== '' ? item.strCargoName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strShipName !== null && item.strShipName !== '' ? item.strShipName : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>{item.strVoyageNo !== null && item.strVoyageNo !== '' ? item.strVoyageNo : ''}</td>
                        <td onClick={(id) => getVesselBookingID(item)}>
                          <button className={item.strBookingStatus === "Rejected" ? "btn rejected-status booking-list-btn text-danger" : (item.strBookingStatus === "Pending" ? "btn pending-status booking-list-btn text-warning" : "btn approve-status booking-list-btn text-success")}>
                            {item.strBookingStatus !== null && item.strBookingStatus !== '' ? item.strBookingStatus : ''}
                          </button>
                        </td> */}
                                <td>VALUE</td>
                                <td>VALUE</td>
                                <td>VALUE</td>
                                <td>VALUE</td>
                                <td>VALUE</td>
                                <td>VALUE</td>
                                <td>VALUE</td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        name="approvedQty"
                                        className="fromStyle formHeight"
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name="remarks"
                                        className="fromStyle formHeight"
                                    />
                                </td>
                                <td>
                                    <div className="d-flex">
                                        <a href>
                                            <i className="fas fa-trash-alt editIcon item-list-icon ml-4"
                                            // onClick={(id) => deleteList(item.intSupplierId)}
                                            >
                                            </i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-sm-12">
                    <div className="float-right">
                        <button
                            className="btn btn-danger btn-sm"
                        >
                            Reject
                        </button>
                        <button
                            className="btn btn-primary btn-sm ml-3 mr-5"
                        >
                            Approve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequisitionApprovalDetail;
