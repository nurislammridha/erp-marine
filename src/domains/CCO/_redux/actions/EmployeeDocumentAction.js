import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";



export const EmptyEmployeeDocumentAddMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_DOCUMENT_ADD_MESSAGE, payload: true });
};

export const EmptyEmployeeDocumentEditMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_DOCUMENT_EDIT_MESSAGE, payload: true });
};


export const GetEmployeeCDCList = () => async (dispatch) => {
    let data = {};
    const headers = {
      "Content-Type": "application/json",
    };
  
    axios
      .get(
        `${process.env.REACT_APP_API_URL}asllhr/getEmployeePersonal`,
        { headers: headers }
      )
      .then((res) => {
          console.log('ResponseCDC',res);
        let data = res.data;
        dispatch({ type: Types.GET_EMPLOYEE_DOCUMENT_CDC, payload: data });
      });
  };



export const AddEmployeeDocumentAction = (employeeInfoData, intEmployeeId) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
    };
    let rowData = [];
    employeeInfoData.multipleList.forEach((element) => {
        let imageFile = null;
        if (element.images != '' || element.images != 'undefined') {
            imageFile = element.images;
        }
        let dataItem = {
            strType: element.strType.label,
            strIssueBy: element.strIssueBy,
            strNumber: element.strNumber,
            strIssueDate: element.strIssueDate,
            strExpiryDate: element.strExpiryDate,
            // strCDCNo: element.strCDCNo,
            // strSID: element.strSID,
            imageFiles: imageFile,
            intEmployeeId: intEmployeeId,
            intUnitId: 17
        };
        rowData.push(dataItem);
    });

    axios
        .post(
            `${process.env.REACT_APP_API_URL}asllhr/createEmployeeDocument`, rowData
        )
        .then(async (res) => {
            data = {
                status: true,
                message: res.data.message,
            };
            dispatch({ type: Types.POST_EMPLOYEE_DOCUMENT, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.POST_EMPLOYEE_DOCUMENT, payload: data });
        });
};

export const UpdateEmployeeDocumentAction = (employeeInfoData) => async (dispatch) => {
    // console.log('employeeInfoData', employeeInfoData);
    // return false;
    let data = {
        status: false,
        message: "",
    };

    let postData = {
        intID: employeeInfoData.intID,
        intUnitId: employeeInfoData.intUnitId,
        intEmployeeId: employeeInfoData.intEmployeeId,
        image: employeeInfoData.image.base64,
        // strCDCNo: employeeInfoData.strCDCNo,
        strExpiryDate: employeeInfoData.strExpiryDate,
        strIssueBy: employeeInfoData.strIssueBy,
        strIssueDate: employeeInfoData.strIssueDate,
        strNumber: employeeInfoData.strNumber,
        // strSID: employeeInfoData.strSID,
        strType: employeeInfoData.typeData.label,
        intTypeId: employeeInfoData.typeData.value,
    }
    console.log('postData :>> ', postData);

    axios
        .put(
            `${process.env.REACT_APP_API_URL}asllhr/updateEmployeeDocument`, postData
        )
        .then(async (res) => {
            console.log('Response', res);
            data = {
                status: true,
                message: res.data.message,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_DOCUMENT, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_DOCUMENT, payload: data });
        });
};