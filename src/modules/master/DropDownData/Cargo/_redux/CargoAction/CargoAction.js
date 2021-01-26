import * as Types from "../Type/Types";
import Axios from "axios";

//get cargo data
export const getCargoList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}voyage/cargoType`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_CARGO, payload: res.data.data });
        });
};