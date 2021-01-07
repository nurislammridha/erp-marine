import * as Types from "../types/Types";
// import axios from "axios";
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