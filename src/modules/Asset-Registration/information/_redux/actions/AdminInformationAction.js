import * as Types from "../types/Types";
import moment from 'moment'
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";

export const handleChangeAdminInfoInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    console.log('formData', formData);
    dispatch({
        type: Types.CHANGE_ADMININFO_INPUT,
        payload: formData,
    });
};

export const submitAdminInformation = (adminInfoInput) => async (dispatch) => {

    let responseList = {
        status: false,
        isLoading: true,
        data: {},
    }

    dispatch({ type: Types.SUBMIT_ADMIN_INFO, payload: responseList });

    await Axios.post(`${process.env.REACT_APP_API_URL}asset/assetAdminInfoRegistration`, adminInfoInput).then(
        (res) => {
            if (res.data.status) {
                responseList.data = res.data;
                responseList.isLoading = false;
                responseList.status = res.data.status;
                showToast("success", res.data.message);
                dispatch({ type: Types.SUBMIT_ADMIN_INFO, payload: responseList });
            } else { showToast("error", res.data.message) }
        }
    ).catch(function (error) {
        responseList.isLoading = false;
        const message = "Something went wrong ! Please fill all inputs and try again !";
        showToast("error", message);
        dispatch({ type: Types.SUBMIT_ADMIN_INFO, payload: responseList });
    });



}