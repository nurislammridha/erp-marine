import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import LaytimeInfo1Modal from './LaytimeInfo1Modal';
import SimpleModal from '../../../../master/components/Modal/SimpleModal';

const LaytimeInfo1Add = () => {
    const selectOptions = [
        {
            label: 'Active',
            value: "1"
        },
        {
            label: 'In Active',
            value: "0"
        }
    ]
    const { register, handleSubmit, errors, setValue } = useForm();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleClick = () => {
        handleShow();
    };


    return (
        <div className="container">
            <div className="card card-custom gutter-b">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Laytime Information-1</h3>
                    </div>
                </div>
                <div className="card-body">
                    <form
                        className="form form-label-right"
                        method="post"
                    >
                        <div className="form-group row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">Vessel Name</label>
                                        <RHFInput
                                            as={<Select options={selectOptions} />}
                                            rules={{ required: true }}
                                            name=""
                                            register={register}
                                            value=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label mt-2 formFont">Voyage No.</label>
                                        <Form.Control
                                            type="number"
                                            name=""
                                            className="fromStyle formHeight"
                                            value="{certificateInfoInput.strCustomeCode}"
                                        />
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-6">
                                        <label className="form-label">Commencement Port</label>
                                        <RHFInput
                                            as={<Select options={selectOptions} />}
                                            rules={{ required: true }}
                                            name=""
                                            register={register}
                                            value=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label mt-2 formFont">Commencement Date </label>
                                        <DatePicker
                                            name=""
                                            className="form-control formHeight"
                                            placeholderText="select issue date"
                                            selected=""
                                            ref={register({
                                                required: true,
                                                maxLength: 100,
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-6">
                                        <label className="form-label">Completion Port</label>
                                        <RHFInput
                                            as={<Select options={selectOptions} />}
                                            rules={{ required: true }}
                                            name=""
                                            register={register}
                                            value=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label mt-2 formFont">Completion Date</label>

                                        <DatePicker
                                            name=""
                                            className="form-control formHeight"
                                            placeholderText="select issue date"
                                            selected=""
                                            ref={register({
                                                required: true,
                                                maxLength: 100,
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-6">
                                        <label className="form-label">C/P Date</label>
                                        <DatePicker
                                            name=""
                                            className="form-control formHeight"
                                            placeholderText="select issue date"
                                            selected=""
                                            ref={register({
                                                required: true,
                                                maxLength: 100,
                                            })}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label mt-2 formFont">Charterer</label>
                                        <RHFInput
                                            as={<Select options={selectOptions} />}
                                            rules={{ required: true }}
                                            name=""
                                            register={register}
                                            value=""
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="border rounded">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <Form.Check
                                                className="m-3"
                                                type="radio"
                                                label="REVERSIBLE"
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <Form.Check
                                                className="m-3"
                                                type="radio"
                                                label="NON-REVERSIBLE"
                                            />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row m-3">
                                        <Form.Check
                                            className=""
                                            type="checkbox"
                                            label="Loading Port"
                                        />
                                        <a>
                                            {<i class="fas fa-file ml-10"
                                                onClick={() => handleClick()}></i>}
                                        </a>
                                    </div>
                                    <div className="row m-3">
                                        <Form.Check
                                            className=""
                                            type="checkbox"
                                            label="Discharge Port"
                                        />
                                        <a>
                                            {<i class="fas fa-file ml-6"
                                                onClick={() => handleClick()}></i>}
                                        </a>
                                    </div>
                                </div>
                                <div className="border rounded mt-5">
                                    <Form.Check
                                        className="m-3"
                                        type="radio"
                                        label="Always On Demurrage"
                                    />
                                    <Form.Check
                                        className="m-3"
                                        type="radio"
                                        label="Not Always On Demurrage"
                                    />
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
                                <button type="submit" class="mr-4 saveButton text-white btn">Next</button>
                                {/* </a> */}
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <SimpleModal
                show={show}
                handleClose={() => handleClose()}
                modalTitle={"Demurrage/Dispatch Rate"}
            >
                <LaytimeInfo1Modal />
            </SimpleModal>
        </div >
    );
}

export default LaytimeInfo1Add;
