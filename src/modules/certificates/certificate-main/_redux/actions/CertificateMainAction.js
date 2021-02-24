import Axios from "axios";
import { toast } from "react-toastify";
import moment from 'moment';

import {
  getEmployeeId,
  getVesselId,
} from "../../../../../app/modules/Auth/_redux/authCrud";
import { generateFormDataFromObject } from "../../../../master/utils/FileHelper";
import { showToast } from "../../../../master/utils/ToastHelper";
import * as Types from "../types/Types";
import { getCertificateChildCategoryData } from "../../../certificate-category/_redux/actions/CertificateCategoryAction";
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

  if (name === "image") {
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      // data.name = "imagePreviewUrl";
      data.value = reader.result;
      dispatch({ type: type, payload: data });
    };
    reader.readAsDataURL(file);
  }
};

// submit main certificate info
export const MainCertificateCreateAction = (certificateInfoInput) => async (dispatch) => {
  console.log('certificateInfoInput :>> ', certificateInfoInput);
  const shipID = getVesselId();
  if (shipID === null) {
    certificateInfoInput.intShipID = 1;
  } else {
    certificateInfoInput.intShipID = shipID;
  }
  certificateInfoInput.intActionBy = getEmployeeId();
  if (certificateInfoInput.intCertificateID === null) {
    showToast("error", "Certificate can't be blank!");
    return false;
  }
  if (certificateInfoInput.intParentCategoryID === null) {
    showToast("error", "Certificate parent category can't be blank!");
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

  if (certificateInfoInput.dteCertificateIssueDate === null || certificateInfoInput.dteCertificateIssueDate === "") {
    showToast("error", "Issue date can't be blank!");
    return false;
  }

  // if (certificateInfoInput.dteCertificateIssueDate < certificateInfoInput.dteExtendedUntil) {
  //   showToast('error', "Certificate extended date can't be smaller than certificate issued date");
  //   return false;
  // }

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
    message: "",
  };

  dispatch({
    type: Types.CERTIFICATE_MAIN_SUBMITTING,
    payload: responseList,
  });

  let postUrl = `${process.env.REACT_APP_API_URL}certificate/details`;
  await Axios.post(postUrl, certificateInfoInput)
    .then((response) => {
      const { status, data, message } = response.data;
      responseList.data = data;
      responseList.isLoading = false;
      responseList.status = status;
      responseList.message = message;
    })
    .catch((error) => {
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
    type: Types.CERTIFICATE_MAIN_SUBMITTING,
    payload: false,
  });

  dispatch({
    type: Types.CERTIFICATE_MAIN_SUBMIT,
    payload: responseList,
  });
};

export const MainCertificateUpdateAction = (certificateInfoInput, id) => async (
  dispatch
) => {
  console.log('certificateInfoInput', certificateInfoInput);
  // return false;

  const vesselID = getVesselId();
  if (vesselID === null) {
    certificateInfoInput.intShipID = 1;
  } else {
    certificateInfoInput.intShipID = vesselID;
  }
  certificateInfoInput.intActionBy = getEmployeeId();

  if (certificateInfoInput.intCertificateID === null) {
    showToast("error", "Certificate can't be blank!");
    return false;
  }
  if (certificateInfoInput.category === null) {
    showToast("error", "Certificate category can't be blank!");
    return false;
  }
  if (certificateInfoInput.intCategoryID === null) {
    showToast("error", "Certificate category can't be blank!");
    return false;
  }
  if (certificateInfoInput.strCustomeCode === null) {
    showToast("error", "Certificate Code can't be blank!");
  }
  if (certificateInfoInput.intIssuingAuthorityID === null) {
    showToast("error", "Issue Autherity can't be blank!");
    return false;
  }

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
    message: "",
  };

  dispatch({
    type: Types.CERTIFICATE_MAIN_SUBMITTING,
    payload: responseList,
  });

  let postUrl = `${process.env.REACT_APP_API_URL}certificate/details/${id}`;
  await Axios.put(postUrl, certificateInfoInput)
    .then((response) => {
      const { status, data, message } = response.data;
      responseList.data = data;
      responseList.isLoading = false;
      responseList.status = status;
      responseList.message = message;
    })
    .catch((error) => {
      responseList.isLoading = false;
      responseList.message =
        "Something went wrong ! Please fill all inputs and try again !";
    });

  if (responseList.status) {
    toast.success(responseList.message);
  } else {
    toast.error(responseList.message);
  }

  // dispatch({
  //   type: Types.CERTIFICATE_MAIN_SUBMITTING,
  //   payload: false,
  // });

  dispatch({
    type: Types.CERTIFICATE_MAIN_SUBMIT,
    payload: responseList,
  });
};

export const getCertificateMainListAction = (page, searchText = null, isPublic = false, category = null, expireDays = null) => async (dispatch) => {
  let response = {
    certificates: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.CERTIFICATE_LIST_DASHBOARD, payload: response });
  let url = "";
  url = `${process.env.REACT_APP_API_URL}certificate/categoryList?isPaginated=1`;
  // url = `${process.env.REACT_APP_API_URL}certificate/details?isPaginated=1`;

  if (page !== null || page === "") {
    url += `&page=${page}`;
  }

  if (searchText !== null) {
    url += `&search=${searchText}`;
  } else {
    // url += `&certificate/details?search=${searchText}`
  }

  if (category !== null) {
    url += `&category=${category}`;
  }

  if (expireDays !== null) {
    url += `&expireDays=${expireDays}`;
  }

  try {
    await Axios.get(url)
      .then((res) => {
        console.log('response for certificate list :>> ', res.data.data);
        const { data, message, status } = res.data;
        response.status = status;
        response.certificates = data;
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

export const certificateMultipleDataAdd = (data, isEdit = false) => (dispatch) => {
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
    isActive: true,
  };
  if (!isEdit) {
    dispatch({ type: Types.ADD_MULTIPLE_DATA, payload: singleDetail });
  } else {
    dispatch({ type: Types.ADD_MULTIPLE_DATA_EDIT, payload: singleDetail });
  }
};

export const multipleAttachmentAdd = (data, isEdit = false) => (dispatch) => {
  const singleDetail = {
    file: data.file,
    filePreviewUrl: data.filePreviewUrl,
  };

  if (!isEdit) {
    dispatch({ type: Types.ADD_MULTIPLE_DATA_ATTACHMENT, payload: singleDetail });
  } else {
    dispatch({ type: Types.ADD_MULTIPLE_DATA_ATTACHMENT_EDIT, payload: singleDetail });
  }
};

export const certificateMultipleDataDelete = (index, isEdit = false) => (dispatch) => {
  if (!isEdit) {
    dispatch({ type: Types.DELETE_SURVEY_MULTIPLE_DATA, payload: index });
  } else {
    dispatch({ type: Types.DELETE_SURVEY_MULTIPLE_DATA_EDIT, payload: index });
  }
};

export const certificateMultipleAttachmentDelete = (index, isEdit = false) => (dispatch) => {
  if (!isEdit) {
    dispatch({ type: Types.DELETE_SURVEY_MULTIPLE_ATTACHMENT, payload: index });
  } else {
    dispatch({ type: Types.DELETE_SURVEY_MULTIPLE_ATTACHMENT_EDIT, payload: index });
  }
};

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
  Axios.get(`${process.env.REACT_APP_API_URL}certificate/category`).then(
    (res) => {
      let data = res.data.data;
      console.log('data certificate category :>> ', data);
      dispatch({ type: Types.GET_CERTIFICATE_CATEGORY, payload: data });
    }
  );
};
export const getCertificateName = (intCategoryID = null) => (dispatch) => {
  let url = `${process.env.REACT_APP_API_URL}certificate/certificateList`;
  if (intCategoryID !== null) {
    url = `${process.env.REACT_APP_API_URL}certificate/category/certificateByCategory/${intCategoryID}`;
    Axios.get(url)
      .then(
        (res) => {
          let data = res.data.data;
          dispatch({ type: Types.GET_CERTIFICATE_NAME, payload: data });
        }
      );
  } else {
    dispatch({ type: Types.GET_CERTIFICATE_NAME, payload: [] });
  }

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

// export const getMainCertificateSingleData = (id) => (dispatch) => {
//   Axios.get(`${process.env.REACT_APP_API_URL}certificate/details/${id}`).then(
//     (res) => {
//       let data = res.data.data;
//       dispatch({
//         type: Types.GET_MAIN_CERTIFICATE_SINGLE_DATA,
//         payload: data,
//       });
//     }
//   );
// };

// update main certificate

// export const mainCertificateEdit = (certificateInfoInput, id) => (dispatch) => {
//  let responseList = {
//    isLoading: true,
//    data: {},
//    status: false,
//  };
//  dispatch({
//    type: Types.CERTIFICATE_MAIN_SUBMITTING,
//    payload: responseList,
//  });
//   Axios.put(
//     `${process.env.REACT_APP_API_URL}certificate/details/${id}`,
//     certificateInfoInput
//   ).then((res) => {
//     // dispatch({ type: Types.MAIN_CERTIFICATE_UPDATE, payload: res.data});
//     if (res.data.status) {
//       showToast("successs", res.data.message);
//       dispatch({
//         type: Types.MAIN_CERTIFICATE_UPDATE,
//         payload: res.data,
//       });
//     } else {
//       showToast("error", res.data.message);
//     }
//   });
// };

//Get main certificate single data
export const getMainCertificateDeteailByID = (id) => (dispatch) => {
  Axios.get(`${process.env.REACT_APP_API_URL}certificate/details/${id}`).then(
    (res) => {
      let data = res.data.data;
      if (data.multipleAttachments === null) {
        data.multipleAttachments = [];
      }
      if (data.dteCertificateIssueDate === null) {
        data.dteCertificateIssueDate = '';
      }
      if (data.dteCertificateExpiryDate === null) {
        data.dteCertificateExpiryDate = '';
      }
      if (data.dteCertificateValidUntil === null) {
        data.dteCertificateValidUntil = '';
      }
      if (data.dteExtendedUntil === null) {
        data.dteExtendedUntil = '';
      }
      if (data.dteLastEndorsementDate === null) {
        data.dteLastEndorsementDate = '';
      }
      if (data.category !== null) {
        data.category = {
          label: data.category.strCertificateCategoryName,
          value: parseInt(data.category.intCategoryID),
        }
      } else {
        data.category = ''
      }

      if (data.certificate !== null) {
        data.certificate = {
          label: data.certificate.strCertificateName,
          value: parseInt(data.certificate.intCertificateID),
        }
      } else {
        data.certificate = ''
      }

      if (data.issuing_authority !== null) {
        data.issuing_authority = {
          label: data.issuing_authority.strIssuingAuthorityName,
          value: parseInt(data.issuing_authority.intIssuingAuthorityID),
        }
      } else {
        data.issuing_authority = ''
      }

      if (data.types !== null) {
        data.types = {
          label: data.types.strCertificateTypeName,
          value: parseInt(data.types.intCertificateTypeID),
        }
      } else {
        data.types = ''
      }

      if (data.status !== null) {
        data.status = {
          label: data.status.strStatus,
          value: parseInt(data.status.intCertificateStatusID),
        }
      } else {
        data.status = ''
      }

      if (data.intParentCategoryID !== null) {
        dispatch(getCertificateChildCategoryData(data.intParentCategoryID));
      }
      data.certificateDates = data.certificate_dates;
      dispatch({
        type: Types.GET_MAIN_CERTIFICATE_SINGLE_DATA,
        payload: data,
      });
    }
  );
};

export const getCertificateStatusData = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}certificate/status`;
  Axios.get(url).then((res) => {
    dispatch({ type: Types.MAIN_CERTIFICATE_STATUS, payload: res.data.data });
  });
};


// export const roleCheckboxSelect = (checkboxStatus, parentRole, item, indexChild, indexparentRole) => (dispatch) => {
//   dispatch({ type: Types.USER_ROLE_CHECKED, payload: {
//     checkboxStatus: checkboxStatus,
//     parentRole: parentRole,
//     item: item,
//     indexChild: indexChild,
//     indexparentRole: indexparentRole,
//   }});

// };

// export const allCheckboxSelected = (status) => (dispatch) => {
//   dispatch({ type: Types.USER_ROLE_ALL_CHECKED, payload: status });
// };

// export const checkPermissionGroupAction = (index, isGroupChecked) => (dispatch) => {
//   dispatch({ type: Types.USER_ROLE_CHECKED_GROUP, payload: {
//     index: index,
//     isGroupChecked: isGroupChecked
//   }});
// };

//changeable color code with date 
export const handleColorCode = (status, colorCode, index) => (dispatch) => {
  const Data = {
    name: status,
    value: colorCode,
    index: index
  }
  dispatch({ type: Types.CHANGE_STATUS_BACKGROUD, payload: Data });
}
