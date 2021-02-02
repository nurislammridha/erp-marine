import * as Types from "../Type/Types";
import Axios from "axios";
//get department data
export const getPRCategoryData = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/reqCategoryList`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.PRCHASE_REQUEST_CATEFORY_DATA, payload: res.data.data });
        });
};