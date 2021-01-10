import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { handleChangeCertificateMasterInput, certificateMasterSubmitAction } from "../../_redux/actions/CertificateListAction";
// import { certificatetypeSubmitAction, handleChangeCertificateTypeInput } from "../../_redux/actions/CertificateListAction";


const CertificateMasterAdd = () => {
    const history = useHistory();
    const { register, handleSubmit, errors, setValue } = useForm();
    const CertificateMasterInput = useSelector((state) => state.CertificateListReducer.CertificateMasterInput);
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
        dispatch(handleChangeCertificateMasterInput(name, value));
    };

    const onSubmit = (data) => {
        dispatch(certificateMasterSubmitAction(CertificateMasterInput));
    };

    // useEffect(() => {
    //     dispatch();
    // }, [])


    return (
        <>
            <form
                className="form form-label-right"
                onSubmit={handleSubmit(onSubmit)}
                method="post"
            >
                <div className="form-group row mt-5">
                    <div className="col-md-12">
                        <label className="form-label">Certificate  Name</label>
                        <Form.Control type="text"
                            type="text"
                            // value={CertificateMasterInput.strCertificateName}
                            name="strCertificateTypeName"
                            onChange={(e) =>
                                handleChangeTextInput("strCertificateName", e.target.value)
                            }
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label">Vessel Name</label>
                        <RHFInput
                            as={<Select options={statusOptions} />}
                            rules={{ required: false }}
                            name="strVesselName"
                            register={register}
                            // value={CertificateMasterInput.strVesselName}
                            setValue={setValue}
                            onChange={(e) => handleChangeTextInput("strVesselName", e.value)}
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label">Category Name</label>
                        <RHFInput
                            as={<Select options={statusOptions} />}
                            rules={{ required: false }}
                            name="strCertificateCategoriName"
                            register={register}
                            // value={CertificateMasterInput.strCertificateCategoriName}
                            setValue={setValue}
                            onChange={(e) => handleChangeTextInput("strCertificateCategoriName", e.value)}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10"></div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg">
                    <span>Submit</span>
                </button>

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

export default CertificateMasterAdd;
