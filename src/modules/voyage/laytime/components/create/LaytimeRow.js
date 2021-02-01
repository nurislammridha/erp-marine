import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import LaytimeDetail from '../detail/LaytimeDetail';
import LaytimeMultipleAdd from './LaytimeMultipleAdd';
import { useSelector, useDispatch } from "react-redux";
import { handleChangeLaytimeRowInput, submitLaytime } from '../../_redux/actions/LaytimeAction';

const LaytimeRow = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, setValue } = useForm();
    const laytimeHeaderInput = useSelector((state) => state.laytimeHeaderInfo.laytimeHeaderInput);
    const laytimeRowInput = useSelector((state) => state.laytimeDetailInfo.laytimeRowInput);
    const loading = useSelector((state) => state.laytimeDetailInfo.loading);
    const layTimeRowList = useSelector((state) => state.laytimeDetailInfo.layTimeRowList);
    const laytimeDatList = useSelector((state) => state.laytimeDetailInfo.laytimeDatList);
    const laytimeDataList = useSelector(
        (state) => state.laytimeDetailInfo.laytimeDataList
      );

    const [show, setShow] = useState(false);
    // handle change lay time row input
    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeLaytimeRowInput(name, value));
    };
    // for testing port 
    const selectPort = [
        {
            label: 'Port-1',
            value: "1"
        },
        {
            label: 'Port-2',
            value: "2"
        },
        {
            label: 'Port-3',
            value: "3"
        }
    ]
    //testing for cargo type 
    const selectCargo = [
        {
            label: 'Cargo-1',
            value: "1"
        },
        {
            label: 'Cargo-2',
            value: "2"
        },
        {
            label: 'Cargo-3',
            value: "3"
        }
    ]
    //testing for cargo type 
    const selectTerms = [
        {
            label: 'Term-1',
            value: "1"
        },
        {
            label: 'Term-2',
            value: "2"
        },
        {
            label: 'Term-3',
            value: "3"
        }
    ]

    // laytime final submission 
    const HandleLaytimeSubmit = (e) => {
        dispatch(submitLaytime(laytimeHeaderInput, laytimeRowInput, e, show, setShow))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <div className="card card-custom gutter-b">
                        <div className="card-header">
                            <div className="card-title">
                                <h3 className="card-label">Laytime Row</h3>
                            </div>
                        </div>
                        <div className="card-body">
                            <form
                                className="form form-label-right"
                            // method="post"
                            >
                                <div className="form-group">
                                    <div className="row">
                                        <Form.Check
                                            className="m-3"
                                            type="radio"
                                            label="Loading"
                                            name="intType"
                                            id="formHorizontalRadios1"
                                            value={1}
                                            onChange={(e) => handleChangeTextInput('intType', e.target.value)}
                                        />
                                        <Form.Check
                                            className="m-3"
                                            type="radio"
                                            label="Discharging"
                                            name="intType"
                                            id="formHorizontalRadios1"
                                            value={2}
                                            onChange={(e) => handleChangeTextInput('intType', e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 pr-11">
                                            <label className="form-label">Port Name</label>
                                            <RHFInput
                                                as={<Select options={selectPort} />}
                                                rules={{ required: true }}
                                                name="intPortID"
                                                register={register}
                                                value={laytimeRowInput.intPortID}
                                                onChange={(option) => {
                                                    handleChangeTextInput("strPortName", option.label);
                                                    handleChangeTextInput("intPortID", option.value);
                                                }}
                                                ref={register({
                                                    required: true,
                                                    maxLength: 100,
                                                })}
                                                setValue={setValue}
                                            />
                                        </div>
                                        <div className="row col-md-6 p-0">
                                            <div className="col-md-6 p-0 mr-4">
                                                <label className="form-label mt-2 formFont">Laytime Commenced</label>
                                                <DatePicker
                                                    name="dteLaytimeCommenced"
                                                    className="form-control formHeight"
                                                    selected={laytimeRowInput.dteLaytimeCommenced}
                                                    onChange={(e) => handleChangeTextInput("dteLaytimeCommenced", e)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                            <div className="col-md-4 ml-4 pl-0" style={{ minWidth: "37%" }}>
                                                <label className="form-label mt-2 formFont">Laytime Completed</label>
                                                <DatePicker
                                                    name="dteLaytimeCompleted"
                                                    className="form-control formHeight"
                                                    selected={laytimeRowInput.dteLaytimeCompleted}
                                                    onChange={(e) => handleChangeTextInput("dteLaytimeCompleted", e)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label">Cargo Name</label>
                                                <RHFInput
                                                    as={<Select options={selectCargo} />}
                                                    rules={{ required: true }}
                                                    name="intCargoID"
                                                    register={register}
                                                    value={laytimeRowInput.intCargoID}
                                                    onChange={(option) => {
                                                        handleChangeTextInput("strCargoName", option.label);
                                                        handleChangeTextInput("intCargoID", option.value);
                                                    }}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                    setValue={setValue}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">B/L Quantity</label>
                                                <Form.Control
                                                    type="number"
                                                    name="numBLQty"
                                                    className="fromStyle formHeight"
                                                    value={laytimeRowInput.numBLQty}
                                                    onChange={(e) => handleChangeTextInput("numBLQty", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-11">
                                            <label className="form-label">Terms</label>
                                            <RHFInput
                                                as={<Select options={selectTerms} />}
                                                rules={{ required: true }}
                                                name="intTermsID"
                                                register={register}
                                                value={laytimeRowInput.intTermsID}
                                                onChange={(option) => {
                                                    handleChangeTextInput("strTermsName", option.label);
                                                    handleChangeTextInput("intTermsID", option.value);
                                                }}
                                                ref={register({
                                                    required: true,
                                                    maxLength: 100,
                                                })}
                                                setValue={setValue}
                                            />
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="row col-md-6">
                                            <div className="col-md-12">
                                                <label className="form-label mt-2 formFont">Time Allowed</label>
                                                <Form.Control
                                                    type="number"
                                                    name="numTimeAllowence"
                                                    className="fromStyle formHeight"
                                                    value={laytimeRowInput.numTimeAllowence}
                                                    onChange={(e) => handleChangeTextInput("numTimeAllowence", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                           {/* <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">Day</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                    onChange={(e) => handleChangeTextInput("intVoyageNumber", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                                */}
                                        </div>
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Additional/Saved Times</label>
                                                <Form.Control
                                                    type="number"
                                                    name="intAdditionalDay"
                                                    className="fromStyle formHeight"
                                                    value={laytimeRowInput.intAdditionalDay}
                                                    onChange={(e) => handleChangeTextInput("intAdditionalDay", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">Hrs</label>
                                                <Form.Control
                                                    type="number"
                                                    name="numAdditionalHrs"
                                                    className="fromStyle formHeight"
                                                    value={laytimeRowInput.numAdditionalHrs}
                                                    onChange={(e) => handleChangeTextInput("numAdditionalHrs", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="row col-md-6">
                                            <div className="col-md-12">
                                                <label className="form-label mt-2 formFont">Arrival Time</label>
                                                <DatePicker
                                                    name="dteTermArraivalTime"
                                                    className="form-control formHeight"
                                                    selected={laytimeRowInput.dteTermArraivalTime}
                                                    onChange={(e) => handleChangeTextInput("dteTermArraivalTime", e)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row col-md-6">
                                            <div className="col-md-12">
                                                <label className="form-label mt-2 formFont">Sailing Time</label>
                                                <DatePicker
                                                    name="dteTermSailTime"
                                                    className="form-control formHeight"
                                                    selected={laytimeRowInput.dteTermSailTime}
                                                    onChange={(e) => handleChangeTextInput("dteTermSailTime", e)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Demurrage Rate</label>
                                                <Form.Control
                                                    type="number"
                                                    name="numDemurrageRate"
                                                    className="fromStyle formHeight"
                                                    value={laytimeRowInput.numDemurrageRate}
                                                    onChange={(e) => handleChangeTextInput("numDemurrageRate", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">USD</label>
                                                <Form.Control
                                                    type="number"
                                                    name="intDemurrageCurrID"
                                                    className="fromStyle formHeight"
                                                    value={laytimeRowInput.intDemurrageCurrID}
                                                    onChange={(e) => handleChangeTextInput("intDemurrageCurrID", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Despatch Rate</label>
                                                <Form.Control
                                                    type="number"
                                                    name="numDespatchRate"
                                                    className="fromStyle formHeight"
                                                    value={laytimeRowInput.numDespatchRate}
                                                    onChange={(e) => handleChangeTextInput("numDespatchRate", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">Percentage</label>
                                                <Form.Control
                                                    type="number"
                                                    name="numDespatchRatePercent"
                                                    className="fromStyle formHeight"
                                                    value={laytimeRowInput.numDespatchRatePercent}
                                                    onChange={(e) => handleChangeTextInput("numDespatchRatePercent", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="row col-md-6">
                                            <div className="col-md-12">
                                                <label className="form-label mt-2 formFont">NOR Tender</label>
                                                <DatePicker
                                                    name="dteNORtender"
                                                    className="form-control formHeight"
                                                    selected={laytimeRowInput.dteNORtender}
                                                    onChange={(e) => handleChangeTextInput("dteNORtender", e)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Load Rate</label>
                                                <Form.Control
                                                    type="number"
                                                    name="numLodingOrDischargeRate"
                                                    className="fromStyle formHeight"
                                                    value={laytimeRowInput.numLodingOrDischargeRate}
                                                    onChange={(e) => handleChangeTextInput("numLodingOrDischargeRate", e.target.value)}
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">

                                    </div>
                                    <div className="col-sm-2">
                                        {/* <a onClick={() => {
                                            history.push("/voyage/laytime/laytimeinfo2");
                                        }}> */}
                                        {!loading && (
                                            <button type="button" class="saveButton text-white btn ml-6" onClick={(e) => HandleLaytimeSubmit(e)}>Add</button>

                                        )}
                                        {loading && (
                                            <button type="button" class="saveButton disabled={true} text-white btn ml-6">
                                                <span className="p-2">
                                                    Adding...
                                                </span>
                                                <span className="ml-3 spinner spinner-white "></span>
                                            </button>

                                        )}
                                        {/* <button type="button" class="saveButton text-white btn ml-6" onClick={(e) => HandleLaytimeSubmit(e)}>Add</button> */}
                                        {/* </a> */}
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <LaytimeDetail />
                </div>
            </div>

            {
                laytimeDataList.length > 0 && (
                    <div className="row">
                        <div className="col-md-9">
                            <LaytimeMultipleAdd />
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default LaytimeRow;
