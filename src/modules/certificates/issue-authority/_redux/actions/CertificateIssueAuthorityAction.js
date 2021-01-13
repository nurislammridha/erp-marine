import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
import { getCertificateIssueBy } from '../../../certificate-main/_redux/actions/CertificateMainAction'
import { showToast } from "../../../../master/utils/ToastHelper";

export const handleChangeCertificateIssueAuthorityInput = (name, value) => (
  dispatch
) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.CHANGE_CERTIFICATE_ISSUE_AUTHORITY_INPUT,
    payload: formData,
  });
};

export const getIssuingAuthorities = (
  searchText = "",
  // isPublic = false,
  status = "",
  page
) => async (dispatch) => {
  let response = {
    issuingAuthorities: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.GET_ISSUING_AUTHORITY_LIST, payload: response });

  let isActive = status == "" ? "" : parseInt(status);
  // let url = `http://192.168.206.1:82/iMarineAPI/public/api/v1/certificate/issuingAuthority`;
  let url = `${process.env.REACT_APP_API_URL}certificate/issuingAuthority`;

  if (searchText !== "" || isActive !== "") {
    url += `?search=${searchText}&isActive=${isActive}&isPaginated=1&paginateNo=15`;
  } else {
    url += `?isPaginated=1&paginateNo=15`;
  }

  try {
    await Axios.get(url)
      .then((res) => {
        const { data, message, status } = res.data;
        response.status = status;
        response.issuingAuthorities = data.data;
        response.message = message;
        response.productsPaginatedData = data;
        response.isLoading = false;
      })
      .catch((err) => {
        toast.error(err);
      });
  } catch (error) {
    response.message = "Something Went Wrong !";
    toast.error(error);
  }
  response.isLoading = false;
  dispatch({ type: Types.GET_ISSUING_AUTHORITY_LIST, payload: response });
};

export const issueAuthoritySubmitAction = (CertificateIssueAuthirityInput) => (
  dispatch
) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.POST_ISSUING_AUTHORITY,
    payload: responseList,
  });

  let postUrl = `${process.env.REACT_APP_API_URL}certificate/issuingAuthority`;
  Axios.post(postUrl, CertificateIssueAuthirityInput)
    .then(function(response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.POST_ISSUING_AUTHORITY,
          payload: responseList,
        });
        dispatch(getCertificateIssueBy());
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
        type: Types.POST_ISSUING_AUTHORITY,
        payload: responseList,
      });
    });
};

export const setIssuingAuthorityEditValue = (editValue) => (dispatch) => {
  const formData = {
    strIssuingAuthorityName: editValue.strIssuingAuthorityName,
    isActive: editValue.isActive,
    intActionBy: 1272,
  };
  dispatch({
    type: Types.SET_ISSUING_AUTHORITY_EDIT_DATA,
    payload: formData,
  });
};

export const issueAuthorityEditAction = (
  CertificateIssueAuthirityInput,
  intIssuingAuthorityID
) => (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.EDIT_ISSUING_AUTHORITY,
    payload: responseList,
  });

  // let editUrl = `http://192.168.206.1:82/iMarineAPI/public/api/v1/certificate/issuingAuthority/${intIssuingAuthorityID}`;
  let editUrl = `${process.env.REACT_APP_API_URL}certificate/issuingAuthority/${intIssuingAuthorityID}`;
  Axios.put(editUrl, CertificateIssueAuthirityInput)
    .then(function(response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.EDIT_ISSUING_AUTHORITY,
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
        type: Types.EDIT_ISSUING_AUTHORITY,
        payload: responseList,
      });
    });
};
