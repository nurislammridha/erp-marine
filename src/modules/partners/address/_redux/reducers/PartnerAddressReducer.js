import * as Types from "../types/Types";

const initialState = {
    partnerAddressInput: {
        strSupplierAddress: "",
        strState: "",
        strCity: "",
        strZipCode: "",
        strCountry: "",
        intCountryID: "",
        isDefault: 1
    },
    addressInfo: []
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
                ...state,
                partnerAddressInput,
            };
        case Types.SUBMIT_PARTNER_ADDRESS:
            console.log('action.payload', action.payload)
            const partnerAddressSubmit = { ...state.partnerAddressInput };
            partnerAddressSubmit[action.payload.name] = action.payload.value;

            return {
                ...state, partnerAddressSubmit,
            };

        case Types.SUBMIT_PARTNER_ADDRESS_MULTIPLE:
            return {
                ...state,
                addressInfo: [...state.addressInfo, action.payload],
                partnerAddressInput: initialState.partnerAddressInput
            };

        case Types.DELETE_PARTNER_ADDRESS_MULTIPLE:
            const addressOld = [...state.addressInfo];
            addressOld.splice(action.payload, 1);
            return {
                ...state,
                addressInfo: addressOld,
            };
        default:
            break;
    }

    return newState;
}

export default PartnerAddressReducer;