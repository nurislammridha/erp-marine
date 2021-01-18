import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";


// get currency 
export const GetCurrencyData = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };
    Axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/asllhr/getCurrency`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_CURRENCY_DATA, payload: data });
        });
};

// get data for lay time header input with voyage id
export const getHearInputData = (id) => (dispatch) => {
    let LayTimeURL = `${process.env.REACT_APP_API_URL}/voyage/charterVoyage/${id}`;
    Axios.get(LayTimeURL)
        .then((response) => {
            console.log('response :>> ', response);
            let data = response.data;
            dispatch({ type: Types.GET_HEADER_INPUT_FROM_API, payload: data })
        })

}
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