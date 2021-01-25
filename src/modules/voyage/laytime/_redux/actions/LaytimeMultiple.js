import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";

export const handleChangeLaytimeMultiple = (name, value) => (dispatch) => {
    const multipleData = {
      name: name,
      value: value,
    };
    dispatch({ type: Types.LAYTIME_MULTIPLE_DATA, payload: multipleData });
  };

  export const getRemarkList = ()=>(dispatch)=>{
    const url = `${process.env.REACT_APP_API_URL}voyage/layTimeOperationRemark`;
    Axios.get(url).then((res) => {
      dispatch({
        type: Types.GET_ROWTIME_REMARK_LIST,
        payload: res.data.data,
      });
    
    });
  }
