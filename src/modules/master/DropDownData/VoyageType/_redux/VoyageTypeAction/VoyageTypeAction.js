import * as Types from "../Type/Types";
import Axios from "axios";

//get voyage type data
export const getVoyageType = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}voyage/voyageType`;
    Axios.get(url)
        .then((res) => {
            console.log('res :>> ', res.data.data);
            dispatch({ type: Types.GET_VOYAGE_TYPE, payload: res.data.data });
        });
};