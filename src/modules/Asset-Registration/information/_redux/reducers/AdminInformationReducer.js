import * as Types from "../types/Types";

const initialState = {

    adminInfoInput: {
        intSupplierId: "",
        strSupplierName: "",
        IntPOId: "",
        strPONumber: "",
        dtePODate: "",
        dteWarantyExpiryDate: "",
        dteDateOfInstallation: "",
        strAssetLocation: "",
        intAssetLocationId: "",
        dteDepreciationRunDate: "",
        numRateofDepreciation: "",
        strCountryName: "",
        intCountryId: "",
        strNameOfManufacture: "",
        strManufactureProviceSLNo: "",
        strModelNo: "",
        strLCNumber: "",
        strOthers: "",
        numRatedCapacity: "",
        strRecommandLife: "",
        strRemarks: "",
        isActive: "",
        dteSarverEntryDate: "",
        dteLastEntryDate: ""
    },
    status: false,
    isLoading: false

}



const AdminInformationReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {

        case Types.CHANGE_ADMININFO_INPUT:
            const adminInfoInput = { ...state.adminInfoInput };
            adminInfoInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                adminInfoInput,
            }

        case Types.GET_SUPPLIER_NAME:
            return {
                ...state,
                supplierNameData: action.payload,
            }
        case Types.GET_COUNTRY_NAME:
            return {
                ...state,
                countryNameData: action.payload,
            }
        case Types.GET_ASSET_LOCATION:
            return {
                ...state,
                assetLocationData: action.payload,
            }

        case Types.SUBMIT_ADMIN_INFO:
            return {
                status: action.payload.status,
                isLoading: action.payload.isLoading,
            }
    }
    return newState;
}

export default AdminInformationReducer;
