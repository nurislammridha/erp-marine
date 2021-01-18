import * as Types from "../types/Types";

const initialState = {

    partnerInfoInput: {
        strBusinessPartnerName: "",
        strContactNumber: "",
        strLicenseNo: "",
        strEmail: "",
        strBIN: "",
        strTIN: "",
        strBusinessPartnerCode: "",
        picName: "",
        picContact: "",
        picEmail: "",
        intAction: ""
    },
    status: false,
};

const PartnerInfoReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_PARTNERINFO_INPUT:
            const partnerInfoInput = { ...state.partnerInfoInput };
            partnerInfoInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                partnerInfoInput,
            };

        case Types.PARTNER_INFO_SUBMIT:
            return {
                ...state,
                status: action.payload.status,
                isLoading: action.payload.isLoading,
            };
    }

    return newState
}

export default PartnerInfoReducer;
