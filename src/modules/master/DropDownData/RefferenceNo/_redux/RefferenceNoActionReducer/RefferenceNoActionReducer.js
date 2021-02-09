import * as Types from "../Type/Types";
const initialstate = {
};
const RefferenceTypeReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_REFFERENCE_NO:
            return {
                ...state,
                refferenceList: getRefferenceList(action.payload),
            };
        default:
            break;
    }
    return state;
};

// reffernce type list
const getRefferenceList = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intPOReferenceTypeId,
                label: item.strPOReferenceType,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default RefferenceTypeReducer;