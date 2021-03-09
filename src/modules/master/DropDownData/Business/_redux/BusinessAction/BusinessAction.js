import * as Types from "../Type/Types";
import Axios from "axios";

//get ship list
export const getBusinessData = () => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}purchase/branchList`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_BUSINESS_LIST, payload: data });
        }
    );
};