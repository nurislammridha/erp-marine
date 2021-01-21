import * as Types from "../types/Types";

const initialState = {
    portList: [],
    psProviderList: [],
    partnerOtherInfoInput: {
        // intPortID: "",
        // strPortName: "",
        multiplePort: [],
        multipleProduct: [],
        multipleServiceList: []
    },

    status: false,
};

const OthersInfoReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_PARTNER_OTHERINFO_INPUT:
            console.log('action.payload.name', action.payload.name);
            const partnerOtherInfoInput = { ...state.partnerOtherInfoInput };
            partnerOtherInfoInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                partnerOtherInfoInput,
            };


        // case Types.GET_PORT_NAME:
        //     return {
        //         ...state,
        //         portOptionData: getPortName(
        //             action.payload
        //         ),
        //     };
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


        // case Types.PARTNER_OTHERINFO_SUBMIT:
        //     return {
        //         ...state,
        //         status: action.payload.status,
        //         isLoading: action.payload.isLoading,
        //     };
        // default:
        //     break;
    }

    return newState
}

export default OthersInfoReducer;


const getPortName = (data) => {
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