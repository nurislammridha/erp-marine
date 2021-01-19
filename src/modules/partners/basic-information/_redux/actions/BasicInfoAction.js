import * as Types from "../types/Types";
import Axios from "axios";
import store from '../../../../../redux/store';
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

export const partnerInfoSubmitAction = () => {
    const partnerInfoInput = store.getState().partnerInfo.partnerInfoInput;
    let isValidated = true;

    // if (partnerInfoInput.intAction.length === 0) {
    //     showToast('error', 'Please Select basic Unit');
    //     isValidated = false;
    // }
    if (partnerInfoInput.intSupplierTypeID.length === 0) {
        showToast('error', 'Please give partner type');
        isValidated = false;
    }
    else if (partnerInfoInput.intTaxTypeId.length === 0) {
        showToast('error', 'Please give tax type');
        isValidated = false;
    }
    else if (partnerInfoInput.strSupplierName.length === 0) {
        showToast('error', 'Please give partner name');
        isValidated = false;
    }
    else if (partnerInfoInput.strSupplierCode.length === 0) {
        showToast('error', 'Please give partner code');
        isValidated = false;
    }
    else if (partnerInfoInput.strContactNumber.length === 0) {
        showToast('error', 'Please give contact code');
        isValidated = false;
    }
    else if (partnerInfoInput.strEmail.length === 0) {
        showToast('error', 'Please give email code');
        isValidated = false;
    }
    else if (partnerInfoInput.strLicenseNo.length === 0) {
        showToast('error', 'Please give licence number');
        isValidated = false;
    }
    else if (partnerInfoInput.strBIN.length === 0) {
        showToast('error', 'Please give Bin number');
        isValidated = false;
    }
    else if (partnerInfoInput.strTIN.length === 0) {
        showToast('error', 'Please give Tin number');
        isValidated = false;
    }
    return isValidated;
};

export const partnerCreateSubmitAction = () => async (dispatch) => {
    const basicInfo = store.getState().partnerInfo.partnerInfoInput;
    const addressInfo = store.getState().partnerAddress.addressInfo;
    const bankInfo = store.getState().bankInfo.bankInfoInput;
    console.log('basicInfo :>> ', basicInfo);
    console.log('addressInfo :>> ', addressInfo);
    console.log('bankInfo :>> ', bankInfo);

    const finalSubmitInputData = {
        basicInfo: basicInfo,
        addressInfo: addressInfo,
        bankInfo: bankInfo,
        othersInfo: null
    }

    // Axios.post(`url`, finalSubmitInputData)
    //     .then(res => {
    //         console.log('res :>> ', res);
    //     })
    console.log('finalSubmitInputData :>> ', finalSubmitInputData);

    const url = `${process.env.REACT_APP_API_URL}partner/partnerCreate`
    console.log('url :>> ', url);
    Axios.post(url, finalSubmitInputData)
        .then(res => {
            console.log('res nur:>> ', res);
        })
};
