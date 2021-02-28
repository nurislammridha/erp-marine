import * as Types from "../types/Types";
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";

export const handleChangeAdminInfoInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_ADMININFO_INPUT,
        payload: formData,
    });
};