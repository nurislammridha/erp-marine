import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";
import { generateFormDataFromObject } from "../../../../modules/master/utils/FileHelper";

export const EmptyEmployeeEducationAddMessage = () => async (dispatch) => {
  dispatch({ type: Types.EMPTY_EMPLOYEE_EDUCATION_ADD_MESSAGE, payload: true });
};

export const EmptyEmployeeEducationEditMessage = () => async (dispatch) => {
  dispatch({
    type: Types.EMPTY_EMPLOYEE_EDUCATION_EDIT_MESSAGE,
    payload: true,
  });
};

// export const GetEmployeeEducationDetails = (intEmployeeId) => async (dispatch) => {
//     let data = {};
//     const headers = {
//         "Content-Type": "application/json",
//     };

//     axios
//         .get(
//             `http://iapps.akij.net/asll/public/api/v1/asllhr/getEmployeePersonalDetails/` + intEmployeeId,
//             { headers: headers }
//         )
//         .then((res) => {
//             let data = res.data;
//             dispatch({ type: Types.GET_EMPLOYEE_EDUCATION_DETAILS, payload: data });
//         });

// };

export const AddEmployeeEducationAction = (
  employeeInfoData,
  intEmployeeId
) => async (dispatch) => {
  let data = {
    status: false,
    message: "",
  };
  let rowData = [];
  employeeInfoData.multipleList.forEach((element) => {
    let imageFile = "";
    if (element.images !== "" && typeof element.images !== "undefined") {
      imageFile = element.images;
    } else {
      imageFile = null;
    }
    let dataItem = {
      imageFiles: imageFile,
      strCertification: element.strCertification.label,
      strInstitution: element.strInstitution,
      strResult: element.strResult,
      strYear: element.strYear,
      intEmployeeId: intEmployeeId,
      intUnitId: 17,
    };
    rowData.push(dataItem);
  });

  console.log("rowData", rowData);

  let headers = {
    "content-type": "application/json",
  };

  //   const formData = generateFormDataFromObject(rowData);
  axios
    .post(
      `${process.env.REACT_APP_API_URL}asllhr/createEmployeeEducation`,
      rowData,
      headers
    )
    .then(async (res) => {
      console.log("responseData", res);
      data = {
        status: true,
        message: res.data.message,
      };
      dispatch({ type: Types.POST_EMPLOYEE_EDUCATION, payload: data });
    })
    .catch((err) => {
      data = {
        status: false,
        message: err.data,
      };
      dispatch({ type: Types.POST_EMPLOYEE_EDUCATION, payload: data });
    });
};

export const UpdateEmployeeEducationAction = (employeeInfoData) => async (
  dispatch
) => {
  let data = {
    status: false,
    message: "",
  };
  let postData = {
    intID: employeeInfoData.intID,
    intCertificateId: employeeInfoData.certificateData.value,
    strCertification: employeeInfoData.certificateData.label,
    // image: employeeInfoData.image,
    intEmployeeId: parseInt(employeeInfoData.intEmployeeId),
    intUnitId: parseInt(employeeInfoData.intUnitId),
    strInstitution: employeeInfoData.strInstitution,
    strResult: employeeInfoData.strResult,
    image: employeeInfoData.image.base64,
    strYear: employeeInfoData.strYear,
  };
  console.log('postData :>> ', postData);
  let headers = {
    "content-type": "application/json",
  };
  axios
    .put(
      `${process.env.REACT_APP_API_URL}asllhr/updateEmployeeEducation`,
      postData,
      headers
    )
    .then(async (res) => {
      data = {
        status: true,
        message: res.data.message,
      };
      dispatch({ type: Types.EDIT_EMPLOYEE_EDUCATION, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
      };
      dispatch({ type: Types.EDIT_EMPLOYEE_EDUCATION, payload: data });
    });
};
