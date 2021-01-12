import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";

export const handleCertificateCategoryInput = (name, value) => (dispatch) => {
  const categoryData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CERTIFICATE_CATEGORY_CREATE, payload: categoryData });
};

export const certificatecategorySubmitAction = (getCategoryInpuData) => (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.CERTIFICATE_CATEGORY_STORE,
    payload: responseList,
  });

 

  let postUrl = `${process.env.REACT_APP_API_URL}certificate/category`;
  if(getCategoryInpuData.intParentsCategoryID == null){
    getCategoryInpuData.intParentsCategoryID=0
  }
  axios
    .post(postUrl, getCategoryInpuData)
    .then(function (response) {
      console.log('CertificateCategory', response)
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
        showToast("error", response.data.message);
      }
    })
    .catch(function (error) {

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
  status = "",
  searchText = null,
  page
) => async (dispatch) => {
  let response = {
    certificates: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.GET_CERTIFICATE_CATEGORY_LIST, payload: response });
  let url = "";
  url = `${process.env.REACT_APP_API_URL}certificate/category?isPaginated=1`;
  try {
    await axios.get(url)
      .then((res) => {
        const { data, message, status } = res.data;
        response.status = status;
        response.certificates = data.data;
        response.message = message;
        response.certificatesPaginatedData = data;
        response.isLoading = false;
      })
      .catch((err) => {
        // toast.error(err);
      });
  } catch (error) {
    response.message = "Something Went Wrong !";
    // toast.error(error);
  }

  response.isLoading = false;
  dispatch({ type: Types.GET_CERTIFICATE_CATEGORY_LIST, payload: response });
};



export const getCertificateParentCategoryData = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}certificate/category/parent-categories/list`;
  axios.get(url)
    .then((res) => {
      dispatch({ type: Types.GET_CERTIFICATE_PARENT_CATEGORY_LIST, payload: res.data.data });
    })
};

export const getCertificateChildCategoryData = (parentID) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}certificate/category/child-categories/list/${parentID}`;
  axios.get(url)
    .then((res) => {
      dispatch({ type: Types.GET_CERTIFICATE_CHILD_CATEGORY_LIST, payload: res.data.data });
    })
};


export const setCertificateCategoryEditValue = (editValue) => (dispatch) => {
  // console.log('cHECK editValue', editValue);
  const formData = {
    strCertificateCategoryName: editValue.strCertificateCategoryName,
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

  let editUrl = `${process.env.REACT_APP_API_URL}certificate/category/${intCategoryID}`;
  axios.put(editUrl, certificateCategoryInput)
    .then(function (response) {
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
    .catch(function (error) {
      responseList.isLoading = false;
      const message =
        "Something went wrong ! Please fill all inputs and try again !";
      showToast("error", message);

      dispatch({
        type: Types.EDIT_CERTIFICATE_CATEGORY,
        payload: responseList,
      });
    }
    )
};
