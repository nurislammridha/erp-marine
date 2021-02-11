import * as Types from "../types/Types";
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";

//get lists
export const getComparativeStatementList = (id) => async (dispatch) => {
    let responseList = {
        isLoading: true,
        data: [],
        status: false,
    };
    dispatch({ type: Types.GET_COMPARATIVE_STATEMENT_LIST, payload: responseList });

    await Axios.get(`${process.env.REACT_APP_API_URL}purchase/getCSListByQuotationId/${id}`)
        .then((res) => {
            const { data, message, status } = res.data;
            responseList.status = status;
            responseList.comparativeList = data;
            responseList.message = message;
            responseList.isLoading = false;
            dispatch({ type: Types.GET_COMPARATIVE_STATEMENT_LIST, payload: responseList });
        }).catch((err) => {
            responseList.isLoading = false;
            dispatch({ type: Types.GET_COMPARATIVE_STATEMENT_LIST, payload: responseList });
        });
    responseList.isLoading = false;
    dispatch({ type: Types.GET_COMPARATIVE_STATEMENT_LIST, payload: responseList });
}

//handle change input value with list 
export const changeComparativeInputField = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    };
    dispatch({ type: Types.COMPARATIVE_STATEMENT_INPUT_CHANGE, payload: formData });
};

export const selectedItem = (item) => (dispatch) => {
    dispatch({ type: Types.COMPARATIVE_STATEMENT_SELECT_ITEM, payload: item });
};

//get comparative RQF No 
export const getComparativeRQF = (id, length) => async (dispatch) => {
    let responseList = {
        isLoading: true,
        data: [],
        status: false,
        length: length,
        value: id
    };
    dispatch({ type: Types.GET_RQF_OPTION_LIST, payload: responseList });
    await Axios.get(`${process.env.REACT_APP_API_URL}purchase/quotation?search=${id}`)
        .then((res) => {
            if (res.data.status) {
                responseList.isLoading = false;
                responseList.data = res.data.data;
                dispatch({ type: Types.GET_RQF_OPTION_LIST, payload: responseList })
            }
        }).catch((err) => {
            responseList.isLoading = false;
            dispatch({ type: Types.GET_RQF_OPTION_LIST, payload: responseList })
        })
}

//get cs option list data  
export const getCSOptionList = (id) => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/getCSListByQuotationId/${id}`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.CS_OPTION_LIST, payload: res.data.data });
        });
}

//updated cs data  
//get comparative RQF No 
export const updateCS = (csInputData, id) => async (dispatch) => {
    if (csInputData.intWinSupplierId === null || csInputData.intWinSupplierId === "") {
        showToast("error", "Supplier can't be blank!")
        return false;
    }
    if (csInputData.strWinCause === null || csInputData.strWinCause === "") {
        showToast("error", "Remarks can't be blank!")
        return false;
    }
    let responseList = {
        isLoading: true,
        data: null,
        status: false,

    };
    dispatch({ type: Types.UPDATED_CS, payload: responseList });
    await Axios.put(`${process.env.REACT_APP_API_URL}purchase/updateComparativeStatement/${csInputData.intWinSupplierId}`, csInputData)
        .then((res) => {
            if (res.data.status) {
                responseList.isLoading = false;
                responseList.message = res.data.message;
                showToast('success', responseList.message);
                dispatch({ type: Types.UPDATED_CS, payload: responseList })
            }
        }).catch((err) => {
            const { response } = err;
            const { request, ...errorObject } = response;
            showToast('error', response.data.message);
            responseList.isLoading = false;
            dispatch({ type: Types.UPDATED_CS, payload: responseList })
        })
}