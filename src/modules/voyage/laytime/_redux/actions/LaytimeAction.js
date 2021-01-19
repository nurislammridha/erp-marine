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

// get voyage id 
export const GetVoyageID = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    Axios.get(`${process.env.REACT_APP_API_URL}voyage/charterVoyage/`)
        .then((res) => {
            let data = res.data;
            console.log('data :>> ', data);
            dispatch({ type: Types.GET_VOYAGE_ID, payload: data });
        });
};
// get data for lay time header input with voyage id
export const getHearInputData = (id) => (dispatch) => {
    let LayTimeURL = `${process.env.REACT_APP_API_URL}voyage/charterVoyage/${id}`;
    Axios.get(LayTimeURL)
        .then((response) => {
            if (response.status === 200) {
                let data = response.data.data;
                if (data.commmence_port !== null) {
                    data.commmencePort = {
                        label: data.commmence_port.strPortName,
                        value: data.commmence_port.intPortID
                    }
                }
                if (data.completion_port !== null) {
                    data.completionPort = {
                        label: data.completion_port.strPortName,
                        value: data.completion_port.intPortID
                    }
                }
                dispatch({ type: Types.GET_HEADER_INPUT_FROM_API, payload: data })
            }
        })
}
export const handleChangeLaytimeHeaderInput = (name, value, e) => (dispatch) => {
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