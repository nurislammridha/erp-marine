import * as Types from "../types/Types";
import * as TypesAddress from "../../../address/_redux/types/Types";
import * as TypesBank from "../../../bank-information/_redux/types/Types";
import * as TypesOther from "../../../others-information/_redux/types/Types";
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
    const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    // if (partnerInfoInput.intAction.length === 0) {
    //     showToast('error', 'Please Select basic Unit');
    //     isValidated = false;
    // }
    if (partnerInfoInput.strSupplierName === undefined || partnerInfoInput.strSupplierName === null || partnerInfoInput.strSupplierName.length === 0) {
        showToast('error', 'Please give supplier name');
        isValidated = false;
    }
    else if (partnerInfoInput.intSupplierTypeID === undefined || partnerInfoInput.intSupplierTypeID === null || partnerInfoInput.intSupplierTypeID.length === 0) {
        showToast('error', 'Please give supplier type');
        isValidated = false;
    }
    else if (partnerInfoInput.strEmail === undefined || partnerInfoInput.strEmail === null || partnerInfoInput.strEmail.length === 0) {
        showToast('error', 'Please give supplier email');
        isValidated = false;
    }
    // else if (partnerInfoInput.strEmail !== "undefined" || partnerInfoInput.strEmail !== null) {
    //     var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //     if (!pattern.test(partnerInfoInput.strEmail)) {
    //         showToast('error', 'Please give valid email');
    //         isValidated = false;
    //     }
    // }

    else if (!pattern.test(partnerInfoInput.strEmail)) {
        showToast('error', 'Please give valid email');
        isValidated = false;
    }
    // else if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)(partnerInfoInput.strEmail)) {
    //     showToast('error', 'Please give supplier email');
    //     isValidated = false;
    // }
    else if (partnerInfoInput.strContactNumber === undefined || partnerInfoInput.strContactNumber === null || partnerInfoInput.strContactNumber.length === 0 || partnerInfoInput.strContactNumber < 0) {
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
    else if (partnerInfoInput.intTaxTypeId === undefined || partnerInfoInput.intTaxTypeId === null || partnerInfoInput.intTaxTypeId.length === 0) {
        showToast('error', 'Please give Tax type');
        isValidated = false;
    }
    else if (partnerInfoInput.strBIN === undefined || partnerInfoInput.strBIN === null || partnerInfoInput.strBIN.length === 0) {
        showToast('error', 'Please give supplier BIN No');
        isValidated = false;
    }

    else if (partnerInfoInput.strPICName === undefined || partnerInfoInput.strPICName === null || partnerInfoInput.strPICName.length === 0) {
        showToast('error', 'Please give PIC Name');
        isValidated = false;
    }
    else if (partnerInfoInput.strPICContactNo === undefined || partnerInfoInput.strPICContactNo === null || partnerInfoInput.strPICContactNo.length === 0) {
        showToast('error', 'Please give PIC Contact');
        isValidated = false;
    }
    else if (partnerInfoInput.strPICEmail === undefined || partnerInfoInput.strPICEmail === null || partnerInfoInput.strPICEmail.length === 0) {
        showToast('error', 'Please give PIC Email');
        isValidated = false;
    }
    else if (!pattern.test(partnerInfoInput.strPICEmail)) {
        showToast('error', 'Please give valid PIC email');
        isValidated = false;
    }
    return isValidated;
};


export const getTaxType = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}master/tax`).then(

        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_TAX_TYPE, payload: data });
        }
    );
};
export const getPartnerType = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}partner/partnerType`).then(

        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_PARTNER_TYPE, payload: data });
        }
    );
};
export const getBusinessType = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}master/tax`).then(

        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_BUSINESS_TYPE, payload: data });
        }
    );
};

export const emptyStatus = () => (dispatch) => {
    let responseList = {
        status: false,
    };
    dispatch({
        type: Types.PARTNER_INFO_SUBMIT,
        payload: responseList,
    });
    dispatch({
        type: Types.EMPTY_PARTNER_INFO,

    });
    dispatch({
        type: TypesAddress.EMPTY_ADDRESS_INFO,

    });
    dispatch({
        type: TypesBank.EMPTY_BANK_INFO,

    });
    dispatch({
        type: TypesOther.EMPTY_OTHERS_INFO,

    });
    dispatch({
        type: Types.UPDATE_PARTNER_INFO,
        payload: responseList,
    });
}

export const partnerCreateSubmitAction = () => async (dispatch) => {

    const basicInfo = store.getState().partnerInfo.partnerInfoInput;
    const addressInfo = store.getState().partnerAddress.addressInfo;
    const bankInfo = store.getState().bankInfo.bankInfoMultiple;
    const otherInfo = store.getState().partnerOthersInfo.partnerOtherInfoInput;



    const finalSubmitInputData = {
        basicInfo: basicInfo,
        addressInfo: addressInfo,
        bankInfo: bankInfo,
        ports: otherInfo.multiplePort,
        psProvider: otherInfo.multipleProduct,
        // psType: otherInfo.multipleServiceList,
    }

    console.log('finalSubmitInputData :>> ', finalSubmitInputData);
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    dispatch({
        type: Types.PARTNER_INFO_SUBMIT,
        payload: responseList,
    });

    const url = `${process.env.REACT_APP_API_URL}partner/partnerCreate`

    await Axios.post(url, finalSubmitInputData)
        .then(function (response) {
            responseList.data = response.data.data;
            responseList.isLoading = false;
            responseList.status = response.data.status;
            if (response.data.status) {
                showToast("success", response.data.message);
                dispatch({
                    type: Types.PARTNER_INFO_SUBMIT,
                    payload: responseList,
                });
            } else {
                showToast("error", response.data.message);
            }
        })

        .catch(function (error) {
            responseList.isLoading = false;
            const message =
                "Something went wrong ! Please fill all inputs and try again !";
            showToast("error", message);
        });
};


export const EditSupplierInfo = (id) => (dispatch) => {
    console.log('basicAction', id)
    Axios.get(`${process.env.REACT_APP_API_URL}partner/showPartner/${id}`)
        .then((res) => {
            let data = res.data.data
            if (data.intSupplierTypeID !== null) {
                data.supplierTypeName = {
                    label: data.strSupplierTypeName,
                    value: data.intSupplierTypeID
                }

            }
            // if (data.intSupplierTypeID !== null) {
            //     data.supplierTypeName = {
            //         label: data.strSupplierTypeName,
            //         value: data.intSupplierTypeID
            //     }

            // }
            dispatch({
                type: Types.EDIT_PARTNER_INFO,
                payload: data,
            });

            if (data.address !== null) {
                if (data.address.intCountryID !== null) {
                    data.address.countryName = {
                        label: data.address.strCountry,
                        value: data.address.intCountryID
                    }

                }
                dispatch({
                    type: TypesAddress.EDIT_ADDRESS_INFO,
                    payload: data.address,
                });
            } else {
                data.address = [];
                dispatch({
                    type: TypesAddress.EDIT_ADDRESS_INFO,
                    payload: data.address,
                });
            }
            // if (data.address.intCountryID !== null) {
            //     data.address.countryName = {
            //         label: data.address.strCountry,
            //         value: data.address.intCountryID
            //     }

            // }

            if (data.bank_info !== null) {
                dispatch({
                    type: TypesBank.EDIT_BANK_INFO,
                    payload: data.bank_info,
                });
            } else {
                data.bank_info = [];
                dispatch({
                    type: TypesBank.EDIT_BANK_INFO,
                    payload: data.bank_info,
                });
            }

            if (data.port_served !== null) {
                dispatch({
                    type: TypesOther.EDIT_OTHERS_INFO,
                    payload: data,
                });
            } else {
                data.port_served = [];
            }
            dispatch({
                type: TypesOther.EDIT_OTHERS_INFO,
                payload: data,
            });



            if (data.service_provide !== null) {
                dispatch({
                    type: TypesOther.EDIT_OTHERS_INFO,
                    payload: data.service_provide,
                });
            } else {
                data.service_provide = [];
            }
            dispatch({
                type: TypesOther.EDIT_OTHERS_INFO,
                payload: data.service_provide,
            });

        });
};

export const UpdatePartnerInfo = (id) => async (dispatch) => {

    const basicInfo = store.getState().partnerInfo.partnerInfoInput;
    const addressInfo = store.getState().partnerAddress.addressInfo;
    const bankInfo = store.getState().bankInfo.bankInfoMultiple;
    const otherInfo = store.getState().partnerOthersInfo.partnerOtherInfoInput;

    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };

    dispatch({
        type: Types.UPDATE_PARTNER_INFO,
        payload: responseList,
    });

    const finalSubmitInputData = {
        basicInfo: basicInfo,
        addressInfo: addressInfo,
        bankInfo: bankInfo,
        ports: otherInfo.multiplePort,
        psProvider: otherInfo.multipleProduct,
        // psType: otherInfo.multipleServiceList,
    }
    console.log('finalSubmitInputData', finalSubmitInputData)
    Axios.put(
        `${process.env.REACT_APP_API_URL}partner/partnerUpdate/${id}`,
        finalSubmitInputData
    )
        .then(async (response) => {
            responseList.data = response.data;
            responseList.isLoading = false;
            responseList.status = response.data.status;

            if (response.data.status) {

                showToast("success", "Supplier Info updated Successfully");
                dispatch({
                    type: Types.UPDATE_PARTNER_INFO,
                    payload: responseList,
                });
            } else {
                showToast("error", response.data.message);
            }
        })

        .catch(function (error) {
            responseList.isLoading = false;
            const message =
                "Something went wrong ! Please fill all inputs and try again !";
            showToast("error", message);
        });
};
