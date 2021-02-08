import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
import { showToast } from "../../../../master/utils/ToastHelper";


export const handleChangePOApprovalFilterInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_PO_APPROVAL_FILTER_INPUT,
        payload: formData,
    });
};

export const handleChangePOApprovalDetailInput = (name, value, item) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
        item: item
    };
    dispatch({
        type: Types.CHANGE_PO_APPROVAL_DETAIL_INPUT,
        payload: formData,
    });
};


export const getSBUName = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/sbuList`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_SBU_NAME, payload: data });
        }
    );
};

export const getBranchName = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/branchList`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_BRANCH_NAME, payload: data });
        }
    );
};

export const getPurchaseOrganisationName = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/purchaseOrganisation`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_PURCHASE_ORGANISATION_NAME, payload: data });
        }
    );
};

export const getReferenceType = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/poReferenceType`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_REFERENCE_TYPE, payload: data });
        }
    );
};



export const getPOApprovalList = (searchValue = "", intBusinessLineId = null, intBusinessUnitId = null, intPurchaseOrganizationId = null, intPOReferenceTypeId = null) => async (dispatch) => {

    let response = {
        POApprovalList: [],
        status: false,
        message: "",
        isLoading: true,
        errors: [],
    };

    dispatch({ type: Types.GET_PO_APPROVAL_LIST, payload: response });

    try {
        let url = `${process.env.REACT_APP_API_URL}purchase/getPurchaseOrderList?`;

        url += searchValue !== "" ? `search=${searchValue}&` : '';
        url += intBusinessLineId !== null ? `intBusinessLineId=${intBusinessLineId}&` : '';
        url += intBusinessUnitId !== null ? `intBusinessUnitId=${intBusinessUnitId}&` : '';
        url += intPurchaseOrganizationId !== null ? `intPurchaseOrganizationId=${intPurchaseOrganizationId}&` : '';
        url += intPOReferenceTypeId !== null ? `intPOReferenceTypeId=${intPOReferenceTypeId}&` : '';

        if (searchValue === "" && intBusinessLineId === null && intBusinessUnitId === null && intPurchaseOrganizationId === null && intPOReferenceTypeId === null) {
            dispatch({ type: Types.GET_PO_APPROVAL_LIST, payload: response })
        } else {
            await Axios.get(url).then((res) => {
                const { status, message, errors, data } = res.data;
                response.POApprovalList = data;
                response.status = status;
                response.message = message;
                response.errors = errors;
                response.isLoading = false;
            })
                .catch((err) => {
                    toast.error(err)
                })


        }
        response.isLoading = false;
        dispatch({ type: Types.GET_PO_APPROVAL_LIST, payload: response })
    }
    catch (error) {
        response.message = "Something wrong!";
        toast.error(error);
    }

}

export const GetPOApprovalDetail = (id) => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/purchaseOrderHeaderRow/${id}`)
        .then((res) => {
            let data = res.data.data;
            const numApprovedQty = "";
            const remarks = "";
            for (let index = 0; index < data.purchase_row.length; index++) {
                const element = data.purchase_row[index];
                element.numApprovedQty = numApprovedQty;
                element.remarks = remarks;

            }
            // data.purchase_row.push = approveQty;
            console.log('data', data)
            dispatch({
                type: Types.GET_PO_APPROVAL_DETAIL,
                payload: res.data,
            });
        });
};
//*************Purchase Order Approval**************** */
export const handleChangePurchaseOrderApprovalDetailInput = (name, value, item) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
        item: item,
    };
    console.log('formData :>> ', formData);
    dispatch({ type: Types.PO_APPROVAL_DETAILS_INPUT, payload: formData });
};