import React, { useState } from "react";
import { Form, Button, Image, Col, Row, Table } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const CertificateTypeMasterFilter = () => {


    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const certificateTypeInput = useSelector((state) => state.certificateTypeInfo.certificateTypeInput);
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

    const handleChangeTextInput = (name, value) => {
        // dispatch(GetVoyageList(value, type));
    };

    const changeSearch = (value) => {
        setSearch(value);
        // dispatch(getCertificateTypeList(value, type));

    };

    
    

   




    const handlegetEdit = (data) => {
        handleShow();
        // dispatch(EditCertificateTypeList(data));
    }


    return (
        <div className="container">
            <form className="form form-label-right" method="post">
                <div className="form-group row ml-2">
                    <div className="col-lg-3 col-md-6 col-10">
                        <Form.Control type="text"
                            placeholder="Search"
                            value={search}
                            // onChange={(e) => changeSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 col-10">
                        <Form.Group
                            className="noonReportInput"
                            as={Row}
                            controlId="formPlaintextPassword"
                        >
<<<<<<< HEAD
                            <Form.Label>status</Form.Label>
                            <Col sm="10">
=======
                            <Form.Label>Category</Form.Label>
                            <Col sm="8">
>>>>>>> origin/farid
                                <RHFInput
                                    as={<Select options={statusOptions} />}
                                    rules={{ required: false }}
                                    name="isActive"
                                    register={register}
                                    // value={certificateTypeInput.isActive}
                                    // onChange={(option) => {
                                    //     handleChangeTextInput("strCargoTypeName", option.label);
                                    //     handleChangeTextInput("isActive", option.value);
                                    //     dispatch(getCertificateTypeList(search, option.value));
                                    // }}
                                    setValue={setValue}

                                />
                            </Col>
                        </Form.Group>
                    </div>
                </div>
            </form >
        </div>
    );
};

export default CertificateTypeMasterFilter;
