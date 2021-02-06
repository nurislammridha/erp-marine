import React, { useEffect } from 'react';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Select from "react-select";
import { getSBUName, handleChangePOApprovalFilterInput, getBranchName, getReferenceType, getPOApprovalList, getPurchaseOrganisationName } from '../../_redux/actions/POApprovalAction';


const POFilter = () => {
    const { register, setValue } = useForm();
    const dispatch = useDispatch();

    const POApprovalFilterInput = useSelector((state) => state.POApprovalFilter.POApprovalFilterInput);
    const purchaseOrganisationOptionData = useSelector((state) => state.POApprovalFilter.purchaseOrganisationNameData);
    const SBUOptionData = useSelector((state) => state.POApprovalFilter.SBUNameData);
    const branchOptionData = useSelector((state) => state.POApprovalFilter.branchNameData);
    const referenceTypeOptionData = useSelector((state) => state.POApprovalFilter.referenceTypeData);
    console.log('branchOptionData', branchOptionData);
    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangePOApprovalFilterInput(name, value));
        changeFilter();
    };

    const changeFilter = () => {
        const { search, intBusinessLineId, intBusinessUnitId, intPurchaseOrganizationId, intPOReferenceTypeId } = POApprovalFilterInput;
        dispatch(getPOApprovalList(search, intBusinessLineId, intBusinessUnitId, intPurchaseOrganizationId, intPOReferenceTypeId));
    }

    useEffect(() => {
        dispatch(getPurchaseOrganisationName());
        dispatch(getBranchName());
        dispatch(getSBUName());
        dispatch(getReferenceType());
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
                        name="intBusinessLineId"
                        register={register}
                        onChange={(option) => {
                            handleChangeTextInput('strSBUName', option.label);
                            handleChangeTextInput('intBusinessLineId', option.value)
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
                    <label className="formFont">Purchase Organisation</label>
                    <RHFInput
                        as={<Select options={purchaseOrganisationOptionData} />}
                        rules={{ required: false }}
                        name="intPurchaseOrganizationId"
                        register={register}
                        onChange={(option) => {
                            handleChangeTextInput('strPurchaseOrganizationName', option.label);
                            handleChangeTextInput('intPurchaseOrganizationId', option.value)
                        }}
                        setValue={setValue}
                    />
                </div>
                <div className="col-xl-3 col-lg-3 col-6">
                    <label className="formFont">Refference Type</label>
                    <RHFInput
                        as={<Select options={referenceTypeOptionData} />}
                        rules={{ required: false }}
                        name="intPOReferenceTypeId"
                        register={register}
                        onChange={(option) => {
                            handleChangeTextInput('strPOReferenceType', option.label);
                            handleChangeTextInput('intPOReferenceTypeId', option.value)
                        }}
                        setValue={setValue}
                    />
                </div>
            </div>
        </form>
    );
};

export default POFilter;