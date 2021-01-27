import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getVesselBookingDetails } from "../voyage/booking/_redux/actions/VesselBookInfoAction";
import moment from "moment"
const VesselBookingDetails = ({ handleClose, vesselBookingID }) => {
    const VesselBookingDetails = useSelector((state) => state.VesselBookingReducer.VesselBookingDetails);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVesselBookingDetails(vesselBookingID))
    }, [])
    return (
        <>
            <Row>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Broker Name</p>
                    <h5>{VesselBookingDetails.strBrokerName !== null && VesselBookingDetails.strBrokerName !== "" ? VesselBookingDetails.strBrokerName : "---"}</h5>
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Charter Name</p>
                    <h5>{VesselBookingDetails.strCharterName !== null && VesselBookingDetails.strCharterName !== "" ? VesselBookingDetails.strCharterName : "---"}</h5>                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Ship Name</p>
                    <h5>{VesselBookingDetails.strShipName !== null && VesselBookingDetails.strShipName !== "" ? VesselBookingDetails.strShipName : "---"}</h5>    
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Voyage Type</p>
                    <h5>{VesselBookingDetails.strVoyageNo !== null && VesselBookingDetails.strVoyageNo !== "" ? VesselBookingDetails.strVoyageNo : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Load Port / Commence Port</p>
                    <h5>{VesselBookingDetails.strCommencePortName !== null && VesselBookingDetails.strCommencePortName !== "" ? VesselBookingDetails.strCommencePortName : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Commence Date</p>
                    <h5>{VesselBookingDetails.dteCommenceDate !== null && VesselBookingDetails.dteCommenceDate !== "" ? moment(VesselBookingDetails.dteCommenceDate).format("DD-MM-YYYY") : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Discharging / Completion Port</p>
                   <h5>{VesselBookingDetails.strCompletionPortName !== null && VesselBookingDetails.strCompletionPortName !== "" ? VesselBookingDetails.strCompletionPortName : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Completion Date</p>
                    <h5>{VesselBookingDetails.dteCompletionDate !== null && VesselBookingDetails.dteCompletionDate !== "" ? moment(VesselBookingDetails.dteCompletionDate).format("DD-MM-YYYY") : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>CP Date</p>
                    <h5>{VesselBookingDetails.dteCPDate !== null && VesselBookingDetails.dteCPDate !== "" ? moment(VesselBookingDetails.dteCPDate).format("DD-MM-YYYY") : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Freight / Hire Rate</p>
                   <h5>{VesselBookingDetails.numFreightOrHireRate !== null && VesselBookingDetails.numFreightOrHireRate !== "" ? VesselBookingDetails.numFreightOrHireRate : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>On Hire Date</p>
                    <h5>{VesselBookingDetails.dteOnHireDate !== null && VesselBookingDetails.dteOnHireDate !== "" ? moment(VesselBookingDetails.dteOnHireDate).format("DD-MM-YYYY") : "---"}</h5>  
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Redelivery Date</p>
                    <h5>{VesselBookingDetails.dteRedeliveryDate !== null && VesselBookingDetails.dteRedeliveryDate !== "" ? moment(VesselBookingDetails.dteRedeliveryDate).format("DD-MM-YYYY") : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Cargo</p>
                   <h5>{VesselBookingDetails.strCargoName !== null && VesselBookingDetails.strCargoName !== "" ? VesselBookingDetails.strCargoName : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Cargo Qty</p>
                   <h5>{VesselBookingDetails.intTotalCargoQty !== null && VesselBookingDetails.intTotalCargoQty !== "" ? VesselBookingDetails.intTotalCargoQty : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Vessel DWT</p>
                   <h5>{VesselBookingDetails.numVesselDWT !== null && VesselBookingDetails.numVesselDWT !== "" ? VesselBookingDetails.numVesselDWT : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Add Commision</p>
                  <h5>{VesselBookingDetails.numAddCommission !== null && VesselBookingDetails.numAddCommission !== "" ? VesselBookingDetails.numAddCommission : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Brokerage Commision</p>
                  <h5>{VesselBookingDetails.numBrockCommission !== null && VesselBookingDetails.numBrockCommission !== "" ? VesselBookingDetails.numBrockCommission : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Load Rate</p>
                   <h5>{VesselBookingDetails.numLoadRate !== null && VesselBookingDetails.numLoadRate !== "" ? VesselBookingDetails.numLoadRate : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Laycan Start</p>
                    <h5>{VesselBookingDetails.dteLaycanStart !== null && VesselBookingDetails.dteLaycanStart !== "" ? moment(VesselBookingDetails.dteLaycanStart).format("DD-MM-YYYY") : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Laycan End</p>
                    <h5>{VesselBookingDetails.dteLaycanEnd !== null && VesselBookingDetails.dteLaycanEnd !== "" ? moment(VesselBookingDetails.dteLaycanEnd).format("DD-MM-YYYY") : "---"}</h5> 
                </Col>
                <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                    <p>Discharge Rate</p>
                    <h5>{VesselBookingDetails.numDischargeRate !== null && VesselBookingDetails.numDischargeRate !== "" ? VesselBookingDetails.numDischargeRate : "---"}</h5>                 </Col>
            </Row>
            <Button variant="secondary" className="float-right" onClick={handleClose}>Close</Button>
        </>
    );
};

export default VesselBookingDetails;
