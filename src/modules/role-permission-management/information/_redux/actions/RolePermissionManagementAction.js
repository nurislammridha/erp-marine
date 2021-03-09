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

export const getPermissionUserList = (searchValue = "", page) => async (dispatch) => {
  let response = {
    userList: [],
    userPaginationList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.GET_PERMISSION_USER_LIST, payload: response });
  let url = `${process.env.REACT_APP_API_URL}roles/getAllUser?search=${searchValue}&isPaginated=1&paginateNo=10`;
  if (page !== null || page === "") {
    url += `&page=${page}`;
  }
  try {
    await Axios.get(url)
      .then((res) => {
        console.log('res :>> ', res);
        const { data, message, status } = res.data;
        response.status = status;
        response.userList = data.data;
        response.message = message;
        response.userPaginationList = data;
        response.isLoading = false;

      }).catch((err) => {
      });
  } catch (error) {
    response.message = "Something Went Wrong !";
    showToast('error', response.message);
  }

  response.isLoading = false;
  dispatch({ type: Types.GET_PERMISSION_USER_LIST, payload: response });
}


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

  Axios.post(`${process.env.REACT_APP_API_URL}roles/storePermission`, roleInputData)
    .then((res) => {
      const { data, status, message } = res.data;
      responseList.status = status;
      responseList.message = message;
      responseList.isLoading = false;
      responseList.data = data;
      showToast('success', responseList.message);
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
  dispatch({
    type: Types.USER_ROLE_CHECKED, payload: {
      checkboxStatus: checkboxStatus,
      parentRole: parentRole,
      item: item,
      indexChild: indexChild,
      indexparentRole: indexparentRole,
    }
  });

};
export const handleInputData = (name, value) => (dispatch) => {

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
  dispatch({
    type: Types.USER_ROLE_CHECKED_GROUP, payload: {
      index: index,
      isGroupChecked: isGroupChecked
    }
  });
};

//get user details   
export const getUserDetails = (id) => async (dispatch) => {
  let response = {
    status: false,
    message: "",
    isLoading: true,
    errors: [],
    userDetails: null,
  };
 dispatch({ type: Types.GET_USER_DETAILS, payload: response });
  await Axios.get(`${process.env.REACT_APP_API_URL}roles/userDetails/${id}`)
    .then((res) => {
      if (res.data.status) {
        console.log('user details data :>> ', res);
        if (res.data.data.role_id !== null && res.data.data.role_name) {
          res.data.data.role = {
            label: res.data.data.role_name,
            value: res.data.data.role_id
          }
        }
        if (res.data.data.business_id !== null && res.data.data.business_name) {
          res.data.data.business = {
            label: res.data.data.business_name,
            value: res.data.data.business_id
          }
        }
        if (res.data.data.shipId !== null && res.data.data.strShipName) {
          res.data.data.ship = {
            label: res.data.data.strShipName,
            value: res.data.data.shipId
          }
        }
        res.data.data.password = '';
        response.status = res.data.status;
        response.isLoading = false;
        response.userDetails = res.data.data;
        dispatch({ type: Types.GET_USER_DETAILS, payload: response });
      }
    }).catch((err) => {
      response.isLoading = false;
      dispatch({ type: Types.GET_USER_DETAILS, payload: response });
    })
}