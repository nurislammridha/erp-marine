import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";

export const AddRolePermissionInput = (name, value) => (dispatch) => {
  const formData = {
      name: name,
      value: value
  }
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
      console.log('res', res);
      const { data, message } = res.data;
      responseList.rolesList = data.data;
      responseList.message = message;
      responseList.rolesListPaginated = data;
      responseList.isLoading = false;
      dispatch({ type: Types.GET_USER_ROLE_LIST_PAGINATED, payload: responseList });
    });
};

export const getRoleDetailsData = (id) => (dispatch) => {
  const responseList = {
    isLoading: true,
    data: []
  };

  dispatch({ type: Types.GET_ROLE_DETAILS_DATA, payload: responseList });

  Axios
    .get(`${process.env.REACT_APP_API_URL}roles/getAllPermissionByRole/${id}`)
    .then((res) => {
      dispatch({ type: Types.GET_ROLE_DETAILS_DATA, payload: res.data.data });
    });
};
export const getPermissionUserList = () => (dispatch) => {


  const responseList = {
    isLoading: true,
    data: []
  };

  // dispatch({ type: Types.GET_PERMISSION_USER_LIST, payload: responseList });

  Axios
    .get(`${process.env.REACT_APP_API_URL}roles/getAllUser`)
    .then((res) => {
      console.log('object get all user', res)
      dispatch({ type: Types.GET_PERMISSION_USER_LIST, payload: res.data.data });
    })
    .catch((err)=>{
      console.log('err', err);
    })
};


export const emptyRoleStatusMessage = () => (dispatch) => {
  dispatch({ type: Types.EMPTY_ROLE_STATUS, payload: null });
}

export const storeRoleAction = (roleInputData) => (dispatch) => {
  const responseList = {
    isLoading: true,
    status: false,
    message: '',
    data: null
  };
  dispatch({ type: Types.CREATE_ROLE, payload: responseList });

  Axios
    .post(`${process.env.REACT_APP_API_URL}roles/storePermission`, roleInputData)
    .then((res) => {
      const { data, status, message } = res.data;
      responseList.status = status;
      responseList.message = message;
      responseList.isLoading = false;
      responseList.data = data;
      showToast('success', message);
      dispatch({ type: Types.CREATE_ROLE, payload: responseList });
    }).catch(err => {
      responseList.status = false;
      responseList.isLoading = false;
      responseList.message = 'Somethting went wrong, Please check inputs !';
      showToast('error', responseList.message);
      dispatch({ type: Types.CREATE_ROLE, payload: responseList });
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
  dispatch({ type: Types.USER_ROLE_CHECKED_GROUP, payload: {
    index: index,
    isGroupChecked: isGroupChecked
  }});
};