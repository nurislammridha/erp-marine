import * as Types from "../types/Types";

const initialState = {
    partnerAddressInput: {
        address: "",
        state: "",
        city: "",
        code: "",
        country: "",
        isDefault: "1"
    }

}

const PartnerAddressReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        // case Types.GET_ADDRESS_ACTION_SUBMIT:
        //     const partnerAddressSubmit = { ...state.partnerAddressInput };
        //     partnerAddressSubmit = action.payload;
        //     return {
        //         ...state, partnerAddressSubmit,
        //     };

        case Types.CHANGE_PARTNER_ADDRESS_INPUT:
            const partnerAddressInput = { ...state.partnerAddressInput };
            partnerAddressInput[action.payload.name] = action.payload.value;
            return {
                ...state, partnerAddressInput,
            };

        default:
            break;
    }

    return newState;
}

export default PartnerAddressReducer;