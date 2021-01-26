import * as Types from "../Type/Types";
const initialstate = {
};
const VoyageTypeReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_VOYAGE_TYPE:
            return {
                ...state,
                voyageTypeList: getVoyageData(action.payload),
            };
        default:
            break;
    }
    return state;
};

// voyage type list
const getVoyageData = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intVoyageTypeId,
                label: item.strVoyageTypeName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default VoyageTypeReducer;