import Axios from "axios"
import moment from "moment"
import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
export const getDepartmentList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/departmentList`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_DEPARTMENT_LIST, payload: res.data.data })
        }
    )
}
export const changeSupplierCSInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.SUPPLIER_CS_INPUT, payload: formData })
}
export const searchSupplierInput = (value) => (dispatch) => {
    dispatch({ type: Types.SEARCH_SUPPLIER, payload: value })
}
export const getDataFilterSelect = (supplierCSInput) => (dispatch) => {
    const { strDepartmentName, strSBUName, strBranchName, dteFromDate, dteToDate, flag1, flag2 } = supplierCSInput;
    // if (strDepartmentName.length > 0 && strSBUName.length > 0 && strBranchName.length > 0 && flag1.length > 0 && flag2.length > 0) {
    const fromDate = moment(dteFromDate).format("YYYY-MM-DD");
    const toDate = moment(dteToDate).format("YYYY-MM-DD");
    const url = `${process.env.REACT_APP_API_URL}purchase/getsupplierCSList?strDepartmentName=${strDepartmentName}&strSBUName=${strSBUName}&strBusinessUnitName=${strBranchName}`;

    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.SUPPLIER_LIST, payload: res.data.data })
        }
    )
    // }
}
export const getDataBySearch = (search) => (dispatch) => {

    if (search && search.length > 0) {
        const url = `${process.env.REACT_APP_API_URL}purchase/getsupplierCSList?intPurchaseRequestId=${search}`;
        Axios.get(url).then(
            (res) => {
                dispatch({ type: Types.SUPPLIER_LIST, payload: res.data.data })
            }
        )
    }
    else if (search === "") {
        dispatch({ type: Types.SUPPLIER_LIST, payload: undefined })
    }

}
export const getSupplierCSDetails = (id) => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/supplierCS/${id}`;
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_SUPPLIER_DETAILS, payload: res.data.data, detailsId: id })
        }
    )

}
export const getSupplierAddress = (value) => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}purchase/getSupplierDetails/${value}`
    Axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_SUPPLIER_ADDRESS, payload: res.data.data })
        }
    )
}
export const searchValueRFQ = (value) => (dispatch) => {
    dispatch({ type: Types.SEARCH_RFQ, payload: value })
}
export const getQuotationRFQDetails = (rfqList, id) => (dispatch) => {
    // if (id && id.length === 0) {
    //     showToast("error", "RFQ should Not be empty");
    //     return false;
    // }

    console.log('rfqList :>> ', rfqList);
    let newRfqList = rfqList;
    // newRfqList.purchase_row.splice();

    const url = `${process.env.REACT_APP_API_URL}purchase/getQuotationRFQDetails/${id}`
    if (id && id.length > 0) {
        Axios.get(url).then(
            (res) => {
                const data = res.data.data;
                // console.log('rfqList.purchase_row', rfqList.purchase_row)
                // console.log('res.data.data', data)
                // rfqList.purchase_row.push(res.data.data)
                if (data) {
                    data.forEach(item => {
                        const list = {
                            dteLastActionDateTime: item.dteLastActionDateTime,
                            dteServerDateTime: item.dteServerDateTime,
                            intActionBy: item.intActionBy,
                            intId: item.intID,
                            intPurchaseRequestID: "1",
                            intQCBy: "1",
                            intitemid: item.intItemId,
                            isActive: item.isActive,
                            isFullPOIssued: "1",
                            isPOIssued: "1",
                            numPurchaseRequestQty: "1.000000",
                            strItemName: "Hp Laptop",
                            strPurchaseRequestPurpose: "personal"
                        }
                        // newRfqList.purchase_row.concat(list);
                        dispatch({ type: Types.ADD_RFQ_PURCHASE_ROW, payload: list })
                    });

                }
                // console.log('newList :>> ', rfqList.purchase_row);


            }
        )
    }
    // else {
    //     dispatch({ type: Types.QUOTATION_RFQ_LIST, payload: "" })
    // }

}
export const createPrepareRFQ = (supplierDetailsList) => (dispatch) => {
    const id = supplierDetailsList.intPurchaseRequestID;
    const RFQlist = {
        strQuotationNo: 1,
        intBusinessUnitId: supplierDetailsList.intBusinessUnitId,
        intShipId: supplierDetailsList.intShipId,
        strShipName: supplierDetailsList.strShipName,
        dteQuotationDate: "",
        dteInsertTime: "",
        intInsertBy: 1,
        isComplete: true,
        isActive: true,
        intQuotationId: 24
    }
    const url = `${process.env.REACT_APP_API_URL}purchase/createRFQ/${id}`
    Axios.post(url, RFQlist).then(function (response) {
        dispatch({ type: Types.RFQ_LIST, payload: supplierDetailsList })

        if (response.data.status) {
            showToast("success", response.data.message);

        } else {
            showToast("error", response.data.message)
        }
    }).catch(function (error) {
        const message = "Something Wrong, Fill Up all fields";
        showToast("error", message);
    })
}
export const newRfqList = (quotationRFQlist, rfqList) => (dispatch) => {
    console.log('quotationRFQlist :>> ', quotationRFQlist);
    console.log('rfqList :>> ', rfqList);
}