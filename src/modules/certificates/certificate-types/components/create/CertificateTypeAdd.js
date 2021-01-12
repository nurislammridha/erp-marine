import React from "react";
import { Form, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { certificatetypeSubmitAction, handleChangeCertificateTypeInput } from "../../_redux/actions/CertificateTypeAction";


const CertificateTypeAdd = () => {
    const history = useHistory();
    const { register, handleSubmit, errors, setValue } = useForm();
    const certificateTypeInput = useSelector((state) => state.certificateTypeInfo.certificateTypeInput);
    const dispatch = useDispatch();
    const statusOptions = [
        {
            label: 'Active',
            value: "1"
        },
        {
            label: 'Inactive',
            value: "0"
        }
    ]


    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeCertificateTypeInput(name, value));
    };

    const onSubmit = (data) => {
        dispatch(certificatetypeSubmitAction(certificateTypeInput));
    };


    return (
        <>
            <form
                className="form form-label-right"
                onSubmit={handleSubmit(onSubmit)}
                method="post"
            >
                <div className="form-group row">
                    <div className="col-md-12">
                        <Form.Group>
                            <Form.Label className="pl-1">Certificate Type Name</Form.Label>
                            <Form.Control
                                className="formHeight"
                                type="text"
                                placeholder="Certificate Name"
                                value={certificateTypeInput.strCertificateTypeName}
                                name="strCertificateTypeName"
                                onChange={(e) =>
                                    handleChangeTextInput(
                                        "strCertificateTypeName",
                                        e.target.value
                                    )
                                }
                            />
                        </Form.Group>
                    </div>
                    {/* <div className="col-sm-4">
                        <label className="form-label">Status</label>
                        <RHFInput
                            as={<Select options={statusOptions} />}
                            rules={{ required: false }}
                            name="isActive"
                            register={register}
                            value={certificateTypeInput.isActive}
                            setValue={setValue}
                            onChange={(e) => handleChangeTextInput("isActive", e.value)}
                        />
                    </div> */}
                </div>

                <div className="form-group row">
                    <div className="col-sm-10"></div>
                </div>
                <Button type="submit" className="mr-4  saveButton text-white" variant=""> Submit </Button>

                {/* {loading && (
                    <button type="submit" class="btn btn-primary btn-lg" disabled={true}>
                        <span>Submitting...</span>
                        <span className="ml-3 spinner spinner-white"></span>
                    </button>
                )}

                {!loading && (
                    <button type="submit" class="btn btn-primary btn-lg">
                        <span>Submit</span>
                    </button>
                )} */}
            </form>
        </>
    );
};

export default CertificateTypeAdd;
