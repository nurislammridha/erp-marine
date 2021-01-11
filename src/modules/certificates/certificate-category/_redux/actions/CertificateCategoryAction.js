import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";
export const handleCertificateCategoryInput = (name, value) => (dispatch) => {
  const categoryData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CERTIFICATE_CATEGORY_CREATE, payload: categoryData });
};
export const certificatecategorySubmitAction = (getCategoryInpuData) => (
  dispatch
) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.CERTIFICATE_CATEGORY_STORE,
    payload: responseList,
  });

  let postUrl = `http://10.3.203.16:82/iMarineAPI/public/api/v1/certificate/category`;
  axios
    .post(postUrl, getCategoryInpuData)
    .then(function(response) {
      console.log("CertificateCategory", response);
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.CERTIFICATE_CATEGORY_STORE,
          payload: responseList,
        });
      } else {
        console.log("error data", response.data);
        showToast("error", response.data.message);
      }
    })
    .catch(function(error) {
      responseList.isLoading = false;
      const message =
        "Something went wrong ! Please fill all inputs and try again !";
      showToast("error", message);

      dispatch({
        type: Types.CERTIFICATE_CATEGORY_STORE,
        payload: responseList,
      });
    });
};

export const getCertificateCategoryListData = (
  searchValue = "",
  status = ""
) => async (dispatch) => {
  let isActive = status == "" ? 1 : parseInt(status);
  let url = `http://10.3.203.16:82/iMarineAPI/public/api/v1/certificate/category`;

  if (searchValue !== "" || isActive !== "") {
    url += `?search=${searchValue}&isActive=${isActive}`;
  }

  axios.get(url).then((res) => {
    console.log(res);
    dispatch({
      type: Types.GET_CERTIFICATE_CATEGORY_LIST,
      payload: res.data.data,
    });
  });
};

export const setCertificateCategoryEditValue = (editValue) => (dispatch) => {
  // console.log('cHECK editValue', editValue);
  const formData = {
    strCertificateCategoriName: editValue.strCertificateCategoriName,
    isActive: editValue.isActive,
    intActionBy: 1,
  };
  dispatch({
    type: Types.SET_CERTIFICATE_CATEGORY_EDIT_DATA,
    payload: formData,
  });
};

export const certificateCategoryEditAction = (
  certificateCategoryInput,
  intCategoryID
) => (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.EDIT_CERTIFICATE_CATEGORY,
    payload: responseList,
  });

  let editUrl = `http://10.3.203.16:82/iMarineAPI/public/api/v1/certificate/category/${intCategoryID}`;
  Axios.put(editUrl, certificateCategoryInput)
    .then(function(response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.EDIT_CERTIFICATE_CATEGORY,
          payload: responseList,
        });
      } else {
        showToast("error", response.data.message);
      }
    })
    .catch(function(error) {
      responseList.isLoading = false;
      const message =
        "Something went wrong ! Please fill all inputs and try again !";
      showToast("error", message);

      dispatch({
        type: Types.EDIT_CERTIFICATE_CATEGORY,
        payload: responseList,
      });
    });
};
