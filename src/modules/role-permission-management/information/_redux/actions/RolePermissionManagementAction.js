import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";



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