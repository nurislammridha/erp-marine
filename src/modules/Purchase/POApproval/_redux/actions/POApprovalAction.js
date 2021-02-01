import * as Types from "../types/Types";
import Axios from "axios";


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


export const getSBUName = (data) => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/sbuList`).then(
        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_SBU_NAME, payload: data });
        }
    );
};

export const getBranchName = (data) => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}purchase/branchList`).then(
        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_BRANCH_NAME, payload: data });
        }
    );
};

export const getShipName = (data) => (dispatch) => {

    Axios.get(`${process.env.REACT_APP_API_URL}voyage/shipList`).then(
        (res) => {
            console.log('res', res)
            let data = res.data.data;
            dispatch({ type: Types.GET_SHIP_NAME, payload: data });
        }
    );
};
