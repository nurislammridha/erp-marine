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
    dispatch({ type: Types.CHANGE_PURCHASE_APPROVAL_FILTER_INPUT, payload: formData });


    const search = store.getState().purchaseApprovalFilter.PurchaseApprovalFilterInput.search;
    const intSBUId = store.getState().purchaseApprovalFilter.PurchaseApprovalFilterInput.intSBUId;
    const intBusinessUnitId = store.getState().purchaseApprovalFilter.PurchaseApprovalFilterInput.intBusinessUnitId;
    const intShipID = store.getState().purchaseApprovalFilter.PurchaseApprovalFilterInput.intShipID;
    const dteFromDate = store.getState().purchaseApprovalFilter.PurchaseApprovalFilterInput.dteFromDate;
    const dteToDate = store.getState().purchaseApprovalFilter.PurchaseApprovalFilterInput.dteToDate;
    dispatch(getPurchaseApprovalList(search, intSBUId, intBusinessUnitId, intShipID, dteFromDate, dteToDate));
};

export const handleChangePurchaseApprovalDetailInput = (name, value, item) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
        item: item,
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


export const getPurchaseApprovalList = (searchValue = "", intSBUId = null, intBusinessUnitId = null, intShipID = null, dteFromDate = null, dteToDate = null, page) => async (dispatch) => {
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

        // if (page !== null || page === "") {
        //     url += `&page=${page}`;
        // }

        url += searchValue !== "" ? `search=${searchValue}&` : '';
        url += intSBUId !== null ? `intSBUId=${intSBUId}&` : '';
        url += intBusinessUnitId !== null ? `intBusinessUnitId=${intBusinessUnitId}&` : '';
        url += intShipID !== null ? `intShipID=${intShipID}&` : '';
        url += dteFromDate !== null ? `dteFromDate=${dteFromDate}&` : '';

        console.log('url :>> ', url);
        if (searchValue === "" && intSBUId === null && intBusinessUnitId === null && intShipID === null) {
            dispatch({ type: Types.GET_PURCHASE_APPROVAL_LIST, payload: response })
        } else {
            await Axios.get(url).then((res) => {
                console.log('res :>> ', res);
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

export const handleApprovePRApproval = (purchaseApprovalDetail, handleClose, id) => async (dispatch) => {
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    dispatch({ type: Types.SUBMIT_PURCHASE_APPROVE, payload: responseList });
    const newPRApprovalData = purchaseApprovalDetail.purchase_row.filter((item) => item.isChecked && item.isChecked === true);
    purchaseApprovalDetail.reqApprovalStatus = newPRApprovalData;
    if (purchaseApprovalDetail.intStatus === 1) {
        purchaseApprovalDetail.intStatus = 1;
        purchaseApprovalDetail.strStatus = "Approved";
        let newData = []
        for (let i = 0; i < purchaseApprovalDetail.reqApprovalStatus.length; i++) {
            let element = purchaseApprovalDetail.reqApprovalStatus[i];
            element.isApproved = 1;
            element.numRequestQty = element.numPurchaseRequestQty;
            element.numApprovedQtybyShip = element.intQCBy;
            element.intApprovedByshipId = purchaseApprovalDetail.intShipID;
            element.strApprovedByShip = purchaseApprovalDetail.strShipName;
            element.numApprovedQtybyOffice = element.intQCBy;
            element.intApprovedByOfficeId = element.intQCBy;
            element.strApprovedByOffice = purchaseApprovalDetail.strSBUName;
            element.numApprovedQtybyFinance = 1;
            element.intApprovedByFinanceId = 1;
            element.strApprovedByFinance = 'AKij It';
            newData.push(element)
        }
        purchaseApprovalDetail.reqApprovalStatus = newData;
    } else {
        purchaseApprovalDetail.intStatus = 0;
        purchaseApprovalDetail.strStatus = "Rejected";
        let newData = []
        for (let i = 0; i < purchaseApprovalDetail.reqApprovalStatus.length; i++) {
            let element = purchaseApprovalDetail.reqApprovalStatus[i];
            element.isApproved = 0;
            element.numRequestQty = element.numPurchaseRequestQty;
            element.numApprovedQtybyShip = element.intQCBy;
            element.intApprovedByshipId = purchaseApprovalDetail.intShipID;
            element.strApprovedByShip = purchaseApprovalDetail.strShipName;
            element.numApprovedQtybyOffice = element.intQCBy;
            element.intApprovedByOfficeId = element.intQCBy;
            element.strApprovedByOffice = purchaseApprovalDetail.strSBUName;
            element.numApprovedQtybyFinance = 1;
            element.intApprovedByFinanceId = 1;
            element.strApprovedByFinance = 'AKij It';
            newData.push(element)
        }
        purchaseApprovalDetail.reqApprovalStatus = newData;
    }
    await Axios.put(`${process.env.REACT_APP_API_URL}purchase/reqApprovalStatus/${id}`, purchaseApprovalDetail)
        .then((response) => {
            if (response.data.status) {
                responseList.data = response.data;
                responseList.isLoading = false;
                responseList.status = response.data.status;
                showToast("success", response.data.message);
                dispatch({ type: Types.SUBMIT_PURCHASE_APPROVE, payload: responseList });
                handleClose();
            } else { showToast("error", response.data.message) }
        }).catch(function (error) {
            responseList.isLoading = false;
            const message = "Something went wrong ! Please fill all inputs and try again !";
            showToast("error", message);
            dispatch({ type: Types.SUBMIT_PURCHASE_APPROVE, payload: responseList });
        });
};