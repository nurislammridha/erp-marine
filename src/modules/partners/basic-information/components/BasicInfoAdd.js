import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessType, getPartnerType, getTaxType, handleChangePartnerInfoInput } from '../_redux/actions/BasicInfoAction';


const BasicInfoAdd = withRouter(() => {

    const { register, setValue } = useForm();
    const dispatch = useDispatch();
    const partnerInfoInput = useSelector((state) => state.partnerInfo.partnerInfoInput);
    const taxTypeOptionData = useSelector((state) => state.partnerInfo.taxTypeData);
    const partnerTypeOptionData = useSelector((state) => state.partnerInfo.partnerTypeData);
    const businessUnitOptionData = useSelector((state) => state.partnerInfo.businessUnitData);

    useEffect(() => {
        dispatch(getTaxType());
        dispatch(getPartnerType());
        dispatch(getBusinessType());
    }, []);



    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangePartnerInfoInput(name, value));
    };



    return (
        <div className="container">
            <div className="mt-3">
                <form
                    className="form form-label-right"
                    method="post"
                    autocomplete="off"
                >
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="form-label mt-2 formFont">Supplier Name</label>
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
                                    <div className="col-md-4">
                                        <label className="form-label mt-2 formFont">Supplier Type</label>
                                        <RHFInput
                                            as={<Select options={partnerTypeOptionData} />}
                                            rules={{ required: false }}
                                            name="intSupplierTypeID"
                                            register={register}
                                            value={partnerInfoInput.supplierType}
                                            onChange={(e) => {
                                                handleChangeTextInput("strSupplierTypeName", e.label);
                                                handleChangeTextInput("intSupplierTypeID", e.value);

                                            }}
                                            setValue={setValue}
                                        />
                                    </div>
                                    <div className="col-md-4">
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
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="form-label mt-2 formFont">Supplier Code (optional)</label>
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
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
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

                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="form-label mt-2 formFont">Business Unit</label>
                                        <RHFInput
                                            as={<Select options={businessUnitOptionData} />}
                                            rules={{ required: true }}
                                            name="intCompanyID"
                                            register={register}
                                            value={partnerInfoInput.businessUnit}
                                            onChange={(e) => {
                                                handleChangeTextInput("strBusinessUnitName", e.label);
                                                handleChangeTextInput("intCompanyID", e.value);
                                            }}
                                            setValue={setValue}
                                        />

                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label mt-2 formFont">TIN No (optional)</label>
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
                                    <div className="col-md-4">
                                        <label className="form-label mt-2 formFont">TAX Type</label>
                                        <RHFInput
                                            as={<Select options={taxTypeOptionData} />}
                                            rules={{ required: true }}
                                            name="intTaxTypeId"
                                            value={partnerInfoInput.taxType}
                                            register={register}
                                            onChange={(e) => {
                                                handleChangeTextInput("intTaxTypeId", e.value);
                                                handleChangeTextInput("strTaxTypeName", e.label);
                                            }}
                                            setValue={setValue}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
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
                            </div>
                            <div className="col-md-4">
                                <div className="border rounded">

                                    <div className="col-md-12">
                                        <label className="form-label mt-2 formFont">PIC name</label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter PIC Name"
                                            name="strPICName"
                                            className="fromStyle formHeight"
                                            value={partnerInfoInput.strPICName}
                                            onChange={(e) => handleChangeTextInput("strPICName", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label mt-2 formFont">PIC Contact</label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter PIC Contact"
                                            name="strPICContactNo"
                                            className="fromStyle formHeight"
                                            value={partnerInfoInput.strPICContactNo}
                                            onChange={(e) => handleChangeTextInput("strPICContactNo", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-5">
                                        <label className="form-label mt-2 formFont">PIC Email</label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter PIC Email"
                                            name="strPICEmail"
                                            className="fromStyle formHeight"
                                            value={partnerInfoInput.strPICEmail}
                                            onChange={(e) => handleChangeTextInput("strPICEmail", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </form>

            </div>

        </div >
    );
});

export default BasicInfoAdd;
