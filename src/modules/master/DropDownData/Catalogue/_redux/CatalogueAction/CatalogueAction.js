import * as Types from "../Type/Types";
import Axios from "axios";

//get catalouge list
export const getCatalougList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}inventory/itemCatalouge`;
    Axios.get(url)
        .then((res) => {
            console.log('res catalouge :>> ', res);
            dispatch({ type: Types.GET_CATALOUGE_LIST, payload: res.data.data });
        });
};