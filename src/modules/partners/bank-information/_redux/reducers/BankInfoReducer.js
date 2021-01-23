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
        isDefaultAccount: 1,
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

        case Types.GET_BANK_NAME:
            return {
                ...state,
                bankOptionData: getBankName(action.payload),

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

        case Types.EMPTY_BANK_INFO:
            return {
                ...state,
                bankInfoMultiple: initialState.bankInfoMultiple,
                bankInfoInput: initialState.bankInfoInput

            };
        default:
            break;
    }

    return newState
}

export default BankInfoReducer;

const getBankName = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intBankId,
                label: item.strBankName,
            };
            options.push(itemData);
        });
    }
    return options;
};
