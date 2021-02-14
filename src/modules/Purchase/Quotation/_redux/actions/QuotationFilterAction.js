import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
import { showToast } from "../../../../master/utils/ToastHelper";
import store from '../../../../../redux/store';

export const handleChangeQuotationFilterInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    };

    dispatch({
        type: Types.CHANGE_QUOTATION_FILTER_INPUT,
        payload: formData
    })

    const search = store.getState().QuotationFilterinfo.QuotationFilterInput.strQuotationNo;
    dispatch(getQuotationDetails(search));
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

export const getQuotationDetails = (searchValue = "") => async (dispatch) => {

    let response = {
        quotationDetailList: [],
        status: false,
        message: "",
        isLoading: true,
        errors: [],
    };
    dispatch({ type: Types.GET_QUOTATION_DETAILS, payload: response });

    try {
        let url = `${process.env.REACT_APP_API_URL}purchase/supplierQuotation?`;

        url += searchValue !== "" ? `search=${searchValue}` : '';
        console.log('url :>> ', url);
        if (searchValue === "") {
            dispatch({ type: Types.GET_QUOTATION_DETAILS, payload: response })
        } else {
            await Axios.get(url).then((res) => {
                console.log('res :>> ', res);
                const { status, message, errors, data } = res.data;
                response.quotationDetailList = data;
                response.status = status;
                response.message = message;
                response.errors = errors;
                response.isLoading = false;
            })
                .catch((err) => {
                    toast.error(err)
                })
        }
        response.isLoading = false;
        dispatch({ type: Types.GET_QUOTATION_DETAILS, payload: response })
    }
    catch (error) {
        response.message = "Something wrong!";
        toast.error(error);
    }

    // Axios.get(`${process.env.REACT_APP_API_URL}purchase/supplierQuotation?search=16`).then(
    //     (res) => {
    //         let data = res.data.data
    //         dispatch({ type: Types.GET_QUOTATION_DETAILS, payload: data })
    //     }
    // )
}

export const submitQuotation = (quotationDetailList) => async (dispatch) => {

    const id = store.getState().QuotationFilterinfo.QuotationFilterInput.strQuotationNo;
    console.log('id', id)

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

    await Axios.put(`${process.env.REACT_APP_API_URL}purchase/supplierQuotation/${id}`, postData).then(
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