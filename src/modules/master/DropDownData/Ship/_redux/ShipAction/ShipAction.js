import * as Types from "../Type/Types";
import Axios from "axios";

//get ship list
export const getShipList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}voyage/shipList`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_SHIP, payload: res.data.data });
        });
};