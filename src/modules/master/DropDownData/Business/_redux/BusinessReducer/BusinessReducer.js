import * as Types from "../Type/Types";
const initialstate = {
    BusinessList: []
};
const BusinessTypeReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_BUSINESS_LIST:
            return {
                ...state,
                BusinessList: getBusinessList(action.payload),
            };
        default:
            break;
    }
    return state;
};

// ship list
const getBusinessList = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intBusinessUnitId,
                label: item.strBusinessUnitName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default BusinessTypeReducer;