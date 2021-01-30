import * as Types from "../types/Types";

const initialState = {
    isLoading: false,
    itemDataInput: {
        intDepartmentID: "",
        strDepartmentName: "",
        strItemName: "",
        intUoMID: "",
        strUoM: "",
        intItemTypeID: "",
        StrItemTypeName: "",
        intItemCategoryID: "",
        strItemCategoryName: "",
        strSubCategoryName: "",
        strPartNo: "",
        strModelNo: "",
        strBrand: "",
        intCatalogueID: "",
        strEngineName: "",
        strDrwingNumber: "",
        strItemDescription: "Personal",
        intItemSubCategoryID: "",
        strItemCode: "1",
        intActionBy: "502648",
    },
    multipleItemAdd: [],
    itemList: [],
    itemListPaginated: null,
    itemSUbmit: []
}
const ItemReducer = (state = initialState, action) => {
    const newState = { ...state }
    // console.log('action.payload status:>> ', action.payload);
    switch (action.type) {
        case Types.CHANGE_ITEM_INPUT:
            const itemDataInput = { ...state.itemDataInput };
            itemDataInput[action.payload.name] = action.payload.value;
            return { ...state, itemDataInput };
        case Types.MULTIPLE_ITEM_ADD_INPUT:
            const multipleItemAdd = [...state.multipleItemAdd, action.payload];
            return { ...state, multipleItemAdd, itemDataInput: initialState.itemDataInput }
        case Types.DELETE_MULTIPLE_ITEM:
            const multipleItemAddOld = [...state.multipleItemAdd];
            multipleItemAddOld.splice(action.payload, 1);
            return {
                ...state,
                multipleItemAdd: multipleItemAddOld
            }
        case Types.GET_UOM:
            return {
                ...state,
                UOMOptionData: getUom(action.payload),

            };

        case Types.GET_ITEM_TYPE:
            return {
                ...state,
                itemTypeOptionData: getItemType(action.payload),
            };

        case Types.GET_ITEM_CATEGORY:
            return {
                ...state,
                itemCategoryOptionData: getItemCategory(action.payload),
            };
        case Types.GET_ITEM_SUB_CATEGORY:
            return {
                ...state,
                itemSubCategoryOptionData: getItemSubCategory(action.payload),
            };
        case Types.ITEM_SUBMIT:
            return {
                ...state,
                itemSUbmit: action.payload
            }

        case Types.GET_ITEM_LIST:
            if (action.payload.status) {
                return {
                    ...state,
                    itemList: action.payload.itemList,
                    itemListPaginated: action.payload.itemListPaginated,
                    isLoading: false,
                };
            } else {
                return {
                    ...state,
                    isLoading: true,
                };
            }
        case Types.EMPTY_MULTIPLE_ITEM_LIST:
            return {
                ...state, multipleItemAdd: action.payload
            }
        // case Types.EMPTY_ITEM_SUBMIT:
        //     return {
        //         ...state, itemSUbmit: action.payload
        //     }
        case Types.DELETE_TITEM:
            return {
                ...state,
                isLoading: action.payload,
            };
        //get item details 
        case Types.GET_ITEMS_DETAILS:
            return {
                ...state,
                ItemDetails: action.payload === null ? initialState.ItemDetails : action.payload,
                itemDataInput: action.payload === null ? initialState.itemDataInput : action.payload,
            }
        //items edit
        case Types.ITEM_EDIT:
            if (action.payload.status) {

                return {
                    ...state,
                    ...initialState,
                    isLoading: action.payload.isLoading,
                };
            } else {
                return {
                    ...state,
                    isLoading: false,
                };
            }
            break;
        //items editting
        case Types.ITEM_EDITTING:
            return {
                ...state,
                isLoading: action.payload,
            };
            break;
        default:
            break;
    }
    return newState;

}

export default ItemReducer;
const getUom = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intUoMId,
                label: item.strUoM,
            };
            options.push(itemData);
        });
    }
    return options;
};


const getItemType = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intItemTypeID,
                label: item.strItemTypeName,
            };
            options.push(itemData);
        });
    }
    return options;
};


const getItemCategory = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intItemCategoryID,
                label: item.strItemCategoryName,
            };
            options.push(itemData);
        });
    }
    return options;
};
const getItemSubCategory = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intItemSubCategoryID,
                label: item.strItemSubCategoryName,
            };
            options.push(itemData);
        });
    }
    return options;
};