import * as Types from "../types/Types";

const initialState = {

    bankInfoInput: {
        strBeneficiaryName: "",
        strBankAccountNo: "1",
        intBankId: "1",
        intBankBranchId: "1",
        strRoutingNo: "",
        strIBANNo: "",
        strSWIFTCode: "",
        isDefaultAccount: 1,
        intSupplierId: 1,
        strSupplierName: "Mohakhali",
        intCurrencyID: 1,
        isActive: 1,
        intActionBy: 1
    },
};



const BankInfoReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_BANKINFO_INPUT:
            const bankInfoInput = { ...state.bankInfoInput };
            bankInfoInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                bankInfoInput,
            };
        default:
            break;
    }

    return newState
}

export default BankInfoReducer;
