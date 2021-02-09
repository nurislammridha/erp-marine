import * as Types from "../Type/Types";
import Axios from "axios";

//get currency list
export const getItemList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}inventory/itemList`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_ITEM_LIST, payload: res.data.data });
        });
};
