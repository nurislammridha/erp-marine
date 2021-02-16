import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { InputBase, Paper, IconButton, Divider } from "@material-ui/core";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { getBranchList, getSBUlist } from "../../purhasesOrder/_redux/actions/PurhasesOrderAction";
import { changeSupplierCSInput, getDataBySearch, getDataFilterSelect, getDepartmentList, searchSupplierInput } from "../_redux/action/SupplierCsAction";
const SupplierCSFilter = () => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const { register, setValue } = useForm();
    const sbuList = useSelector(state => state.purchasesOrderInfo.sbuList);
    const branchList = useSelector(state => state.purchasesOrderInfo.branchList);
    const departmentList = useSelector(state => state.supplierCsInfo.departmentList);
    const supplierCSInput = useSelector(state => state.supplierCsInfo.supplierCSInput);
    const search = useSelector(state => state.supplierCsInfo.search);

    useEffect(() => {
        dispatch(getSBUlist())
        dispatch(getBranchList())
        dispatch(getDepartmentList())
    }, [])
    useEffect(() => {
        if (search && search.length > 0) {
            setValue("intDepartmentId", "");
            setValue("intSBUId", "");
            setValue("intBranchId", "");
        }
        dispatch(getDataBySearch(search))
    }, [search, setValue, dispatch])
    useEffect(() => {
        dispatch(getDataFilterSelect(supplierCSInput))
    }, [supplierCSInput, dispatch])
    const handleChangeText = (name, value) => {
        dispatch(changeSupplierCSInput(name, value))

    }
    const searchSupplierCS = (value) => {
        dispatch(searchSupplierInput(value))

    }
    return (
        <>
            <form
                className="form form-label-right voyageEngineerForm"
                method="post"
            >
               <h1 className="tableheading font-weight-bold ">Supplier CS</h1>
                <div className="row mb-5 table-form ">
                 
                    <div className="offset-xl-8 offset-lg-8 col-xl-4 col-lg-4 col-md-6 mt-2">
                        <Paper className="searchInput supplier-search">
                            <InputBase
                                placeholder="Search"
                                // inputProps={{ "aria-label": "Search Google Maps" }}
                                onChange={(e) => searchSupplierCS(e.target.value)}
                                value={search}
                            />
                            <IconButton aria-label="Search" className="searchPlaceholder supplier-search-placeholder">
                                <i className="flaticon-search "></i>
                            </IconButton>
                        </Paper>
                    </div>
                </div>
                <div className="border-bottom p-0 "></div>
                <div className="form-group row mt-3">
                    <div className="col-xl-3 col-lg-3 col-md-6 ">
                        <label className="formFont">Department</label>
                        <RHFInput
                            as={<Select options={departmentList} />}
                            rules={{ required: false }}
                            name="intDepartmentId"
                            register={register}
                            value={""}
                            setValue={setValue}
                            onChange={(option) => {
                                handleChangeText("intDepartmentId", option.value);
                                handleChangeText("strDepartmentName", option.label);
                            }}
                        />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 ">
                        <label className="formFont">SBU</label>
                        <RHFInput
                            as={<Select options={sbuList} />}
                            rules={{ required: false }}
                            name="intSBUId"
                            register={register}
                            value={""}
                            setValue={setValue}
                            onChange={(option) => {
                                handleChangeText("intSBUId", option.value);
                                handleChangeText("strSBUName", option.label);
                            }}
                        />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 ">
                        <label className="formFont">Branch</label>
                        <RHFInput
                            as={<Select options={branchList} />}
                            rules={{ required: false }}
                            name="intBranchId"
                            register={register}
                            value={"branchList.label"}
                            setValue={setValue}
                            onChange={(option) => {
                                handleChangeText("intBranchId", option.value);
                                handleChangeText("strBranchName", option.label);
                            }}
                        />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <label className="formFont">From Date</label>
                        <DatePicker
                            className="date-picker"
                            name="dteFromDate"
                            dateFormat="MM-dd-yyyy"
                            placeholderText="Select From Date"
                            selected={supplierCSInput.dteFromDate}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                            onChange={(e) => {
                                handleChangeText("dteFromDate", e)
                                handleChangeText("flag1", "flag1")
                            }}
                        />
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <label className="formFont">To Date</label>
                        <DatePicker
                            name="dteToDate"
                            dateFormat="MM-dd-yyyy"
                            placeholderText="Select To date"
                            selected={supplierCSInput.dteToDate}
                            ref={register({
                                required: true,
                                maxLength: 100,
                            })}
                            onChange={(e) => {
                                handleChangeText("dteToDate", e)
                                handleChangeText("flag2", "flag2")
                            }}
                            className="date-picker"
                        />
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                </div>
            </form>
        </>
    );
}

export default SupplierCSFilter;