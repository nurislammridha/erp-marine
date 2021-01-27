import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";

export const getSupplierList = (searchValue = "") => async (dispatch) => {
    let response = {
        supplierList: [],
        status: false,
        message: "",
        isLoading: true,
        errors: [],
    };
    // console.log('search action:>> ', search);
    console.log('test')
    dispatch({ type: Types.GET_SUPPLIER_LIST, payload: response });
    let url = `${process.env.REACT_APP_API_URL}partner/basicInfo`;
    if (searchValue !== "") {
        url = url + `?search=${searchValue}`
    }
    try {
        await Axios.get(url).then((res) => {
            const { status, message, errors, data } = res.data;
            // console.log('data from ac:>> ', data);
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
    // console.log('response.supplierList :>> ', response.supplierList);
}

export const supplierListDelete = (id) => (dispatch) => {
    console.log('id', id)
    let isLoading = true;
    // dispatch({ type: Types.DELETE_ISSUING_AUTHORITY, payload: isLoading })

    // Axios.delete(`${process.env.REACT_APP_API_URL}certificate/issuingAuthority/${id}`)
    //     .then((res) => {
    //         if (res.status === 200) {
    //             const data = res.data;
    //             showToast('success', data.message);
    //             dispatch({ type: Types.DELETE_ISSUING_AUTHORITY, payload: false })
    //         }
    //     })
} 