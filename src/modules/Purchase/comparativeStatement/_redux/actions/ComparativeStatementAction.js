import * as Types from "../types/Types";
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";

//get lists
export const getComparativeStatementList = (page, id) => async (dispatch) => {
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    dispatch({ type: Types.GET_COMPARATIVE_STATEMENT_LIST, payload: responseList });
    let ComparativeListAPI = "";
    ComparativeListAPI = `${process.env.REACT_APP_API_URL}inventory/itemList?isPaginated=1&paginateNo=10`;

    if (page !== null || page === "") {
        ComparativeListAPI += `&page=${page}`;
    }

    try {
        await Axios.get(ComparativeListAPI)
            .then((res) => {
                const { data, message, status } = res.data;
                responseList.status = status;
                responseList.comparativeList = data.data;
                responseList.message = message;
                responseList.comparativePaginationList = data;
                responseList.isLoading = false;
                dispatch({ type: Types.GET_COMPARATIVE_STATEMENT_LIST, payload: responseList });
            }).catch((err) => {
                console.log("ErrorCertificate1");
            });
    } catch (error) {
        console.log("ErrorCertificate2");
        responseList.message = "Something Went Wrong !";
        showToast('error', responseList.message);
    }

    responseList.isLoading = false;
    dispatch({ type: Types.GET_COMPARATIVE_STATEMENT_LIST, payload: responseList });
}
//handle change input value with list 
export const changeComparativeInputField = (name, value, item, index) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
        item: item,
        index: index
    };
    dispatch({ type: Types.COMPARATIVE_STATEMENT_INPUT_CHANGE, payload: formData });
};