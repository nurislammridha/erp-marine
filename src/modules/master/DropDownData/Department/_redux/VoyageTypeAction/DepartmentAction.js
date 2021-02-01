import * as Types from "../Type/Types";
import Axios from "axios";
//get department data
export const getDepartmentData = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/departmentList`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_DEPARTMENT_DATA, payload: res.data.data });
        });
};