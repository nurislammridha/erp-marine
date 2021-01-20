import React from 'react'
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { handleChangePartnerInfoInput } from '../_redux/actions/BasicInfoAction';


const BasicInfoAdd = withRouter(({ history }) => {

    const partnerType = [
        {
            label: 'Partner 1',
            value: "1"
        },
        {
            label: 'Partner 2',
            value: "2"
        },
        {
            label: 'Partner 3',
            value: "3"
        },
        {
            label: 'Partner 4',
            value: "4"
        }
    ]

    const businessUnit = [
        {
            label: 'Cement',
            value: "1"
        },
        {
            label: 'Plastic',
            value: "2"
        },
        {
            label: 'Siramic',
            value: "3"
        },
        {
            label: 'Dhew Tin',
            value: "4"
        }
    ]
    const taxType = [
        {
            label: 'Tax 1',
            value: "1"
        },
        {
            label: 'Tax 2',
            value: "2"
        },
        {
            label: 'Tax 3',
            value: "3"
        },
        {
            label: 'Tax 4',
            value: "4"
        }
    ]

    const { register, handleSubmit, errors, setValue } = useForm();
    const dispatch = useDispatch();
    const partnerInfoInput = useSelector((state) => state.partnerInfo.partnerInfoInput);

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangePartnerInfoInput(name, value));
    };

    return (
        <div className="container">
            <div className="mt-10">


                <form
                    className="form form-label-right"
                    method="post"
                >
                    <div className="form-group">
                        <div className="row">

                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">Partner Name</label>
                                <Form.Control
                                    type="text"
                                    name="strSupplierName"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.strSupplierName}
                                    onChange={(e) =>
                                        handleChangeTextInput(
                                            "strSupplierName",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">Partner Type</label>
                                <RHFInput
                                    as={<Select options={partnerType} />}
                                    rules={{ required: true }}
                                    name="intSupplierTypeID"
                                    register={register}
                                    value={partnerInfoInput.intSupplierTypeName}
                                    onChange={(e) => {
                                        handleChangeTextInput("intSupplierTypeID", e.value);
                                        handleChangeTextInput("intSupplierTypeName", e.label);
                                    }}
                                    setValue={setValue}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">Email</label>
                                <Form.Control
                                    type="email"
                                    name="strEmail"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.strEmail}
                                    onChange={(e) =>
                                        handleChangeTextInput(
                                            "strEmail",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">BIN No</label>
                                <Form.Control
                                    type="text"
                                    name="strBIN"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.strBIN}
                                    onChange={(e) =>
                                        handleChangeTextInput(
                                            "strBIN",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">Partner Code</label>
                                <Form.Control
                                    type="text"
                                    name="strSupplierCode"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.strSupplierCode}
                                    onChange={(e) =>
                                        handleChangeTextInput(
                                            "strSupplierCode",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">Contact No</label>
                                <Form.Control
                                    type="text"
                                    name="strContactNumber"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.strContactNumber}
                                    onChange={(e) =>
                                        handleChangeTextInput(
                                            "strContactNumber",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">Licence No</label>
                                <Form.Control
                                    type="text"
                                    name="strLicenseNo"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.strLicenseNo}
                                    onChange={(e) =>
                                        handleChangeTextInput(
                                            "strLicenseNo",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">Business Unit</label>
                                <RHFInput
                                    as={<Select options={businessUnit} />}
                                    rules={{ required: true }}
                                    name="intAction"
                                    register={register}
                                    value={partnerInfoInput.businessUnitName}
                                    onChange={(e) => {
                                        handleChangeTextInput("intAction", e.value);
                                        handleChangeTextInput("businessUnitName", e.label);
                                    }}
                                    setValue={setValue}
                                />

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">TIN No</label>
                                <Form.Control
                                    type="text"
                                    name="strTIN"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.strTIN}
                                    onChange={(e) =>
                                        handleChangeTextInput(
                                            "strTIN",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">TAX Type</label>
                                <RHFInput
                                    as={<Select options={taxType} />}
                                    rules={{ required: true }}
                                    name="intTaxTypeId"
                                    value={partnerInfoInput.intTaxTypeName}
                                    register={register}
                                    onChange={(e) => {
                                        handleChangeTextInput("intTaxTypeId", e.value);
                                        handleChangeTextInput("intTaxTypeName", e.value);
                                    }}
                                    setValue={setValue}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">PIC name</label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter PIC Name"
                                    name="picName"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.picName}
                                    onChange={(e) => handleChangeTextInput("picName", e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">PIC Contact</label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter PIC Contact"
                                    name="picContact"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.picContact}
                                    onChange={(e) => handleChangeTextInput("picContact", e.target.value)}
                                />
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label mt-2 formFont">PIC Email</label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter PIC Email"
                                    name="picEmail"
                                    className="fromStyle formHeight"
                                    value={partnerInfoInput.picEmail}
                                    onChange={(e) => handleChangeTextInput("picEmail", e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                    {/* <div className="form-group row mt-5">
                            <div className="col-md-11">

                            </div>
                            <div className="col-md-1">
                                <a onClick={() => {
                                    history.push("/partners/address");
                                }}>
                                    <button type="button" class="saveButton text-white btn ">Next</button>
                                </a>
                            </div>

                        </div> */}

                </form>

            </div>

        </div >
    );
});

export default BasicInfoAdd;
