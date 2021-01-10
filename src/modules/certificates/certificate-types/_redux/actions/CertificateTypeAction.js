import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";


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


    let isActive = status == "" ? 1 : parseInt(status);
    let url = `http://10.17.2.189:8080/IMarineApi/public/api/v1/certificate/types`;

    if (searchValue !== "" || isActive !== "") {
        url += `?search=${searchValue}&isActive=${isActive}`;
    }
    axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_CERTIFICATE_TYPE_LIST, payload: res.data });
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

    let postUrl = `http://10.17.2.189:8080/IMarineApi/public/api/v1/certificate/types`;
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


export const EditCertificateTypeList = (id) => (dispatch) => {
    console.log("id: ", id)
    axios
        .get(
            `http://10.17.2.189:8080/IMarineApi/public/api/v1/certificate/types/${id}`
        )

        .then((res) => {

            dispatch({
                type: Types.EDIT_CERTIFICATE_TYPE_LIST,
                payload: res.data,
            });

        });
};

export const UpdateCertificateTypeList = (certificateEditInfoData) => async (dispatch) => {

    console.log('certificateEditInfoData:', certificateEditInfoData)
    let data = {
        status: false,
        message: "",
    };

    let postData = {
        intCertificateTypeID: certificateEditInfoData.intCertificateTypeID,
        strCertificateTypeName: certificateEditInfoData.strCertificateTypeName,
        intActionBy: 1,
        isActive: certificateEditInfoData.isActive

    }

    console.log('postData', postData);


    axios
        .put(
            `http://10.17.2.189:8080/IMarineApi/public/api/v1/certificate/types/update`, postData
        )
        .then(async (response) => {

            data = {
                status: true,
                message: response.data.message,
            };
            if (response.data.status) {
                showToast("success", response.data.message);
                dispatch({ type: Types.UPDATE_CERTIFICATE_TYPE_LIST, payload: data });
            } else {
                showToast("error", response.data.message);
            }
        })
        .catch((err) => {

            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.UPDATE_CERTIFICATE_TYPE_LIST, payload: data });
        });
};