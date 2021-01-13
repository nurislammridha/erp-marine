import React from 'react';
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import LaytimeDetail from '../detail/LaytimeDetail';

const LaytimeInfo2Add = () => {

    const { register, handleSubmit, errors, setValue } = useForm();

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <div className="card card-custom gutter-b">
                        <div className="card-header">
                            <div className="card-title">
                                <h3 className="card-label">Laytime Information-2</h3>
                            </div>
                        </div>
                        <div className="card-body">
                            <form
                                className="form form-label-right"
                                method="post"
                            >
                                <div className="form-group">
                                    <div className="row">
                                        <Form.Check
                                            className="m-3"
                                            type="radio"
                                            label="Loading"
                                        />
                                        <Form.Check
                                            className="m-3"
                                            type="radio"
                                            label="Discharging"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 pr-11">
                                            <label className="form-label">Port Name</label>
                                            <RHFInput
                                                as={<Select options={""} />}
                                                rules={{ required: true }}
                                                name=""
                                                register={register}
                                                value=""
                                            />
                                        </div>
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Laytime Commenced</label>
                                                <DatePicker
                                                    name=""
                                                    className="form-control formHeight"
                                                    placeholderText=""
                                                    selected=""
                                                    ref={register({
                                                        required: true,
                                                        maxLength: 100,
                                                    })}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">Laytime Comp.</label>
                                                <DatePicker
                                                    name=""
                                                    className="form-control formHeight"
                                                    placeholderText=""
                                                    selected=""
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
                                                <label className="form-label mt-2 formFont">Cargo Name</label>
                                                <Form.Control
                                                    type="text"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">B/L Quantity</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pr-11">
                                            <label className="form-label">Terms</label>
                                            <RHFInput
                                                as={<Select options={""} />}
                                                rules={{ required: true }}
                                                name=""
                                                register={register}
                                                value=""
                                            />
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Time Allowed</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">Day</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Saved Times</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">Hrs</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Arrival Time</label>
                                                <DatePicker
                                                    name=""
                                                    className="form-control formHeight"
                                                    placeholderText=""
                                                    selected=""
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
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Sailing Time</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">Hrs</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
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
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">USD</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Despatch Rate</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label mt-2 formFont">Percentage</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">NOR Tender</label>
                                                <DatePicker
                                                    name=""
                                                    className="form-control formHeight"
                                                    placeholderText=""
                                                    selected=""
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
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                        <div className="row col-md-6">
                                            <div className="col-md-7">
                                                <label className="form-label mt-2 formFont">Load Rate</label>
                                                <Form.Control
                                                    type="number"
                                                    name=""
                                                    className="fromStyle formHeight"
                                                    value=""
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
                                    <div>
                                        {/* <a onClick={() => {
                                            history.push("/voyage/laytime/laytimeinfo2");
                                        }}> */}
                                        <button type="submit" class="mr-4 saveButton text-white btn">Add</button>
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


        </div>
    );
}

export default LaytimeInfo2Add;
