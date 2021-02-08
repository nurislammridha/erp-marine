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