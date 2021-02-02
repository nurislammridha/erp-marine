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


export const getSBUName = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/sbuList`).then(
        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_SBU_NAME, payload: data });
        }
    );
};

export const getBranchName = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/branchList`).then(
        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_BRANCH_NAME, payload: data });
        }
    );
};

export const getShipName = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}voyage/shipList`).then(
        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_SHIP_NAME, payload: data });
        }
    );
};

export const getReferenceType = () => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/poReferenceType`).then(
        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_REFERENCE_TYPE, payload: data });
        }
    );
};



export const getPOApprovalList = (searchValue = "") => async (dispatch) => {
    let response = {
        POApprovalList: [],
        status: false,
        message: "",
        isLoading: true,
        errors: [],
    };

    dispatch({ type: Types.GET_PO_APPROVAL_LIST, payload: response });
    let url = `${process.env.REACT_APP_API_URL}partner/basicInfo`;
    if (searchValue !== "") {
        url += `?search=${searchValue}`
    }
    try {
        await Axios.get(url).then((res) => {
            const { status, message, errors, data } = res.data;
            response.supplierList = data;
            response.status = status;
            response.message = message;
            response.errors = errors;
            response.isLoading = false;
        })
            .catch((err) => {
                toast.error(err)
            })
    } catch (error) {
        response.message = "Something wrong!";
        toast.error(error);
    }
    response.isLoading = false;
    dispatch({ type: Types.GET_PO_APPROVAL_LIST, payload: response })

}
