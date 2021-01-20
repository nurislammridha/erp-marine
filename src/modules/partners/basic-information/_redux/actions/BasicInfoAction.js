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
    if (partnerInfoInput.strSupplierName === undefined || partnerInfoInput.strSupplierName === null || partnerInfoInput.strSupplierName.length === 0) {
        showToast('error', 'Please give partner name');
        isValidated = false;
    }
    else if (partnerInfoInput.intSupplierTypeID === undefined || partnerInfoInput.intSupplierTypeID === null || partnerInfoInput.intSupplierTypeID.length === 0) {
        showToast('error', 'Please give partner type');
        isValidated = false;
    }
    else if (partnerInfoInput.strEmail === undefined || partnerInfoInput.strEmail === null || partnerInfoInput.strEmail.length === 0) {
        showToast('error', 'Please give partner email');
        isValidated = false;
    }
    else if (partnerInfoInput.strBIN === undefined || partnerInfoInput.strBIN === null || partnerInfoInput.strBIN.length === 0) {
        showToast('error', 'Please give partner BIN No');
        isValidated = false;
    }
    else if (partnerInfoInput.strSupplierCode === undefined || partnerInfoInput.strSupplierCode === null || partnerInfoInput.strSupplierCode.length === 0) {
        showToast('error', 'Please give Prtner Code');
        isValidated = false;
    }
    else if (partnerInfoInput.strContactNumber === undefined || partnerInfoInput.strContactNumber === null || partnerInfoInput.strContactNumber.length === 0) {
        showToast('error', 'Please give contact no');
        isValidated = false;
    }
    else if (partnerInfoInput.strLicenseNo === undefined || partnerInfoInput.strLicenseNo === null || partnerInfoInput.strLicenseNo.length === 0) {
        showToast('error', 'Please give license no');
        isValidated = false;
    }
    else if (partnerInfoInput.intAction === undefined || partnerInfoInput.intAction === null || partnerInfoInput.intAction.length === 0) {
        showToast('error', 'Please give Business Unit no');
        isValidated = false;
    }
    else if (partnerInfoInput.strTIN === undefined || partnerInfoInput.strTIN === null || partnerInfoInput.strTIN.length === 0) {
        showToast('error', 'Please give TIN No');
        isValidated = false;
    }
    else if (partnerInfoInput.intTaxTypeId === undefined || partnerInfoInput.intTaxTypeId === null || partnerInfoInput.intTaxTypeId.length === 0) {
        showToast('error', 'Please give Tax type');
        isValidated = false;
    }
    else if (partnerInfoInput.picName === undefined || partnerInfoInput.picName === null || partnerInfoInput.picName.length === 0) {
        showToast('error', 'Please give PIC Name');
        isValidated = false;
    }
    else if (partnerInfoInput.picContact === undefined || partnerInfoInput.picContact === null || partnerInfoInput.picContact.length === 0) {
        showToast('error', 'Please give PIC Contact');
        isValidated = false;
    }
    else if (partnerInfoInput.picEmail === undefined || partnerInfoInput.picEmail === null || partnerInfoInput.picEmail.length === 0) {
        showToast('error', 'Please give PIC Email');
        isValidated = false;
    }
    return isValidated;
};

export const partnerCreateSubmitAction = () => async (dispatch) => {
    const basicInfo = store.getState().partnerInfo.partnerInfoInput;
    const addressInfo = store.getState().partnerAddress.addressInfo;
    const bankInfo = store.getState().bankInfo.bankInfoMultiple;
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
