import * as Types from "../Type/Types";
const initialstate = {
};
const CargoReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_CARGO:
            return {
                ...state,
                cargoList: getCargo(action.payload),
            };
        default:
            break;
    }
    return newState;
};

// cargo list
const getCargo = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intCargoId,
                label: item.strCargoName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default CargoReducer;