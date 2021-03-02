import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import moment from 'moment'
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { editAdminInformation, handleChangeAdminInfoInput } from "../../_redux/actions/AdminInformationAction";
import { getSupplierName } from "../../../../Purchase/Quotation/_redux/actions/QuotationFilterAction";
import { getCountryName } from "../../../../partners/address/_redux/actions/AddressAction";

const AdminInformationEdit = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const { register, setValue } = useForm();
    const adminInfoInput = useSelector((state) => state.adminInfo.adminInfoInput);
    const supplierOptionData = useSelector((state) => state.QuotationFilterinfo.supplierNameData);
    const countryOptionData = useSelector((state) => state.partnerAddress.countryOptionData);
    const isLoading = useSelector((state) => state.adminInfo.isLoading);
    const status = useSelector((state) => state.adminInfo.status);
    console.log('EditadminInfoInput', adminInfoInput)


    useEffect(() => {
        dispatch(getSupplierName());
        dispatch(getCountryName());
    }, [])

    useEffect(() => {
        dispatch(editAdminInformation(id));
    }, [])

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeAdminInfoInput(name, value));
    };

    const handleSubmit = (e) => {

    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-custom gutter-b pl-5 pr-5 mb-1 card-top-border">
                            <div className="mt-5">
                                <h3 className="mb-0 pb-0">Admin Information Edit</h3>
                            </div>
                            <hr></hr>
                            <form
                                className="form form-label-right voyageEngineerForm"
                                method="post"
                            >
                                <div className="form-group row">
                                    <div className="col-md-3 col-6">
                                        <label className="formFont">Supplier Name</label>
                                        <RHFInput
                                            as={<Select options={supplierOptionData} />}
                                            rules={{ required: false }}
                                            name="intSupplierId"
                                            register={register}
                                            setValue={setValue}
                                            onChange={(option) => {
                                                handleChangeTextInput("intSupplierId", option.value);
                                                handleChangeTextInput("strSupplierName", option.label);
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">PO Number</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="text"
                                                name="strPONumber"
                                                placeholder="Type"
                                                defaultValue={adminInfoInput.strPONumber}
                                                onChange={(e) => {
                                                    handleChangeTextInput("strPONumber", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <label className="formFont">PO Date</label>
                                        <DatePicker
                                            selected={adminInfoInput.dtePODate !== "" ? moment(adminInfoInput.dtePODate).toDate() : null}
                                            disableClock={true}
                                            dateFormat="MM-dd-yyyy"
                                            className="date-picker"
                                            name="dtePODate"
                                            onChange={(date) => handleChangeTextInput("dtePODate", date)}
                                            ref={register({
                                                required: true,
                                                maxLength: 100,
                                            })}
                                        />
                                        <i className="fas fa-calendar-alt"></i>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <label className="formFont">Waranty Expiry Date</label>
                                        <DatePicker
                                            selected={adminInfoInput.dteWarantyExpiryDate !== "" ? moment(adminInfoInput.dteWarantyExpiryDate).toDate() : null}
                                            className="date-picker"
                                            disableClock={true}
                                            name="dteWarantyExpiryDate"
                                            onChange={(date) => handleChangeTextInput("dteWarantyExpiryDate", date)}
                                            dateFormat="MM-dd-yyyy"
                                            ref={register({
                                                required: true,
                                                maxLength: 100,
                                            })}
                                        />
                                        <i className="fas fa-calendar-alt"></i>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-3 col-6">
                                        <label className="formFont">Date Of Installation</label>
                                        <DatePicker
                                            className="date-picker"
                                            name="dteDateOfInstallation"
                                            dateFormat="MM-dd-yyyy"
                                            selected={adminInfoInput.dteDateOfInstallation !== "" ? moment(adminInfoInput.dteDateOfInstallation).toDate() : null}
                                            onChange={(date) => handleChangeTextInput("dteDateOfInstallation", date)}
                                            ref={register({
                                                required: true,
                                                maxLength: 100,
                                            })}
                                        />
                                        <i className="fas fa-calendar-alt"></i>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <label className="formFont">Asset Location</label>
                                        <RHFInput
                                            as={<Select options={supplierOptionData} />}
                                            rules={{ required: false }}
                                            name="strAssetLocation"
                                            register={register}
                                            value={adminInfoInput.strAssetLocation}
                                            onChange={(option) => {
                                                handleChangeTextInput("intAssetLocationId", option.value);
                                                handleChangeTextInput("strAssetLocation", option.label);
                                            }}
                                            setValue={setValue}
                                        />
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <label className="formFont">Depriciation Run Date</label>
                                        <DatePicker
                                            className="date-picker"
                                            name="dteDepreciationRunDate"
                                            dateFormat="MM-dd-yyyy"
                                            selected={adminInfoInput.dteDepreciationRunDate !== "" ? moment(adminInfoInput.dteDepreciationRunDate).toDate() : null}
                                            onChange={(date) => handleChangeTextInput("dteDepreciationRunDate", date)}
                                            ref={register({
                                                required: true,
                                                maxLength: 100,
                                            })}
                                        />
                                        <i className="fas fa-calendar-alt"></i>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">Rate of Depriciation</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="number"
                                                name="numRateofDepreciation"
                                                defaultValue={adminInfoInput.numRateofDepreciation}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    handleChangeTextInput("numRateofDepreciation", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-3 col-6">
                                        <label className="formFont">Country</label>
                                        <RHFInput
                                            as={<Select options={countryOptionData} />}
                                            rules={{ required: false }}
                                            name="intCountryId"
                                            register={register}
                                            value={adminInfoInput.intCountryId}
                                            onChange={(option) => {
                                                handleChangeTextInput("intCountryId", option.value);
                                                handleChangeTextInput("strCountryName", option.label);
                                            }}
                                            setValue={setValue}
                                        />
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">Name Of Manufacture</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="text"
                                                name="strNameOfManufacture"
                                                defaultValue={adminInfoInput.strNameOfManufacture}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    handleChangeTextInput("strNameOfManufacture", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">Manufacture Provice SL NO</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="text"
                                                name="strManufactureProviceSLNo"
                                                defaultValue={adminInfoInput.strManufactureProviceSLNo}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    handleChangeTextInput("strManufactureProviceSLNo", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">Model No</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="text"
                                                name="strModelNo"
                                                defaultValue={adminInfoInput.strModelNo}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    handleChangeTextInput("strModelNo", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">LC Number</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="text"
                                                name="strLCNumber"
                                                defaultValue={adminInfoInput.strLCNumber}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    handleChangeTextInput("strLCNumber", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">Others</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="text"
                                                name="strOthers"
                                                defaultValue={adminInfoInput.strOthers}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    handleChangeTextInput("strOthers", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">Rated Capacity</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="number"
                                                name="numRatedCapacity"
                                                defaultValue={adminInfoInput.numRatedCapacity}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    handleChangeTextInput("numRatedCapacity", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">Recommand Life</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="text"
                                                name="strRecommandLife"
                                                defaultValue={adminInfoInput.strRecommandLife}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    handleChangeTextInput("strRecommandLife", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-3 col-6">
                                        <Form.Group>
                                            <Form.Label className="formFont">Remarks</Form.Label>
                                            <Form.Control
                                                className="formHeight"
                                                type="text"
                                                name="strRemarks"
                                                defaultValue={adminInfoInput.strRemarks}
                                                placeholder="Type"
                                                onChange={(e) => {
                                                    handleChangeTextInput("strRemarks", e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="mt-5 float-right pb-5">
                                    {!isLoading && (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={(e) => handleSubmit(e)}
                                        >
                                            Update
                                        </button>
                                    )}

                                    {isLoading && (
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                        >
                                            <span>Updating</span>
                                            <span className="ml-3 spinner spinner-white"></span>
                                        </button>
                                    )}
                                </div>
                                <div className="clear-fix" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminInformationEdit;
