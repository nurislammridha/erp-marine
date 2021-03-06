import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";
import { showToast } from "../../../../modules/master/utils/ToastHelper";



export const EmptyEmployeeBankDetailsAddMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_BANK_DETAILS_ADD_MESSAGE, payload: true });
};

export const EmptyEmployeeBankDetailsEditMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_BANK_DETAILS_EDIT_MESSAGE, payload: true });
};


export const AddEmployeeBankDetailsAction = (employeeInfoData, intEmployeeId) => async (dispatch) => {
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
            strAccountHolderName: element.strAccountHolderName,
            strAccountNumber: element.strAccountNumber,
            strBankName: element.strBankName,
            strBankAddress: element.strBankAddress,
            strSwiftCode: element.strSwiftCode,
            strRoutingNumber: element.strRoutingNumber,
            strPaidCurrencyName: element.currencyData.label,
            intPaidCurrencyID: element.currencyData.value,
            imageFile: imageFile,
            intUnitId: 17,
            intEmployeeId: intEmployeeId,
            ysnDefaultAccount: typeof element.ysnDefaultAccount !== 'undefined' ? element.ysnDefaultAccount : 0,
        };
        rowData.push(dataItem);
    });
    dispatch({ type: Types.LOADING_EMPLOYEE_BANK_DETAILS, payload: true });

    axios
        .post(
            `${process.env.REACT_APP_API_URL}asllhr/createEmployeeBankDetails`, rowData
        )
        .then(async (res) => {
            const { status, message } = res.data;   
            if(status){
                showToast("success", message);
            }else{
                showToast("error", message);
            }
            data.status = status;
            data.message = message;
            dispatch({ type: Types.POST_EMPLOYEE_BANK_DETAILS, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.POST_EMPLOYEE_BANK_DETAILS, payload: data });
        });
};

export const UpdateEmployeeBankDetailsAction = (employeeInfoData) => async (dispatch) => {
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

    let postData = {
        intID: employeeInfoData.intID,
        strAccountHolderName: employeeInfoData.strAccountHolderName,
        strAccountNumber: employeeInfoData.strAccountNumber,
        strRoutingNumber: employeeInfoData.strRoutingNumber,
        strBankName: employeeInfoData.strBankName,
        strBankAddress: employeeInfoData.strBankAddress,
        strSwiftCode: employeeInfoData.strSwiftCode,
        strRoutingNumber: employeeInfoData.strRoutingNumber,
        images:imageFile,
        intUnitId: employeeInfoData.intUnitId,
        intEmployeeId: employeeInfoData.intEmployeeId,
        intPaidCurrencyID: employeeInfoData.currencyData.value,
        strPaidCurrencyName: employeeInfoData.currencyData.label,
        ysnDefaultAccount: typeof employeeInfoData.ysnDefaultAccount !== 'undefined' ? employeeInfoData.ysnDefaultAccount : 0,
    }


    axios
        .post(
            `${process.env.REACT_APP_API_URL}asllhr/updateEmployeeBankDetails`, postData
        )
        .then(async (res) => {
            data = {
                status: true,
                message: res.data.message,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_BANK_DETAILS, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_BANK_DETAILS, payload: data });
        });
};