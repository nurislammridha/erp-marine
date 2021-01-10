import Axios from "axios";
import { toast } from 'react-toastify';
import { generateFormDataFromObject } from "../../../../master/utils/FileHelper";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";
//input handle
export const handleChangeProductInputAction = (name, value, e, isEdit = false) => (dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    const type = !isEdit ? Types.CHANGE_CERTIFICATE_INPUT : Types.CHANGE_CERTIFICATE_INPUT_UPDATE;
    dispatch({ type: type, payload: data });

    if (name === 'image') {
        let reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            data.name = 'imagePreviewUrl';
            data.value = reader.result;
            dispatch({ type: type, payload: data });
        }
        reader.readAsDataURL(file)
    }
};

// submit main certificate info 
export const MainCertificateCreateAction = (certificateInfoInput) => (dispatch) => {
    // if (certificateInfoInput.intVesselID.length === 0) {
    //     showToast('error', "Vassel can't be blank!")
    // }

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

         let postUrl = `http://10.17.2.189:8080/api/v1/certificates/details/store `;
         Axios
           .post(postUrl, certificateInfoInput)
             .then(function (response) {
               console.log("response :>> ", response);
             responseList.data = response.data;
             responseList.isLoading = false;
             responseList.status = response.data.status;
             if (response.data.status) {
               showToast("success", response.data.message);
               dispatch({
                 type: Types.CERTIFICATE_MAIN_SUBMIT,
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
               type: Types.CERTIFICATE_MAIN_SUBMIT,
               payload: responseList,
             });
           });
       };

export const getCertificateMainListAction = (page, searchText = null, isPublic = false) => async (dispatch) => {
    let response = {
        certificates: [],
        status: false,
        message: "",
        isLoading: true,
        errors: []
    };
    dispatch({ type: Types.CERTIFICATE_LIST_DASHBOARD, payload: response });
    let url = '';
    url = `${process.env.REACT_APP_API_URL}certificate/details?isPaginated=1&paginateNo=1`;

    if (searchText !== null) {
        // url += `&paginateNo=${page}`;
        url += `&search=${searchText}`
    } else {
        // url += `&certificate/details?search=${searchText}`
    }

    try {
        await Axios.get(url)
            .then((res) => {
                console.log('ReponseCertificate', res);
                const { data, message, status } = res.data;
                response.status = status;
                response.certificates = data.data;
                response.message = message;
                response.certificatesPaginatedData = data;
                response.isLoading = false;
            })
            .catch((err) => {
                console.log('ErrorCertificate1')
                toast.error(err);
            });
    } catch (error) {
        console.log('ErrorCertificate2')
        response.message = 'Something Went Wrong !';
        toast.error(error);
    }

    response.isLoading = false;
    dispatch({ type: Types.CERTIFICATE_LIST_DASHBOARD, payload: response });
};


export const deleteProductImagePreview = () => (dispatch) => {
    let data = {
        name: 'imagePreviewUrl',
        value: null,
    }
    dispatch({ type: Types.CHANGE_CERTIFICATE_INPUT, payload: data });
};


export const getCertificateCategory = (data) => (dispatch) => {
alert();
    Axios
    .get(
      `http://10.17.2.189:8080/IMarineApi/public/api/v1/certificate/category`
    )
    .then((res) => {
     
      let data = res.data.data;
      dispatch({ type: Types.GET_CERTIFICATE_CATEGORY, payload: data });
    });

   
};
export const getCertificateName = (data) => (dispatch) => {

    Axios
    .get(
      `http://10.17.2.189:8080/IMarineApi/public/api/v1/certificate/certificateList`
    )
    .then((res) => {
      let data = res.data.data;
      console.log(res);
      dispatch({ type: Types.GET_CERTIFICATE_NAME, payload: data });
    });
   
};
export const getCertificateType = () => (dispatch) => {
    Axios
    .get(
      `http://10.17.2.189:8080/IMarineApi/public/api/v1/certificate/types`
    )
    .then((res) => {
      let data = res.data.data;
      console.log("res certificate type", data);
      dispatch({ type: Types.GET_CERTIFICATE_TYPE, payload: data });
    });
   
};
export const getCertificateIssueBy = (data) => (dispatch) => {
    Axios
    .get(
      `http://10.17.2.189:8080/IMarineApi/public/api/v1/certificate/issuingAuthority`
    )
    .then((res) => {
      let data = res.data.data;
      dispatch({ type: Types.GET_CERTIFICATE_ISSUE_BY, payload: data });
    });
   
};
