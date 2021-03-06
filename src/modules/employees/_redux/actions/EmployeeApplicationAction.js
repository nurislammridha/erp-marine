import * as Types from "../../types/Types";
import axios from "axios";
import { getVesselId } from "../../../../app/modules/Auth/_redux/authCrud";
import { accessToken } from "../../../../_metronic/_helpers/LocalStorageHelpers";
import { toast } from "react-toastify";
import { showToast } from "../../../../modules/master/utils/ToastHelper";

export const handleChangeEmployeeApplicationInput = (name, value) => (
  dispatch
) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.CHANGE_EMPLOYEE_APPLICATION_INPUT,
    payload: formData,
  });
};

export const handleChangeApplicationTypeInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.CHANGE_APPLICATION_TYPE_INPUT,
    payload: formData,
  });
};

export const GetVesselList = () => async (dispatch) => {
  let response = {
    vesselList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const intVesselId = await getVesselId();

  const url = `${process.env.REACT_APP_API_URL}asll/vessel?intVesselId=${intVesselId}`;

  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      const { data, message, status } = res.data;
      // response.status = status;
      response.vesselList = data;
      // response.message = message;
      // response.issuingAuthoritiesPaginatedData = data;
      // response.isLoading = false;
      dispatch({
        type: Types.GET_VESSEL_LIST,
        payload: response,
      });
    });
};

export const GetApplicationList = () => async (dispatch) => {
  let response = {
    vesselList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const intVesselId = await getVesselId();

  const url = `${process.env.REACT_APP_API_URL}asll/vessel?intVesselId=${intVesselId}`;

  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      const { data, message, status } = res.data;
      response.status = status;
      response.vesselList = data;
      response.message = message;
      response.issuingAuthoritiesPaginatedData = data;
      response.isLoading = false;
      dispatch({
        type: Types.GET_VESSEL_LIST,
        payload: response,
      });
    });
};

export const getGetApplicationMainListAction = (
  page,
  searchText = null,
  isPublic = false,
  category = null,
  expireDays = null
) => async (dispatch) => {
  let response = {
    certificates: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.APPLICATION_PAGINATE_LIST, payload: response });
  let url = "";
  url = `${process.env.REACT_APP_API_URL}asllhr/employeeApplication?isPaginated=1`;
  console.log("url", url);
  if (page !== null || page === "") {
    url += `&page=${page}`;
  }

  // if (searchText !== null) {
  //   url += `&search=${searchText}`;
  // } else {
  //   // url += `&certificate/details?search=${searchText}`
  // }

  // if (category !== null) {
  //   url += `&category=${category}`;
  // }

  // if (expireDays !== null) {
  //   url += `&expireDays=${expireDays}`;
  // }

  try {
    await axios
      .get(url)
      .then((res) => {
        const { data, message, status } = res.data;
        response.status = status;
        response.applications = data.data;
        response.message = message;
        response.applicationPaginatedData = data;
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
  dispatch({ type: Types.APPLICATION_PAGINATE_LIST, payload: response });
};

export const GetSeafarerList = () => async (dispatch) => {
  let response = {
    seafarerList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const url = `${process.env.REACT_APP_API_URL}asllhr/getEmployeePersonal`;

  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      const { data, message, status } = res.data;
      // response.status = status;
      response.seafarerList = res.data;
      // response.message = message;
      // response.issuingAuthoritiesPaginatedData = data;
      // response.isLoading = false;
      dispatch({
        type: Types.GET_SEAFARER_LIST,
        payload: response,
      });
    });
};

export const GetRankList = () => async (dispatch) => {
  let response = {
    rankList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const url = `${process.env.REACT_APP_API_URL}asllhr/getRanks`;

  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      const { data, message, status } = res.data;
      // response.status = status;
      response.rankList = data;
      // response.message = message;
      // response.issuingAuthoritiesPaginatedData = data;
      // response.isLoading = false;
      dispatch({
        type: Types.GET_RANK_LIST,
        payload: response,
      });
    });
};

export const GetApplicationTypeList = () => async (dispatch) => {
  let response = {
    applicationTypeList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const url = `${process.env.REACT_APP_API_URL}asllhr/employeeApplicationType`;

  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      const { data, message, status } = res.data;
      // response.status = status;
      response.applicationTypeList = data;
      // response.message = message;
      // response.issuingAuthoritiesPaginatedData = data;
      // response.isLoading = false;
      dispatch({
        type: Types.GET_EMPLOYEE_APPLICATION_TYPE,
        payload: response,
      });
    });
};

export const employeeApplicationSubmitAction = (employeeApplicationData) => (
  dispatch
) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  let postData = {
    intApplicationTypeId: employeeApplicationData.intApplicationTypeId,
    intEmployeeId: employeeApplicationData.intEmployeeId,
    intRankId: employeeApplicationData.intRankId,
    intVesselId: employeeApplicationData.intVesselId,
    strReceiverName:
      employeeApplicationData.strReceiverName === ""
        ? null
        : employeeApplicationData.strReceiverName,
    dteFromDate:
      employeeApplicationData.dteFromDate === ""
        ? null
        : employeeApplicationData.dteFromDate,
    strPortName:
      employeeApplicationData.strPortName === ""
        ? null
        : employeeApplicationData.strPortName,
    strApplicationBody:
      employeeApplicationData.strApplicationBody === ""
        ? null
        : employeeApplicationData.strApplicationBody,
    strCommencementTenure:
      employeeApplicationData.strCommencementTenure === ""
        ? null
        : employeeApplicationData.strCommencementTenure,
    dteDateOfCompletion:
      employeeApplicationData.dteDateOfCompletion === ""
        ? null
        : employeeApplicationData.dteDateOfCompletion,
    dteExtensionRequested:
      employeeApplicationData.dteExtensionRequested === ""
        ? null
        : employeeApplicationData.dteExtensionRequested,
    dteRejoiningDate:
      employeeApplicationData.dteRejoiningDate === ""
        ? null
        : employeeApplicationData.dteRejoiningDate,
    strRemarks:
      employeeApplicationData.strRemarks === ""
        ? null
        : employeeApplicationData.strRemarks,
    strApplicationSubject:
      employeeApplicationData.strApplicationSubject === ""
        ? null
        : employeeApplicationData.strApplicationSubject,
  };

  dispatch({
    type: Types.POST_EMPLOYEE_APPLICATION,
    payload: responseList,
  });
  let postUrl = `${process.env.REACT_APP_API_URL}asllhr/employeeApplication/create`;
  axios
    .post(postUrl, postData)
    .then(function(response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.POST_EMPLOYEE_APPLICATION,
          payload: responseList,
        });
        // dispatch(GetApplicationTypeList());
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
        type: Types.POST_EMPLOYEE_APPLICATION,
        payload: responseList,
      });
    });
};

export const GetEmployeeApplicationList = () => async (dispatch) => {
  let response = {
    applicationList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const url = `${process.env.REACT_APP_API_URL}asllhr/employeeApplication`;

  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      const { data, message, status } = res.data;
      // response.status = status;
      response.applicationList = data;
      // response.message = message;
      // response.issuingAuthoritiesPaginatedData = data;
      // response.isLoading = false;
      dispatch({
        type: Types.GET_EMPLOYEE_APPLICATION,
        payload: response,
      });
    });
};

export const setEmployeeApplicationEditValue = (editValue) => (dispatch) => {
  const formData = {
    intApplicationTypeId: editValue.intApplicationTypeId,
    intEmployeeId: editValue.intEmployeeId,
    intRankId: editValue.intRankId,
    intVesselId: editValue.intVesselId,
    strReceiverName: editValue.strReceiverName,
    dteFromDate: editValue.dteFromDate,
    strPortName: editValue.strPortName,
    strApplicationBody: editValue.strApplicationBody,
    strCommencementTenure: editValue.strCommencementTenure,
    dteDateOfCompletion: editValue.dteDateOfCompletion,
    dteExtensionRequested: editValue.dteExtensionRequested,
    dteRejoiningDate: editValue.dteRejoiningDate,
    strRemarks: editValue.strRemarks,
    strApplicationSubject: editValue.strApplicationSubject,
  };
  dispatch({
    type: Types.SET_EMPLOYEE_APPLICATION_EDIT_DATA,
    payload: formData,
  });
};

export const employeeApplicationEditAction = (
  intID,
  employeeApplicationData
) => (dispatch) => {
  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  let postData = {
    intID: intID,
    intApplicationTypeId: employeeApplicationData.intApplicationTypeId,
    intEmployeeId: employeeApplicationData.intEmployeeId,
    intRankId: employeeApplicationData.intRankId,
    intVesselId: employeeApplicationData.intVesselId,
    strReceiverName:
      employeeApplicationData.strReceiverName === ""
        ? null
        : employeeApplicationData.strReceiverName,
    dteFromDate:
      employeeApplicationData.dteFromDate === ""
        ? null
        : employeeApplicationData.dteFromDate,
    strPortName:
      employeeApplicationData.strPortName === ""
        ? null
        : employeeApplicationData.strPortName,
    strApplicationBody:
      employeeApplicationData.strApplicationBody === ""
        ? null
        : employeeApplicationData.strApplicationBody,
    strCommencementTenure:
      employeeApplicationData.strCommencementTenure === ""
        ? null
        : employeeApplicationData.strCommencementTenure,
    dteDateOfCompletion:
      employeeApplicationData.dteDateOfCompletion === ""
        ? null
        : employeeApplicationData.dteDateOfCompletion,
    dteExtensionRequested:
      employeeApplicationData.dteExtensionRequested === ""
        ? null
        : employeeApplicationData.dteExtensionRequested,
    dteRejoiningDate:
      employeeApplicationData.dteRejoiningDate === ""
        ? null
        : employeeApplicationData.dteRejoiningDate,
    strRemarks:
      employeeApplicationData.strRemarks === ""
        ? null
        : employeeApplicationData.strRemarks,
    strApplicationSubject:
      employeeApplicationData.strApplicationSubject === ""
        ? null
        : employeeApplicationData.strApplicationSubject,
  };

  dispatch({
    type: Types.EDIT_EMPLOYEE_APPLICATION,
    payload: responseList,
  });
  let postUrl = `${process.env.REACT_APP_API_URL}asllhr/employeeApplication/update`;
  axios
    .put(postUrl, postData)
    .then(function(response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        showToast("success", response.data.message);
        dispatch({
          type: Types.EDIT_EMPLOYEE_APPLICATION,
          payload: responseList,
        });
        // dispatch(GetApplicationTypeList());
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
        type: Types.EDIT_EMPLOYEE_APPLICATION,
        payload: responseList,
      });
    });
};
