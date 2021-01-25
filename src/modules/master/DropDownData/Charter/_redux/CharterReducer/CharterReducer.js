import * as Types from "../Type/Types";
const initialstate = {
};
const CharterReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_PORT:
            return {
                ...state,
                portList: getCharterList(action.payload),
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
                value: item.intPortID,
                label: item.strPortName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default CharterReducer;