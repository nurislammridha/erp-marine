import * as Types from "../types/Types";

const initialState = {

    bankInfoInput: {
        strBeneficiaryName: "",
        strBankAccountNo: "",
        intBankId: "",
        strBankName: "",
        strBankBranchName: "",
        strRoutingNo: "",
        strIBANNo: "",
        strSWIFTCode: "",
        isDefaultAccount: "",
        intSupplierId: "",
        strSupplierName: "",
        intCurrencyID: "",
        isActive: "",
        intActionBy: ""
    },
    bankInfoMultiple: []
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
        case Types.SUBMIT_BANK_INFO_MULTIPLE:
            console.log('action.payload reducer :>> ', action.payload);
            return {
                ...state,
                bankInfoMultiple: [...state.bankInfoMultiple, action.payload],
                bankInfoInput: initialState.bankInfoInput

            };
        case Types.DELETE_PARTNER_BANK_MULTIPLE:
            const bankOld = [...state.bankInfoMultiple];
            bankOld.splice(action.payload, 1);
            return {
                ...state,
                bankInfoMultiple: bankOld,
            };
        default:
            break;
    }
    console.log('bankInfoMultiple Reducer:>> ', initialState.bankInfoMultiple);
    return newState
}

export default BankInfoReducer;
