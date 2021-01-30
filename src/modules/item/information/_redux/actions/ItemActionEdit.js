import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";

export const getItemDetails = (id) => (dispatch) => {
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    dispatch({ type: Types.GET_ITEMS_DETAILS, payload: responseList });
    Axios(`${process.env.REACT_APP_API_URL}inventory/itemList/${id}`)
        .then((res) => {
            if (res.data.status) {
                let data = res.data.data;
                if (data.intDepartmentID !== null && data.strDepartmentName !== "") {
                    data.department = {
                        label: data.strDepartmentName,
                        value: data.intDepartmentID
                    }
                } else {
                    data.department = ""
                }
                if (data.intUoMID !== null && data.strUoM !== "") {
                    data.UOM = {
                        label: data.strUoM,
                        value: data.intUoMID
                    }
                } else {
                    data.UOM = ""
                }
                if (data.intItemTypeID !== null && data.StrItemTypeName !== "") {
                    data.itemType = {
                        label: data.StrItemTypeName,
                        value: data.intItemTypeID
                    }
                } else {
                    data.itemType = ""
                }
                if (data.intItemCategoryID !== null && data.strItemCategoryName !== "") {
                    data.itemCategory = {
                        label: data.strItemCategoryName,
                        value: data.intItemCategoryID
                    }
                } else {
                    data.itemCategory = ""
                }
                if (data.intItemSubCategoryID !== null && data.strSubCategoryName !== "") {
                    data.itemSubCategory = {
                        label: data.strSubCategoryName,
                        value: data.intItemSubCategoryID
                    }
                } else {
                    data.itemSubCategory = ""
                }
                dispatch({type: Types.GET_ITEMS_DETAILS, payload: data})
            }
        })
}

// edit item details 
export const editMultipleItemData = (multipleItemList, id) => (dispatch) => {
    let responseList = {
        isLoading: false,
        status: false,
        data: {}
    }
    dispatch({type: Types.ITEM_EDITTING, responseList})
    const postData = {
        items: multipleItemList
    }
    const url = `${process.env.REACT_APP_API_URL}inventory/itemList/${id}`;
    Axios.put(url, postData).then(function (response) {
        responseList.isLoading = true;
        responseList.data = response.data.data;
        responseList.status = response.data.data;
        if (response.data.status) {
            showToast("success", response.data.message);
            dispatch({
                type: Types.ITEM_EDIT,
                payload: responseList,
            })
        } else {
            showToast("error", response.data.message)
        }

    }).catch(function (error) {
        responseList.isLoading = false;
        const message = "Something Wrong, Fill Up all fields";
        showToast("error", message);
    });

}