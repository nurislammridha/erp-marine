import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { getSupplierDetails } from '../_redux/actions/SuppliersListAction';

const SupplierDetails = ({ handleClose, supplierID }) => {
    const supplierDetails = useSelector((state) => state.supplierList.supplierDetails);
    // console.log('supplierDetails :>> ', supplierDetails);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSupplierDetails(supplierID))
    }, [])
    return (
        <>
            {
                supplierDetails && (
                    <Row>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <h5>Supplier Name</h5>
                            <p>{supplierDetails.strSupplierName}</p>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <h5>Supplier Email</h5>
                            <p>{supplierDetails.strEmail}</p>                </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <h5>Contact Number</h5>
                            <p>{supplierDetails.strContactNumber}</p>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <h5>Supplier Type Name</h5>
                            <p>{supplierDetails.strSupplierTypeName}</p>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <h5>PIC Name</h5>
                            <p>{supplierDetails.strPICName}</p>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <h5>PIC Email</h5>
                            <p>{supplierDetails.strPICEmail}</p>
                        </Col>
                    </Row>
                )
            }
            <Button variant="secondary" className="float-right" onClick={handleClose}>Close</Button>
        </>
    );
}

export default SupplierDetails;