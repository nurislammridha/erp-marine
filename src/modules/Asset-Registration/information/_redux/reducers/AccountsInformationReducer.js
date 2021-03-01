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
        isTaxAccount: "",
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
      
        default:
            break;
    }
    return newState;
}

export default AccountsInformationReducer;