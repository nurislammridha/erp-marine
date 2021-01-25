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
        strSupplierTypeName: "",
        intCompanyID: "",
        intTaxTypeId: "",
        intTaxTypeName: "",
        intActionBy: "",
        dteLastActionDateTime: "",
        dteServerDateTime: "",
        isActive: "",
        businessUnitName: "",
        intAction: "",
        strPICName: "",
        strPICEmail: "",
        strPICContactNo: ""

    },
    status: false,
    addStatus: false,
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

        case Types.GET_TAX_TYPE:
            return {
                ...state,
                taxTypeData: getTaxType(action.payload),

            };
        case Types.GET_PARTNER_TYPE:
            return {
                ...state,
                partnerTypeData: getPartnerType(action.payload),

            };
        case Types.GET_BUSINESS_TYPE:
            return {
                ...state,
                businessUnitData: getTaxType(action.payload),

            };


        case Types.PARTNER_INFO_SUBMIT:
            return {
                ...state,
                status: action.payload.status,
                isLoading: action.payload.isLoading,
                addStatus: action.payload.status,

            };

        case Types.EMPTY_PARTNER_INFO:
            return {
                ...state,
                partnerInfoInput: initialState.partnerInfoInput,
            };

        case Types.EDIT_PARTNER_INFO:
            return {
                ...state,
                partnerInfoInput: action.payload,
            };

        default:
            break;
    }

    return newState
}

export default PartnerInfoReducer;

const getTaxType = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intTaxTypeID,
                label: item.strTaxTypeName,
            };
            options.push(itemData);
        });
    }
    return options;
};
const getPartnerType = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intSupplierTypeID,
                label: item.strSupplierTypeName,
            };
            options.push(itemData);
        });
    }
    return options;
};
