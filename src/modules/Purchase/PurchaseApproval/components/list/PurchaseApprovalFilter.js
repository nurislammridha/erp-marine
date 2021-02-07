import React, { useEffect } from 'react';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment"
import { getPurchaseApprovalList, getSBUName, getShipName, handleChangePurchaseApprovalFilterInput } from '../../_redux/actions/PurchaseApprovalAction';
import { getBranchName } from '../../../POApproval/_redux/actions/POApprovalAction';

const PurchaseApprovalFilter = () => {
    const { register, setValue } = useForm();
    const dispatch = useDispatch();
    const PurchaseApprovalFilterInput = useSelector((state) => state.purchaseApprovalFilter.PurchaseApprovalFilterInput);
    const shipOptionData = useSelector((state) => state.purchaseApprovalFilter.shipNameData);
    const SBUOptionData = useSelector((state) => state.purchaseApprovalFilter.SBUNameData);
    const branchOptionData = useSelector((state) => state.POApprovalFilter.branchNameData);

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangePurchaseApprovalFilterInput(name, value));
        changeFilter();
    };
    console.log('PurchaseApprovalFilterInput :>> ', PurchaseApprovalFilterInput);

    const changeFilter = () => {
        const { search, intSBUId, intBusinessUnitId, intShipID, dteFromDate, dteToDate } = PurchaseApprovalFilterInput;
        dispatch(getPurchaseApprovalList(search, intSBUId, intBusinessUnitId, intShipID, dteFromDate, dteToDate));
    }

    useEffect(() => {
        dispatch(getShipName());
        dispatch(getBranchName());
        dispatch(getSBUName());
    }, []);

    const categorySelecte = (intSBUId) => {
        dispatch(getPurchaseApprovalList(null, intSBUId, null, null, null, null)
        );
    };

    useEffect(() => {
        changeFilter();
    }, [dispatch]);

    return (
        <form className="form form-label-right voyageEngineerForm" autoComplete="off" >
            {/*****************Basic information ***************/}
            <div className="form-group mb-1">
                <div className="row">
                    <div className="col-md-4 col-6">
                        <label className="formFont">SBU</label>
                        <RHFInput
                            as={<Select options={SBUOptionData} />}
                            rules={{ required: false }}
                            name="intSBUId"
                            register={register}
                            onChange={(option) => {
                                handleChangeTextInput('strBusinessUnitName', option.label);
                                handleChangeTextInput('intSBUId', option.value);
                                    // categorySelecte(option.value)
                            }}
                            setValue={setValue}
                        />
                    </div>
                    <div className="col-md-4 col-6">
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

                    <div className="col-md-4 col-6">
                        <label className="formFont">Ship Name</label>
                        <RHFInput
                            as={<Select options={shipOptionData} />}
                            rules={{ required: false }}
                            name="intShipID"
                            register={register}
                            onChange={(option) => {
                                handleChangeTextInput('strShipName', option.label);
                                handleChangeTextInput('intShipID', option.value)
                            }}
                            setValue={setValue}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-6">
                        <label className="formFont"> From Date</label>
                        <DatePicker
                            className="date-picker"
                            name="dteFromDate"
                            dateFormat="MM-dd-yyyy"
                            minDate={moment().toDate()}
                            selected={PurchaseApprovalFilterInput.dteFromDate}
                            onChange={(date) => handleChangeTextInput("dteFromDate", date)}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                        />
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className="col-md-4 col-6">
                        <label className="formFont"> To Date</label>
                        <DatePicker
                            className="date-picker"
                            name="dteToDate"
                            dateFormat="MM-dd-yyyy"
                            minDate={PurchaseApprovalFilterInput.dteFromDate}
                            selected={PurchaseApprovalFilterInput.dteToDate}
                            onChange={(date) => handleChangeTextInput("dteToDate", date)}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                        />
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PurchaseApprovalFilter;