import * as Types from "../types/Types";
import moment from 'moment'
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";

export const handleChangeAdminInfoInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };

    dispatch({
        type: Types.CHANGE_ADMININFO_INPUT,
        payload: formData,
    });
};

export const submitAdminInformation = (adminInfoInput) => async (dispatch) => {

    if (adminInfoInput.strSupplierName === undefined || adminInfoInput.strSupplierName === null || adminInfoInput.strSupplierName.length < 1) {
        showToast("error", "Please give supplier name");
        return false;
    }
    if (adminInfoInput.strPONumber === undefined || adminInfoInput.strPONumber === null || adminInfoInput.strPONumber.length < 1) {
        showToast("error", "Please give PO number");
        return false;
    }
    if (adminInfoInput.dtePODate === undefined || adminInfoInput.dtePODate === null || adminInfoInput.dtePODate.length < 1) {
        showToast("error", "Please give PO date");
        return false;
    }
    if (adminInfoInput.dteWarantyExpiryDate === undefined || adminInfoInput.dteWarantyExpiryDate === null || adminInfoInput.dteWarantyExpiryDate.length < 1) {
        showToast("error", "Please give warranty expiry date");
        return false;
    }
    if (adminInfoInput.dteDateOfInstallation === undefined || adminInfoInput.dteDateOfInstallation === null || adminInfoInput.dteDateOfInstallation.length < 1) {
        showToast("error", "Please give Installation date");
        return false;
    }
    if (adminInfoInput.strAssetLocation === undefined || adminInfoInput.strAssetLocation === null || adminInfoInput.strAssetLocation.length < 1) {
        showToast("error", "Please give asset location");
        return false;
    }
    if (adminInfoInput.numRateofDepreciation === undefined || adminInfoInput.numRateofDepreciation === null || adminInfoInput.numRateofDepreciation.length < 1) {
        showToast("error", "Please give depreciation rate");
        return false;
    }

    let responseList = {
        status: false,
        isLoading: true,
        data: {},
    }

    dispatch({ type: Types.SUBMIT_ADMIN_INFO, payload: responseList });

    await Axios.post(`${process.env.REACT_APP_API_URL}asset/assetAdminInfoRegistration`, adminInfoInput).then(
        (res) => {
            if (res.data.status) {
                responseList.data = res.data;
                responseList.isLoading = false;
                responseList.status = res.data.status;
                showToast("success", res.data.message);
                dispatch({ type: Types.SUBMIT_ADMIN_INFO, payload: responseList });
            } else { showToast("error", res.data.message) }
        }
    ).catch(function (error) {
        responseList.isLoading = false;
        const message = "Something went wrong ! Please fill all inputs and try again !";
        showToast("error", message);
        dispatch({ type: Types.SUBMIT_ADMIN_INFO, payload: responseList });
    });

}

export const emptyStatus = () => (dispatch) => {
    let responseList = {
        status: false,
    };
    dispatch({
        type: Types.EMPTY_ADMIN,
        payload: responseList,
    });

}