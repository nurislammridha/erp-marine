import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";
export const itemAddInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.CHANGE_ITEM_INPUT, payload: formData })
}

export const multipleItemAddInput = (itemDataInput) => (dispatch) => {
    dispatch({ type: Types.MULTIPLE_ITEM_ADD_INPUT, payload: itemDataInput })
}
export const deleteMultipleItemInput = (index) => (dispatch) => {
    dispatch({ type: Types.DELETE_MULTIPLE_ITEM, payload: index })
}


export const submitMultipleItem = (multipleItemList) => (dispatch) => {
    let responseList = {
        isLoading: false,
        status: false,
        data: {}
    }
    const url = `${process.env.REACT_APP_API_URL}inventory/itemList`;

    Axios.post(url, multipleItemList).then(function (response) {
        console.log('response Action:>> ', response.data.data);
        responseList.isLoading = true;
        responseList.data = response.data.data;
        if (response.status) {
            showToast("success", response.data.message)
        } else {
            showToast("error", response.data.message)
        }
    }).catch(function (error) {
        responseList.isLoading = false;
        const message = "Something Wrong, Fill Up all fields";
        showToast("error", message);
    });

}
export const getItemCategory = (data) => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}inventory/itemCategory`;

    Axios.get(url).then((response) => {
        console.log('response', response)
        let data = response.data.data;
        dispatch({ type: Types.GET_ITEM_CATEGORY, action: data })
    })
}