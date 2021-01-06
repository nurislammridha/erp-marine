import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";


const CertificateTypeAdd = () => {
    const history = useHistory();
    const { register, handleSubmit, errors, setValue } = useForm();

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

    //add boiler info in multiple list


    return (
        <>
            <form
                className="form form-label-right"
                method="post"
            >
                <div className="form-group row mt-5">
                    <div className="col-sm-4">
                        <label className="form-label">Certificate Name</label>
                        <Form.Control type="text"
                            placeholder=""
                        />
                    </div>



                    <div className="col-sm-4">
                        <label className="form-label">Certificate Type</label>
                        <RHFInput
                            as={<Select options={statusOptions} />}
                            rules={{ required: false }}
                            name="intCargoTypeID"
                            register={register}
                            value={""}
                            setValue={setValue}
                        />
                    </div>
                    <div className="col-sm-4">
                        <label className="form-label">Action</label>
                        <RHFInput
                            as={<Select options={statusOptions} />}
                            rules={{ required: false }}
                            name="intVesselID"
                            register={register}
                            value={""}
                            setValue={setValue}
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

export default CertificateTypeAdd;
