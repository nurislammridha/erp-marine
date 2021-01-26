import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../utils/DateHelper";
import axios from "axios";



export const EmptyEmployeeRecordAddMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_RECORD_ADD_MESSAGE, payload: true });
};

export const EmptyEmployeeRecordEditMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_EMPLOYEE_RECORD_EDIT_MESSAGE, payload: true });
};


export const AddEmployeeRecordAction = (employeeInfoData, intEmployeeId) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
    };
    let rowData = [];
    employeeInfoData.multipleList.forEach((element) => {
        let dataItem = {
            strRank: element.strRank,
            strShipManager: element.strShipManager,
            strVesselName: element.strVesselName,
            strFlag: element.strFlag,
            strVesselType: element.strVesselType,
            strDWT: element.strDWT,
            strEngineName: element.strEngineName,
            strFromDate: element.strFromDate,
            strToDate: element.strToDate,
            strDuration: element.strDuration,
            strReason: element.strReason,
            intEmployeeId: intEmployeeId,
            intUnitId: 17,
        };
        rowData.push(dataItem);
    });

    axios
        .post(
            `http://iapps.akij.net/asll/public/api/v1/asllhr/createEmployeeRecord`, rowData
        )
        .then(async (res) => {
            data = {
                status: true,
                message: res.data.message,
            };
            dispatch({ type: Types.POST_EMPLOYEE_RECORD, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.POST_EMPLOYEE_RECORD, payload: data });
        });
};

export const UpdateEmployeeRecordAction = (employeeInfoData) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
    };

    let postData = {
        intID: employeeInfoData.intID,
        intUnitId: employeeInfoData.intUnitId,
        intEmployeeId: employeeInfoData.intEmployeeId,
        strDuration: employeeInfoData.strDuration,
        strEngineName: employeeInfoData.strEngineName,
        strFlag: employeeInfoData.strFlag,
        strFromDate: employeeInfoData.strFromDate,
        strRank: employeeInfoData.strRank,
        strReason: employeeInfoData.strReason,
        strShipManager: employeeInfoData.strShipManager,
        strToDate: employeeInfoData.strToDate,
        strVesselName: employeeInfoData.strVesselName,
        strVesselType: employeeInfoData.vesselData.label,
        intVesselType: employeeInfoData.vesselData.value,
    }


    axios
        .put(
            `http://iapps.akij.net/asll/public/api/v1/asllhr/updateEmployeeRecord`, postData
        )
        .then(async (res) => {
            data = {
                status: true,
                message: res.data.message,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_RECORD, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
            };
            dispatch({ type: Types.EDIT_EMPLOYEE_RECORD, payload: data });
        });
};