import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";



export const getRoleList = (id) => (dispatch) => {
  Axios
    .get(
      `http://10.17.2.222:8080/iMarineAPI/public/api/v1/roles/getAllPermission`
    )
    .then((res) => {
      let data = res.data.data;
      console.log('res.data roles', res.data.data);
      dispatch({ type: Types.GET_USER_ROLE_LIST, payload: data });
    });

};
export const storePermission = (postData,roleData) => (dispatch) => {

   postData.name=roleData;

   console.log('postData', postData);

  let postUrl = `http://10.17.2.222:8080/iMarineAPI/public/api/v1/roles/storePermission`
  Axios
    .post(postUrl,postData)
    .then((res) => {
      let data = res.data.data;
      console.log('storePermission', res.data.data);

      dispatch({ type: Types.GET_USER_ROLE_POST, payload: data });
    });

};
export const roleCheckboxSelect = (checkboxStatus, parentRole, item, indexChild, indexparentRole) => (dispatch) => {
  let data = {
    checkboxStatus: checkboxStatus,
    parentRole: parentRole,
    item: item,
    indexChild: indexChild,
    indexparentRole: indexparentRole,
  }
  dispatch({ type: Types.USER_ROLE_CHECKED, payload: data });

};
export const handleInputData = (name,value) => (dispatch) => {

  let data = {
    name: name,
    value: value,
  }
  dispatch({ type: Types.USER_ROLE_HANDLE_CHANGE, payload: data });

};

export const allCheckboxSelected = (status) => (dispatch) => {
  dispatch({ type: Types.USER_ROLE_ALL_CHECKED, payload: status });
};

export const checkPermissionGroupAction = (index, isGroupChecked) => (dispatch) => {
  const data = {
    index: index,
    isGroupChecked: isGroupChecked
  }
  dispatch({ type: Types.USER_ROLE_CHECKED_GROUP, payload: data });
};