import * as Types from "../Type/Types";
import Axios from "axios";

//get refference type data
export const getRefferenceNo = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/poReferenceType`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_REFFERENCE_NO, payload: res.data.data });
        });
};