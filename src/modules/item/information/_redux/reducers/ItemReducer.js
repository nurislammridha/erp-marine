import * as Types from "../types/Types";

const initialState = {
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
        strDrwingNumber: ""
    },
    multipleItemAdd: []
}
const ItemReducer = (state = initialState, action) => {
    const newState = { ...state }
    // console.log('action.payload :>> ', action.payload);
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
        default:
            break;

    }

    return newState;
}

export default ItemReducer;