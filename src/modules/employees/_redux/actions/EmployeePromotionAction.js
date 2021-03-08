import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";

export const EmptyEmployeePromotionAddMessage = () => async (dispatch) => {
  dispatch({ type: Types.EMPTY_EMPLOYEE_PROMOTION_ADD_MESSAGE, payload: true });
};

export const EmptyEmployeePromotionEditMessage = () => async (dispatch) => {
  dispatch({
    type: Types.EMPTY_EMPLOYEE_PROMOTION_EDIT_MESSAGE,
    payload: true,
  });
};

export const EmptyEmployeePromotionDeleteMessage = () => async (dispatch) => {
  dispatch({
    type: Types.EMPTY_EMPLOYEE_PROMOTION_DELETE_MESSAGE,
    payload: true,
  });
};

export const GetEmployeePromotionList = (intEmployeeId) => async (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (typeof intEmployeeId != "undefined") {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}asllhr/promotion/getEmployeePromotionList?intEmployeeId=${intEmployeeId}`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        let data = res.data.data;
        dispatch({ type: Types.GET_EMPLOYEE_PROMOTION, payload: data });
      });
  }
  dispatch({ type: Types.GET_EMPLOYEE_PROMOTION, payload: [] });
};

export const GetEmployeeRankList = () => async (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(`${process.env.REACT_APP_API_URL}asllhr/getRanksPrint`, {
      headers: headers,
    })
    .then((res) => {
      let data = res.data;
      dispatch({ type: Types.GET_EMPLOYEE_RANK, payload: data });
    });
};

export const GetEmployeeInfoBySearchAction = (searchValue) => async (
  dispatch
) => {
  const data = await getEmployeeInfoDataBySearch(searchValue);
  dispatch({ type: Types.GET_EMPLOYEE_PROMOTION, payload: data });
};

async function getEmployeeInfoDataBySearch(searchValue) {
  const headers = {
    "Content-Type": "application/json",
  };

  return await axios
    .get(`${process.env.REACT_APP_API_URL}asllhr/employeeSignInOut`, {
      headers: headers,
    })
    .then((res) => {
      const data = res.data.data;

      const searchData = data.filter(function (item) {
        const itemData = item.strName + " " + item.strVesselName;
        const textData = searchValue.trim().toLowerCase();
        return itemData.toLowerCase().indexOf(textData) !== -1;
      });
      return searchData;
    });
}

export const DeleteEmployeePromotion = (intID) => async (dispatch) => {
  let data = {
    status: false,
    message: "",
    isLoading: false,
    data: 0,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  data.isLoading = true;
  axios
    .delete(
      `${process.env.REACT_APP_API_URL}asllhr/promotion/deleteEmployeePromotion?intID=` + intID,
      { headers: headers }
    )
    .then((res) => {
      data.status = res.data.status;
      data.isLoading = false;
      data.data = res.data.data;
      data.message = res.data.message;
      dispatch({ type: Types.DELETE_EMPLOYEE_PROMOTION, payload: data });
    });
};

export const StoreEmployeePromotion = (postData) => async (dispatch) => {
  let data = {
    status: false,
    message: "",
    intEmployeeId: "",
    isLoading: false,
  };

  axios
    .post(
      `${process.env.REACT_APP_API_URL}asllhr/promotion/addEmployeePromotion`, postData
    )
    .then(async (res) => {
      console.log('PromotionResponse',res);
      data = res.data;
      dispatch({ type: Types.POST_EMPLOYEE_PROMOTION, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
        isLoading: false,
      };
      dispatch({ type: Types.POST_EMPLOYEE_PROMOTION, payload: data });
    });
};

export const EmployeePromotionUpdate = (employeeInfoData) => async (
  dispatch
) => {
  let data = {
    status: false,
    message: "",
    intEmployeeId: "",
    isLoading: false,
  };
  let postData = {
    intID: employeeInfoData.intID,
    intEmployeeId: employeeInfoData.employeeData.value,
    intVesselId: employeeInfoData.vesselData.value,
    dteActionDate: employeeInfoData.dteActionDate,
    ysnSignIn: employeeInfoData.ysnSignIn,
    strRemarks: employeeInfoData.strRemarks,
  };

  axios
    .put(
      `${process.env.REACT_APP_API_URL}asllhr/employeeSignInOut/update`,
      postData
    )
    .then(async (res) => {
      data = {
        status: true,
        message: res.data.message,
        isLoading: true,
      };
      dispatch({ type: Types.EDIT_EMPLOYEE_PROMOTION, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
        isLoading: false,
      };
      dispatch({ type: Types.EDIT_EMPLOYEE_PROMOTION, payload: data });
    });
};
