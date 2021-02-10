import * as Types from "../Type/Types";
const initialstate = {
};
const SupplierNameReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_SUPPLIER_NAME:
            return {
                ...state,
                supplierNameList: getSupplierName(action.payload),
            };
        default:
            break;
    }
    return state;
};

// supplier name list
const getSupplierName = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intSupplierId,
                label: item.strSupplierName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default SupplierNameReducer;
 