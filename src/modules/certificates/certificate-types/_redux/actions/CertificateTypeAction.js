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
    let url = `${process.env.REACT_APP_API_URL}certificate/types`;

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

    let postUrl = `${process.env.REACT_APP_API_URL}certificate/types`;
    axios
        .post(postUrl, CertificateTypeInput)
        .then(function (response) {
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
                showToast("error", response.data.message);
            }
        })
        .catch(function (error) {

            responseList.isLoading = false;
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

    axios
        .get(
            `${process.env.REACT_APP_API_URL}certificate/types/${id}`
        )

        .then((res) => {

            dispatch({
                type: Types.EDIT_CERTIFICATE_TYPE_LIST,
                payload: res.data,
            });

        });
};

export const UpdateCertificateTypeList = (certificateEditInfoData) => async (dispatch) => {


    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };

    dispatch({
        type: Types.UPDATE_CERTIFICATE_TYPE_LIST,
        payload: responseList,
    });

    let postData = {
        intCertificateTypeID: certificateEditInfoData.intCertificateTypeID,
        strCertificateTypeName: certificateEditInfoData.strCertificateTypeName,
        intActionBy: 1,
        isActive: certificateEditInfoData.isActive

    }



    axios
        .put(
            `${process.env.REACT_APP_API_URL}certificate/types/update`, postData
        )
        .then(async (response) => {

            responseList.data = response.data;
            responseList.isLoading = false;
            responseList.status = response.data.status;

            if (response.data.status) {
                showToast("success", response.data.message);
                dispatch({ type: Types.UPDATE_CERTIFICATE_TYPE_LIST, payload: responseList });
            } else {
                showToast("error", response.data.message);
            }
        })

        .catch(function (error) {
            responseList.isLoading = false;
            const message =
                "Something went wrong ! Please fill all inputs and try again !";
            showToast("error", message);

            dispatch({
                type: Types.UPDATE_CERTIFICATE_TYPE_LIST,
                payload: responseList,
            });
        });
};