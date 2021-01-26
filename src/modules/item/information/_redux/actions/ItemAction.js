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
    if (itemDataInput.intDepartmentID.length === 0) {
        showToast("error", "Please Select Department");
        return false
    }
    else if (itemDataInput.strItemName.length === 0) {
        showToast("error", "Item Name Should not be empty");
        return false
    }
    else if (itemDataInput.intUoMID.length === 0) {
        showToast("error", "Please Select UOM");
        return false
    }
    else if (itemDataInput.intItemTypeID.length === 0) {
        showToast("error", "Please Select Item Type");
        return false
    }
    else if (itemDataInput.intItemCategoryID.length === 0) {
        showToast("error", "Please Select Item Category");
        return false
    }
    else if (itemDataInput.strSubCategoryName.length === 0) {
        showToast("error", "Please Select Item Sub Category");
        return false
    }
    else if (itemDataInput.strPartNo.length === 0) {
        showToast("error", "Please Select Part No");
        return false
    }
    else if (itemDataInput.strModelNo.length === 0) {
        showToast("error", "Please Select Model No");
        return false
    }
    else if (itemDataInput.intCatalogueID.length === 0) {
        showToast("error", "Catalogue should not be empty");
        return false
    }
    else if (itemDataInput.strBrand.length === 0) {
        showToast("error", "Please Select Department");
        return false
    }
    else if (itemDataInput.strEngineName.length === 0) {
        showToast("error", "Please Select Department");
        return false
    }
    else if (itemDataInput.strDrwingNumber.length === 0) {
        showToast("error", "Please Select Department");
        return false
    }

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
    const postData = {
        items: multipleItemList
    }
    console.log('multipleItemList Action:>> ', multipleItemList);
    const url = `${process.env.REACT_APP_API_URL}inventory/itemList`;

    Axios.post(url, postData).then(function (response) {
        console.log('response Action:>> ', response);
        responseList.isLoading = true;
        responseList.data = response.data.data;
        // { (response.status) ? <Redirect to="/items/list" />:<Redirect to="/items/list" />}

        if (response.status) {
            showToast("success", response.data.message);
            // history.push('/items/list');
            // history.replace({ pathname: '/items/list' });

            // <Redirect to="/items/list" />

        } else {
            showToast("error", response.data.message)
        }

    }).catch(function (error) {
        console.log(error);
        responseList.isLoading = false;
        const message = "Something Wrong, Fill Up all fields";
        showToast("error", message);
    });

}

export const getUOM = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}inventory/uomTypeList`).then(

        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_UOM, payload: data });
        }
    );
};

export const getItemType = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}inventory/itemTypeList`).then(

        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_ITEM_TYPE, payload: data });
        }
    );
};
export const getItemCategory = (data) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}inventory/itemCategory`).then(

        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_ITEM_CATEGORY, payload: data });
        }
    );
};
