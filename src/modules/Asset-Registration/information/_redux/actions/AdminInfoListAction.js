import * as Types from "../types/Types";
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";

export const handleChangeAdminListFilterInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };

    dispatch({
        type: Types.CHANGE_ADMIN_LIST_FILTER_INPUT,
        payload: formData,
    });
};

export const getAdminInfoList = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}asset/assetAdminInfoRegistration`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_ADMIN_INFO_LIST, payload: data })
        }
    )
}