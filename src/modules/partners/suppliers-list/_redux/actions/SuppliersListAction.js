import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
import { showToast } from "../../../../master/utils/ToastHelper";

export const getSupplierList = (searchValue = "") => async (dispatch) => {
    let response = {
        supplierList: [],
        status: false,
        message: "",
        isLoading: true,
        errors: [],
    };

    dispatch({ type: Types.GET_SUPPLIER_LIST, payload: response });
    let url = `${process.env.REACT_APP_API_URL}partner/basicInfo`;
    if (searchValue !== "") {
        url += `?search=${searchValue}`
    }
    console.log('url', url)
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
    dispatch({ type: Types.GET_SUPPLIER_LIST, payload: response })

}

export const supplierListDelete = (id) => (dispatch) => {
    console.log('id', id)
    let isLoading = true;
    dispatch({ type: Types.DELETE_SUPPLIER_LIST, payload: isLoading })

    Axios.delete(`${process.env.REACT_APP_API_URL}partner/partnerDelete/${id}`)
        .then((res) => {
            if (res.status === 200) {
                const data = res.data;
                showToast('success', "Supplier deleted successfully");
                dispatch({ type: Types.DELETE_SUPPLIER_LIST, payload: false })
                dispatch(getSupplierList());
            }
        })
}
export const getSupplierDetails = (id) => (dispatch) => {
    let url = `${process.env.REACT_APP_API_URL}partner/basicInfo/${id}`;
    Axios.get(url).then(
        (res) => {
            const data = res.data.data;
            dispatch({ type: Types.SUPPLIER_DETAILS, payload: data })
        }
    )
}