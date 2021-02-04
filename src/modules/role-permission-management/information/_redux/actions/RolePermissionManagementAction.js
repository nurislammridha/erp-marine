import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";

export const AddRolePermissionInput = (name, value) => (dispatch) => {
  const formData = {
      name: name,
      value: value
  }
  console.log(value);
  
  dispatch({ type: Types.CHANGE_ROLE_INPUT, payload: formData })
}

export const getRoleListByPagination = () => (dispatch) => {
  const responseList = {
    isLoading: true,
    rolesList: [],
    rolesListPaginated: null,
  };

  dispatch({ type: Types.GET_USER_ROLE_LIST_PAGINATED, payload: responseList });

  Axios
    .get(`${process.env.REACT_APP_API_URL}roles/getAllRoles`)
    .then((res) => {
      const { data, message } = res.data;
      responseList.rolesList = data.data;
      responseList.message = message;
      responseList.rolesListPaginated = data;
      responseList.isLoading = false;
      dispatch({ type: Types.GET_USER_ROLE_LIST_PAGINATED, payload: responseList });
    });
};

export const getRoleList = () => (dispatch) => {
  Axios
    .get(`${process.env.REACT_APP_API_URL}roles/getAllPermission`)
    .then((res) => {
      dispatch({ type: Types.GET_USER_ROLE_LIST, payload: res.data.data });
    });
};

export const getPermissionGroups = () => (dispatch) => {
  Axios
    .get(`${process.env.REACT_APP_API_URL}roles/getAllPermission`)
    .then((res) => {
      dispatch({ type: Types.GET_USER_PERMISSION_GROUPS, payload: res.data.data });
    });
};

export const roleCheckboxSelect = (checkboxStatus, parentRole, item, indexChild, indexparentRole) => (dispatch) => {
  dispatch({ type: Types.USER_ROLE_CHECKED, payload: {
    checkboxStatus: checkboxStatus,
    parentRole: parentRole,
    item: item,
    indexChild: indexChild,
    indexparentRole: indexparentRole,
  }});

};

export const allCheckboxSelected = (status) => (dispatch) => {
  dispatch({ type: Types.USER_ROLE_ALL_CHECKED, payload: status });
};

export const checkPermissionGroupAction = (index, isGroupChecked) => (dispatch) => {
  dispatch({ type: Types.USER_ROLE_CHECKED_GROUP, payload: {
    index: index,
    isGroupChecked: isGroupChecked
  }});
};