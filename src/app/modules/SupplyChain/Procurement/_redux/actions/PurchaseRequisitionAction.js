import * as Types from "../../types/Types";
import axios from "axios";
import { getEmployeData } from "../../../../Auth/_redux/authCrud";

export const UploadPurchaseRequisition = (purchaseRequisitionData) => async (dispatch) => {
    let userData = await getEmployeData();
    let intInsertBy = userData.intEmployeeId;
    let data = {
        status: false,
        message: "",
        isLoading: false,
        data: ''
    };
    let postData = {
        intDepartmentId: purchaseRequisitionData.departmentData.value,
        strDepartmentName: purchaseRequisitionData.departmentData.label,
        strIndentType: purchaseRequisitionData.importType.label,
        intWarehouseId: purchaseRequisitionData.warehouseData.value,
        strWarehouseName: purchaseRequisitionData.warehouseData.label,
        strAccountRemarks: purchaseRequisitionData.strAccountRemarks,
        intUnitID: purchaseRequisitionData.unitData.value,
        dteDueDate: purchaseRequisitionData.date,
        uploadFile: purchaseRequisitionData.file,
    }
    var bodyFormData = new FormData();
    bodyFormData.append('intDepartmentId', postData.intDepartmentId);
    bodyFormData.append('strDepartmentName', postData.strDepartmentName);
    bodyFormData.append('strIndentType', postData.strIndentType);
    bodyFormData.append('intWarehouseId', postData.intWarehouseId);
    bodyFormData.append('strWarehouseName', postData.strWarehouseName);
    bodyFormData.append('dteDueDate', postData.dteDueDate);
    bodyFormData.append('uploadFile', purchaseRequisitionData.file);
    bodyFormData.append('intInsertBy', intInsertBy);
    bodyFormData.append('intUnitID', postData.intUnitID);
    bodyFormData.append('strAccountRemarks', purchaseRequisitionData.strAccountRemarks);
    const options = {
        headers: { "Content-type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2) }
    };
    axios
        .post(
            `http://iapps.akij.net/asll/public/api/v1/purchaseRequisition/fileInput`, bodyFormData, options
        )
        .then(async (res) => {
            console.log('Response', res);
            data = {
                status: true,
                message: res.data.message,
                isLoading: true,
                data: res.data.data
            };
            dispatch({ type: Types.UPLOAD_PURCHASE_REQUISITION, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
                isLoading: false
            };
            dispatch({ type: Types.UPLOAD_PURCHASE_REQUISITION, payload: data });
        });
};

export const GetWarehouseListAction = (intUnitID) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: false,
        data: []
    };

    axios
        .get(`http://iapps.akij.net/asll/public/api/v1/purchaseRequisition/getWearehouseList?intUnitId=${intUnitID}`)
        .then(res => {
            data = {
                status: true,
                message: res.data.message,
                isLoading: true,
                data: res.data.data
            };
            dispatch({ type: Types.GET_WAREHOUSE_LIST, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
                isLoading: false,
                data: []
            };
            dispatch({ type: Types.GET_WAREHOUSE_LIST, payload: data });
        });
};

export const GetUnitListAction = () => async (dispatch) => {
    let userData = await getEmployeData();
    let intEmployeeId = userData.intEmployeeId;
    let data = {
        status: false,
        message: "",
        isLoading: false,
        data: []
    };

    axios
        .get(`http://iapps.akij.net/asll/public/api/v1/purchaseRequisition/getUnitList?intEmployeeId=${intEmployeeId}`)
        .then(res => {
            data = {
                status: true,
                message: res.data.message,
                isLoading: true,
                data: res.data.data
            };

            dispatch({ type: Types.GET_UNIT_LIST, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
                isLoading: false,
                data: []
            };
            dispatch({ type: Types.GET_UNIT_LIST, payload: data });
        });
};


export const GetDepartmentListAction = () => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: false,
        data: []
    };

    axios
        .get(`http://iapps.akij.net/asll/public/api/v1/purchaseRequisition/getDepartmentList`)
        .then(res => {
            data = {
                status: true,
                message: res.data.message,
                isLoading: true,
                data: res.data.data
            };
            dispatch({ type: Types.GET_DEPARTMENT_LIST, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
                isLoading: false,
                data: []
            };
            dispatch({ type: Types.GET_DEPARTMENT_LIST, payload: data });
        });
};
