import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
import { showToast } from "../../../../master/utils/ToastHelper";


export const handleChangePurchaseApprovalFilterInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_PURCHASE_APPROVAL_FILTER_INPUT,
        payload: formData,
    });
};

export const handleChangePurchaseApprovalDetailInput = (name, value, item) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
        item: item
    };
    dispatch({
        type: Types.CHANGE_PURCHASE_APPROVAL_DETAIL_INPUT,
        payload: formData,
    });
};

export const getSBUName = (data) => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/sbuList`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_SBU_NAME, payload: data });
        }
    );
};

export const getShipName = (data) => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}voyage/shipList`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_SHIP_NAME, payload: data });
        }
    );
};


export const getPurchaseApprovalList = (searchValue = "", intSBUId = null, intBusinessUnitId = null, intShipID = null, dteFromDate = null, dteToDate = null) => async (dispatch) => {
    let response = {
        purchaseApprovalList: [],
        status: false,
        message: "",
        isLoading: true,
        errors: [],
    };

    dispatch({ type: Types.GET_PURCHASE_APPROVAL_LIST, payload: response });


    try {
        let url = `${process.env.REACT_APP_API_URL}purchase/getApproval?`;

        url += searchValue !== "" ? `search=${searchValue}&` : '';
        url += intSBUId !== null ? `intSBUId=${intSBUId}&` : '';
        url += intBusinessUnitId !== null ? `intBusinessUnitId=${intBusinessUnitId}&` : '';
        url += intShipID !== null ? `intShipID=${intShipID}&` : '';
        url += dteFromDate !== null ? `dteFromDate=${dteFromDate}&` : '';

        if (searchValue === "" && intSBUId === null && intBusinessUnitId === null && intShipID === null) {
            dispatch({ type: Types.GET_PURCHASE_APPROVAL_LIST, payload: response })
        } else {
            await Axios.get(url).then((res) => {
                const { status, message, errors, data } = res.data;
                response.purchaseApprovalList = data;
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
        dispatch({ type: Types.GET_PURCHASE_APPROVAL_LIST, payload: response })
    }
    catch (error) {
        response.message = "Something wrong!";
        toast.error(error);
    }
}


export const GetPurchaseApprovalDetail = (id) => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/reqList/${id}`)
        .then((res) => {
            console.log('resdetail', res)
            dispatch({
                type: Types.GET_PURCHASE_APPROVAL_DETAIL,
                payload: res.data,
            });
        });
};