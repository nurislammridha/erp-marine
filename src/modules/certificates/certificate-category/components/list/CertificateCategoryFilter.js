import React, { useState } from "react";
import { Form, Button, Image, Col, Row, Table } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCertificateCategoryListData } from "../../_redux/actions/CertificateCategoryAction";

const CertificateCategoryFilter = () => {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const dispatch = useDispatch();
    const certificateCategoryInput = useSelector((state) => state.CertificateCategoryReducer.certificateCategoryInput);
    const { register, setValue } = useForm();
    const statusOptions = [
        {
            label: 'Active',
            value: '1'
        },
        {
            label: 'Inactive',
            value: '0'
        }
    ]

    const handleChangeTextInput = (name, value) => {
        // dispatch(GetVoyageList(value, type));
    };
    const changeSearch = (value) => {
        setSearch(value);
        dispatch(getCertificateCategoryListData(value, type));

    };
    return (
        <div className="container">
            <form className="form form-label-right" method="post">
                <div className="form-group row ml-2">
                    <div className="col-lg-3 col-md-6 col-10">
                        <Form.Control type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => changeSearch(e.target.value)}
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
                                name="isActive"
                                register={register}
                                value={certificateCategoryInput.isActive}
                                onChange={(option) => {
                                    setType(option.value);
                                    dispatch(getCertificateCategoryListData(search, option.value));
                                }}
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

export default CertificateCategoryFilter;
