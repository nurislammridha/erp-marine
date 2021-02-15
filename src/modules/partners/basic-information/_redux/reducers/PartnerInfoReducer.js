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
        strBusinessUnitName: "",
        intAction: "",
        strPICName: "",
        strPICEmail: "",
        strPICContactNo: "",
        supplierType: {},

    },
    status: false,
    addStatus: false,
    editStatus: false
};

const PartnerInfoReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_PARTNERINFO_INPUT:
            const partnerInfoInput = { ...state.partnerInfoInput };
            partnerInfoInput[action.payload.name] = action.payload.value;
            partnerInfoInput.supplierType = {
                label: partnerInfoInput.strSupplierTypeName,
                value: partnerInfoInput.intSupplierTypeID,
            }
            partnerInfoInput.businessUnit = {
                label: partnerInfoInput.strBusinessUnitName,
                value: partnerInfoInput.intCompanyID,
            }
            partnerInfoInput.taxType = {
                label: partnerInfoInput.intTaxTypeName,
                value: partnerInfoInput.intTaxTypeId,
            }
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
                businessUnitData: getBusinessUnit(action.payload),

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

        case Types.UPDATE_PARTNER_INFO:
            return {
                ...state,
                editStatus: action.payload.status,
                isLoading: action.payload.isLoading,
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
const getBusinessUnit = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intBusinessUnitId,
                label: item.strBusinessUnitName,
            };
            options.push(itemData);
        });
    }
    return options;
};
