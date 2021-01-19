import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";

export const handleChangePartnerAddressInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    // console.log('formData :>> ', formData);
    dispatch({ type: Types.CHANGE_PARTNER_ADDRESS_INPUT, payload: formData })
}
export const partnerAddressSubmit = (partnerAddress) => (dispatch) => {
    const response = partnerAddress;
    console.log('response :>> ', response);
    // dispatch({ type: Types.GET_ADDRESS_ACTION_SUBMIT, payload: response })
    if (response.address === undefined || response.address === null || response.address.length < 1) {
        showToast("error", "Address should not be empty");
    }
    else if (response.city === undefined || response.city === null || response.city.length < 1) {
        showToast("error", "City should not be empty");
    }
    else if (response.state === undefined || response.state === null || response.state.length < 1) {
        showToast("error", "State should not be empty");
    }
    else if (response.code === undefined || response.code === null || response.code.length < 1) {
        showToast("error", "Zip should not be empty");
    }
    else if (response.country === undefined || response.country === null || response.country.length < 1) {
        showToast("error", "Country should not be empty");
    }
    dispatch({ type: Types.SUBMIT_PARTNER_ADDRESS, payload: response })
}

export const partnerAddressSubmitMultiple = (partnerAddress) => (dispatch) => {
    // Check Inputs for validation
    // if (partnerAddress.address === undefined || partnerAddress.address === null || partnerAddress.address.length < 1) {
    //     showToast("error", "Address should not be empty");
    //     return false;
    // }
    // else if (partnerAddress.city === undefined || partnerAddress.city === null || partnerAddress.city.length < 1) {
    //     showToast("error", "City should not be empty");
    //     return false;
    // }
    // else if (partnerAddress.state === undefined || partnerAddress.state === null || partnerAddress.state.length < 1) {
    //     showToast("error", "State should not be empty");
    //     return false;
    // }
    // else if (partnerAddress.code === undefined || partnerAddress.code === null || partnerAddress.code.length < 1) {
    //     showToast("error", "Zip should not be empty");
    //     return false;
    // }
    // else if (partnerAddress.country === undefined || partnerAddress.country === null || partnerAddress.country.length < 1) {
    //     showToast("error", "Country should not be empty");
    //     return false;
    // }

    // Process Data if needed
    partnerAddress.intActionBy = 1;
    partnerAddress.isActive = 1;
    partnerAddress.intCountryID = parseInt(partnerAddress.intCountryID);
    // If Validate, then add multiple dataset [] in addressInfo

    dispatch({ type: Types.SUBMIT_PARTNER_ADDRESS_MULTIPLE, payload: partnerAddress })
    // const res = partnerAddress;
    // dispatch({ type: Types.SUBMIT_PARTNER_ADDRESS, payload: res})
}

export const deletePartnerAddressMultiple = (index) => (dispatch) => {
    dispatch({ type: Types.DELETE_PARTNER_ADDRESS_MULTIPLE, payload: index })
}