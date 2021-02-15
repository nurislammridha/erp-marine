import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";
import Axios from "axios";
import store from '../../../../../redux/store';

export const handleChangePartnerAddressInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }

    dispatch({ type: Types.CHANGE_PARTNER_ADDRESS_INPUT, payload: formData })
}
export const partnerAddressSubmit = () => {
    const partnerAddress = store.getState().partnerAddress.addressInfo;
    let isValidated = true;


    if (partnerAddress === undefined || partnerAddress === null || partnerAddress.length < 1) {
        showToast("error", "Add before submit");
        isValidated = false;
    }

    return isValidated;
}

export const emptyAddMultipleStatus = () => (dispatch) => {
    dispatch({ type: Types.EMPTY_ADD_MULTIPLE_FIELDS, payload: null })
}

export const partnerAddressSubmitMultiple = (partnerAddress) => (dispatch) => {
    let responseList = {
        data: {},
        status: false,
    };

    // Check Inputs for validation
    if (partnerAddress.strSupplierAddress === undefined || partnerAddress.strSupplierAddress === null || partnerAddress.strSupplierAddress.length < 1) {
        showToast("error", "Address should not be empty");
        return false;
    }
    else if (partnerAddress.strCity === undefined || partnerAddress.strCity === null || partnerAddress.strCity.length < 1) {
        showToast("error", "City should not be empty");
        return false;
    }
    else if (partnerAddress.strState === undefined || partnerAddress.strState === null || partnerAddress.strState.length < 1) {
        showToast("error", "State should not be empty");
        return false;
    }
    else if (partnerAddress.strCountry === undefined || partnerAddress.strCountry === null || partnerAddress.strCountry.length < 1) {
        showToast("error", "Country should not be empty");
        return false;
    }
    else if (partnerAddress.strZipCode === undefined || partnerAddress.strZipCode === null || partnerAddress.strZipCode.length < 1) {
        showToast("error", "Zip should not be empty");
        return false;
    }

    // If Validate, then add multiple dataset [] in addressInfo
    responseList.data = partnerAddress
    responseList.status = true
    dispatch({ type: Types.SUBMIT_PARTNER_ADDRESS_MULTIPLE, payload: responseList })
}

export const deletePartnerAddressMultiple = (index) => (dispatch) => {
    dispatch({ type: Types.DELETE_PARTNER_ADDRESS_MULTIPLE, payload: index })
}

export const getCountryName = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}master/country`).then(

        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_COUNTRY_NAME, payload: data });
        }
    );
};