import * as Types from "../types/Types";
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";



export const handleChangePartnerInfoInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_PARTNERINFO_INPUT,
        payload: formData,
    });
};

export const partnerInfoSubmitAction = (partnerInfoInput) => async (dispatch) => {
    console.log('data', partnerInfoInput)
    let isValidated = true;
    const message = "added successfully";
    const ermessage = "fill all the field"
    // Validate First
    if (isValidated) {
        showToast("success", message);

    } else {
        showToast("error", ermessage);
    }

    // If Not Validate, display a toaster

    return isValidated;
};
