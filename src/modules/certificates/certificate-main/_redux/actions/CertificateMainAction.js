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

export const deleteProductImagePreview = () => (dispatch) => {
    let data = {
        name: 'imagePreviewUrl',
        value: null,
    }
    dispatch({ type: Types.CHANGE_CERTIFICATE_INPUT, payload: data });
};
