import Axios from "axios";
import { toast } from "react-toastify";
import { getEmployeeId, getVesselId } from "../../../../../app/modules/Auth/_redux/authCrud";
import { generateFormDataFromObject } from "../../../../master/utils/FileHelper";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";
//input handle
export const handleChangeProductInputAction = (
  name,
  value,
  e,
  isEdit = false
) => (dispatch) => {
  let data = {
    name: name,
    value: value,
  };
  const type = !isEdit
    ? Types.CHANGE_CERTIFICATE_INPUT
    : Types.CHANGE_CERTIFICATE_INPUT_UPDATE;
  dispatch({ type: type, payload: data });

  // if (name === "multipleAttachments") {

  //   let reader = new FileReader();
  //   const file = e.target.files;
  //   reader.onloadend = () => {
  //     data.name = "imagePreviewUrl";
  //     data.value = reader.result;
  //     dispatch({ type: type, payload: data });
  //   };
  //   reader.readAsDataURL(file);
  // }
};

// submit main certificate info
export const MainCertificateCreateAction =  (certificateInfoInput) =>  async (
  dispatch
) => {
  const vesselID = getVesselId();
  if(vesselID === null){
    certificateInfoInput.intVesselID = 1;
  }else{
    certificateInfoInput.intVesselID = vesselID;
  }
  certificateInfoInput.intActionBy = getEmployeeId();

  if (certificateInfoInput.intCertificateID === null) {
    showToast("error", "Certificate can't be blank!");
    return false;
  }
  if (certificateInfoInput.intCategoryID === null) {
    showToast("error", "Certificate category can't be blank!");
    return false;
  }
  if (certificateInfoInput.strCustomeCode === null) {
    showToast("error", "Certificate Code can't be blank!");
    return false;
  }
  if (certificateInfoInput.intIssuingAuthorityID === null) {
    showToast("error", "Issue Autherity can't be blank!");
    return false;
  }

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
    message: ''
  };

  dispatch({
    type: Types.CERTIFICATE_MAIN_SUBMITTING,
    payload: responseList,
  });

  let postUrl = `${process.env.REACT_APP_API_URL}certificate/details`;
  await Axios.post(postUrl, certificateInfoInput)
    .then(response => {
      const { status, data, message } = response.data;
      responseList.data = data;
      responseList.isLoading = false;
      responseList.status = status;
      responseList.message = message;
    })
    .catch(error => {
      responseList.isLoading = false;
      responseList.message =
        "Something went wrong ! Please fill all inputs and try again !";
    });

    if (responseList.status) {
      toast.success(responseList.message);
    } else {
      toast.error(responseList.message);
    }
    dispatch({
      type: Types.CERTIFICATE_MAIN_SUBMIT,
      payload: responseList,
    });
};

export const getCertificateMainListAction = (
  page,
  searchText = null,
  isPublic = false,
  category=null,
) => async (dispatch) => {
  let response = {
    certificates: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.CERTIFICATE_LIST_DASHBOARD, payload: response });
  let url = "";
  url = `${process.env.REACT_APP_API_URL}certificate/details?isPaginated=1&page=${page}`;

  if (searchText !== null) {
    // url += `&paginateNo=${page}`;
    url += `&search=${searchText}`;
  } else {
    // url += `&certificate/details?search=${searchText}`
  }

  if(category!==null){
    url +=`&category=${category}`;
  }

  try {
    await Axios.get(url)
      .then((res) => {
        const { data, message, status } = res.data;
        response.status = status;
        response.certificates = data.data;
        response.message = message;
        response.certificatesPaginatedData = data;
        response.isLoading = false;
      })
      .catch((err) => {
        console.log("ErrorCertificate1");
        toast.error(err);
      });
  } catch (error) {
    console.log("ErrorCertificate2");
    response.message = "Something Went Wrong !";
    toast.error(error);
  }

  response.isLoading = false;
  dispatch({ type: Types.CERTIFICATE_LIST_DASHBOARD, payload: response });
};

export const certificateMultipleDataAdd = (data) => (dispatch) => {
  if (data.intCertificateID === null) {
    showToast("error", "Please select a certificate first !");
    return false;
  }
  if (data.dteFromSurvey === null) {
    showToast("error", "Please give survey from date !");
    return false;
  }
  if (data.dteToSurvey === null) {
    showToast("error", "Please give survey to date !");
    return false;
  }
  if (data.intCertificateStatusID === null) {
    showToast("error", "Please select a survey status !");
    return false;
  }

  const singleDetail = {
    intCertificateID: data.intCertificateID,
    intCertificateDetailsID: null,
    dteFromSurvey: data.dteFromSurvey,
    dteToSurvey: data.dteToSurvey,
    intCertificateStatusID: data.intCertificateStatusID,
    strCertificateStatusName: data.strCertificateStatusName,
    isActive: true
  }
  dispatch({ type: Types.ADD_MULTIPLE_DATA, payload: singleDetail });
}


export const multipleAttachmentAdd = (data) => (dispatch) => {
  const singleDetail = {
    file: data.file,
    filePreviewUrl: data.filePreviewUrl
  }
  dispatch({ type: Types.ADD_MULTIPLE_DATA_ATTACHMENT, payload: singleDetail });
}

export const certificateMultipleDataDelete = (index) => (dispatch) => {
  dispatch({ type: Types.DELETE_SURVEY_MULTIPLE_DATA, payload: index });
}

export const deleteProductImagePreview = () => (dispatch) => {
  let data = {
    name: "imagePreviewUrl",
    value: null,
  };
  dispatch({ type: Types.CHANGE_CERTIFICATE_INPUT, payload: data });
};

export const GetVesselTypeAction = () => async (dispatch) => {
  let data = {};
  const headers = {
    "Content-Type": "application/json",
  };
  Axios.get(`http://iapps.akij.net/asll/public/api/v1/asll/vessel/types`, {
    headers: headers,
  }).then((res) => {
    let data = res.data.data;
    dispatch({ type: Types.GET_VESSEL_TYPE, payload: data });
  });
};

export const getCertificateCategory = (data) => (dispatch) => {
    Axios
    .get(
      `${process.env.REACT_APP_API_URL}certificate/category`
    )
    .then((res) => {
     
      let data = res.data.data;
      dispatch({ type: Types.GET_CERTIFICATE_CATEGORY, payload: data });
    }
  );
};
export const getCertificateName = (data) => (dispatch) => {
  Axios.get(`${process.env.REACT_APP_API_URL}certificate/certificateList`).then(
    (res) => {
      let data = res.data.data;
      dispatch({ type: Types.GET_CERTIFICATE_NAME, payload: data });
    }
  );
};
export const getCertificateType = () => (dispatch) => {
  Axios.get(`${process.env.REACT_APP_API_URL}certificate/types`).then((res) => {
    let data = res.data.data;
    dispatch({ type: Types.GET_CERTIFICATE_TYPE, payload: data });
  });
};
export const getCertificateIssueBy = (data) => (dispatch) => {
  Axios.get(
    `${process.env.REACT_APP_API_URL}certificate/issuingAuthority`
  ).then((res) => {
    let data = res.data.data;
    dispatch({ type: Types.GET_CERTIFICATE_ISSUE_BY, payload: data });
  });
};

export const getMainCertificateSingleData = (id) => (dispatch) => {
  Axios.get(`${process.env.REACT_APP_API_URL}certificate/details/${id}`).then(
    (res) => {
      let data = res.data.data;
      dispatch({
        type: Types.GET_MAIN_CERTIFICATE_SINGLE_DATA,
        payload: data,
      });
    }
  );
};

// update main certificate
export const mainCertificateEdit = (certificateInfoInput, id) => (dispatch) => {
  //  let responseList = {
  //    isLoading: true,
  //    data: {},
  //    status: false,
  //  };
  //  dispatch({
  //    type: Types.CERTIFICATE_MAIN_SUBMITTING,
  //    payload: responseList,
  //  });
  Axios.put(
    `${process.env.REACT_APP_API_URL}certificate/details/${id}`,
    certificateInfoInput
  ).then((res) => {
    // dispatch({ type: Types.MAIN_CERTIFICATE_UPDATE, payload: res.data});
    if (res.data.status) {
      showToast("successs", res.data.message);
      dispatch({
        type: Types.MAIN_CERTIFICATE_UPDATE,
        payload: res.data,
      });
    } else {
      showToast("error", res.data.message);
    }
  });
};



export const getCertificateStatusData = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}certificate/status`;
  Axios.get(url)
    .then((res) => {
      dispatch({ type: Types.MAIN_CERTIFICATE_STATUS, payload: res.data.data });
    })
};