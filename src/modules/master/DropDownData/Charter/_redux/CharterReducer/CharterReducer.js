import * as Types from "../Type/Types";
const initialstate = {
};
const CharterReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_CHARTER:
            return {
                ...state,
                charterList: getCharterList(action.payload),
                brokerList: getBroker(action.payload),
            };
        default:
            break;
    }
    return newState;
};

// voyahe type list
const getCharterList = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intChartererId,
                label: item.strChartererName,
            };
            options.push(itemData);
        });
    }
    return options;
};
//broker list
const getBroker = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intChartererId,
                label: item.strChartererName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default CharterReducer;