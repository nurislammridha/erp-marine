import * as Types from "../types/Types";


const initialState = {

    certificateTypeInput: {
        strCertificateTypeName: "",
        intActionBy: "",
        isActive: "1"
    },
    certificateTypeList: [],
    status: false


};

const CertificateTypeReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {

        case Types.CHANGE_CERTIFICATE_TYPE_INPUT:
            const certificateTypeInput = { ...state.certificateTypeInput };
            certificateTypeInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                certificateTypeInput,
            };

        case Types.GET_CERTIFICATE_TYPE_LIST:

            return {
                ...state,
                certificateTypeList: action.payload.data,
            };

        case Types.CREATE_CERTIFICATE_TYPE:
            console.log('action.payload,', action.payload);
            return {
                ...state,
                status: action.payload.status
            };

        case Types.EDIT_CERTIFICATE_TYPE_LIST:
            console.log('action.payload', action.payload);
            return {
                ...state,
                certificateTypeInput: action.payload.data,
            };
            break;

        case Types.UPDATE_CERTIFICATE_TYPE_LIST:
            console.log('action.payload,', action.payload);
            return {
                ...state,
                status: action.payload.status
            };

        // case Types.VOYAGE_SUBMIT:
        //     if (action.payload.status) {
        //         return {
        //             ...state,
        //             voyageInput: initialState.voyageInput,
        //             isLoading: false,
        //         };
        //     } else {
        //         return {
        //             ...state,
        //             isLoading: false,
        //         };
        //     }

        //     break;

        // case Types.VOYAGE_SUBMITTING:
        //     return {
        //         ...state,
        //         isLoading: action.payload,
        //     };
        //     break;

        // case Types.GET_LAST_VOYAGE:
        //     return {
        //         ...state,
        //         lastVoyageData: action.payload.data
        //     };
        //     break;

        default:
            break;
    }
    return newState;
};





export default CertificateTypeReducer;
