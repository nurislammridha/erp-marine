import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import store from '../../../../../redux/store';


export const handleChangeBankInfoInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_BANKINFO_INPUT,
        payload: formData,
    });
};
export const bankInfoSubmitAction = () => {
    const bankInfoMultiple = store.getState().bankInfo.bankInfoMultiple;
    let isValidated = true;

    if (bankInfoMultiple.length === 0) {
        showToast('error', 'Please enter all field and press add');
        isValidated = false;
    }
    return isValidated;
};
export const bankInfoSubmitMultiple = (bankInfoInput) => (dispatch) => {
    // Check Inputs for validation
    if (bankInfoInput.strBeneficiaryName === undefined || bankInfoInput.strBeneficiaryName === null || bankInfoInput.strBeneficiaryName.length < 1) {
        showToast("error", "Beneficiary Name should not be empty");
        return false;
    }
    else if (bankInfoInput.strBankAccountNo === undefined || bankInfoInput.strBankAccountNo === null || bankInfoInput.strBankAccountNo.length < 1) {
        showToast("error", "Bank Account No should not be empty");
        return false;
    }
    else if (bankInfoInput.strRoutingNo === undefined || bankInfoInput.strRoutingNo === null || bankInfoInput.strRoutingNo.length < 1) {
        showToast("error", "Routing No should not be empty");
        return false;
    }
    else if (bankInfoInput.strSWIFTCode === undefined || bankInfoInput.strSWIFTCode === null || bankInfoInput.strSWIFTCode.length < 1) {
        showToast("error", "Swift Code should not be empty");
        return false;
    }
    else if (bankInfoInput.intBankId === undefined || bankInfoInput.intBankId === null || bankInfoInput.intBankId.length < 1) {
        showToast("error", "Bank Name should be Select");
        return false;
    }
    else if (bankInfoInput.strBankBranchName === undefined || bankInfoInput.strBankBranchName === null || bankInfoInput.strBankBranchName.length < 1) {
        showToast("error", "Bank Brance Name should be Select");
        return false;
    }
    else if (bankInfoInput.strIBANNo === undefined || bankInfoInput.strIBANNo === null || bankInfoInput.strIBANNo.length < 1) {
        showToast("error", "IBAN No should not be empty");
        return false;
    }

    // Process Data if needed
    bankInfoInput.intSupplierId = 1;
    bankInfoInput.strSupplierName = "Mohakhali2";
    bankInfoInput.intCurrencyID = 1;
    bankInfoInput.isActive = 1;
    bankInfoInput.intActionBy = 1;

    // If Validate, then add multiple dataset [] in addressInfo
    dispatch({ type: Types.SUBMIT_BANK_INFO_MULTIPLE, payload: bankInfoInput })
}

export const deleteBankMultiple = (index) => (dispatch) => {
    dispatch({ type: Types.DELETE_PARTNER_BANK_MULTIPLE, payload: index })
}
