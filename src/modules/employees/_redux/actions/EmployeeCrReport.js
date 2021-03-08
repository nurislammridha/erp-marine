import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";
import { Alert } from "bootstrap";
import { toast } from "react-toastify";

export const EmployeeCrReportCriteria = () => async (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
  };
  let responseData = {
    isLoading: true,
    status: false,
    data: {},
  };

  dispatch({ type: Types.GET_EMPLOYEE_CRITERIA, payload: responseData });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/crReport/getCrReportCriteriaOption`,
      { headers: headers }
    )
    .then((res) => {
      let data = res.data.data;
      responseData.data = data;
      responseData.isLoading = false;
      dispatch({ type: Types.GET_EMPLOYEE_CRITERIA, payload: responseData });
    })
    .catch((error) => {
      responseData.isLoading = false;
      dispatch({ type: Types.GET_EMPLOYEE_CRITERIA, payload: responseData });
    });
};
export const employeeReasonOfAppraisal = (data) => async (dispatch) => {
  let data = [
    {
      id: 1,
      name: "Crew sign off",
      ysnChecked: 0,
    },
    {
      id: 2,
      name: "Master/CE sign off",
      ysnChecked: 0,
    },
    {
      id: 3,
      name: "Promotion",
      ysnChecked: 0,
    },
    {
      id: 4,
      name: "Other",
      ysnChecked: 0,
    },
  ];

  dispatch({ type: Types.EMPLOYEE_REASON_OF_APPRAISAL, payload: data });
};

export const selectedReasonOfAppraisal = (data) => async (dispatch) => {
  dispatch({ type: Types.SELECT_REASON_OF_APPRAISAL, payload: data });
};

export const getCrReportEmployeeInfoByEmployeeId = (employee) => async (
  dispatch
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/crReport/getCrReportEmployeeInfoByEmployeeId?intEmployeeId=${employee.value}`,
      { headers: headers }
    )
    .then((res) => {
      console.log("CrReport Response", res);
      let data = res.data.data[0];
      dispatch({ type: Types.GET_EMPLOYEE_DETAILS_BY_ID, payload: data });
    });
};

export const getCrReportCriteriaOptionById = (id) => async (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
  };
  let responseData = {
    isLoading: true,
    status: false,
    data: {},
  };
  dispatch({
    type: Types.GET_EMPLOYEE_CR_REPORT_DETAILS,
    payload: responseData,
  });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/crReport/getCrReportCriteriaOptionById?intCriteriaMainId=${id}`,
      { headers: headers }
    )
    .then((res) => {
      let data = res.data.data;
      console.log("data", data);
      responseData.data = data;
      responseData.isLoading = false;
      dispatch({
        type: Types.GET_EMPLOYEE_CR_REPORT_DETAILS,
        payload: responseData,
      });
    })
    .then((error) => {
      responseData.isLoading = false;
      dispatch({
        type: Types.GET_EMPLOYEE_CR_REPORT_DETAILS,
        payload: responseData,
      });
    });
};

export const getCrReportList = () => async (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
  };
  let responseData = {
    isLoading: true,
    status: false,
    data: {},
  };
  dispatch({ type: Types.GET_EMPLOYEE_CR_REPORT_LIST, payload: responseData });
  axios
    .get(`${process.env.REACT_APP_API_URL}asllhr/crReport/getCrReportList`, {
      headers: headers,
    })
    .then((res) => {
      responseData.data = res.data.data;
      responseData.isLoading = false;
      dispatch({
        type: Types.GET_EMPLOYEE_CR_REPORT_LIST,
        payload: responseData,
      });
    })
    .then((error) => {
      responseData.isLoading = false;
      dispatch({
        type: Types.GET_EMPLOYEE_CR_REPORT_LIST,
        payload: responseData,
      });
    });
};

export const getCrReportListAction = (
  page,
  searchText = null,
  isPublic = false,
  category = null,
  expireDays = null
) => async (dispatch) => {
  let response = {
    crReportList: [],
    crReportPaginatedData: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.GET_CR_REPORT_PAGINATE_LIST, payload: response });
  let url = "";
  url = `${process.env.REACT_APP_API_URL}asllhr/crReport/getCrReportList?isPaginated=1`;
  console.log("url", url);
  if (page !== null || page === "") {
    url += `&page=${page}`;
  }

  try {
    await axios
      .get(url)
      .then((res) => {
        const { data, message, status } = res.data;
        response.status = status;
        response.crReportList = data.data;
        response.message = message;
        response.crReportPaginatedData = data;
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
  dispatch({ type: Types.GET_CR_REPORT_PAGINATE_LIST, payload: response });
};

export const employeeCrReportSubmit = (
  stateInput,
  criteria,
  intEmployeeApplicationId = null
) => async (dispatch) => {
  let data = {};
  const headers = {
    "Content-Type": "application/json",
  };

  let responseData = {
    isLoading: true,
    status: false,
    data: {},
  };

  dispatch({ type: Types.EMPLOYEE_CR_REPORT_SUBMIT, payload: responseData });
  let critRow = [];
  for (let i = 0; i < criteria.length; i++) {
    let parentCrite = criteria[i].options;
    for (let c = 0; c < parentCrite.length; c++) {
      const element = parentCrite[c];

      if (element.ysnChecked == 1) {
        critRow.push(element);
      }
    }
  }
  // if the validaton success then call to the axios
  if (stateInput.intEmployeeId == null) {
    toast.error("Please select Employee Name");
    responseData.isLoading = false;
    dispatch({ type: Types.EMPLOYEE_CR_REPORT_SUBMIT, payload: responseData });
    return false;
  } else if (stateInput.intRankId == null) {
    toast.error("Employee Rank not found");
    responseData.isLoading = false;
    dispatch({ type: Types.EMPLOYEE_CR_REPORT_SUBMIT, payload: responseData });
    return false;
  } else if (stateInput.dteFromDate == "") {
    toast.error("Please Select On Date");
    responseData.isLoading = false;
    dispatch({ type: Types.EMPLOYEE_CR_REPORT_SUBMIT, payload: responseData });
    return false;
  } else if (stateInput.dteToDate == "") {
    toast.error("Please Select To Date");
    responseData.isLoading = false;
    dispatch({ type: Types.EMPLOYEE_CR_REPORT_SUBMIT, payload: responseData });
    return false;
  } else if (critRow.length < 9) {
    toast.error("Please select All Reason of Appraisal");
    responseData.isLoading = false;
    dispatch({ type: Types.EMPLOYEE_CR_REPORT_SUBMIT, payload: responseData });
    return false;
  } else if (stateInput.intVesselId == null) {
    toast.error("Vessele not found");
    responseData.isLoading = false;
    dispatch({ type: Types.EMPLOYEE_CR_REPORT_SUBMIT, payload: responseData });
    return false;
  } else if (stateInput.strPromotionRecomandedDate == "") {
    toast.error("Please Select Promotion Recommend Date");
    responseData.isLoading = false;
    dispatch({ type: Types.EMPLOYEE_CR_REPORT_SUBMIT, payload: responseData });
    return false;
  }
  //  criteria selected list add to the input value for axios

  stateInput.criterias = criteria;
  stateInput.intEmployeeApplicationId=intEmployeeApplicationId;
  axios
    .post(`${process.env.REACT_APP_API_URL}asllhr/crReport/store`, stateInput, {
      headers: headers,
    })
    .then((res) => {
      let data = res.data;
      responseData.isLoading = false;
      if (res.data.data !== null) {
        toast.success("Save successfully");
      }
      dispatch({
        type: Types.EMPLOYEE_CR_REPORT_SUBMIT,
        payload: responseData,
      });
    });
};

export const employeeCrReportSelect = (
  item,
  indexParentCriteria,
  indexChild,
  parentCriteria
) => async (dispatch) => {
  let data = {
    item,
    indexParentCriteria,
    indexChild,
    parentCriteria,
  };
  dispatch({ type: Types.GET_EMPLOYEE_CRITERIA_SELECT, payload: data });
};
export const getCrReportDetailsAction = (id) => async (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
  };
  let responseData = {
    isLoading: true,
    status: false,
    data: {},
  };
  dispatch({
    type: Types.GET_CR_REPORT_DETAILS,
    payload: responseData,
  });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/crReport/getCrReportDetails?intCrReportId=${id}`,
      { headers: headers }
    )
    .then((res) => {
      let data = res.data.data;
      responseData.data = data;
      responseData.isLoading = false;
      dispatch({
        type: Types.GET_CR_REPORT_DETAILS,
        payload: responseData,
      });
    })
    .then((error) => {
      responseData.isLoading = false;
      dispatch({
        type: Types.GET_CR_REPORT_DETAILS,
        payload: responseData,
      });
    });
};
