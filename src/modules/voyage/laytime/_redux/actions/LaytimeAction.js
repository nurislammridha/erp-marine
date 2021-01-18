import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";



export const handleChangeLaytimeHeaderInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_LAYTIME_HEADER_INPUT,
        payload: formData,
    });
};

export const handleChangeLaytimeRowInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_LAYTIME_DETAIL_INPUT,
        payload: formData,
    });
};