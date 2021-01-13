
import React, { useState } from 'react';
import { Form, Card, Button, Col } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import Select from "react-select";
import TestDate from './TestDate';

const LaytimeContainer = () => {
    const { register, setValue } = useForm();

    const statusOptions = [
        {
            label: "Active",
            value: "1",
        },
        {
            label: "Inactive",
            value: "0",
        },
    ];

    return (
        <>
            <Card>
                <Card.Body>
                    <div className="container">
                        <div className="row">
                            <div>
                                <h1 className="tableheading mr-5">Laytime List</h1>
                            </div>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Control
                                    className="formHeight"
                                    type="text"
                                    placeholder="Search"
                                    value={""}
                                //   onChange={(e) => changeSearch(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <RHFInput
                                    className="formSelect pt-0"
                                    as={<Select options={statusOptions} />}
                                    rules={{ required: false }}
                                    name="isActive"
                                    register={register}
                                    value={""}
                                    //   onChange={(option) => {
                                    //     setType(option.value);
                                    //     dispatch(getCertificateTypeList(search, option.value));
                                    //   }}
                                    setValue={""}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <RHFInput
                                    className="formSelect pt-0"
                                    as={<Select options={statusOptions} />}
                                    rules={{ required: false }}
                                    name="isActive"
                                    register={register}
                                    value={""}
                                    //   onChange={(option) => {
                                    //     setType(option.value);
                                    //     dispatch(getCertificateTypeList(search, option.value));
                                    //   }}
                                    setValue={setValue}
                                />
                            </Form.Group>
                            <i className="fas fa-filter tableFilter mt-3 mr-2"></i>
                            <i className="far fa-filter"></i>
                            <Button className="btn-sm" variant="primary">
                                Add New
            </Button>
                        </div>

                    </div>
                    <div className="react-bootstrap-table table-responsive">
                        <table className="table table table-head-custom table-vertical-center voyageTable">
                            <thead>
                                <tr>
                                    <th tabindex="0">
                                        {" "}
                                        <Form.Group controlId="formBasicChecbox">
                                            <Form.Check type="checkbox" />
                                        </Form.Group>
                                    </th>
                                    <th>VOYAGE NO</th>
                                    <th>DATE</th>
                                    <th>CHARTARER NAME</th>
                                    <th>BALANCE</th>
                                    <th>COMMISION</th>

                                    <th class="text-right pr-3">Actions</th>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        {" "}
                                        <Form.Check type="checkbox" />
                                    </th>
                                    <td>#01</td>

                                    <td>20/12/2011</td>
                                    <td>Md Akij Noor</td>
                                    <td>23,00,00 USD</td>
                                    <td>23,00,00 USD</td>
                                    <td className="text-right pr-3 mt-3">
                                        {" "}
                                        <i className="far fa-edit editIcon"></i>
                                        <i className="fas fa-trash-alt editIcon ml-4"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        {" "}
                                        <Form.Check type="checkbox" />
                                    </th>
                                    <td>#01</td>

                                    <td>20/12/2011</td>
                                    <td>Md Akij Noor</td>
                                    <td>23,00,00 USD</td>
                                    <td>23,00,00 USD</td>
                                    <td className="text-right pr-3 mt-3">
                                        {" "}
                                        <i className="far fa-edit editIcon"></i>
                                        <i className="fas fa-trash-alt editIcon ml-4"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        {" "}
                                        <Form.Check type="checkbox" />
                                    </th>
                                    <td>#01</td>

                                    <td>20/12/2011</td>
                                    <td>Md Akij Noor</td>
                                    <td>23,00,00 USD</td>
                                    <td>23,00,00 USD</td>
                                    <td className="text-right pr-3 mt-3">
                                        {" "}
                                        <i className="far fa-edit editIcon"></i>
                                        <i className="fas fa-trash-alt editIcon ml-4"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        {" "}
                                        <Form.Check type="checkbox" />
                                    </th>
                                    <td>#01</td>

                                    <td>20/12/2011</td>
                                    <td>Md Akij Noor</td>
                                    <td>23,00,00 USD</td>
                                    <td>23,00,00 USD</td>
                                    <td className="text-right pr-3 mt-3">
                                        {" "}
                                        <i className="far fa-edit editIcon"></i>
                                        <i className="fas fa-trash-alt editIcon ml-4"></i>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </Card.Body>
            </Card>
            <Card className="mt-3">
                <Card.Body>
                    <div className="row">
                        <div className="offset-xl-4 offset-lg-4 empty-space">

                        </div>
                        <div className="float-left total">
                            <h6 className="text-left">Total</h6>
                        </div>
                        <div className="float-left balance">
                            <h6 className="text-left">Total</h6>
                        </div>
                        <div className="float-left commision">
                            <h6>Total</h6>
                        </div>
                    </div>

                </Card.Body>
            </Card>
            <TestDate />
        </>

    );
}

export default LaytimeContainer;
