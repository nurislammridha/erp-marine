import * as Types from "../Type/Types";
import Axios from "axios";

//get catalouge list
export const getCatalougList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/currency`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_CATALOUGE_LIST, payload: res.data.data });
        });
};