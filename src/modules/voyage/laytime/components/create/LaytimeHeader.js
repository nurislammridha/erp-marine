import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleModal from '../../../../master/components/Modal/SimpleModal';
import { handleChangeLaytimeHeaderInput } from '../../_redux/actions/LaytimeAction';
import { useSelector, useDispatch } from "react-redux";
import LaytimeHeaderModal from './LaytimeHeaderModal';

const LaytimeHeader = () => {
    const dispatch = useDispatch();

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

    const laytimeHeaderInput = useSelector((state) => state.laytimeHeaderInfo.laytimeHeaderInput);

    console.log('laytimeHeaderInput :>> ', laytimeHeaderInput);
    const handleClick = (e) => {
        handleShow()
    };
    //handle lay-time header input 
    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeLaytimeHeaderInput(name, value));
    };
    return (
        <div className="container">
            <div className="card card-custom gutter-b">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Laytime Header</h3>
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
                                            name="intShipID"
                                            register={register}
                                            value={laytimeHeaderInput.intShipID}
                                            onChange={(option) => {
                                                handleChangeTextInput(
                                                    "strShipName",
                                                    option.label
                                                );
                                                handleChangeTextInput(
                                                    "intShipID",
                                                    option.value
                                                );
                                            }}
                                            setValue={setValue}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label mt-2 formFont">Voyage No.</label>
                                        <Form.Control
                                            type="number"
                                            name="intCharterVoyageID"
                                            className="fromStyle formHeight"
                                            value={laytimeHeaderInput.intCharterVoyageID}
                                            onChange={(e) =>
                                                handleChangeTextInput(
                                                    "intCharterVoyageID",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-6">
                                        <label className="form-label">Commencement Port</label>
                                        <RHFInput
                                            as={<Select options={selectOptions} />}
                                            rules={{ required: true }}
                                            name="intCommencementPortID"
                                            register={register}
                                            value={laytimeHeaderInput.intCommencementPortID}
                                            onChange={(option) => {
                                                handleChangeTextInput(
                                                    "CommencementPortName",
                                                    option.label
                                                );
                                                handleChangeTextInput(
                                                    "intCommencementPortID",
                                                    option.value
                                                );
                                            }}
                                            setValue={setValue}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label mt-2 formFont">Commencement Date </label>
                                        <DatePicker
                                            name="dteCommencedDate"
                                            className="form-control formHeight"
                                            placeholderText="select issue date"
                                            selected={laytimeHeaderInput.dteCommencedDate}
                                            onChange={(e) =>
                                                handleChangeTextInput(
                                                    "dteCommencedDate",
                                                    e
                                                )
                                            }
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
                                            name="intCompletionPortID"
                                            register={register}
                                            value={laytimeHeaderInput.intCompletionPortID}
                                            onChange={(option) => {
                                                handleChangeTextInput(
                                                    "intCompletionPortName",
                                                    option.label
                                                );
                                                handleChangeTextInput(
                                                    "intCompletionPortID",
                                                    option.value
                                                );
                                            }}
                                            setValue={setValue}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label mt-2 formFont">Completion Date</label>

                                        <DatePicker
                                            name="dteCompletionDate"
                                            className="form-control formHeight"
                                            placeholderText="select issue date"
                                            selected={laytimeHeaderInput.dteCompletionDate}
                                            onChange={(e) =>
                                                handleChangeTextInput(
                                                    "dteCompletionDate",
                                                    e
                                                )
                                            }
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
                                            name="dteCPDate"
                                            className="form-control formHeight"
                                            placeholderText="select issue date"
                                            selected={laytimeHeaderInput.dteCPDate}
                                            onChange={(e) =>
                                                handleChangeTextInput(
                                                    "dteCPDate",
                                                    e
                                                )
                                            }
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
                                            name="intChartererID"
                                            register={register}
                                            value={laytimeHeaderInput.intChartererID}
                                            onChange={(option) => {
                                                handleChangeTextInput(
                                                    "intChartererName",
                                                    option.label
                                                );
                                                handleChangeTextInput(
                                                    "intChartererID",
                                                    option.value
                                                );
                                            }}
                                            setValue={setValue}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="border rounded">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Form.Check
                                                className="m-3"
                                                type="radio"
                                                label="REVERSIBLE"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                        </div>
                                        <div className="col-sm-7">
                                            <Form.Check
                                                className="m-3"
                                                type="radio"
                                                label="NON-REVERSIBLE"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row m-3">
                                        <Form.Check
                                            className=""
                                            type="checkbox"
                                            label="Loading Port"
                                        // onChange={(e) => handleClick(e.target.checked)}
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

                    </form>
                </div>
            </div>
            <SimpleModal
                show={show}
                handleClose={() => handleClose()}
                modalTitle={"Demurrage/Dispatch Rate"}
            >
                <LaytimeHeaderModal />
            </SimpleModal>
        </div >
    );
}

export default LaytimeHeader;
