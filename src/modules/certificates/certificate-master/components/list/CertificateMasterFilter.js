import React, { useState,useEffect } from "react";
import { Form, Button, Image, Col, Row, Table } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCertificateMasterList } from "../../_redux/actions/CertificateListAction";

const CertificateMasterFilter = () => {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const dispatch = useDispatch();
    const CertificateMasterInput = useSelector((state) => state.CertificateListReducer.certificateMasterInput);
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
    const changeSearch = (value) => {
        setSearch(value);
        dispatch(getCertificateMasterList(value, type));

    };
    useEffect(() => {
       dispatch(getCertificateMasterList());
    }, [])
    return (
    <div className="container">
        <form className="form form-label-right" method="post">
            <div className="form-group row ml-2">
                <div className="col-lg-3 col-md-6 col-10">
                    <Form.Control className="formFont pl-1"
                        className="formHeight"
                        type="text"
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
                    <Form.Label className="formFont pl-1" className="mt-2">Status</Form.Label>
                        <Col sm="9">
                            <RHFInput
                                as={<Select options={statusOptions} />}
                                rules={{ required: false }}
                                name="isActive"
                                register={register}
                                value={CertificateMasterInput.isActive}
                                onChange={(option) => {
                                    setType(option.value);
                                    dispatch(getCertificateMasterList(search, option.value));
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

export default CertificateMasterFilter;
