import React, { useEffect } from 'react';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Select from "react-select";
import { getShipName, getSBUName, handleChangePOApprovalFilterInput, getBranchName } from '../../_redux/actions/POApprovalAction';


const POFilter = () => {
    const { register, setValue } = useForm();
    const dispatch = useDispatch();

    const POApprovalFilterInput = useSelector((state) => state.POApprovalFilter.POApprovalFilterInput);
    const shipOptionData = useSelector((state) => state.POApprovalFilter.shipNameData);
    const SBUOptionData = useSelector((state) => state.POApprovalFilter.SBUNameData);
    const branchOptionData = useSelector((state) => state.POApprovalFilter.branchNameData);

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangePOApprovalFilterInput(name, value));
    };

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


    useEffect(() => {
        dispatch(getShipName());
        dispatch(getBranchName());
        dispatch(getSBUName());


    }, []);

    return (
        <form className="form form-label-right voyageEngineerForm" autoComplete="off" >
            {/*****************Basic information ***************/}
            <div className="form-group row mb-1">
                <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">SBU</label>
                    <RHFInput
                        as={<Select options={SBUOptionData} />}
                        rules={{ required: false }}
                        name="intSBUId"
                        register={register}
                        onChange={(option) => {
                            handleChangeTextInput('strSBUName', option.label);
                            handleChangeTextInput('intSBUId', option.value)
                        }}
                        setValue={setValue}
                    />
                </div>
                <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Branch</label>
                    <RHFInput
                        as={<Select options={branchOptionData} />}
                        rules={{ required: false }}
                        name="intBusinessUnitId"
                        register={register}
                        onChange={(option) => {
                            handleChangeTextInput('strBusinessUnitName', option.label);
                            handleChangeTextInput('intBusinessUnitId', option.value)
                        }}
                        setValue={setValue}
                    />
                </div>
                <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Ship Name</label>
                    <RHFInput
                        as={<Select options={shipOptionData} />}
                        rules={{ required: false }}
                        name="intShipId"
                        register={register}
                        onChange={(option) => {
                            handleChangeTextInput('strShipName', option.label);
                            handleChangeTextInput('intShipId', option.value)
                        }}
                        setValue={setValue}
                    />
                </div>
                <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Refference Type</label>
                    <RHFInput
                        as={<Select options={shipList} />}
                        rules={{ required: false }}
                        name=""
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

export default POFilter;