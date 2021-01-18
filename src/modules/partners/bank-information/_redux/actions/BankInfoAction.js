import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";



export const handleChangeBankInfoInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_BANKINFO_INPUT,
        payload: formData,
    });
};

export const bankInfoSubmitAction = (partnerInfoInput) => {
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

