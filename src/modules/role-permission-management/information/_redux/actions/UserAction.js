import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";
import { getPermissionUserList } from "./RolePermissionManagementAction";

export const handleChangeUserAction = (name, value, e
) => (dispatch) => {

  let data = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_USER_ROLE_INPUT_DATA, payload: data });
};


export const createNewUser = (inputData, handleClose) => (dispatch) => {
  if (inputData.first_name.length === 0) {
    showToast('error', "First name can't blank!");
    return false;
  }
  if (inputData.last_name.length === 0) {
    showToast('error', "Last name can't blank!");
    return false;
  }
  if (inputData.email.length === 0) {
    showToast('error', "Email can't blank!");
    return false;
  }
  if (inputData.phone_no.length === 0) {
    showToast('error', "Phone number can't blank!");
    return false;
  }
  if (inputData.password.length === 0) {
    showToast('error', "Password can't blank!");
    return false;
  }
  if (inputData.role_id === '' || inputData.role_id === null) {
    showToast('error', "Role can't blank!");
    return false;
  }
  const responseList = {
    isLoading: true,
    rolesList: [],
    rolesListPaginated: null,
  };

  dispatch({ type: Types.CREATE_MULTIPLE_ROLE, payload: responseList });

  Axios.post(`${process.env.REACT_APP_API_URL}roles/multipleUserRoleStore`, inputData)
    .then((res) => {
      if (res.data.status) {
        const { data, message } = res.data;
        responseList.rolesList = data.data;
        responseList.message = message;
        responseList.rolesListPaginated = data;
        responseList.isLoading = false;
        showToast('success', responseList.message)
        dispatch({ type: Types.CREATE_MULTIPLE_ROLE, payload: responseList });
        handleClose()
        dispatch(getPermissionUserList())
      }
    }).catch((err) => {
      responseList.isLoading = false;
      responseList.message = "Something went wrong!"
      showToast('error', responseList.message)
      dispatch({ type: Types.CREATE_MULTIPLE_ROLE, payload: responseList });
    })
};

//updaetd user roles permission 
export const updatedUserPermission = (inputData, handleClose, id) => (dispatch) => {
  console.log('inputData :>> ', inputData);
  if (inputData.first_name.length === 0) {
    showToast('error', "First name can't blank!");
    return false;
  }
  if (inputData.last_name.length === 0) {
    showToast('error', "Last name can't blank!");
    return false;
  }
  if (inputData.email.length === 0) {
    showToast('error', "Email can't blank!");
    return false;
  }
  if (inputData.phone_no.length === 0) {
    showToast('error', "Phone number can't blank!");
    return false;
  }
  if (inputData.role_id === '' || inputData.role_id === null ) {
    showToast('error', "Role can't blank!");
    return false;
  }
  const responseList = {
    isLoading: true,
    rolesList: [],
    rolesListPaginated: null,
  };

  dispatch({ type: Types.UPDATE_MULTIPLE_ROLE, payload: responseList });

  Axios.put(`${process.env.REACT_APP_API_URL}roles/multipleUserRoleUpdate/${id}`, inputData)
    .then((res) => {
      if (res.data.status) {
        const { data, message } = res.data;
        responseList.rolesList = data.data;
        responseList.message = message;
        responseList.rolesListPaginated = data;
        responseList.isLoading = false;
        showToast('success', responseList.message)
        dispatch({ type: Types.UPDATE_MULTIPLE_ROLE, payload: responseList });
        handleClose()
        dispatch(getPermissionUserList())
      }
    }).catch((err) => {
      responseList.isLoading = false;
      responseList.message = "Something went wrong!"
      showToast('error', responseList.message)
      dispatch({ type: Types.UPDATE_MULTIPLE_ROLE, payload: responseList });
    })
};
