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
        showToast("error", "Item Sub Category should not be empty");
        return false
    }
    else if (itemDataInput.strPartNo.length === 0) {
        showToast("error", "Part No should not be empty");
        return false
    }
    else if (itemDataInput.strModelNo.length === 0) {
        showToast("error", "Model No should not be empty");
        return false
    }
    else if (itemDataInput.intCatalogueID.length === 0) {
        showToast("error", "Catalogue should not be empty");
        return false
    }
    // else if (itemDataInput.strBrand.length === 0) {
    //     showToast("error", "Brand should not be empty");
    //     return false
    // }
    // else if (itemDataInput.strEngineName.length === 0) {
    //     showToast("error", "Engine no should not be empty");
    //     return false
    // }
    // else if (itemDataInput.strDrwingNumber.length === 0) {
    //     showToast("error", "Drawing no should not be empty");
    //     return false
    // }

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
        responseList.isLoading = true;
        responseList.data = response.data.data;
        responseList.status = response.data.data;
        if (response.data.status) {
            showToast("success", response.data.message);
            dispatch({
                type: Types.ITEM_SUBMIT,
                payload: responseList,
            })
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
export const getItemCategory = () => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}inventory/itemCategory`).then(

        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_ITEM_CATEGORY, payload: data });
        }
    );
};

export const getItemSubCategory = (intItemCategoryID = null) => (dispatch) => {
    console.log('intItemCategoryID :>> ', intItemCategoryID);
    let url = `${process.env.REACT_APP_API_URL}inventory/itemSubCategory`;
    if (intItemCategoryID !== null) {
        let url = `${process.env.REACT_APP_API_URL}inventory/itemSubCategory/${intItemCategoryID}`;
        Axios.get(url).then(
            (res) => {
                console.log('res :>> ', res);
                let data = res.data.data;
                dispatch({ type: Types.GET_ITEM_SUB_CATEGORY, payload: data });
            }
        );
    }else{
        dispatch({ type: Types.GET_ITEM_SUB_CATEGORY, payload: [] });
    }

};


// export const getItemSubCategory = (data) => (dispatch) => {
//     Axios.get(`${process.env.REACT_APP_API_URL}inventory/itemSubCategory `)
//         .then((res) => {
//             let data = res.data.data;
//             dispatch({ type: Types.GET_ITEM_SUB_CATEGORY, payload: data });
//         }
//         );
// };

export const getItemList = (page, searchText = null) => async (dispatch) => {
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    dispatch({ type: Types.GET_ITEM_LIST, payload: responseList });
    let itemListAPI = "";
    // itemListAPI = `${process.env.REACT_APP_API_URL}inventory/itemList`;
    itemListAPI = `${process.env.REACT_APP_API_URL}inventory/itemList?isPaginated=1&paginateNo=10`;
    if (page !== null || page === "") {
        itemListAPI += `&page=${page}`;
    }
    if (searchText !== null) {
        itemListAPI += `&search=${searchText}`;
    } else {
        // url += `&certificate/details?search=${searchText}`
    }
    try {
        await Axios.get(itemListAPI)
            .then((res) => {
                const { data, message, status } = res.data;
                responseList.status = status;
                responseList.itemList = data.data;
                responseList.message = message;
                responseList.itemListPaginated = data;
                responseList.isLoading = false;

            }).catch((err) => {
                console.log("ErrorCertificate1");
            });
    } catch (error) {
        console.log("ErrorCertificate2");
        responseList.message = "Something Went Wrong !";
        showToast('error', responseList.message);
    }

    responseList.isLoading = false;
    dispatch({ type: Types.GET_ITEM_LIST, payload: responseList });
}
export const emptyItemSubmit = () => (dispatch) => {
    const data = "";
    dispatch({ type: Types.ITEM_SUBMIT, payload: data })
}
export const emptyMultipleItemList = () => (dispatch) => {
    const data = "";
    dispatch({ type: Types.EMPTY_MULTIPLE_ITEM_LIST, payload: data })
}

// delete data from item list
export const DeleteItem = (id) => (dispatch) => {
    let isLoading = true;
    dispatch({ type: Types.DELETE_TITEM, payload: isLoading })
    Axios.delete(`${process.env.REACT_APP_API_URL}inventory/itemList/${id}`)
        .then((res) => {
            if (res.data.status) {
                const data = res.data;
                showToast('success', data.message);
                dispatch({ type: Types.DELETE_TITEM, payload: false });
                dispatch(getItemList())
            }
        })
}