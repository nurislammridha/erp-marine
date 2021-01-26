import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";



export const EmptyEmployeeReferenceAddMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_REFERENCE_ADD_MESSAGE, payload: true });
};

export const EmptyEmployeeReferenceEditMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_REFERENCE_EDIT_MESSAGE, payload: true });
};

export const AddEmployeeReferenceAction = (employeeInfoData, intEmployeeId) => async (dispatch) => {
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
            strCompanyName: element.strCompanyName,
            strPersonName: element.strPersonName,
            strTelephone: element.strTelephone,
            strEmail: element.strEmail,
            strAddress: element.strAddress,
            strCountry: element.strCountry.label,
            imageFile: imageFile,
            isVisa: element.isVisa,
            maritimeAccident: element.maritimeAccident,
            intUnitId: 17,
            intEmployeeId: intEmployeeId
        };
        rowData.push(dataItem);
    });

    dispatch({ type: Types.EMPLOYEE_REFERENCE_LOADING, payload: true });
    
    axios
        .post(
            `${process.env.REACT_APP_API_URL}asllhr/createEmployeeReference`, rowData
        )
        .then(async (res) => {
            data = {
                status: true,
                message: res.data.message,
            };
            dispatch({ type: Types.POST_EMPLOYEE_REFERENCE, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.POST_EMPLOYEE_REFERENCE, payload: data });
        });
};

//update employeee reference
export const UpdateEmployeeReferenceAction = (employeeInfoData) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
    };
    let imageFile = '';
    if (employeeInfoData.image === null || employeeInfoData.image === '' || employeeInfoData.image === 'undefined') {
        imageFile = null;
    } else {
        imageFile = employeeInfoData.image.base64;
    }
    let rowData = [];
    let postData = {
        intID: employeeInfoData.intID,
        strCompanyName: employeeInfoData.strCompanyName,
        strPersonName: employeeInfoData.strPersonName,
        strTelephone: employeeInfoData.strTelephone,
        strEmail: employeeInfoData.strEmail,
        // image: employeeInfoData.image.base64,
        strAddress: employeeInfoData.strAddress,
        strCountry: employeeInfoData.strCountry.label,
        imageFile: imageFile,
        isVisa: employeeInfoData.isVisa,
        maritimeAccident: employeeInfoData.maritimeAccident,
        intUnitId: 17,
        intEmployeeId: employeeInfoData.intEmployeeId,
    };
    console.log('postData', postData)
    axios
        .post(
            `${process.env.REACT_APP_API_URL}asllhr/updateEmployeeReference`, postData
        )
        .then(async (res) => {
            data = {
                status: true,
                message: res.data.message,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_REFERENCE, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_REFERENCE, payload: data });
        });
};