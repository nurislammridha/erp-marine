import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";



export const GetCurrencyData = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/asllhr/getCurrency`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_CURRENCY, payload: data });
        });
};
