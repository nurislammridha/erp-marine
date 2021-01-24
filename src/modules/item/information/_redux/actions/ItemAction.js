import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";
import Axios from "axios";

export const handleChangeItemAddInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    // console.log('formData :>> ', formData);
    dispatch({ type: Types.CHANGE_ITEM_ADD_INPUT, payload: formData })
}

export const getUOM = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}inventory/uomTypeList`).then(

        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_UOM, payload: data });
        }
    );
};

export const getItemType = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}inventory/itemTypeList`).then(

        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_ITEM_TYPE, payload: data });
        }
    );
};

export const getItemCategory = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}inventory/itemCategory`).then(

        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_ITEM_CATEGORY, payload: data });
        }
    );
};