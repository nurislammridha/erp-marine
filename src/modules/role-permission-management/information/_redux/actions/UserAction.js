import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";

export const handleChangeUserAction = (name,value,e
   ) => (dispatch) => {

    let data = {
        name: name,
        value: value,
      };
    dispatch({ type: Types.GET_USER_ROLE_INPUT_DATA, payload: data });
  };


  export const createNewUser = (inputData) => (dispatch) => {
    const responseList = {
      isLoading: true,
      rolesList: [],
      rolesListPaginated: null,
    };
    
    // dispatch({ type: Types.GET_USER_ROLE_LIST_PAGINATED, payload: responseList });
    Axios
      .post(`${process.env.REACT_APP_API_URL}roles/multipleUserRoleStore`,inputData)
      .then((res) => {
          console.log('res', res);
        const { data, message } = res.data;
        responseList.rolesList = data.data;
        responseList.message = message;
        responseList.rolesListPaginated = data;
        responseList.isLoading = false;
        dispatch({ type: Types.GET_USER_ROLE_LIST_PAGINATED, payload: responseList });
      });
  };