import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";



export const EmptyEmployeeCertificateAddMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_CERTIFICATE_ADD_MESSAGE, payload: true });
};

export const EmptyEmployeeCertificateEditMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_CERTIFICATE_EDIT_MESSAGE, payload: true });
};

export const GetEmployeeCourseList = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };
    axios
        .get(
            `${process.env.REACT_APP_API_URL}asllhr/getEmployeeCertificateList`,
            { headers: headers }
        )
        .then((res) => {
            console.log('ReponseCertificate', res);
            let data = res.data;
            dispatch({ type: Types.GET_EMPLOYEE_CERTIFICATE_LIST, payload: data });
        });
};

export const AddEmployeeCertificateAction = (employeeInfoData, intEmployeeId) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
    };
    let rowData = [];
    employeeInfoData.multipleList.forEach((element) => {
        let imageFile = '';
        if (element.images === '' || element.images === 'undefined') {
            imageFile = null;
        } else {
            imageFile = element.images;
        }
        let dataItem = {
            strCourseName: element.strCourseName.label,
            strIssueBy: element.strIssueBy,
            strNumber: element.strNumber,
            strIssueDate: element.strIssueDate,
            strExpiryDate: element.strExpiryDate,
            imageFile: imageFile,
            intUnitId: 17,
            intEmployeeId: intEmployeeId
        };
        rowData.push(dataItem);
    });

    axios
        .post(
            `${process.env.REACT_APP_API_URL}asllhr/createEmployeeCertificate`, rowData
        )
        .then(async (res) => {
            data = {
                status: true,
                message: res.data.message,
            };
            dispatch({ type: Types.POST_EMPLOYEE_CERTIFICATE, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.POST_EMPLOYEE_CERTIFICATE, payload: data });
        });
};

export const UpdateEmployeeCertificateAction = (employeeInfoData) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
    };

    let postData = {
        intID: employeeInfoData.intID,
        intUnitId: employeeInfoData.intUnitId,
        intEmployeeId: employeeInfoData.intEmployeeId,
        intCourseId: employeeInfoData.courseData.value,
        strCourseName: employeeInfoData.courseData.label,
        strExpiryDate: employeeInfoData.strExpiryDate,
        strIssueDate: employeeInfoData.strIssueDate,
        strIssueBy: employeeInfoData.strIssueBy,
        strNumber: employeeInfoData.strNumber,
        image: employeeInfoData.image.base64
    }


    axios
        .put(
            `${process.env.REACT_APP_API_URL}asllhr/updateEmployeeCertificate`, postData
        )
        .then(async (res) => {
            console.log('Response', res);
            data = {
                status: true,
                message: res.data.message,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_CERTIFICATE, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_CERTIFICATE, payload: data });
        });
};