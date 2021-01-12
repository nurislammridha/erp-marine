import * as Types from "../types/Types";
import Axios from "axios";
import { toast } from "react-toastify";
// import { generateFormDataFromObject } from "../../../master/utils/FileHelper";
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
  // page,
  searchText = "",
  // isPublic = false,
  status = ""
) => async (dispatch) => {
  let response = {
    issuingAuthorities: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.GET_ISSUING_AUTHORITY_LIST, payload: response });
  let url = `${process.env.REACT_APP_API_URL}certificate/issuingAuthority`;
  let isActive = status == "" ? 1 : parseInt(status);
  // let url = "";
  // url = isPublic
  //   ? `${process.env.REACT_APP_API_URL}certificate/issuingAuthority`
  //   : `${process.env.REACT_APP_API_URL}products`;

  // if (searchText === null) {
  //   url = `${url}?page=${page}`;
  // } else {
  //   url = `${process.env.REACT_APP_API_URL}products/view/search?search=${searchText}`;
  // }

  if (searchText !== "" || isActive !== "") {
    url += `?search=${searchText}&isActive=${isActive}`;
  }
  try {
    await Axios.get(url)
      .then((res) => {
        // const { data, message, status } = res.data;
        // response.status = status;
        // response.issuingAuthorities = data.data;
        // response.message = message;
        // response.productsPaginatedData = data;
        // response.isLoading = false;

        response.issuingAuthorities = res.data.data;
      })
      .catch((err) => {
        toast.error(err);
      });
  } catch (error) {
    response.message = "Something Went Wrong !";
    toast.error(error);
  }
  // response.isLoading = false;
  dispatch({ type: Types.GET_ISSUING_AUTHORITY_LIST, payload: response });
};

// export const emptyProductMessage = () => (dispatch) => {
//   dispatch({ type: Types.EMPTY_PRODUCT_MESSAGE, payload: null });
// };

// export const getProductDetailAction = (product_id, isEdit = false) => async (
//   dispatch
// ) => {
//   let response = {
//     isLoading: true,
//     productDetail: null,
//   };
//   dispatch({
//     type: !isEdit ? Types.PRODUCT_DETAIL : Types.EDIT_PRODUCT_INFO,
//     payload: response,
//   });
//   const url = `${process.env.REACT_APP_API_URL}products/${product_id}`;

//   try {
//     await Axios.get(url)
//       .then((res) => {
//         response.productDetail = res.data.data;
//         response.productDetail.image = null;
//         response.productDetail.imagePreviewUrl = res.data.data.image_url;
//         if (isEdit) {
//           response.user = null;
//         }
//         response.isLoading = false;
//       })
//       .catch((err) => {
//         toast.error(err);
//       });
//   } catch (error) {
//     response.message = "Something Went Wrong !";
//     toast.error(error);
//   }

//   response.isLoading = false;
//   dispatch({
//     type: !isEdit ? Types.PRODUCT_DETAIL : Types.EDIT_PRODUCT_INFO,
//     payload: response,
//   });
// };

// export const storeNewProduct = (postData) => async (dispatch) => {
//   let response = {
//     products: [],
//     status: false,
//     message: "",
//     isLoading: true,
//     errors: [],
//   };
//   const formData = generateFormDataFromObject(postData);
//   dispatch({ type: Types.CREATE_PRODUCT, payload: response });

//   try {
//     await Axios.post(`${process.env.REACT_APP_API_URL}products`, formData)
//       .then((res) => {
//         if (typeof res !== "undefined") {
//           const { data, message, status } = res.data;
//           response.status = status;
//           response.products = data.data;
//           response.isLoading = false;
//           response.message = message;
//           showToast("success", message);
//         } else {
//           showToast("error", "Please check the file inputs and try again !");
//         }
//       })
//       .catch((err) => {
//         const errorsResponse = JSON.parse(err.request.response);
//         const message = errorsResponse.message;
//         response.message = message;
//         response.errors = errorsResponse.errors;
//         showToast("error", message);
//       });
//   } catch (error) {
//     response.message = "Something Went Wrong !";
//     toast.error(error);
//   }

//   response.isLoading = false;
//   dispatch({ type: Types.CREATE_PRODUCT, payload: response });
// };

// export const updateProductAction = (postData, id) => async (dispatch) => {
//   let response = {
//     products: [],
//     status: false,
//     message: "",
//     isLoading: true,
//     errors: [],
//   };
//   const formData = generateFormDataFromObject(postData);
//   dispatch({ type: Types.EDITING, payload: true });
//   try {
//     await Axios.post(
//       `${process.env.REACT_APP_API_URL}products/${id}?_method=PUT`,
//       formData
//     )
//       .then((res) => {
//         if (typeof res !== "undefined") {
//           const { data, message, status } = res.data;
//           response.status = status;
//           response.products = data.data;
//           response.isLoading = false;
//           response.editing = false;
//           response.message = message;
//           showToast("success", message);
//         } else {
//           showToast("error", "Please check the file inputs and try again !");
//         }
//       })
//       .catch((err) => {
//         const errorsResponse = JSON.parse(err.request.response);
//         const message = errorsResponse.message;
//         response.message = message;
//         response.errors = errorsResponse.errors;
//         showToast("error", message);
//       });
//   } catch (error) {
//     response.message = "Something Went Wrong !";
//     toast.error(error);
//   }

//   response.isLoading = false;
//   dispatch({ type: Types.UPDATE_PRODUCT, payload: response });
// };

// export const deleteProductAction = (id) => async (dispatch) => {
//   let response = {
//     status: false,
//     message: "",
//     isLoading: true,
//     errors: [],
//     product: null,
//   };
//   dispatch({ type: Types.DELETING, payload: true });
//   try {
//     await Axios.delete(`${process.env.REACT_APP_API_URL}products/${id}`)
//       .then((res) => {
//         const { data, message, status } = res.data;
//         response.status = status;
//         response.isLoading = false;
//         response.editing = false;
//         response.message = message;
//         response.product = data;
//         showToast("success", message);
//       })
//       .catch((err) => {
//         showToast("error", err);
//       });
//   } catch (error) {
//     response.message = "Something Went Wrong !";
//     toast.error(error);
//   }

//   response.isLoading = false;
//   dispatch({ type: Types.DELETE_PRODUCT, payload: response });
// };

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

  let editUrl = `http://192.168.206.1:82/iMarineAPI/public/api/v1/certificate/issuingAuthority/${intIssuingAuthorityID}`;
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
