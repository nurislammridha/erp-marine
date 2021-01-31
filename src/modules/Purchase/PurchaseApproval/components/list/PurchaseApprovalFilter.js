import React from 'react';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Select from "react-select";
import DatePicker from "react-datepicker";

import moment from "moment"
const PurchaseApprovalFilter = () => {
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
                <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont"> From Date</label>
                    <DatePicker
                        className="date-picker"
                        name="dteCommenceDate"
                        dateFormat="MM-dd-yyyy"
                        minDate={moment().toDate()}
                        placeholderText="select commence date"
                        // selected={VesselBooking.dteCommenceDate !== '' ? moment(VesselBooking.dteCommenceDate).toDate() : null}
                        // onChange={(date) => handleChangeTextInput("dteCommenceDate", date)}
                        ref={register({
                            required: true,
                            maxLength: 100,
                        })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont"> To Date</label>
                    <DatePicker
                        className="date-picker"
                        name="dteCommenceDate"
                        dateFormat="MM-dd-yyyy"
                        minDate={moment().toDate()}
                        placeholderText="select commence date"
                        // selected={VesselBooking.dteCommenceDate !== '' ? moment(VesselBooking.dteCommenceDate).toDate() : null}
                        // onChange={(date) => handleChangeTextInput("dteCommenceDate", date)}
                        ref={register({
                            required: true,
                            maxLength: 100,
                        })}
                    />
                    <i className="fas fa-calendar-alt"></i>
                </div>
            </div>
        </form>
    );
};

export default PurchaseApprovalFilter;