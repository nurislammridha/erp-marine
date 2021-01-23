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
    }
}
const ItemReducer = (state = initialState, action) => {
    const newState = { ...state }

    switch (action.type) {
        case Types.CHANGE_ITEM_INPUT:
            const itemDataInput = { ...state.itemDataInput };
            itemDataInput[action.payload.name] = action.payload.value;
            return { ...state, itemDataInput };
        default:
            break;

    }

    return newState;
}

export default ItemReducer;