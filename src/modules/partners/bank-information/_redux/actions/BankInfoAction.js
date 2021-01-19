import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import store from '../../../../../redux/store';


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

// export const bankInfoSubmitAction = (partnerInfoInput) => {
//     let isValidated = true;
//     const message = "added successfully";
//     const ermessage = "fill all the field"
//     // Validate First
//     if (isValidated) {
//         showToast("success", message);

//     } else {
//         showToast("error", ermessage);
//     }

//     // If Not Validate, display a toaster

//     return isValidated;
// };

export const bankInfoSubmitAction = () => {
    const bankInfoInput = store.getState().bankInfo.bankInfoInput;
    let isValidated = true;

    // if (partnerInfoInput.intAction.length === 0) {
    //     showToast('error', 'Please Select basic Unit');
    //     isValidated = false;
    // }
    // if (partnerInfoInput.intSupplierTypeID.length === 0) {
    //     showToast('error', 'Please give partner type');
    //     isValidated = false;
    // }
    // else if (partnerInfoInput.intTaxTypeId.length === 0) {
    //     showToast('error', 'Please give tax type');
    //     isValidated = false;
    // }
    // else if (partnerInfoInput.strSupplierName.length === 0) {
    //     showToast('error', 'Please give partner name');
    //     isValidated = false;
    // }
    // else if (partnerInfoInput.strSupplierCode.length === 0) {
    //     showToast('error', 'Please give partner code');
    //     isValidated = false;
    // }
    // else if (partnerInfoInput.strContactNumber.length === 0) {
    //     showToast('error', 'Please give contact code');
    //     isValidated = false;
    // }
    // else if (partnerInfoInput.strEmail.length === 0) {
    //     showToast('error', 'Please give email code');
    //     isValidated = false;
    // }
    // else if (partnerInfoInput.strLicenseNo.length === 0) {
    //     showToast('error', 'Please give licence number');
    //     isValidated = false;
    // }
    // else if (partnerInfoInput.strBIN.length === 0) {
    //     showToast('error', 'Please give Bin number');
    //     isValidated = false;
    // }
    // else if (partnerInfoInput.strTIN.length === 0) {
    //     showToast('error', 'Please give Tin number');
    //     isValidated = false;
    // }
    return isValidated;
};
