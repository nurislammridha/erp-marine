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

    let response = {
        status: false,
        isLoading: true,
        data: [],
    };

    dispatch({ type: Types.GET_ADMIN_INFO_LIST, payload: response });

    Axios.get(`${process.env.REACT_APP_API_URL}asset/assetAdminInfoRegistration`).then(
        (res) => {
            response.data = res.data.data;
            response.isLoading = false
            dispatch({ type: Types.GET_ADMIN_INFO_LIST, payload: response })
        }
    )
}