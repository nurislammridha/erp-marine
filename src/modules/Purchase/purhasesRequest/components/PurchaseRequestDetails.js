import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
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
                    <Row>
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
                )
            }
            <Button variant="secondary" className="float-right" onClick={handleClose}>Close</Button>
        </>
    );
};

export default PurchaseRequestDetails;