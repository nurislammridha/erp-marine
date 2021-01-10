import * as Types from "../types/Type";
import Axios from "axios";
import { toast } from 'react-toastify';
import { showToast } from "../../../../master/utils/ToastHelper";

export const handleChangeCertificateTypeInput = (name, value) => (dispatch) => {
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
  page,
  searchText = null,
  isPublic = false
) => async (dispatch) => {
  let response = {
    certificates: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.GET_CERTIFICATE_MASTER_LIST, payload: response });
  let url = "";
  url = `${process.env.REACT_APP_API_URL}certificate/certificateList?isPaginated=1`;

  if (searchText !== null) {
    // url += `&paginateNo=${page}`;
    url += `&search=${searchText}`;
  } else {
    // url += `&certificate/details?search=${searchText}`
  }

  try {
    await Axios.get(url)
      .then((res) => {
          console.log('ResponseCertificateCategory',res);
        const { data, message, status } = res.data;
                response.status = status;
                response.certificates = data.data;
                response.message = message;
                response.certificatesPaginatedData = data;
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

export const certificateMasterSubmitAction = (CertificateTypeInput) => (
  dispatch
) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.CREATE_CERTIFICATE_MASTER_LIST,
    payload: responseList,
  });

  let postUrl = `http://10.17.3.78:8082/iMarineAPI/public/api/v1/certificate/certificateList`;
  Axios
    .post(postUrl, CertificateTypeInput)
    .then(function(response) {
      console.log("CertificateTypeInput", response);
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.CREATE_CERTIFICATE_MASTER_LIST,
          payload: responseList,
        });
      } else {
        console.log("error data", response.data);
        showToast("error", response.data.message);
      }
    })
    .catch(function(error) {
      responseList.isLoading = false;
      // const errorsResponse = JSON.parse(error.request.response.errors.strCertificateTypeName[0]);
      // console.log('error', errorsResponse);
      // const message = errorsResponse.message;
      // responseList.message = message;
      // responseList.errors = errorsResponse.errors;
      const message =
        "Something went wrong ! Please fill all inputs and try again !";
      showToast("error", message);

      dispatch({
        type: Types.CREATE_CERTIFICATE_MASTER_LIST,
        payload: responseList,
      });
    });
};
