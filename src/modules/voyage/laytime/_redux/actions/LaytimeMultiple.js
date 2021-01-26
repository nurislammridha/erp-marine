import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";

export const handleChangeLaytimeMultiple = (name, value,index) => (dispatch) => {
    const multipleData = {
      name: name,
      value: value,
      index:index
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

 
  
  export const showSoftacton = ()=>(dispatch)=>{
    dispatch({ type: Types.LAYTIMEROW_SOF_LIST, payload: null });
  }

  export const addNewSof = () => (dispatch)=>{

    dispatch({ type: Types.ADD_NEW_SOF, payload: null });

  }

  export const addNewOperation = () => (dispatch) => {
    dispatch({type: Types.ADD_NEW_OPERATION, payload:null});
  }

