import * as Types from "../types/Types";
import moment from "moment";
const initialstate = {
    isLoading: false,
    purchaseRequestData: {
        intSBUId: "",
        strSBUName: "",
        intDepartmentId: "",
        strDepartmentName: "",
        dteDueDate: "",
        intCategoryId: "",
        strCategoryName: "",
        intBusinessUnitId: "",  //this is branch id
        strBusinessUnitName: "", //this is branc name
        intShipID: "",
        strShipName: "",
        strPurchaseReferanceNo: "",
        strRemarks: "",
        strLicenseNo: "",
        isQCComplete: 0,
        isFullPO: "",
        isApprovedAll: "",
        intActionBy: "",
        isActive: "",
        requestRow: []
    },
    PQRowData: {
        intPurchaseRequestID: "",
        intitemid: "",
        strItemName: "",
        numPurchaseRequestQty: "",
        strPurchaseRequestPurpose: "", //this is row remarks
        isPOIssued: "",
        isFullPOIssued: "",
        intQCBy: "",
        intItemCategoryID: '',
        intActionBy: ""
    },
    multiplePQData: [],
    PRListData: [],
    PRPaginateData: [],
};
const PurhasesRequestReducer = (state = initialstate, action) => {
    const newState = { ...state };
    switch (action.type) {
        case Types.PURCHASE_REQUEST_INPUT_CHANGE:
            const purchaseRequestData = { ...state.purchaseRequestData };
            purchaseRequestData[action.payload.name] = action.payload.value;
            return {
                ...state,
                purchaseRequestData,
            }
        //purchase request row data
        case Types.PURCHASE_REQUEST_ROW_INPUT_CHANGE:
            const PQRowData = { ...state.PQRowData };
            PQRowData[action.payload.name] = action.payload.value;
            return {
                ...state,
                PQRowData,
            }
        //add multiple purchase request data
        case Types.MULTIPLE_PURCHASE_DATA_CREATE:
            const newMultiplePQ = { ...state.purchaseRequestData };
            newMultiplePQ.requestRow.push(action.payload);
            return {
                ...state,
                purchaseRequestData: newMultiplePQ,
                multiplePQData: newMultiplePQ.requestRow,
                PQRowData: initialstate.PQRowData
            }
        //delete multiple Purchase request data 
        case Types.DELETE_MLTIPLE_PQ_ROW_DATA:
            let newMultipleData = state.multiplePQData;
            newMultipleData.splice(action.payload, 1);
            return {
                ...state,
                multiplePQData: newMultipleData
            }
        case Types.PQ_DATA_SUBMIT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                purchaseRequestData: initialstate.purchaseRequestData,
            }
        //get purchase list data 
        case Types.GET_PQ_LIST_DATA:
            if (action.payload.status) {
                return {
                    ...state,
                    PRListData: action.payload.PRListData,
                    PRPaginateData: action.payload.PRPaginateData,
                    isLoading: false,
                };
            } else {
                return {
                    ...state,
                    isLoading: true,
                };
            }
        default:
            break;
    }
    return newState;
};
export default PurhasesRequestReducer;