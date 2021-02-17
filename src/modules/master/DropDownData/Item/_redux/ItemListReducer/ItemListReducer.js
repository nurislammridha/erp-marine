import * as Types from "../Type/Types";
const initialstate = {
};
const ItemListReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_ITEM_LIST_DROPDOWN:
            return {
                ...state,
                ItemList: GetItemData(action.payload),
            };
        default:
            break;
    }
    return state;
};

// voyage type list
const GetItemData = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intItemID,
                label: item.strItemName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default ItemListReducer;