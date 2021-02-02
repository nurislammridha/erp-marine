import React from 'react';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Select from "react-select";
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Button, Card } from 'react-bootstrap';

const PurhasesOrderFilter = () => {
    const { register, setValue } = useForm();
    const history = useHistory()

    const shipList = [
        {
            value: 1,
            label: "Akij"
        },
        {
            value: 2,
            label: "Akij Noor"
        },
    ]
    return (
        <>
            <Card>
                <Card.Body>
                    <div className="row mb-5 table-form">
                        <div className="col-xl-2 col-lg-2 col-md-2 col-5">
                            <h1 className="tableheading mt-0 ">Purchase Order</h1>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-5">
                            <Paper className="searchInput">
                                <InputBase
                                    className="custome-purchase-search"
                                    placeholder="Search"
                                // value={searchText}
                                // onChange={searchProduct}
                                />
                                <IconButton aria-label="Search" className="searchPlaceholder purchaseSearch">
                                    <i className="flaticon-search "></i>
                                </IconButton>
                            </Paper>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-5"></div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-5">
                            <button
                                className="btn btn-primary btn-sm float-right"
                                onClick={() => history.push('/purchase/order/create')}
                            >
                                New PO
                            </button>
                        </div>
                    </div> <hr />
                    <form className="form form-label-right voyageEngineerForm" autoComplete="off" >
                        {/*****************Basic information ***************/}
                        <div className="form-group row mb-1">
                            <div className="col-xl-3 col-lg-3 col-6">
                                <label className="formFont">SBU</label>
                                <RHFInput
                                    as={<Select options={shipList} />}
                                    rules={{ required: false }}
                                    name="intShipId"
                                    register={register}
                                    // onChange={(option) => {
                                    //   handleChangeTextInput('strShipName', option.label);
                                    //   handleChangeTextInput('intShipId', option.value)
                                    // }}
                                    setValue={setValue}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-6">
                                <label className="formFont">Branch</label>
                                <RHFInput
                                    as={<Select options={shipList} />}
                                    rules={{ required: false }}
                                    name="intShipId"
                                    register={register}
                                    // onChange={(option) => {
                                    //   handleChangeTextInput('strShipName', option.label);
                                    //   handleChangeTextInput('intShipId', option.value)
                                    // }}
                                    setValue={setValue}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-6">
                                <label className="formFont">Purchase Organisation</label>
                                <RHFInput
                                    as={<Select options={shipList} />}
                                    rules={{ required: false }}
                                    name="intShipId"
                                    register={register}
                                    // onChange={(option) => {
                                    //   handleChangeTextInput('strShipName', option.label);
                                    //   handleChangeTextInput('intShipId', option.value)
                                    // }}
                                    setValue={setValue}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-6">
                                <label className="formFont">Refference Type</label>
                                <RHFInput
                                    as={<Select options={shipList} />}
                                    rules={{ required: false }}
                                    name="intShipId"
                                    register={register}
                                    // onChange={(option) => {
                                    //   handleChangeTextInput('strShipName', option.label);
                                    //   handleChangeTextInput('intShipId', option.value)
                                    // }}
                                    setValue={setValue}
                                />
                            </div>
                        </div>
                    </form>

                </Card.Body >
            </Card >
        </>
    );
};

export default PurhasesOrderFilter;