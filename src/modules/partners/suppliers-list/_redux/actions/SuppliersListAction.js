import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";

export const getSupplierList = () => async (dispatch) => {
    let response = {
        supplierList: [],
        status: false,
        message: "",
        isLoading: true,
        errors: [],
    };
    dispatch({ type: Types.GET_SUPPLIER_LIST, payload: response });
    let url = `${process.env.REACT_APP_API_URL}partner/basicInfo`
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