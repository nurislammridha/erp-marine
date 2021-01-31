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
  

  export const handleChangeLaytimeMultipleOperation = (name, value,index) => (dispatch) => {
    const operationData = {
      name: name,
      value: value,
      index:index
    };
    dispatch({ type: Types.LAYTIME_OPERATION_DATA, payload: operationData });
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

 
  
  export const showSoftacton = (data)=>(dispatch)=>{
    let id = data.item.intLayTimeRowID;
    let LayTimeSofOperationListURL = `${process.env.REACT_APP_API_URL}voyage/layTimeSofOperationList/${id}`;

    Axios.get(LayTimeSofOperationListURL)
    .then((response) => {
         
        let data = response.data.data;
        console.log('data', data);
        data['sof'].forEach(sof => {
          dispatch({ type: Types.ADD_NEW_SOF, payload: sof });
        });
        data['operation'].forEach(operation => {
          dispatch({ type: Types.ADD_NEW_OPERATION, payload: operation });
        });
    })
  }

  export const addNewSof = () => (dispatch)=>{
    dispatch({ type: Types.ADD_NEW_SOF, payload: null });
  }

  export const addNewOperation = () => (dispatch) => {
    dispatch({type: Types.ADD_NEW_OPERATION, payload:null});
  }

  //submit sof and operation 
export const multipleSubmitAction = (layTimeMultipleInput) => async (dispatch) => {

  console.log("layTimeMultipleInput from action : >>>> ",layTimeMultipleInput);

  const sofAndOperationData = layTimeMultipleInput;
  let responseList = {
      loading: true,
      data: {},
      status: false,
  };

  // dispatch({ type: Types.SOFANDOPERATION_DATA_SUBMITTING, payload: responseList });

  Axios.post(`${process.env.REACT_APP_API_URL}voyage/layTimeDetail`, sofAndOperationData)

      .then((res) => {
          console.log('res sofAndOperationData row data :>> ', res);
          responseList.data = res.data;
          responseList.loading = false;
          responseList.status = res.data.status;
          if (responseList.status === true) {
              showToast("success", res.data.message);
              dispatch({ type: Types.SOFANDOPERATION_DATA_SUBMIT, payload: responseList })
              // setShow(true)
          } else {
              showToast("error", res.data.message);
          }
      })
      .catch((error) => {
          console.log('error', error);
          responseList.loading = false;
          const message = "Something went wrong, Please try again !";
          showToast("error", message);
          dispatch({ type: Types.SOFANDOPERATION_DATA_SUBMIT, payload: false });
      });
}

export const removeSofData = (data) => (dispatch) => {

  dispatch({
      type: Types.DELETE_SOF_DATA,
      payload: data,
  });
}

export const removeOperationData = (data) => (dispatch) => {

  dispatch({
      type: Types.DELETE_OPERATION_DATA,
      payload: data,
  });
}


