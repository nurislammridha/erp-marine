import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getCertificateTypeList, handleChangeCertificateTypeInput, UpdateCertificateTypeList } from "../../_redux/actions/CertificateTypeAction";


const CertificateTypeEdit = (props) => {




    const dispatch = useDispatch();
    const history = useHistory();
    const { register, handleSubmit, errors, setValue } = useForm();
    const certificateTypeInput = useSelector((state) => state.certificateTypeInfo.certificateTypeInput);
    const isLoading = useSelector(
        (state) => state.certificateTypeInfo.isLoading
    );
    const editStatus = useSelector(
        (state) => state.certificateTypeInfo.editStatus
    );

    const statusOptions = [
        {
            label: 'Active',
            value: "1"
        },
        {
            label: 'In Active',
            value: "0"
        }
    ]
    useEffect(() => {
        if (editStatus) {
            dispatch(getCertificateTypeList());
        }
    }, [editStatus]);

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeCertificateTypeInput(name, value));
    };

    const onSubmit = () => {
        dispatch(UpdateCertificateTypeList(certificateTypeInput));
    };


    return (
        <>
            <form
                className="form form-label-right"
                onSubmit={handleSubmit(onSubmit)}
                method="post"
            >

                <Form.Group as={Row} controlId="formAuthorityName">
                    <Form.Label className="formFont pl-1" column sm="3">
                        Certificate Type Name:
                    </Form.Label>
                    <Col sm="9" className="mt-5">
                        <Form.Control
                            className="formHeight"

                            type="text"
                            value={certificateTypeInput.strCertificateTypeName}
                            name="strCertificateTypeName"
                            ref={register({
                                required: false,
                                maxLength: 100,
                            })}
                            onChange={(e) =>
                                handleChangeTextInput("strCertificateTypeName", e.target.value)
                            }
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label className="formFont pl-1" column sm="3">
                        Status:
                    </Form.Label>
                    <Col sm="9" className="mt-2">
                        <RHFInput
                            as={<Select options={statusOptions} />}
                            rules={{ required: false }}
                            name="isActive"
                            register={register}
                            value={statusOptions.value}
                            onChange={(e) => handleChangeTextInput("isActive", e.value)}
                            setValue={setValue}
                        />
                    </Col>
                </Form.Group>



                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label className="formFont pl-1" column sm="3"></Form.Label>
                    <Col sm="9">
                        {!isLoading && (
                            <Button variant="primary" type="submit" className="saveButton">
                                Update
                            </Button>
                        )}
                        {isLoading && (
                            <Button
                                variant="primary"
                                type="submit"
                                className="saveButton"
                                disabled={true}
                            >
                                <span className="p-2">
                                    <i className="fa fa-check"></i> Updating...
                                </span>
                                <span className="ml-3 spinner spinner-white "></span>
                            </Button>
                        )}
                    </Col>
                </Form.Group>
            </form>
        </>
    );
};

export default CertificateTypeEdit;
