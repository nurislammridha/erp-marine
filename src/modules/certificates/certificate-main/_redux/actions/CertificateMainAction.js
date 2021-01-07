import Axios from "axios";
import { toast } from 'react-toastify';
import { generateFormDataFromObject } from "../../../../master/utils/FileHelper";
import { showToast } from "../../../../master/utils/ToastHelper";

import * as Types from "../types/Types";

export const handleChangeProductInputAction = (name, value, e, isEdit = false) => (dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    const type = !isEdit ? Types.CHANGE_CERTIFICATE_INPUT : Types.CHANGE_CERTIFICATE_INPUT_UPDATE;
    dispatch({ type: type, payload: data });

    if (name === 'image') {
        let reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            data.name = 'imagePreviewUrl';
            data.value = reader.result;
            dispatch({ type: type, payload: data });
        }
        reader.readAsDataURL(file)
    }

};

export const getCertificateMainListAction = (page, searchText = null, isPublic = false) => async(dispatch) => {
    let response = {
        certificates: [],
        status: false,
        message: "",
        isLoading: true,
        errors: []
    };
    dispatch({ type: Types.CERTIFICATE_LIST_DASHBOARD, payload: response });
    let url = '';
    url =`${process.env.REACT_APP_API_URL}certificate/details?isPaginated=1&paginateNo=1`;

    if (searchText !== null) {
        // url += `&paginateNo=${page}`;
        url += `&search=${searchText}`
    } else {
        // url += `&certificate/details?search=${searchText}`
    }

    try {
        await Axios.get(url)
            .then((res) => {
                console.log('ReponseCertificate',res);
                const { data, message, status } = res.data;
                response.status = status;
                response.certificates = data.data;
                response.message = message;
                response.certificatesPaginatedData = data;
                response.isLoading = false;
            })
            .catch((err) => {
                console.log('ErrorCertificate1')
                toast.error(err);
            });
    } catch (error) {
        console.log('ErrorCertificate2')
        response.message = 'Something Went Wrong !';
        toast.error(error);
    }

    response.isLoading = false;
    dispatch({ type: Types.CERTIFICATE_LIST_DASHBOARD, payload: response });
};


export const deleteProductImagePreview = () => (dispatch) => {
    let data = {
        name: 'imagePreviewUrl',
        value: null,
    }
    dispatch({ type: Types.CHANGE_CERTIFICATE_INPUT, payload: data });
};
