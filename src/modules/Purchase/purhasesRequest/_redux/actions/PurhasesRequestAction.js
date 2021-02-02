import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";

export const getPRListData = (page, searchText = null) => async (dispatch) => {
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    dispatch({ type: Types.GET_PQ_LIST_DATA, payload: responseList });
    let PQURL = "";
    PQURL = `${process.env.REACT_APP_API_URL}purchase/reqList?isPaginated=1&isActive=1&paginateNo=10`;

    if (page !== null || page === "") {
        PQURL += `&page=${page}`;
    }

    if (searchText !== null) {
        PQURL += `&search=${searchText}&isActive=1`;
    } else {
        // url += `&certificate/details?search=${searchText}`
    }
    try {
        await Axios.get(PQURL)
            .then((res) => {
                const { data, message, status } = res.data;
                responseList.status = status;
                responseList.PRListData = data.data;
                responseList.message = message;
                responseList.PRPaginateData = data;
                responseList.isLoading = false;

            }).catch((err) => {
                console.log("something went wrong");
            });
    } catch (error) {
        responseList.message = "Something Went Wrong !";
        showToast('error', responseList.message);
    }
    responseList.isLoading = false;
    dispatch({ type: Types.GET_PQ_LIST_DATA, payload: responseList });
}

//get purchase request details 
export const getPRDetailsData = (id) => (dispatch) => {
    if (id === null) {
        dispatch({ type: Types.GET_PR_DETAILS_DATA, payload: null });
    } else {
        Axios.get(`${process.env.REACT_APP_API_URL}purchase/reqList/${id}`)
            .then((res) => {
                if (res.data.status) {
                    dispatch({ type: Types.GET_PR_DETAILS_DATA, payload: res.data.data })
                }
            })
    }
}