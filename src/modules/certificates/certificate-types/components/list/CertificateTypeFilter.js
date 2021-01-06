import React, { useState } from "react";
import { Form, Button, Image, Col, Row, Table } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import Select from "react-select";

const CertificateTypeFilter = () => {

    const { register, setValue } = useForm();
    const statusOptions = [
        {
            label: 'Active',
            value: 0
        },
        {
            label: 'Inactive',
            value: 1
        }
    ]
    return (
        <div className="container">
            <form className="form form-label-right" method="post">
                <div className="form-group row ml-2">
                    <div className="col-lg-3 col-md-6 col-10">
                        <Form.Control type="text"
                            placeholder="Search"
                        // value={search}
                        // onChange={ }
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-10">
                        <Form.Group
                            className="noonReportInput"
                            as={Row}
                            controlId="formPlaintextPassword"
                        >
                            <Form.Label className="mt-2">Status</Form.Label>
                            <Col sm="9">
                                <RHFInput
                                    as={<Select options={statusOptions} />}
                                    rules={{ required: false }}
                                    name="intCargoTypeID"
                                    register={register}
                                    value={''}
                                    onChange={() => console.log('e')}
                                    setValue={""}

                                />
                            </Col>
                        </Form.Group>
                    </div>
                </div>
            </form >
        </div>
    );
};

export default CertificateTypeFilter;
