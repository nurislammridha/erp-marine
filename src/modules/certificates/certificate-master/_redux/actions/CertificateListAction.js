import * as Types from "../types/Type";
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import { getEmployeeId } from "../../../../../app/modules/Auth/_redux/authCrud";
import { getCertificateName } from "../../../certificate-main/_redux/actions/CertificateMainAction";
import { toast } from "react-toastify";

export const handleChangeCertificateMasterInput = (name, value) => async (
  dispatch
) => {
  // let employeeId = await getEmployeeId();
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.CHANGE_CERTIFICATE_MASTER_INPUT,
    payload: formData,
  });
};

export const getCertificateMasterList = (
  searchValue = "",
  status = "",
  page
) => async (dispatch) => {
  let response = {
    certificateMasterList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };

  dispatch({ type: Types.GET_CERTIFICATE_MASTER_LIST, payload: response });

  let isActive = status == "" ? "" : parseInt(status);
  let url = `${process.env.REACT_APP_API_URL}certificate/certificateList`;

  if (searchValue !== "" || isActive !== "") {
    url += `?search=${searchValue}&isActive=${isActive}&isPaginated=1&paginateNo=${page}`;
  } else {
    url += `?isPaginated=1&paginateNo=${page}`;
  }
  try {
    await Axios.get(url)
      .then((res) => {
        const { data, message, status } = res.data;
        response.status = status;
        response.certificateMasterList = data.data;
        response.message = message;
        response.certificateMasterPaginatedData = data;
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
  dispatch({ type: Types.GET_CERTIFICATE_MASTER_LIST, payload: response });
};

export const certificateMasterSubmitAction = (CertificateMasterInput, isSubCategory) => (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.CERTIFICATE_MASTER_SUBMIT,
    payload: responseList,
  });

  let postUrl = `${process.env.REACT_APP_API_URL}certificate/certificateList`;
  Axios.post(postUrl, CertificateMasterInput)
    .then(function (response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      showToast("success", response.data.message);
      dispatch({
        type: Types.CERTIFICATE_MASTER_SUBMIT,
        payload: responseList,
      });
      dispatch(getCertificateName());
    })
    .catch(function (error) {
      responseList.isLoading = false;
      const message =
        "Something went wrong ! Please fill all inputs and try again !";
      showToast("error", message);

      dispatch({
        type: Types.CERTIFICATE_MASTER_SUBMIT,
        payload: responseList,
      });
    });
};

export const setMasterCertificateEditValue = (certificateMasterInput) => (
  dispatch
) => {
  const formData = {
    strCertificateName: certificateMasterInput.strCertificateName,
    strCertificateCategoryName:
      certificateMasterInput.strCertificateCategoryName,
    isActive: certificateMasterInput.isActive,
    intActionBy: 1272,
  };
  dispatch({
    type: Types.SET_CERTIFICATE_MASTER_EDIT_DATA,
    payload: formData,
  });
};

export const certificateMasterEditAction = (
  CertificateMasterInput,
  intCertificateID
) => (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.EDIT_CERTIFICATE_MASTER,
    payload: responseList,
  });

  // let editUrl = `http://10.17.2.19:8082/iMarineAPI/public/api/v1/certificate/certificateList/${intCertificateID}`;
  let editUrl = `${process.env.REACT_APP_API_URL}certificate/certificateList/${intCertificateID}`;

  Axios.put(editUrl, CertificateMasterInput)
    .then(function (response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.EDIT_CERTIFICATE_MASTER,
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
        type: Types.EDIT_CERTIFICATE_MASTER,
        payload: responseList,
      });
    });
};
