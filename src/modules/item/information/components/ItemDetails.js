import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getItemDetails } from "../_redux/actions/ItemActionEdit";
const ItemDetails = ({ handleClose, itemID }) => {
    const ItemDetails = useSelector((state) => state.itemList.ItemDetails);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItemDetails(itemID))
    }, [])
    return (
        <>
            {
                ItemDetails && (
                    <div className="mt-5">
                        <Row>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Item Name</p>
                                <h5>{ItemDetails.strItemName !== null && ItemDetails.strItemName !== "" && ItemDetails.strItemName !== 'undefined' ? ItemDetails.strItemName : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>UOM</p>
                                <h5>{ItemDetails.strUoM !== null && ItemDetails.strUoM !== "" ? ItemDetails.strUoM : "---"}</h5>                </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Part No</p>
                                <h5>{ItemDetails.strPartNo !== null && ItemDetails.strPartNo !== "" ? ItemDetails.strPartNo : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Model</p>
                                <h5>{ItemDetails.strModelNo !== null && ItemDetails.strModelNo !== "" ? ItemDetails.strModelNo : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Department</p>
                                <h5>{ItemDetails.strDepartmentName !== null && ItemDetails.strDepartmentName !== "" ? ItemDetails.strDepartmentName : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Description</p>
                                <h5>{ItemDetails.strItemDescription !== null && ItemDetails.strItemDescription !== "" ? ItemDetails.strItemDescription : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Brand</p>
                                <h5>{ItemDetails.strBrand !== null && ItemDetails.strBrand !== "" ? ItemDetails.strBrand : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Engine</p>
                                <h5>{ItemDetails.strEngineName !== null && ItemDetails.strEngineName !== "" ? ItemDetails.strEngineName : "---"}</h5>
                            </Col>
                            <Col lg={3} md={4} sm={4} xs={6} className="mb-5">
                                <p>Drawing No</p>
                                <h5>{ItemDetails.strDrwingNumber !== null && ItemDetails.strDrwingNumber !== "" ? ItemDetails.strDrwingNumber : "---"}</h5>
                            </Col>
                        </Row>
                    </div>
                )
            }
            <Button variant="secondary" className="float-right" onClick={handleClose}>Close</Button>
        </>
    );
};

export default ItemDetails;
