import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";

export const handlePurchaseInputChage = (name, value) => (dispatch) => {
    // PURCHASE_REQUEST_INPUT_CHANGE
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.PURCHASE_REQUEST_INPUT_CHANGE, payload: formData });
}