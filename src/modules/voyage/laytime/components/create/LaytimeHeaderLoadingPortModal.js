import React, { useEffect } from 'react';
import { Form, Button, Col, Row, FormControl, InputGroup } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrencyData } from '../../_redux/actions/LaytimeAction';

const LaytimeHeaderLoadingPortModal = (props) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, errors, setValue } = useForm();
    const { laytimeHeaderInput, handleChangeTextInput } = props;
    const isLoading = "";
    const currency = [
        {
            label: 'TK',
            value: "1"
        },
        {
            label: 'USD',
            value: "2"
        },
        {
            label: 'Euro',
            value: "3"
        },
        {
            label: 'CAD',
            value: "4"
        }
    ]
    //currency data 
    const currencyList = useSelector((state) => state.currencyInfo.currencyList);
    let Currency = [];
    if (currencyList) {
        currencyList.forEach((item) => {
            let getCurrency = {
                value: item.intCurrencyID,
                label: item.strCurrencyName,
            };
            Currency.push(getCurrency);
        });
    }
    useEffect(() => {
        dispatch(GetCurrencyData());
    }, []);
    console.log('Currency :>> ', Currency);
    return (
        <>
            <div className="col-md-9">
                <div className="row">
                    <div className="col-md-8">
                        <label className="form-label mt-2 formFont">Demurrage Rate</label>
                        <Form.Control
                            type="number"
                            name=""
                            className="fromStyle formHeight"
                            value={laytimeHeaderInput.numDemurrageRate}
                            onChange={(e) =>
                                handleChangeTextInput(
                                    "numDemurrageRate",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label mt-5 formFont"></label>
                        <RHFInput
                            as={<Select options={currency} />}
                            className="fromStyle formHeight"
                            rules={{ required: true }}
                            name="intChartererID"
                            register={register}
                            // value={laytimeHeaderInput.intChartererID}
                            // onChange={(option) => {
                            //     handleChangeTextInput("intChartererName", option.label);
                            //     handleChangeTextInput("intChartererID", option.value);
                            // }}
                            setValue={setValue}
                        />
                        {/* <Form.Control
                                type="number"
                                name=""
                                className="fromStyle formHeight"
                            // value={laytimeHeaderInput.numDespatchRate}
                            // onChange={(e) =>
                            //     handleChangeTextInput(
                            //         "numDespatchRate",
                            //         e.target.value
                            //     )
                            // }
                            /> */}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-8">
                        <label className="form-label mt-2 formFont">Despatch Rate</label>
                        <Form.Control
                            type="number"
                            name=""
                            className="fromStyle formHeight"
                        // value={laytimeHeaderInput.numDespatchRate}
                        // onChange={(e) =>
                        //     handleChangeTextInput(
                        //         "numDespatchRate",
                        //         e.target.value
                        //     )
                        // }
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label mt-5 formFont"></label>
                        <InputGroup>
                            <FormControl
                                className="fromStyle formHeight"
                                type="number"
                                placeholder="75"
                                aria-describedby="basic-addon2"
                            // value={laytimeHeaderInput.numDespatchRate}
                            // onChange={(e) =>
                            //     handleChangeTextInput(
                            //         "numDespatchRate",
                            //         e.target.value
                            //     )
                            // }
                            />
                            <InputGroup.Append className="fromStyle formHeight">
                                <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
                <div className="row ml-1 mt-3">
                    {!isLoading && (
                        <Button variant="primary" type="submit" className="saveButton">
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

export default LaytimeHeaderLoadingPortModal;
