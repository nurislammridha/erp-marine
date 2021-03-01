import * as Types from "../types/Types";
import moment from "moment";

const initialState = {
    accountsInfoInput: {
        // intBasicInfoId: "",
        numInvoiceValue: "",
        intCurrencyId: "",
        intPOId: "",
        strPONumber: "",
        dtePODate: "",
        intPaymentTermsId: "",
        strMethodOfDepreciation: "",
        numTotalAcquisitionCost: "",
        strRemarks: "",
        numLandedCost: "",
        numErectionAndOtherCost: "",
        strTotalAccumulatedDep: "",
        isTaxAccount: "0",
        // isActive: "",
        // dteSarverEntryDate: "",
        // dteLastEntryDate: "",
        // intAccountsInfoId: ""

    },
    isLoading: false
}

const AccountsInformationReducer = (state = initialState, action) => {
    const newState = { ...state }

    switch (action.type) {
        case Types.CHANGE_ACCOUNT_INFO_INPUT:
            const accountsInfoInput = { ...state.accountsInfoInput }
            accountsInfoInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                accountsInfoInput
            }
        case Types.SUBMIT_ACCOUNT_INFO:
            if (action.payload.status) {
                return {
                    ...state,
                    isLoading: action.payload.isLoading,
                    accountsInfoInput: initialState.accountsInfoInput
                }
            } else {
                return {
                    ...state,
                    isLoading: action.payload.isLoading
                }
            }
        default:
            break;
    }
    return newState;
}

export default AccountsInformationReducer;