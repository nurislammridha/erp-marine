import * as Types from "../Type/Types";
const initialstate = {
};
const ShipReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_SHIP:
            return {
                ...state,
                shipList: getShipList(action.payload),
            };
        default:
            break;
    }
    return state;
};

// ship list
const getShipList = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intShipID,
                label: item.strShipName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default ShipReducer;