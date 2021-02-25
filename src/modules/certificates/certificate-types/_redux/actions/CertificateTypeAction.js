import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
import { showToast } from "../../../../master/utils/ToastHelper";
import { getCertificateType } from "../../../certificate-main/_redux/actions/CertificateMainAction";

export const handleChangeCertificateTypeInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.CHANGE_CERTIFICATE_TYPE_INPUT,
    payload: formData,
  });
};

export const getCertificateTypeList = (searchValue = "", status = "", page) => async (dispatch) => {
  let response = {
    certificateTypeList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.GET_CERTIFICATE_TYPE_LIST, payload: response });

  let isActive = status == "" ? 1 : parseInt(status);
  let url = `${process.env.REACT_APP_API_URL}certificate/types?search=${searchValue}&isActive=${isActive}&isPaginated=1&paginateNo=10`;
  if (page !== null || page === "") {
    console.log('page :>> ', page);
    url += `&page=${page}`;
  }
  try {
    await Axios.get(url)
      .then((res) => {
        const { data, message, status } = res.data;
        response.status = status;
        response.certificateTypeList = data.data;
        response.message = message;
        response.certificateTypePaginatedData = data;
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
  dispatch({ type: Types.GET_CERTIFICATE_TYPE_LIST, payload: response });
};

export const certificatetypeSubmitAction = (CertificateTypeInput) => (
  dispatch
) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.CREATE_CERTIFICATE_TYPE,
    payload: responseList,
  });

  let postUrl = `${process.env.REACT_APP_API_URL}certificate/types`;
  Axios.post(postUrl, CertificateTypeInput)
    .then(function (response) {
      responseList.data = response.data.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.CREATE_CERTIFICATE_TYPE,
          payload: responseList,
        });
        dispatch(getCertificateType());
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
        type: Types.CREATE_CERTIFICATE_TYPE,
        payload: responseList,
      });
    });
};

export const EditCertificateTypeList = (id) => (dispatch) => {
  Axios.get(`${process.env.REACT_APP_API_URL}certificate/types/${id}`)
    .then((res) => {
      if (res.data.status) {
        if (res.data.data.isActive !== null && res.data.data.isActive !== '') {
          if (res.data.data.isActive === "1") {
            res.data.data.status = {
              label: "Active",
              value: "1"
            }
          } else {
            res.data.data.status = {
              label: "In Active",
              value: "0"
            }
          }
        }
        dispatch({ type: Types.EDIT_CERTIFICATE_TYPE_LIST, payload: res.data });
      }
    });
};

export const UpdateCertificateTypeList = (certificateEditInfoData) => async (
  dispatch
) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  dispatch({
    type: Types.UPDATE_CERTIFICATE_TYPE_LIST,
    payload: responseList,
  });

  let postData = {
    intCertificateTypeID: certificateEditInfoData.intCertificateTypeID,
    strCertificateTypeName: certificateEditInfoData.strCertificateTypeName,
    intActionBy: 1,
    isActive: certificateEditInfoData.isActive,
  };

  Axios.put(
    `${process.env.REACT_APP_API_URL}certificate/types/update`,
    postData
  )
    .then(async (response) => {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;

      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.UPDATE_CERTIFICATE_TYPE_LIST,
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
        type: Types.UPDATE_CERTIFICATE_TYPE_LIST,
        payload: responseList,
      });
    });
    dispatch(getCertificateTypeList())
};
