import * as Types from "../types/Types";

const initialState = {

    bankInfoInput: {
        strBeneficiaryName: "",
        strBankAccountNo: "",
        intBankId: "",
        intBankBranchId: "",
        strRoutingNo: "",
        intIBANNO: "",
        strSWIFTCode: "",
        isDefaultAccount: ""
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
    }

    return newState
}

export default BankInfoReducer;
