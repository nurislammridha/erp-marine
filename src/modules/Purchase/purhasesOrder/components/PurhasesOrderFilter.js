import React from 'react';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Select from "react-select";

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
    );
};

export default PurhasesOrderFilter;