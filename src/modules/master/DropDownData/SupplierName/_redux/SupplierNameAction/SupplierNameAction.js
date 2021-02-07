import * as Types from "../Type/Types";
import Axios from "axios";

//get supplier name
export const getSupplierName = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}partner/basicInfo`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_SUPPLIER_NAME, payload: res.data.data });
        });
};