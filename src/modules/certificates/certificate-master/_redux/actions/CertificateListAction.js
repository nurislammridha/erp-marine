import * as Types from "../types/Type";
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";
import { getEmployeeId } from "../../../../../app/modules/Auth/_redux/authCrud";


export const handleChangeCertificateMasterInput = (name, value) => async(dispatch) => {
    let employeeId= await getEmployeeId();
    const formData = {
        name: name,
        value: value
    };
    console.log('formData',formData);
    dispatch({
        type: Types.CHANGE_CERTIFICATE_MASTER_INPUT,
        payload: formData
    });
};

export const getCertificateMasterList = (searchValue = "", status = "") => async (dispatch) => {
    let isActive = status == "" ? 1 : parseInt(status);
    let url = `http://10.17.3.78:8082/iMarineAPI/public/api/v1/certificate/certificateList`;

    // console.log('url', url);

    // if (searchValue !== "" || isActive !== "") {
    //     url += `?search=${searchValue}&isActive=${isActive}`;
    // }

    Axios.get(url)
        .then((res) => {
            console.log('res', res);
            dispatch({ type: Types.GET_CERTIFICATE_MASTER_LIST, payload: res.data.data });
        });
};

// export const certificateMasterSubmitAction = (CertificateMasterInput) => (dispatch) => {
//     console.log('CertificateMasterInput',CertificateMasterInput);

//     let responseList = {
//         isLoading: true,
//         data: {},
//         status: false,
//     };
//     dispatch({
//         type: Types.CERTIFICATE_MASTER_SUBMIT,
//         payload: responseList,
//     });

//     let postUrl = `http://10.17.3.78:8082/iMarineAPI/public/api/v1/certificate/certificateList`;
//     axios
//         .post(postUrl, CertificateMasterInput)
//         .then(function (response) {
//             console.log('CertificateMasterInput', response)
//             responseList.data = response.data;
//             responseList.isLoading = false;
//             responseList.status = response.data.status;
//             if (response.data.status) {
//                 showToast("success", response.data.message);
//                 dispatch({
//                     type: Types.CERTIFICATE_MASTER_SUBMIT,
//                     payload: responseList,
//                 });
//             } else {
//                 console.log('error data', response.data);
//                 showToast("error", response.data.message);
//             }
//         })
//         .catch(function (error) {

//             responseList.isLoading = false;
//             // const errorsResponse = JSON.parse(error.request.response.errors.strCertificateTypeName[0]);
//             // console.log('error', errorsResponse);
//             // const message = errorsResponse.message;
//             // responseList.message = message;
//             // responseList.errors = errorsResponse.errors;
//             const message =
//                 "Something went wrong ! Please fill all inputs and try again !";
//             showToast("error", message);

//             dispatch({
//                 type: Types.CREATE_CERTIFICATE_MASTER_LIST,
//                 payload: responseList,
//             });
//         });
// };

export const certificateMasterSubmitAction = (certificateInfoInput) => (dispatch) => {
    console.log("certificateInfoInput :>> ", certificateInfoInput);
         let responseList = {
           isLoading: true,
           data: {},
           status: false,
         };
        //  dispatch({
        //    type: Types.CERTIFICATE_MAIN_SUBMITTING,
        //    payload: responseList,
        //  });

         let postUrl = `${process.env.REACT_APP_API_URL}certificate/certificateList`;
         Axios
           .post(postUrl, certificateInfoInput)
             .then(function (response) {
               console.log("response :>> ", response);
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