import * as Types from "../types/Types";
import moment from "moment";

const initialState = {
    basicInfoInput: {
        intBasicInfoId: "",
        intSBUId: "",
        strSBUName: "",
        intBranchId: "",
        intShipId: "",
        strShipName: "",
        intCatalougeId: "",
        intCategoryId: "",
        intSubCategoryId: "",
        intCostCenterId: "",
        intItemId: "",
        strItemName: "",
        intAssetTypeId: "",
        strDescriptions: "",
        strHSCode: "",
        dteStoreIssueDate: "",
        dteGRNDate: "",
        dteDatePlaceInServiceDate: "",
        numAssetQty: "",
        strProjectName: "",
        strRemarks: ""
    },
    isLoading: false
}

const BasicInformationReducer = (state = initialState, action) => {
    const newState = { ...state }

    switch (action.type) {
        case Types.BASIC_INFO_INPUT:
            const basicInfoInput = { ...state.basicInfoInput }
            basicInfoInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                basicInfoInput
            }
        case Types.SUBMITTING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        default:
            break;
    }
    return newState;
}

export default BasicInformationReducer;