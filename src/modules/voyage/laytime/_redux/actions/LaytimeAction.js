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

// multiple demurrages add 
export const multipleLaytimeAction = (demurrage) => (dispatch) => {
    if (demurrage.numDemurrageRate === null) {
        showToast('error', "Demurrage rate can't be blank!")
        return false;
    }
    if (demurrage.intCurrencyID === null) {
        showToast('error', "Currency can't be blank!")
        return false;
    }
    if (demurrage.numDespatchRate === null) {
        showToast('error', "Despatch rate can't be blank!")
        return false;
    }
    if (demurrage.numDespatchPercent === null) {
        showToast('error', "Despatch Percent rate can't be blank!")
        return false;
    }
    let demurrageData = {
        strReversibleIType: demurrage.strReversibleIType,
        numDemurrageRate: demurrage.numDemurrageRate,
        intCurrencyID: demurrage.intCurrencyID,
        numDespatchRate: demurrage.numDespatchRate,
        numDespatchPercent: demurrage.numDespatchPercent
    }
    console.log('demurrageData :>> ', demurrageData);
    dispatch({ type: Types.ADD_MULTIPLE_DUMMARAGES, payload: demurrageData })
}

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

//submit laytime data 
export const submitLaytime = (laytimeData) => (dispatch) => {

}
