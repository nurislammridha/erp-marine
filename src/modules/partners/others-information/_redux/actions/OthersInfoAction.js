import * as Types from "../types/Types";
import Axios from "axios";
import store from '../../../../../redux/store';
import { showToast } from "../../../../master/utils/ToastHelper";



export const handleChangePartnerOtherInfoInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };


    let updatedArray = [];
    if (name === "multiplePort") {
        value.forEach(item => {
            const itemNew = {
                "intPortID": item.intPortID,
                "strPortName": item.strPortName,
                "intActionBy": item.intActionBy,
            }
            updatedArray.push(itemNew);
        });
    }

    if (name === "multipleProduct") {
        value.forEach(item => {
            const itemNew = {
                "intProductAndServiceTypeID": item.intProductAndServiceTypeID,
                "strProductOrServiceName": item.strProductOrServiceName,
                "intActionBy": item.intActionBy,
                "intProductOrServiceID": item.intProductOrServiceID
            }
            updatedArray.push(itemNew);
        });
    }

    formData.value = updatedArray;
    dispatch({
        type: Types.CHANGE_PARTNER_OTHERINFO_INPUT,
        payload: formData,
    });

};

export const getPortName = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}partner/port`).then(

        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_PORT_NAME, payload: data });
        }
    );
};

export const getProviderName = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}partner/psProvider`).then(

        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_PROVIDER_NAME, payload: data });
        }
    );
};

