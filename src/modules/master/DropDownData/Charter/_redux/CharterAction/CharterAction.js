import * as Types from "../Type/Types";
import Axios from "axios";

//get charter voyage data
export const getPortList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}voyage/portList`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_PORT, payload: res.data.data });
        });
};