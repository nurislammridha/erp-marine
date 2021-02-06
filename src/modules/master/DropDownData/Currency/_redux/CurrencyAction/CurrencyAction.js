import * as Types from "../Type/Types";
import Axios from "axios";

//get currency list
export const getCurrencyList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/currency`;
    Axios.get(url)
        .then((res) => {
            console.log('res :>> ', res.data.data);
            dispatch({ type: Types.GET_CURRENCY_LIST, payload: res.data.data });
        });
};