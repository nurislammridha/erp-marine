import * as Types from "../../types/Types";
import { toast } from "react-toastify";
import axios from "axios";

export const EmptyEmployeeSigningAddMessage = () => async (dispatch) => {
  dispatch({ type: Types.EMPTY_EMPLOYEE_SIGNING_ADD_MESSAGE, payload: true });
};

export const EmptyEmployeeSigningEditMessage = () => async (dispatch) => {
  dispatch({ type: Types.EMPTY_EMPLOYEE_SIGNING_EDIT_MESSAGE, payload: true });
};

export const EmptyEmployeeSigningDeleteMessage = () => async (dispatch) => {
  dispatch({
    type: Types.EMPTY_EMPLOYEE_SIGNING_DELETE_MESSAGE,
    payload: true,
  });
};

// export const GetEmployeeSigningList = () => async (dispatch) => {
//   let data = {};
//   const headers = {
//     "Content-Type": "application/json",
//   };

//   axios
//     .get(
//       `${process.env.REACT_APP_API_URL}asllhr/employeeSignInOut`,
//       { headers: headers }
//     )
//     .then((res) => {
//       let data = res.data;
//       dispatch({ type: Types.GET_EMPLOYEE_SIGNING, payload: data });
//     });
// };

export const GetEmployeeSigningList = (
  page,
  searchText = null,
  isPublic = false,
  category = null,
  expireDays = null
) => async (dispatch) => {
  let response = {
    employeeSigningInfoList: [],
    status: false,
    message: "",
    isLoading: true,
    errors: [],
  };
  dispatch({ type: Types.GET_EMPLOYEE_SIGNING, payload: response });
  let url = "";
  url = `${process.env.REACT_APP_API_URL}asllhr/employeeSignInOut?isPaginated=1`;
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
        console.log("SigningActionReponse", res.data);
        const { data, message, status } = res.data;
        response.status = status;
        response.employeeSigningInfoList = data.data;
        response.message = message;
        response.signingPaginatedData = data;
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
  dispatch({ type: Types.GET_EMPLOYEE_SIGNING, payload: response });
};
export const GetEmployeeInfoBySearchAction = (searchValue) => async (
  dispatch
) => {
  const data = await getEmployeeInfoDataBySearch(searchValue);
  dispatch({ type: Types.GET_EMPLOYEE_SIGNING, payload: data });
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

      const searchData = data.filter(function(item) {
        const itemData = item.strName + " " + item.strVesselName;
        const textData = searchValue.trim().toLowerCase();
        return itemData.toLowerCase().indexOf(textData) !== -1;
      });
      return searchData;
    });
}

export const getemployeeSigingSearch = (searchText, vesselId) => async (
  dispatch
) => {
  let data = {isLoading:true};
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/employeeSignInOut/getemployeeSigningSearch?employeeName=${searchText}&vesselId=${vesselId}`,

      { headers: headers }
    )
    .then((res) => {
      data = res.data;
      data.isLoading=false;
      dispatch({ type: Types.SEARCH_EMPLOYEE_SIGNING, payload: data });
    });
};

export const DeleteEmployeeSigning = (id) => async (dispatch) => {
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
      `${process.env.REACT_APP_API_URL}asllhr/employeeSignInOut/deleteEmployeeSignInOut?intID=` +
        id,
      { headers: headers }
    )
    .then((res) => {
      data.status = res.data.status;
      data.isLoading = false;
      data.data = res.data.data;
      data.message = res.data.message;
      dispatch({ type: Types.DELETE_EMPLOYEE_SIGNING, payload: data });
    });
};

export const SignEmployee = (employeeInfoData) => async (dispatch) => {
  let data = {
    status: false,
    message: "",
    intEmployeeId: "",
    isLoading: false,
  };
  let postData = {
    intEmployeeId: employeeInfoData.employeeData.value,
    intVesselId: employeeInfoData.vesselData.value,
    dteActionDate: employeeInfoData.dteActionDate,
    ysnSignIn: employeeInfoData.signStatusData.value,
    strRemarks: employeeInfoData.strRemarks,
  };

  axios
    .post(
      `${process.env.REACT_APP_API_URL}asllhr/employeeSignInOut/create`,
      postData
    )
    .then(async (res) => {
      data = {
        status: true,
        message: res.data.message,
        isLoading: true,
      };
      dispatch({ type: Types.POST_EMPLOYEE_SIGNING, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
        isLoading: false,
      };
      dispatch({ type: Types.POST_EMPLOYEE_SIGNING, payload: data });
    });
};

export const SignEmployeeUpdate = (employeeInfoData) => async (dispatch) => {
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
      // `http://192.168.0.102:8081/ASSLAPI/public/api/v1/asllhr/employeeSignInOut/update`, postData
    )
    .then(async (res) => {
      data = {
        status: true,
        message: res.data.message,
        isLoading: true,
      };
      dispatch({ type: Types.EDIT_EMPLOYEE_SIGNING, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
        isLoading: false,
      };
      dispatch({ type: Types.EDIT_EMPLOYEE_SIGNING, payload: data });
    });
};
