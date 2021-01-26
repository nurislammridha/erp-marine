import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GetVoyageActivityDetail } from "../../../../_redux/actions/VoyageActivityAction";

const AuxEngine = (props) => {

    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const { id } = props;

    const voyageActivityDetail = useSelector(
        (state) => state.voyageActivityInfo.voyageActivityDetail
    );
    console.log("voyageActivityDetail :>> ", voyageActivityDetail);

    useEffect(() => {
        dispatch(GetVoyageActivityDetail(id));
    }, []);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <form
            className="form form-label-right voyageEngineerForm"

            method="post"
        >
            <div>
                <p className="text-uppercase text-bold mt-3">Aux.Engine 1</p>
            </div>
            <div className="border-bottom"></div>
            {voyageActivityDetail !== null && voyageActivityDetail.aux1 !== null && (
                <>
                    <div className="form-group row">
                        <div className="col-lg-5">
                            <div>
                                <p className="text-uppercase text-bold mt-3">
                                    Main Engine (Temperature)
                        </p>
                            </div>
                            <div className="border-top mb-3"></div>

                            <Form.Group as={Row}>
                                <Form.Label column sm="5">
                                    T/C RPM
                                </Form.Label>
                                <Col sm="7" className="mt-3">
                                    <h6>{voyageActivityDetail.aux1.dceTCRPM}</h6>
                                </Col>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="form-group row mt-2">
                        <div className="col-xl-3 col-lg-3 col-6">
                            <Form.Group>
                                <Form.Label>R/H</Form.Label>
                                <h6>{voyageActivityDetail.aux1.dceRH}</h6>
                            </Form.Group>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-6">
                            <Form.Group>
                                <Form.Label>Load (KW)</Form.Label>
                                <h6>{voyageActivityDetail.aux1.dceLoad}</h6>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-lg-3">
                            <p className="mt-3">Aux Temp.</p>
                        </div>
                        <div className="col-lg-3">
                            <div className="minInput">
                                <Form.Group>
                                    <p className="mt-3">Min</p>
                                    <h6>{voyageActivityDetail.aux1.dceExhtTemp1}</h6>
                                </Form.Group>
                            </div>
                            <div className="maxInput">
                                <Form.Group>
                                    <p className="mt-3">Max</p>
                                    <h6>{voyageActivityDetail.aux1.dceExhtTemp2}</h6>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-2">
                            <p className="mt-3">Aux Temp.</p>
                        </div>

                        <div className="col-lg-2">
                            <Form.Group>
                                <h6 className="mt-3">{voyageActivityDetail.aux1.dceRH}</h6>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-lg-3">
                            <p className="mt-3">Jacket Temp</p>
                        </div>

                        <div className="col-lg-3">
                            <Form.Group>
                                <h6 className="mt-3">{parseFloat(voyageActivityDetail.aux1.dceJacketTemp).toFixed(2)}</h6>
                            </Form.Group>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-lg-2">
                            <p className="mt-3">Jacket Pressure.</p>
                        </div>

                        <div className="col-lg-2">
                            <Form.Group>
                                <h6 className="mt-3">{parseFloat(voyageActivityDetail.aux1.dceJacketPressure).toFixed(2)}</h6>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-lg-3">
                            <p className="mt-3">SCAV</p>
                        </div>

                        <div className="col-lg-3">
                            <Form.Group>
                                <h6 className="mt-3">{parseFloat(voyageActivityDetail.aux1.dceScavTemp).toFixed(2)}</h6>
                            </Form.Group>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-lg-2">
                            <p className="mt-3">SCAV Pressure</p>
                        </div>

                        <div className="col-lg-2">
                            <Form.Group>
                                <h6 className="mt-3">{parseFloat(voyageActivityDetail.aux1.dceScavPressure).toFixed(2)}</h6>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row mt-1 ">
                        <div className="col-lg-3">
                            <p className="mt-3">Lub Oil Temp</p>
                        </div>

                        <div className="col-lg-3">
                            <Form.Group>
                                <h6 className="mt-3">{parseFloat(voyageActivityDetail.aux1.dceLubOilTemp).toFixed(2)}</h6>
                            </Form.Group>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-lg-2">
                            <p className="mt-3">Lub Oil Pressure</p>
                        </div>

                        <div className="col-lg-2">
                            <Form.Group>
                                <h6 className="mt-3">{parseFloat(voyageActivityDetail.aux1.dceLubOilPressure).toFixed(2)}</h6>
                            </Form.Group>
                        </div>
                    </div>
                </>
            )}
            {voyageActivityDetail !== null && voyageActivityDetail.aux1 === null && (
                <div className="p-3">
                    N/A
                </div>
            )}
            <div className="clearfix"></div>
        </form>
    );
};

export default AuxEngine;
