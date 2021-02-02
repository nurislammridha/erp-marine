import * as Types from "../types/Types";
const initialstate = {
    orderInput: {
        intRefferenceId: "",
        strRefferenceName: "",
        intItemId: "",
        strItemName: "",
        strRemarks: "",
        numQTY: ""
    }
};
const PurchasesOrderReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {

        case Types.GET_ORDER_INPUT:
            const orderInput = { ...state.orderInput }
            orderInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                orderInput
            };
        default:
            break;
    }
    return newState;
};
export default PurchasesOrderReducer;