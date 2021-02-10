import Axios from "axios"
import moment from "moment"
import * as Types from "../types/Types";
export const getDepartmentList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/departmentList`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_DEPARTMENT_LIST, payload: res.data.data })
        }
    )
}
export const changeSupplierCSInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.SUPPLIER_CS_INPUT, payload: formData })
}
export const searchSupplierInput = (value) => (dispatch) => {
    dispatch({ type: Types.SEARCH_SUPPLIER, payload: value })
}
export const getDataFilterSelect = (supplierCSInput) => (dispatch) => {
    const { strDepartmentName, strSBUName, strBranchName, dteFromDate, dteToDate, flag1, flag2 } = supplierCSInput;
    // if (strDepartmentName.length > 0 && strSBUName.length > 0 && strBranchName.length > 0 && flag1.length > 0 && flag2.length > 0) {
    const fromDate = moment(dteFromDate).format("YYYY-MM-DD");
    const toDate = moment(dteToDate).format("YYYY-MM-DD");
    const url = `${process.env.REACT_APP_API_URL}purchase/getsupplierCSList?strDepartmentName=${strDepartmentName}&strSBUName=${strSBUName}&strBusinessUnitName=${strBranchName}`;

    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.SUPPLIER_LIST, payload: res.data.data })
        }
    )
    // }
}
export const getDataBySearch = (search) => (dispatch) => {

    if (search && search.length > 0) {
        const url = `${process.env.REACT_APP_API_URL}purchase/getsupplierCSList?intPurchaseRequestId=${search}`;
        Axios.get(url).then(
            (res) => {
                dispatch({ type: Types.SUPPLIER_LIST, payload: res.data.data })
            }
        )
    }
    else if (search === "") {
        dispatch({ type: Types.SUPPLIER_LIST, payload: undefined })
    }

}
export const getSupplierCSDetails = (id) => (dispatch) => {
    // const url = `${process.env.REACT_APP_API_URL}purchase/supplierCS/${id}`;
    const url = `${process.env.REACT_APP_API_URL}purchase/supplierCS/1`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_SUPPLIER_DETAILS, payload: res.data.data })
        }
    )

}