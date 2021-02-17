import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
import { showToast } from "../../../../master/utils/ToastHelper";
import store from '../../../../../redux/store';

export const handleChangeSupplierFilterInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value, value
    }

    dispatch({
        type: Types.CHANGE_SUPPLIER_FILTER_INPUT,
        payload: formData,
    });

    const search = store.getState().supplierList.supplierFilterInput.search;
    const intSupplierTypeID = store.getState().supplierList.supplierFilterInput.intSupplierTypeID;

    dispatch(getSupplierList(search, intSupplierTypeID));

}

export const getSupplierType = () => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}partner/partnerType`).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_SUPPLIER_TYPE_NAME, payload: data })
        }
    )
}

export const getSupplierList = (searchValue = "", intSupplierTypeID = null) => async (dispatch) => {
    let response = {
        supplierList: [],
        status: false,
        message: "",
        isLoading: true,
        errors: [],
    };

    dispatch({ type: Types.GET_SUPPLIER_LIST, payload: response });



    let url = `${process.env.REACT_APP_API_URL}partner/basicInfo?`;

    url += searchValue !== "" ? `search=${searchValue}&` : '';
    url += intSupplierTypeID !== null ? `intSupplierTypeID=${intSupplierTypeID}` : '';
    try {
        console.log('url', url)
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