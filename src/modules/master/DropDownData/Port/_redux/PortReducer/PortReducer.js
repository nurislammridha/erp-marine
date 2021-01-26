import * as Types from "../Type/Types";
const initialstate = {
};
const PortReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_PORT:
            return {
                ...state,
                portList: getPortList(action.payload),
            };
        default:
            break;
    }
    return newState;
};

// port list
const getPortList = (data) => {
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
export default PortReducer;