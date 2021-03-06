import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";
import { getVesselId } from "../../../../app/modules/Auth/_redux/authCrud";

export const EmptyEmployeeAddMessage = () => async (dispatch) => {
  dispatch({ type: Types.EMPTY_EMPLOYEE_ADD_MESSAGE, payload: true });
};

export const EmptyEmployeeDeleteMessage = () => async (dispatch) => {
  dispatch({ type: Types.EMPTY_EMPLOYEE_DELETE_MESSAGE, payload: true });
};

export const GetEmployeeTabIndex = (tabIndex) => async (dispatch) => {
  dispatch({ type: Types.GET_EMPLOYEE_TAB, payload: tabIndex });
};

export const GetEmployeeList = () => async (dispatch) => {
  let responseData = {
    isLoading:true,
    data:{}
    
  };
  const headers = {
    "Content-Type": "application/json",
  };
  dispatch({ type: Types.GET_EMPLOYEE_PERSONAL, payload: responseData });
  const intVesselId = await getVesselId();
  const url = `${process.env.REACT_APP_API_URL}asllhr/getEmployeePersonal?intVesselId=${intVesselId}`;
  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      console.log('Response Employee',res);
      let data = res.data;
      responseData.data = data;
      responseData.isLoading=false
      dispatch({ type: Types.GET_EMPLOYEE_PERSONAL, payload: responseData });
    });
};

export const GetEmployeeListForDropdown = () => async (dispatch) => {
  let responseData = {
    isLoading:true,
    data:{}
    
  };
  const headers = {
    "Content-Type": "application/json",
  };
  const intVesselId = await getVesselId();
  const url = `${process.env.REACT_APP_API_URL}asllhr/getEmployeeDropdownList?intVesselId=${intVesselId}`;
  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      console.log('Response Employee',res);
      let data = res.data;
      responseData.data = data;
      responseData.isLoading=false
      dispatch({ type: Types.GET_EMPLOYEE_PERSONAL, payload: responseData });
    });
};

export const GetAllEmployeeList = () => async (dispatch) => {
  let data = {};
  const headers = {
    "Content-Type": "application/json",
  };
  const url = `${process.env.REACT_APP_API_URL}asllhr/getEmployeePersonal`;
  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      console.log('ResponseEmployeee',res);
      let data = res.data;
      dispatch({ type: Types.GET_EMPLOYEE_PERSONAL, payload: data });
    });
};

export const getemployeeSearch = (searchText, vesselId) => async (dispatch) => {
  let responseData = {
    isLoading:true,
    data:{}
    
  };
  const headers = {
    "Content-Type": "application/json",
  };
  dispatch({ type: Types.GET_EMPLOYEE_SEARCH, payload: responseData });
  const intVesselId = getVesselId();
  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/getemployeeSearch?employeeName=${searchText}&vesselId=${vesselId}&intVesselId=${intVesselId}`,

      { headers: headers }
    )
    .then((res) => {
      let data = res.data;
      responseData.data = data.data;
      responseData.isLoading=false
      dispatch({ type: Types.GET_EMPLOYEE_SEARCH, payload: responseData });
    });
};

export const GetEmployeeDetails = (intEmployeeId) => async (dispatch) => {
  let data = {};
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/getEmployeePersonalDetails/` +
        intEmployeeId,
      { headers: headers }
    )
    .then((res) => {
      let data = res.data;
      dispatch({ type: Types.GET_EMPLOYEE_PERSONAL_DETAILS, payload: data });
    });
};

export const GetEmployeeRank = () => async (dispatch) => {
  let data = {};
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(`${process.env.REACT_APP_API_URL}asllhr/getRanks`, {
      headers: headers,
    })
    .then((res) => {
      let data = res.data;
      dispatch({ type: Types.GET_EMPLOYEE_RANK, payload: data });
    });
};

export const DeleteEmployee = (id) => async (dispatch) => {
  let data = {};
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .delete(
      `${process.env.REACT_APP_API_URL}asllhr/deleteEmployee/` + id,
      { headers: headers }
    )
    .then((res) => {
      let data = res.data;
      dispatch({ type: Types.DELETE_EMPLOYEE_PERSONAL, payload: data });
    });
};

export const AddEmployeePersonalAction = (employeeInfoData) => async (
  dispatch
) => {
  let imageFile = "";
  if (employeeInfoData.image === "" || employeeInfoData.image === "undefined") {
    imageFile = null;
  } else {
    imageFile = employeeInfoData.image[0].base64;
  }
  let data = {
    status: false,
    message: "",
    intEmployeeId: "",
    isLoading: false,
  };
  let postData = {
    strName: employeeInfoData.strName,
    strBirthdate: employeeInfoData.strBirthdate,
    strBirthPlace: employeeInfoData.strBirthPlace,
    image: imageFile,
    // image: null,
    strHomeTelephone: employeeInfoData.strHomeTelephone,
    strAmount: employeeInfoData.strAmount,
    strCurrency: employeeInfoData.strCurrency.label,
    strRank: employeeInfoData.rankData.label,
    intRankId: employeeInfoData.rankData.value,
    strAvailabilityDate: employeeInfoData.strAvailabilityDate,
    strEmail: employeeInfoData.strEmail,
    strHeight: employeeInfoData.strHeight,
    strWeight: employeeInfoData.strWeight,
    strNationality: employeeInfoData.strNationality,
    strEmgrPersonalTel: employeeInfoData.strEmgrPersonalTel,
    strEmgrPersonName: employeeInfoData.strEmgrPersonName,
    strEmgrPersonRelation: employeeInfoData.strEmgrPersonRelation,
    strEmgrPersonAddress: employeeInfoData.strEmgrPersonAddress,
    strTradingArea: employeeInfoData.strTradingArea,
    strCargoCarried: employeeInfoData.strCargoCarried,
    strNearestAirport: employeeInfoData.strNearestAirport.label,
    strCDCNo: employeeInfoData.strCDCNo,
    strBoilersuit: employeeInfoData.strBoilersuit,
    strSafetyShoes: employeeInfoData.strSafetyShoes,
    strUniformShirt: employeeInfoData.strUniformShirt,
    strUniformTrouser: employeeInfoData.strUniformTrouser,
    strWinterJacket: employeeInfoData.strWinterJacket,
    strPermanentAddress:employeeInfoData.strPermanentAddress,
    strPresentAddress:employeeInfoData.strPresentAddress,
    strRemarks: employeeInfoData.strRemarks,
  };
  axios
    .post(
      `${process.env.REACT_APP_API_URL}asllhr/createEmployeePersonal`,
      // `http://192.168.206.1:82/ASSLAPI/public/api/v1/asllhr/createEmployeePersonal`,
      postData
    )
    .then(async (res) => {
      data = {
        status: true,
        message: res.data.message,
        intEmployeeId: res.data.data,
        isLoading: true,
      };
      dispatch({ type: Types.POST_EMPLOYEE_PERSONAL, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
        isLoading: false,
      };

      console.log('data',data);
      // dispatch({ type: Types.POST_EMPLOYEE_PERSONAL, payload: data });
    });
};

export const UpdateEmployeePersonalAction = (employeeInfoData) => async (
  dispatch
) => {
  // let image = null;
  // if (employeeInfoData.image.length > 1) {
  //     image = employeeInfoData.image;
  // } else {
  //     image = employeeInfoData.image[0].base64
  // }
  let data = {
    status: false,
    message: "",
    intEmployeeId: "",
    isLoading: false,
  };
  let postData = {
    intID: employeeInfoData.intID,
    strName: employeeInfoData.strName,
    strBirthdate: employeeInfoData.strBirthdate,
    strBirthPlace: employeeInfoData.strBirthPlace,
    // image: employeeInfoData.image.base64,
    strHomeTelephone: employeeInfoData.strHomeTelephone,
    strAmount: employeeInfoData.strAmount,
    intCurrencyId: employeeInfoData.currencyData.value,
    strCurrency: employeeInfoData.currencyData.label,
    strRank: employeeInfoData.rankData.label,
    intRankId: employeeInfoData.rankData.value,
    strAvailabilityDate: employeeInfoData.strAvailabilityDate,
    strEmail: employeeInfoData.strEmail,
    strHeight: employeeInfoData.strHeight,
    strWeight: employeeInfoData.strWeight,
    strPermanentAddress:employeeInfoData.strPermanentAddress,
    strPresentAddress:employeeInfoData.strPresentAddress,
    strNationality: employeeInfoData.strNationality,
    strEmgrPersonalTel: employeeInfoData.strEmgrPersonalTel,
    strEmgrPersonName: employeeInfoData.strEmgrPersonName,
    strEmgrPersonRelation: employeeInfoData.strEmgrPersonRelation,
    strEmgrPersonAddress: employeeInfoData.strEmgrPersonAddress,
    strTradingArea: employeeInfoData.strTradingArea,
    strCargoCarried: employeeInfoData.strCargoCarried,
    intAirportId: employeeInfoData.airportData.value,
    strNearestAirport: employeeInfoData.airportData.label,
    strCDCNo: employeeInfoData.strCDCNo,
    strBoilersuit: employeeInfoData.strBoilersuit,
    strSafetyShoes: employeeInfoData.strSafetyShoes,
    strUniformShirt: employeeInfoData.strUniformShirt,
    strUniformTrouser: employeeInfoData.strUniformTrouser,
    strWinterJacket: employeeInfoData.strWinterJacket,
    strRemarks: employeeInfoData.strRemarks,
  };
  console.log('postData', postData);
  axios
    .post(
      // `http://10.3.203.220:8082/ASSLAPI/public/api/v1/asllhr/updateEmployeePersonal`,
      `${process.env.REACT_APP_API_URL}asllhr/updateEmployeePersonal`,
      postData
    )
    .then(async (res) => {
        console.log('ResponseEmployee',res);
      data = {
        status: true,
        message: res.data.message,
        intEmployeeId: res.data.data,
        isLoading: true,
      };
      dispatch({ type: Types.POST_EMPLOYEE_PERSONAL, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
        isLoading: false,
      };
      dispatch({ type: Types.POST_EMPLOYEE_PERSONAL, payload: data });
    });
};

export const GetEmployeeDetailsActionService = async (intEmployeeId) => {
  let data = {};
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/getEmployeePersonalDetails/${intEmployeeId}`
    )
    .then((res) => {
      data = res.data.data;
    });
  return data;
};
