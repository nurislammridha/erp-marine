import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { handleChangeCertificateTypeInput, UpdateCertificateTypeList } from "../../_redux/actions/CertificateTypeAction";


const CertificateTypeEdit = (props) => {

    const {
        intCertificateTypeID,
        strCertificateTypeName,
        isActive,
    } = props;

    const [certificateEditInfo, setCertificateEditInfo] = React.useState({

        intCertificateTypeID: intCertificateTypeID,
        strCertificateTypeName: strCertificateTypeName,
        isActive: isActive,
    });


    const dispatch = useDispatch();
    const history = useHistory();
    const { register, handleSubmit, errors, setValue } = useForm();
    const certificateTypeInput = useSelector((state) => state.certificateTypeInfo.certificateTypeInput);
    const modalStatus = useSelector((state) => state.certificateTypeInfo.status);

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



    // const handleChange = (name, value, { currentTarget: input }) => {
    //     const certificateEditInfoData = { ...certificateEditInfo };
    //     dispatch(handleChangeCertificateTypeInput(name, value));
    //     certificateEditInfoData[input.name] = input.value;
    //     setCertificateEditInfo(certificateEditInfoData);

    // };

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
                <div className="form-group row mt-5">
                    <div className="col-sm-6">
                        <label className="form-label">Certificate Type Name</label>
                        <Form.Control type="text"
                            type="text"
                            name="strCertificateTypeName"
                            value={certificateTypeInput.strCertificateTypeName}
                            onChange={(e) =>
                                handleChangeTextInput("strCertificateTypeName", e.target.value)
                            }
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label">Status</label>
                        <RHFInput
                            as={<Select options={statusOptions} />}
                            rules={{ required: false }}
                            name="isActive"
                            register={register}
                            value={certificateTypeInput.isActive ? "Active" : "Inactive"}
                            setValue={setValue}
                        // onChange={(e) => handleChangeTextInput("isActive", e.value)}
                        />
                    </div>

                </div>

                <div className="form-group row">
                    <div className="col-sm-10"></div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg">
                    <span>Save Changes</span>
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

export default CertificateTypeEdit;
