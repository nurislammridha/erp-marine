import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
// import { showToast } from "../../../master/utils/ToastHelper";

export const handleChangeCertificateTypeInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_CERTIFICATE_TYPE_INPUT,
        payload: formData,
    });
};

export const getCertificateTypeList = (searchValue = "", status = "") => async (dispatch) => {
    const headers = {
        "Content-Type": "application/json",
    };

    // containerTypeId = (containerTypeId === "" || containerTypeId === null) ? "" : containerTypeId;
    // vessel = (vessel === null || vessel === "") ? "" : vessel;

    let url = `http://10.3.203.136:8081/iMarineAPI/public/api/v1/certificate/types`;

    if (searchValue !== "" || status !== "") {
        url += `?search=${searchValue}&status=${status}`;
    }
    axios
        .get(url, {
            headers: headers,
        })
        .then((res) => {
            console.log("Response", res);
            let data = res.data;
            console.log('data', data)
            dispatch({ type: Types.GET_CERTIFICATE_TYPE_LIST, payload: data });
        });
};

export const certificatetypeSubmitAction = (CertificateTypeInput) => (dispatch) => {

    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    dispatch({
        type: Types.CREATE_CERTIFICATE_TYPE,
        payload: responseList,
    });

    let postUrl = `http://10.3.203.136:8081/iMarineAPI/public/api/v1/certificate/types`;
    axios
        .post(postUrl, CertificateTypeInput)
        .then(function (response) {
            console.log('CertificateTypeInput', response)
            responseList.data = response.data;
            responseList.isLoading = false;
            responseList.status = response.data.status;
            if (response.data.status) {
                showToast("success", response.data.message);
                dispatch({
                    type: Types.CREATE_CERTIFICATE_TYPE,
                    payload: responseList,
                });
            } else {
                console.log('error data', response.data);
                showToast("error", response.data.message);
            }
        })
        .catch(function (error) {

            responseList.isLoading = false;
            // const errorsResponse = JSON.parse(error.request.response.errors.strCertificateTypeName[0]);
            // console.log('error', errorsResponse);
            // const message = errorsResponse.message;
            // responseList.message = message;
            // responseList.errors = errorsResponse.errors;
            const message =
                "Something went wrong ! Please fill all inputs and try again !";
            showToast("error", message);

            dispatch({
                type: Types.CREATE_CERTIFICATE_TYPE,
                payload: responseList,
            });
        });
};