import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
import { showToast } from "../../../../master/utils/ToastHelper";
import store from '../../../../../redux/store';

export const handleChangePurchaseApprovalFilterInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_PURCHASE_APPROVAL_FILTER_INPUT,
        payload: formData,
    });

    const PurchaseApprovalFilterInput = store.getState().purchaseApprovalFilter.PurchaseApprovalFilterInput;
    const { intSBUId, intBusinessUnitId, intShipID } = PurchaseApprovalFilterInput;
    dispatch(getPurchaseApprovalList(intSBUId, intBusinessUnitId, intShipID));
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


export const getPurchaseApprovalList = (intSBUId = null, intBusinessUnitId = null, intShipID = null) => async (dispatch) => {
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
        // url += searchValue !== "" ? `search=${searchValue}&` : '';
        console.log('intSBUId =', intSBUId)
        url += intSBUId !== null ? `intSBUId=${intSBUId}&` : '';
        url += intBusinessUnitId !== null ? `intBusinessUnitId=${intBusinessUnitId}&` : '';
        url += intShipID !== null ? `intShipID=${intShipID}&` : '';
        // url += dteFromDate !== null ? `dteFromDate=${dteFromDate}&` : '';

        if (intSBUId === null && intBusinessUnitId === null && intShipID === null) {
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
            let data = res.data.data;
            const numApprovedQty = null;
            for (let index = 0; index < data.purchase_row.length; index++) {
                const element = data.purchase_row[index];
                element.numApprovedQty = numApprovedQty;

            }
            // data.purchase_row.push = approveQty;
            console.log('data', data)
            dispatch({
                type: Types.GET_PURCHASE_APPROVAL_DETAIL,
                payload: res.data,
            });
        });
};

export const SubmitPurchaseApprove = (purchaseApprovalDetail, handleClose) => (dispatch) => {
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    console.log('detail data', purchaseApprovalDetail);

    dispatch({
        type: Types.SUBMIT_PURCHASE_APPROVE,
        payload: responseList,
    });
    const requestStatus = purchaseApprovalDetail.purchase_row.filter(item => item.isChecked == true)
    let postData = {
        ...purchaseApprovalDetail,
        requestStatus: requestStatus
    }
    console.log('postData', postData)


    Axios.put(
        `${process.env.REACT_APP_API_URL}purchase/reqStatus/${purchaseApprovalDetail.intPurchaseRequestID}`,
        postData
    )
        .then(async (response) => {
            responseList.data = response.data;
            responseList.isLoading = false;
            responseList.status = response.data.status;

            if (response.data.status) {
                showToast("success", response.data.message);
                dispatch({
                    type: Types.SUBMIT_PURCHASE_APPROVE,
                    payload: responseList,
                });
                handleClose();

            } else {
                showToast("error", response.data.message);
            }
        })

        .catch(function (error) {
            responseList.isLoading = false;
            const message =
                "Something went wrong ! Please fill all inputs and try again !";
            showToast("error", message);

            dispatch({
                type: Types.SUBMIT_PURCHASE_APPROVE,
                payload: responseList,
            });
        });
};
