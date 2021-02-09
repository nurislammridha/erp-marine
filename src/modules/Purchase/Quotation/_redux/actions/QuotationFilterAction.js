import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
import { showToast } from "../../../../master/utils/ToastHelper";

export const handleChangeQuotationFilterInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    };

    dispatch({
        type: Types.CHANGE_QUOTATION_FILTER_INPUT,
        payload: formData
    })
}

export const getSupplierName = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}partner/basicInfo`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_SUPPLIER_NAME, payload: data })
        }
    )
}

export const getCurrencyType = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/currency`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_CURRENCY_TYPE, payload: data })
        }
    )
}

