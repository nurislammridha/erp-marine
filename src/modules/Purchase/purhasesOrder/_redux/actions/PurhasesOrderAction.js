import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";

export const purchasesOrderInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.GET_ORDER_INPUT, payload: formData });
}
export const addMultipleOrder = (orderInput) => (dispatch) => {
    const { intReferenceId, intItemId, strPurchaseDescription, numOrderQty } = orderInput;
    if (intReferenceId.length === 0) {
        showToast("error", "Please Select Reference No");
        return false;
    }
    else if (intItemId.length === 0) {
        showToast("error", "Please Select Item");
        return false;
    }
    else if (strPurchaseDescription.length === 0) {
        showToast("error", "Purchase Description should not be empty");
        return false;
    }
    else if (numOrderQty.length === 0) {
        showToast("error", "QTY should not be empty");
        return false;
    }

    dispatch({ type: Types.ADD_MULTIPLE_ORDER, payload: orderInput })
}
export const getSBUlist = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/sbuList`
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_SBU_LIST, payload: res.data.data })
        }
    )
}
export const getBranchList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/branchList`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_BRANCH_LIST, payload: res.data.data })
        }
    )

}
export const getPurchaseOrganization = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/purchaseOrganisation`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_PURCHASE_ORGANIZATION, payload: res.data.data })
        }
    )
}
export const getReferenceType = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/poReferenceType`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_REFERENCE_TYPE, payload: res.data.data })
        }
    )
}
export const purchaseOrderFilter = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.PURCHASE_ORDER_FILTER, payload: formData })
}
export const deleteMultipleItem = (index) => (dispatch) => {
    dispatch({ type: Types.DELETE_MULTIPLE, payload: index })
}
export const editOrderMultiple = (index) => (dispatch) => {
    dispatch({ type: Types.EDIT_MULTIPLE, payload: index })
}
export const getPurchaseOrder = (orderFilter) => (dispatch) => {
    const { strBusinessLineName, strBusinessUnitName, strPurchaseOrganizationName, strReferenceTypeName } = orderFilter;

    if (strBusinessLineName.length > 0 && strBusinessUnitName.length > 0 && strPurchaseOrganizationName.length > 0 && strReferenceTypeName.length > 0) {
        const url = `${process.env.REACT_APP_API_URL}purchase/getPurchaseOrderList?sbuName=${strBusinessLineName}&branchName=${strBusinessUnitName}&purchaseOrganisationName=${strPurchaseOrganizationName}&referenceTypeName=${strReferenceTypeName}`;
        Axios.get(url).then(
            (res) => {
                dispatch({ type: Types.GET_PURCHASE_ORDER, payload: res.data.data })
            }
        )
    }
}


export const submitMultipleOrderList = (multipleOrder, finalOrderInput) => (dispatch) => {
    console.log('finalOrderInput :>> ', finalOrderInput);
    if (finalOrderInput.inSupplierId.length === 0) {
        showToast("error", "Please Select Supplier Name");
        return false;
    }
    else if (finalOrderInput.inSupplierId.length === 0) {
        showToast("error", "Please Select Supplier Name");
        return false;
    }
    else if (finalOrderInput.dtePODate.length === 0) {
        showToast("error", "Please Select Order Date");
        return false;
    }
    else if (finalOrderInput.intCurrencyId.length === 0) {
        showToast("error", "Please Select Currency");
        return false;
    }
    else if (finalOrderInput.intPaymentTerms.length === 0) {
        showToast("error", "Please select payment terms");
        return false;
    }
    else if (finalOrderInput.numCaseInPercent.length === 0) {
        showToast("error", "Cash/Advence should not be empty");
        return false;
    }
    else if (finalOrderInput.dtePayDays.length === 0) {
        showToast("error", "Please Select Pay Days");
        return false;
    }
    else if (finalOrderInput.intIncotermsId.length === 0) {
        showToast("error", "Please Select Incoterms");
        return false;
    }
    else if (finalOrderInput.strSupplierReference.length === 0) {
        showToast("error", "Supplier Reference should not be empty");
        return false;
    }
    else if (finalOrderInput.dteReferenceDate.length === 0) {
        showToast("error", "Please Select Reference Date ");
        return false;
    }
    else if (finalOrderInput.dtePOValidityDate.length === 0) {
        showToast("error", "Please Select Validity Date");
        return false;
    }
    else if (finalOrderInput.strOtherTerms.length === 0) {
        showToast("error", "Other terms Should not be empty");
        return false;
    }
    dispatch({ type: Types.CREATE_FIANL_INPUT, payload: multipleOrder })
}
export const FinalOrderInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.FINAL_ORDER_INPUT, payload: formData })
}
export const SubmitFinalOrder = (finalOrderInput) => (dispatch) => {
    console.log('finalOrderInput acccc:>> ', finalOrderInput);
    const url = `${process.env.REACT_APP_API_URL}purchase/purchaseOrderHeaderRow`;
    Axios.post(url, finalOrderInput).then(function (response) {
        dispatch({ type: Types.RESPONSE_DATA_STATUS, payload: response.data.status })
        // console.log('response.data.status :>> ', response.data.status);

        if (response.data.status) {
            showToast("success", response.data.message);

        } else {
            showToast("error", response.data.message)
        }
    }).catch(function (error) {
        const message = "Something Wrong, Fill Up all fields";
        showToast("error", message);
    })
}
export const PurchaseOrderView = (id) => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/purchaseOrderHeaderRow/${id}`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_ORDER_VIEW, payload: res.data.data })
        }
    )
}
export const getIncotermName = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/incoterm`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_INCOTERM_NAME, payload: res.data.data })
        }
    )
}