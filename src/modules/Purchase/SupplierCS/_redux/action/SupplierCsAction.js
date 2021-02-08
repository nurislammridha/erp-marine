import Axios from "axios"
import * as Types from "../types/Types";
export const getDepartmentList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/departmentList`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_DEPARTMENT_LIST, payload: res.data.data })
        }
    )
}
export const changeSupplierCSInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.SUPPLIER_CS_INPUT, payload: formData })
}