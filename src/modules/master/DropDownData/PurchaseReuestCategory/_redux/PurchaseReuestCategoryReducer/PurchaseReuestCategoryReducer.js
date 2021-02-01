import * as Types from "../Type/Types";
const initialstate = {
};
const PurchaseReuestCategoryReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.PRCHASE_REQUEST_CATEFORY_DATA:
            return {
                ...state,
                PRCategoryList: getPRCategory(action.payload),
            };
        default:
            break;
    }
    return state;
};

// voyage type list
const getPRCategory = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intRequisitionCategoryID,
                label: item.strRequisitionCategoryName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default PurchaseReuestCategoryReducer;