import * as Types from "../types/Types";
import Axios from "axios";
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
export const handleChangeQuotationDetailInput = (name, value, item) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
        item: item,
    };
    dispatch({
        type: Types.CHANGE_QUOTATION_DETAIL_INPUT,
        payload: formData,
    });
};

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

export const getQuotationDetails = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/supplierQuotation`).then(
        (res) => {
            let data = res.data.data
            dispatch({ type: Types.GET_QUOTATION_DETAILS, payload: data })
        }
    )
}

export const submitQuotation = (quotationDetailList) => async (dispatch) => {

    let responseList = {
        status: false,
        isLoading: true,
        data: {},
    }
    dispatch({ type: Types.SUBMIT_QUOTATION, payload: responseList })

    let postData = {
        quoteRow: quotationDetailList
    }
    console.log('postData', postData)

    await Axios.post(`${process.env.REACT_APP_API_URL}purchase/supplierQuotation`, postData).then(
        (res) => {
            if (res.data.status) {
                responseList.data = res.data;
                responseList.isLoading = false;
                responseList.status = res.data.status;
                showToast("success", res.data.message);
                dispatch({ type: Types.SUBMIT_QUOTATION, payload: responseList });
                dispatch(getQuotationDetails());

            } else { showToast("error", res.data.message) }
        }
    ).catch(function (error) {
        responseList.isLoading = false;
        const message = "Something went wrong ! Please fill all inputs and try again !";
        showToast("error", message);
        dispatch({ type: Types.SUBMIT_QUOTATION, payload: responseList });
    });

}