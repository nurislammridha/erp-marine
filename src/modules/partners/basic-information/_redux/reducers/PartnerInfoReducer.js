import * as Types from "../types/Types";

const initialState = {

    partnerInfoInput: {
        strBusinessPartnerName: "",
        strContactNumber: "",
        strLicenseNo: "",
        strEmail: "",
        strBIN: "",
        intTINNo: "",
        strBusinessPartnerCode: "",
    },
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
    }

    return newState
}

export default PartnerInfoReducer;
