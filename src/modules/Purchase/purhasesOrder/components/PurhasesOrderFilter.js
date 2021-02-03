import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Select from "react-select";
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Card } from 'react-bootstrap';
import { getBranchList, getPurchaseOrder, getPurchaseOrganization, getReferenceType, getSBUlist, purchaseOrderFilter } from '../_redux/actions/PurhasesOrderAction';

const PurhasesOrderFilter = () => {
    const { register, setValue } = useForm();
    const history = useHistory()
    const sbuList = useSelector(state => state.purchasesOrderInfo.sbuList);
    const branchList = useSelector(state => state.purchasesOrderInfo.branchList);
    const purchaseOrganization = useSelector(state => state.purchasesOrderInfo.purchaseOrganization);
    const referenceType = useSelector(state => state.purchasesOrderInfo.referenceType);
    const orderFilter = useSelector(state => state.purchasesOrderInfo.orderFilter);
    const { intSBUId, intBusinessUnitId, intPurchaseOrganizationId, intPOReferenceTypeId } = orderFilter;
    const dispatch = useDispatch();
    // const handleChangeSBU =(value)=>{
    //     dispatch()
    // }

    useEffect(() => {
        dispatch(getSBUlist())
        dispatch(getBranchList())
        dispatch(getPurchaseOrganization())
        dispatch(getReferenceType())
    }, [])
    const handleChangeInput = (name, value) => {
        dispatch(purchaseOrderFilter(name, value))

    }
    useEffect(() => {
        dispatch(getPurchaseOrder(orderFilter))
    }, [orderFilter])
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
                            {intSBUId && intBusinessUnitId && intPurchaseOrganizationId && intPOReferenceTypeId && (
                                <button
                                    className="btn btn-primary btn-sm float-right"
                                    onClick={() => history.push('/purchase/order/create')}
                                >
                                    New PO
                                </button>
                            )}

                        </div>
                    </div> <hr />
                    <form className="form form-label-right voyageEngineerForm" autoComplete="off" >
                        {/*****************Basic information ***************/}
                        <div className="form-group row mb-1">
                            <div className="col-xl-3 col-lg-3 col-6">
                                <label className="formFont">SBU</label>
                                <RHFInput
                                    as={<Select options={sbuList} />}
                                    rules={{ required: false }}
                                    name="intSBUId"
                                    register={register}
                                    onChange={(option) => {
                                        handleChangeInput("intSBUId", option.value);
                                        handleChangeInput("strSBUName", option.label);
                                    }}
                                    setValue={setValue}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-6">
                                <label className="formFont">Branch</label>
                                <RHFInput
                                    as={<Select options={branchList} />}
                                    rules={{ required: false }}
                                    name="intBusinessUnitId"
                                    register={register}
                                    onChange={(option) => {
                                        handleChangeInput("intBusinessUnitId", option.value);
                                        handleChangeInput("strBusinessUnitName", option.label);
                                    }}
                                    setValue={setValue}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-6">
                                <label className="formFont">Purchase Organisation</label>
                                <RHFInput
                                    as={<Select options={purchaseOrganization} />}
                                    rules={{ required: false }}
                                    name="intPurchaseOrganizationId"
                                    register={register}
                                    onChange={(option) => {
                                        handleChangeInput("intPurchaseOrganizationId", option.value);
                                        handleChangeInput("strPurchaseOrganizationName", option.label);
                                    }}
                                    setValue={setValue}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-6">
                                <label className="formFont">Refference Type</label>
                                <RHFInput
                                    as={<Select options={referenceType} />}
                                    rules={{ required: false }}
                                    name="intPOReferenceTypeId"
                                    register={register}
                                    onChange={(option) => {
                                        handleChangeInput("intPOReferenceTypeId", option.value);
                                        handleChangeInput("strPOReferenceType", option.label);
                                    }}
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