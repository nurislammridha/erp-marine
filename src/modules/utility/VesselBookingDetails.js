import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getVesselBookingDetails } from "../voyage/booking/_redux/actions/VesselBookInfoAction";

const VesselBookingDetails = ({ handleClose, vesselBookingID }) => {
    console.log('vesselBookingID :>> ', vesselBookingID);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVesselBookingDetails(vesselBookingID))
    }, [])
    return (
        <>
            <Row>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Broker Name</p>
                    <h4>Test</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Charter Name</p>
                    <h4>Test</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Ship Name</p>
                    <h4>Test</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Voyage Type</p>
                    <h4>Test</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Load Port / Commence Port</p>
                    <h4>Test</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Commence Date</p>
                    <h4>21-01-2021</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Discharging / Completion Port</p>
                    <h4>21-01-2021</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Completion Date</p>
                    <h4>21-01-2021</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>CP Date</p>
                    <h4>21-01-2021</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Freight / Hire Rate</p>
                    <h4>5200</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>On Hire Date</p>
                    <h4>21-01-2021</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Redelivery Date</p>
                    <h4>21-01-2021</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Cargo</p>
                    <h4>5200</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Cargo Qty</p>
                    <h4>5200</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Vessel DWT</p>
                    <h4>5200</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Add Commision</p>
                    <h4>26</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Brokerage Commision</p>
                    <h4>26</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Load Rate</p>
                    <h4>5200</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Laycan Start</p>
                    <h4>21-01-2021</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Laycan End</p>
                    <h4>21-01-2021</h4>
                </Col>
                <Col lg={3} md={4} sm={3} xs={6} className="mb-5">
                    <p>Discharge Rate</p>
                    <h4>21</h4>
                </Col>
            </Row>
            <Button variant="secondary" className="float-right" onClick={handleClose}>Close</Button>
        </>
    );
};

export default VesselBookingDetails;
