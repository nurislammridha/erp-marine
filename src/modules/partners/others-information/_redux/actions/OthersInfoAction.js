import * as Types from "../types/Types";
import Axios from "axios";
import store from '../../../../../redux/store';
import { showToast } from "../../../../master/utils/ToastHelper";



export const handleChangePartnerOtherInfoInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_PARTNER_OTHERINFO_INPUT,
        payload: formData,
    });
    if (name === 'strPortName' || name === 'intPortID') {
        console.log('value', value)
        const selectedValue = {
            label: value,
            id: value
        }
        console.log('selectedValue', selectedValue)
    }
};