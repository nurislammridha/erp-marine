import * as Types from "../Type/Types";
import Axios from "axios";

//get voyage type data
export const getPaymentTerms = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/paymentTerms`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_PAYMENT_METHOD, payload: res.data.data });
        });
};