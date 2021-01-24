import * as Types from "../types/Types";

const initialState = {
    itemAddInput: {
        strItemName: "",
        strItemDescription: "",
        intUoMID: "",
        strUoM: "",
        strPartNo: "",
        strModelNo: "",
        intItemTypeID: "",
        StrItemTypeNam: "",
        intItemCategoryID: "",
        strItemCategoryName: "",
        intItemSubCategoryID: "",
        strSubCategoryNam: "",
        intDepartmentID: "",
        intCatalogueID: "",
        strIMPACode: "",
        strEngineName: "",
        strDrwingNumbe: "",
        strItemCode: "",
        isActive: "",
        intActionBy: "",
    },
    itemInfoMultiple: []
}


const ItemAddReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {


        case Types.CHANGE_ITEM_ADD_INPUT:
            const itemAddInput = { ...state.itemAddInput };
            itemAddInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                itemAddInput,
            };

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
        default:
            break;
    }

    return newState;
}

export default ItemAddReducer;

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