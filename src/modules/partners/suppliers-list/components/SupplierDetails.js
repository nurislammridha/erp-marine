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
                            <p>Supplier Name</p>
                            <h5>{supplierDetails.strSupplierName}</h5>
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={6} className="mb-5">
                            <p>Supplier Email</p>
                            <h5>{supplierDetails.strEmail}</h5>                </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <p>Contact Number</p>
                            <h5>{supplierDetails.strContactNumber}</h5>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <p>Supplier Type Name</p>
                            <h5>{supplierDetails.strSupplierTypeName}</h5>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <p>PIC Name</p>
                            <h5>{supplierDetails.strPICName}</h5>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                            <p>PIC Email</p>
                            <h5>{supplierDetails.strPICEmail}</h5>
                        </Col>
                    </Row>
                )
            }
            <Button variant="secondary" className="float-right" onClick={handleClose}>Close</Button>
        </>
    );
}

export default SupplierDetails;