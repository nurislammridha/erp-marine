import * as Types from "../types/Types";

const initialState = {

    partnerInfoInput: {
        strSupplierName: "22",
        strSupplierCode: "22",
        strEmail: "22",
        strContactNumber: "22",
        strBIN: "22",
        strTIN: "22",
        strLicenseNo: "22",
        intSupplierTypeID: "22",
        strSupplierTypeName: "22",
        intCompanyID: "22",
        intTaxTypeId: "22",
        intActionBy: "22",
        dteLastActionDateTime: "22",
        dteServerDateTime: "22",
        isActive: "1",
    },
    status: false,
};

const PartnerInfoReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_PARTNERINFO_INPUT:
            console.log('action.payload.value', action.payload.value);
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
        default:
            break;
    }

    return newState
}

export default PartnerInfoReducer;
