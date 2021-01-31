import * as Types from "../types/Types";
import axios from "axios";

export const getLaytimeList = () => async (dispatch) => {
    let url = `${process.env.REACT_APP_API_URL}voyage/laytimeHeader`;
    axios.get(url).then((res) => { dispatch({ type: Types.GET_LAYTIME_LIST, payload: res.data }) })
}