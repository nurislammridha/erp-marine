import * as Types from "../Type/Types";
const initialstate = {
};
const CatalogueListReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_CATALOUGE_LIST:
            return {
                ...state,
                catalougList: getCataloug(action.payload),
            };
        default:
            break;
    }
    return state;
};

// voyage type list
const getCataloug = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intCatalogueId,
                label: item.strCatalogueName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default CatalogueListReducer;