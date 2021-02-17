import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"
import { getPRDetailsData } from "../_redux/actions/PurhasesRequestAction";
const PurchaseRequestDetails = ({ PRDetailsID, handleClose }) => {
    const dispatch = useDispatch()
    const PRDetails = useSelector((state) => state.purchaseRequest.PRDetails);

    useEffect(() => {
        dispatch(getPRDetailsData(PRDetailsID))
    }, [])
    return (
        <>
            {
                PRDetails && (
                    <>
                        <Row className="mt-3">
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>SBU</p>
                                <h5>{PRDetails.strSBUName !== null && PRDetails.strSBUName !== "" ? PRDetails.strSBUName : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Branch</p>
                                <h5>{PRDetails.strBusinessUnitName !== null && PRDetails.strBusinessUnitName !== "" ? PRDetails.strBusinessUnitName : "---"}</h5>                </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Ship Name</p>
                                <h5>{PRDetails.strShipName !== null && PRDetails.strShipName !== "" ? PRDetails.strShipName : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Department</p>
                                <h5>{PRDetails.strDepartmentName !== null && PRDetails.strDepartmentName !== "" ? PRDetails.strDepartmentName : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Due Date</p>
                                <h5>{PRDetails.dteDueDate !== null && PRDetails.dteDueDate !== "" ? moment(PRDetails.dteDueDate).format("DD-MM-YYYY") : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Purchase Request Date</p>
                                <h5>{PRDetails.dtePurchaseRequestDate !== null && PRDetails.dtePurchaseRequestDate !== "" ? moment(PRDetails.dtePurchaseRequestDate).format("DD-MM-YYYY") : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Category</p>
                                <h5>{PRDetails.strCategoryName !== null && PRDetails.strCategoryName !== "" ? PRDetails.strCategoryName : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Reference</p>
                                <h5>{PRDetails.strPurchaseReferanceNo !== null && PRDetails.strPurchaseReferanceNo !== "" ? PRDetails.strPurchaseReferanceNo : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Remarks</p>
                                <h5>{PRDetails.strRemarks !== null && PRDetails.strRemarks !== "" ? PRDetails.strRemarks : "---"}</h5>
                            </Col>
                        </Row>
                        <div className="react-bootstrap-table table-responsive">
                            <table className="table table table-head-custom table-vertical-center table-hover">
                                <thead>
                                    <tr>
                                        {/* <td>
                                            <Form.Check
                                                className=""
                                                type="checkbox"
                                                name="isRevLoadingPorts"
                                            // onChange={(e) => handleChangeTextInput('isRevLoadingPorts', e.target.checked)}
                                            />
                                        </td> */}
                                        <th scope="col">ITEM NO</th>
                                        <th scope="col">ITEM NAME</th>
                                        <th scope="col">REQUEST QUANTITY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        PRDetails && PRDetails.purchase_row.length > 0 && PRDetails.purchase_row.map((item, index) => (
                                            <tr>
                                                {/* <td>
                                                    <Form.Check
                                                        className=""
                                                        type="checkbox"
                                                        name="isRevLoadingPorts"
                                                    // onChange={(e) => handleChangeTextInput('isRevLoadingPorts', e.target.checked)}
                                                    />
                                                </td> */}
                                                <td>{item.intitemid !== null && item.intitemid !== '' ? item.intitemid : ''}</td>
                                                <td>{item.strItemName !== null && item.strItemName !== '' ? item.strItemName : ''}</td>
                                                <td>{item.numPurchaseRequestQty !== null && item.numPurchaseRequestQty !== '' ? parseInt(item.numPurchaseRequestQty) : ''}</td>
                                                {/* <td>
                                                    <button className={item.strStatus === "Rejected" ? "btn rejected-status booking-list-btn text-danger" : (item.strStatus === "Pending" ? "btn pending-status booking-list-btn text-warning" : (item.strStatus === "Approve" ? "btn approve-status booking-list-btn text-success" : ''))}>
                                                        {item.strStatus !== null && item.strStatus !== '' ? item.strStatus : ''}
                                                    </button>
                                                </td> */}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            }
            <Button variant="secondary" className="float-right" onClick={handleClose}>Close</Button>
        </>
    );
};

export default PurchaseRequestDetails;