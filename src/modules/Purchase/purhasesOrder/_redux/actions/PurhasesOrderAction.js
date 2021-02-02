import Axios from "axios";
import * as Types from "../types/Types";

export const purchasesOrderInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.GET_ORDER_INPUT, payload: formData });
}
export const addMultipleOrder = (orderInput) => (dispatch) => {
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