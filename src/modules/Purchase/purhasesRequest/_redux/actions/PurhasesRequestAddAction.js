import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";

export const handlePurchaseInputChage = (name, value) => (dispatch) => {
    // PURCHASE_REQUEST_INPUT_CHANGE
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.PURCHASE_REQUEST_INPUT_CHANGE, payload: formData });
    // dispatch({ type: Types.PURCHASE_REQUEST_ROW_INPUT_CHANGE, payload: formData });
}
export const handlePurchaseRowInputChage = (name, value) => (dispatch) => {
    // PURCHASE_REQUEST_INPUT_CHANGE
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.PURCHASE_REQUEST_ROW_INPUT_CHANGE, payload: formData });
}

//add multiple PQ data 
export const addMultiplePQ = (purchaseRequestData, PQRowData) => (dispatch) => {
    if (purchaseRequestData.intSBUId === null || purchaseRequestData.intSBUId === '') {
        showToast('error', "SBU can't be blank!");
        return false;
    }
    if (purchaseRequestData.intBusinessUnitId === null || purchaseRequestData.intBusinessUnitId === '') {
        showToast('error', "Branch can't be blank!");
        return false;
    }
    if (purchaseRequestData.intShipID === null || purchaseRequestData.intShipID === '') {
        showToast('error', "Ship name can't be blank!");
        return false;
    }
    if (purchaseRequestData.intDepartmentId === null || purchaseRequestData.intDepartmentId === '') {
        showToast('error', "Department can't be blank!");
        return false;
    }
    if (purchaseRequestData.dteDueDate === null || purchaseRequestData.dteDueDate === '') {
        showToast('error', "Due date can't be blank!");
        return false;
    }
    if (purchaseRequestData.intCategoryId === null || purchaseRequestData.intCategoryId === '') {
        showToast('error', "Category can't be blank!");
        return false;
    }
    if (purchaseRequestData.strPurchaseReferanceNo === null || purchaseRequestData.strPurchaseReferanceNo === '') {
        showToast('error', "Reference can't be blank!");
        return false;
    }
    if (purchaseRequestData.strRemarks === null || purchaseRequestData.strRemarks === '') {
        showToast('error', "Remarks can't be blank!");
        return false;
    }
    if (purchaseRequestData.isQCComplete === null || purchaseRequestData.isQCComplete === 0) {
        showToast('error', "Quality Check can't be blank!");
        return false;
    }
    if (PQRowData.intitemid === null || PQRowData.intitemid === '') {
        showToast('error', "Item can't be blank!");
        return false;
    }
    if (PQRowData.numPurchaseRequestQty === null || PQRowData.numPurchaseRequestQty === '') {
        showToast('error', "Qty can't be blank!");
        return false;
    }
    if (PQRowData.strPurchaseRequestPurpose === null || PQRowData.strPurchaseRequestPurpose === '') {
        showToast('error', "Remarks can't be blank!");
        return false;
    }
    dispatch({ type: Types.MULTIPLE_PURCHASE_DATA_CREATE, payload: PQRowData })
}
//delete multiple PQ row data
export const deleteMultiplePQRowData = (index) => (dispatch) => {
    dispatch({ type: Types.DELETE_MLTIPLE_PQ_ROW_DATA, payload: index })
}
//submit PQ data
export const handleSubmitPQ = (purchaseRequestData) => (dispatch) => {
    console.log('purchaseRequestData final submit:>> ', purchaseRequestData);
    let response = {
        isLoading: true,
        status: false,
        data: null
    }
    dispatch({ type: Types.PQ_DATA_SUBMIT, payload: response });

    const postURL = `${process.env.REACT_APP_API_URL}purchase/reqList`;
    Axios.post(postURL, purchaseRequestData)
        .then((res) => {
            if (res.data.status) {
                response.isLoading = false;
                response.status = res.data.status;
                response.data = res.data.data;
                showToast('success', res.data.message)
                dispatch({ type: Types.PQ_DATA_SUBMIT, payload: response });
            }
        }).catch((error) => {
            response.isLoading = false;
            response.status = false;
            response.data = null;
            const message = "Sorry, something went wrong!"
            showToast('error', message);
            dispatch({ type: Types.PQ_DATA_SUBMIT, payload: response });
        })
}