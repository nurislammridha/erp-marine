import * as Types from "../Type/Types";
import Axios from "axios";

//get charter voyage data
export const getCharterList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}voyage/charterList`;
    Axios.get(url)
        .then((res) => {
            if (res.data.status) {
                dispatch({ type: Types.GET_CHARTER, payload: res.data.data });
            }
        });
};