import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Form } from "react-bootstrap";
const PurhasesOrderEntryHeader = () => {
    const finalOrderInput = useSelector(state => state.purchasesOrderInfo.finalOrderInput);
    // const multipleOrder = useSelector(state => state.purchasesOrderInfo.multipleOrder);
    // const [test, setTest] = useState(orderFilter)
    // console.log('test :>> ', test);
    // useEffect(() => {
    //     setTest(orderFilter)
    // }, [multipleOrder])
    return (
        <>
            <Card>
                <Card.Body>
                    <div className="row mb-5 table-form">
                        <div className="col-md-4 col-5">
                            <h1 className="tableheading mt-0 ">Entry Purchase Order</h1>
                        </div>
                    </div> <hr />
                    <div className="form-group row mb-1">
                        <div className="col-xl-3 col-lg-3 col-6">
                            <Form.Group>
                                <Form.Label className="formFont pl-1">SBU</Form.Label>
                                <Form.Control
                                    className="formHeight"
                                    type="text"
                                    value={finalOrderInput.strBusinessLineName}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-6">
                            <Form.Group>
                                <Form.Label className="formFont pl-1">Branch</Form.Label>
                                <Form.Control
                                    className="formHeight"
                                    type="text"
                                    value={finalOrderInput.strBusinessUnitName}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-6">
                            <Form.Group>
                                <Form.Label className="formFont pl-1">Purchase Organisation</Form.Label>
                                <Form.Control
                                    className="formHeight"
                                    type="text"
                                    value={finalOrderInput.strPurchaseOrganizationName}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-6">
                            <Form.Group>
                                <Form.Label className="formFont pl-1">Refference Type</Form.Label>
                                <Form.Control
                                    className="formHeight"
                                    type="text"
                                    value={finalOrderInput.strReferenceTypeName}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                    </div>
                </Card.Body >
            </Card >
        </>
    );
};

export default PurhasesOrderEntryHeader;