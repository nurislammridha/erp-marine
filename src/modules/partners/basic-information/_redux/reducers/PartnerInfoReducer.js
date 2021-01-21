import * as Types from "../types/Types";

const initialState = {

    partnerInfoInput: {
        strSupplierName: "",
        strSupplierCode: "",
        strEmail: "",
        strContactNumber: "",
        strBIN: "",
        strTIN: "",
        strLicenseNo: "",
        intSupplierTypeID: "",
        intSupplierTypeName: "",
        strSupplierTypeName: "",
        intCompanyID: "",
        intTaxTypeId: "",
        intTaxTypeName: "",
        intActionBy: "",
        dteLastActionDateTime: "",
        dteServerDateTime: "",
        isActive: "",
        businessUnitName: "",
        intAction: ""
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
