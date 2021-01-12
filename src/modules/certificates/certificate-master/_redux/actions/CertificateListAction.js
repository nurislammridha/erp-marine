import * as Types from "../types/Type";
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import { getEmployeeId } from "../../../../../app/modules/Auth/_redux/authCrud";

export const handleChangeCertificateMasterInput = (name, value) => async (
  dispatch
) => {
  let employeeId = await getEmployeeId();
  const formData = {
    name: name,
    value: value,
  };
  console.log("formData", formData);
  dispatch({
    type: Types.CHANGE_CERTIFICATE_MASTER_INPUT,
    payload: formData,
  });
};

export const getCertificateMasterList = (searchValue = "", status = "") => async (dispatch) => {
    let isActive = status == "" ? "" : parseInt(status);
    // let url = `http://10.17.2.31:8082/iMarineAPI/public/api/v1/certificate/certificateList`;
    let url = `${process.env.REACT_APP_API_URL}certificate/certificateList`;

    if (searchValue !== "" || isActive !== "") {
        url += `?search=${searchValue}&isActive=${isActive}`;
    }
    Axios.get(url)
        .then((res) => {
            console.log('res', res);
            dispatch({ type: Types.GET_CERTIFICATE_MASTER_LIST, payload: res.data.data });
        });
};

export const certificateMasterSubmitAction = (CertificateMasterInput) => (dispatch) => {
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
         Axios
           .post(postUrl, CertificateMasterInput)
             .then(function (response) {
               console.log("response :", response);
             responseList.data = response.data;
             responseList.isLoading = false;
             responseList.status = response.data.status;
             if (response.data.status) {
               showToast("successs", response.data.message);
               dispatch({
                 type: Types.CERTIFICATE_MASTER_SUBMIT,
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
          type: Types.CERTIFICATE_MASTER_SUBMIT,
          payload: responseList,
        });
      });
};

export const setMasterCertificateEditValue = (editValue) => (dispatch) => {
  const formData = {
    strCertificateName: editValue.strCertificateName,
    strCertificateCategoryName: editValue.strCertificateCategoryName,
    isActive: editValue.isActive,
    intActionBy: 1272,
  };
  dispatch({
    type: Types.SET_CERTIFICATE_MASTER_EDIT_DATA,
    payload: formData,
  });
};

export const certificateMasterEditAction = (CertificateMasterInput,intCertificateID) => (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({
    type: Types.EDIT_CERTIFICATE_MASTER,
    payload: responseList,
  });

  // let editUrl = `http://10.17.2.31:8082/iMarineAPI/public/api/v1/certificate/certificateList/${intCertificateID}`;
  let editUrl = `${process.env.REACT_APP_API_URL}certificate/certificateList/${intCertificateID}`;
  
  Axios.put(editUrl, CertificateMasterInput)
    .then(function(response) {
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
    .catch(function(error) {
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
