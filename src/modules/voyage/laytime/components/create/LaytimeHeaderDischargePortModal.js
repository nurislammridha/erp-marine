import React, { useEffect } from 'react';
import { Form, Button, Col, Row, FormControl, InputGroup } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrencyData, multipleLaytimeAction } from '../../_redux/actions/LaytimeAction';

const LaytimeHeaderDischargePortModal = (props) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, errors, setValue } = useForm();
    const { layTimeDemurrage, handleLayTimeDemurrageInput, handleClose, handleCloseLoadingPortModal, CurrencyList } = props;
    const isLoading = "";
    const currencyList = useSelector((state) => state.currencyInfo.currencyList);
   
    // add multiple demmurage data 
    const addMultipleDemmurage = () => {
        dispatch(multipleLaytimeAction(layTimeDemurrage, handleClose))
    }
    return (
        <>
            <div className="col-md-9">
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label mt-2 formFont">Demurrage Rate</label>
                        <Form.Control
                            type="number"
                            name="numDemurrageRate"
                            className="fromStyle formHeight"
                            value={layTimeDemurrage.numDemurrageRate}
                            onChange={(e) =>
                                handleLayTimeDemurrageInput(
                                    "numDemurrageRate",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mt-5 formFont"></label>
                        <RHFInput
                            as={<Select options={CurrencyList} />}
                            className="fromStyle formHeight"
                            rules={{ required: true }}
                            name="intCurrencyID"
                            register={register}
                            value={layTimeDemurrage.intCurrencyID}
                            onChange={(option) => {
                                handleLayTimeDemurrageInput("strCurrencyName", option.label);
                                handleLayTimeDemurrageInput("intCurrencyID", option.value);
                            }}
                            setValue={setValue}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label className="form-label mt-2 formFont">Despatch Rate</label>
                        <Form.Control
                            type="number"
                            name="numDespatchRate"
                            className="fromStyle formHeight"
                            value={layTimeDemurrage.numDespatchRate}
                            onChange={(e) =>
                                handleLayTimeDemurrageInput(
                                    "numDespatchRate",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mt-5 formFont"></label>
                        <InputGroup>
                            <FormControl
                                className="fromStyle formHeight"
                                type="number"
                                placeholder="75"
                                aria-describedby="basic-addon2"
                                name="numDespatchPercent"
                                value={layTimeDemurrage.numDespatchPercent}
                                onChange={(e) => handleLayTimeDemurrageInput("numDespatchPercent", e.target.value)}
                            />
                            <InputGroup.Append className="fromStyle formHeight">
                                <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
                <div className="row ml-1 mt-3">
                    {!isLoading && (
                        <Button variant="primary" type="submit" className="saveButton" onClick={addMultipleDemmurage}>
                            Add
                        </Button>
                    )}
                    {isLoading && (
                        <Button
                            variant="primary"
                            type="submit"
                            className="saveButton"
                            disabled={true}
                        >
                            <span className="p-2">
                                Adding...
                                </span>
                            <span className="ml-3 spinner spinner-white "></span>
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

export default LaytimeHeaderDischargePortModal;
