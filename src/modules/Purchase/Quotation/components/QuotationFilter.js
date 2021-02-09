import React, { useEffect, useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { InputBase, Paper, IconButton } from "@material-ui/core";
import { getCurrencyType, getSupplierName, handleChangeQuotationFilterInput } from "../_redux/actions/QuotationFilterAction";


const QuotationFilter = () => {

    const dispatch = useDispatch();
    const QuotationFilterInput = useSelector((state) => state.QuotationFilterinfo.QuotationFilterInput);
    const supplierOptionData = useSelector((state) => state.QuotationFilterinfo.supplierNameData);
    const currencyOptionData = useSelector((state) => state.QuotationFilterinfo.currencyTypeData);
    const { register, setValue } = useForm();


    const CourseName = [{
        name: "nur",
        value: 2
    }]

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeQuotationFilterInput(name, value))
    }

    useEffect(() => {
        dispatch(getSupplierName());
        dispatch(getCurrencyType());
    }, [])

    return (
        <div>
            <Card>
                <Card.Body className="pt-2">
                    <form
                        className="form form-label-right voyageEngineerForm"
                        method="post"
                    >
                        <div className="row mb-5 table-form ">
                            <h1 className="tableheading font-weight-bold ">
                                Quotation Details
                            </h1>

                            <div className="col-xl-4 col-lg-4 col-md-6 mt-2">
                                <Paper className="searchInput supplier-search">
                                    <InputBase
                                        placeholder="Search"
                                        name="search"
                                        value={QuotationFilterInput.search}
                                        onChange={(option) => {
                                            handleChangeTextInput('search', option.target.value);
                                        }}
                                    />
                                    <IconButton
                                        aria-label="Search"
                                        className="searchPlaceholder supplier-search-placeholder"
                                    >
                                        <i className="flaticon-search "></i>
                                    </IconButton>
                                </Paper>
                            </div>
                        </div>
                        <div className="custom-border mt-5 "></div>
                        <div className="form-group row mt-3">
                            <div className="col-md-4">

                                <label className="form-label formFont">Quotation No</label>
                                <Form.Control
                                    className="fromStyle formHeight"
                                    type="text"
                                    name="strQuotationNo"
                                    value={QuotationFilterInput.strQuotationNo}
                                    onChange={(option) => {
                                        handleChangeTextInput('strQuotationNo', option.target.value);
                                    }}
                                />

                            </div>
                            <div className="col-md-4">
                                <label className="formFont">Supplier</label>
                                <RHFInput
                                    as={<Select options={supplierOptionData} />}
                                    rules={{ required: false }}
                                    name="courseData"
                                    register={register}
                                    onChange={(option) => {
                                        handleChangeTextInput('strSupplierName', option.label);
                                        handleChangeTextInput('intSupplierId', option.value)
                                    }}
                                    setValue={setValue}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="formFont">Currency</label>
                                <RHFInput
                                    as={<Select options={currencyOptionData} />}
                                    rules={{ required: false }}
                                    name="intSupplierId"
                                    register={register}
                                    onChange={(option) => {
                                        handleChangeTextInput('strCurrencyCode', option.label);
                                        handleChangeTextInput('intCurrencyId', option.value)
                                    }}
                                    setValue={setValue}
                                />
                            </div>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default QuotationFilter;
