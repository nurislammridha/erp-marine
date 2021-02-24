import * as Types from "../types/Types";

const initialState = {
    portList: [],
    psProviderList: [],

    partnerOtherInfoInput: {
        multiplePort: [],
        multipleProduct: [],
        deleted_item: {},
        deleted_ports: [],
        deleted_provider: []
    },

    status: false,
};

const OthersInfoReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_PARTNER_OTHERINFO_INPUT:

            const partnerOtherInfoInput = { ...state.partnerOtherInfoInput };
            partnerOtherInfoInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                partnerOtherInfoInput,
            };


        case Types.GET_PORT_NAME:
            return {
                ...state,
                portOptionData: action.payload,

            };

        case Types.GET_PROVIDER_NAME:
            return {
                ...state,
                providerOptionData: action.payload,

            };

        case Types.EMPTY_OTHERS_INFO:
            return {
                ...state,
                partnerOtherInfoInput: initialState.partnerOtherInfoInput,

            };
        case Types.EDIT_OTHERS_INFO:

            let portServed = { ...partnerOtherInfoInput };
            portServed.multiplePort = action.payload.port_served;
            portServed.multipleProduct = action.payload.service_provide;

            return {
                ...state,
                partnerOtherInfoInput: portServed,

            };

        default:
            break;
    }

    return newState
}

export default OthersInfoReducer;

