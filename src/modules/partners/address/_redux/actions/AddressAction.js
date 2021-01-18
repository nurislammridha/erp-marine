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
    console.log('response Nur:>> ', response);
    console.log('response Nur:>> ', typeof response.address);
}

