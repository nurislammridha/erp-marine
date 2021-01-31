import * as Types from "../types/Types";
import moment from "moment";
const initialstate = {
    purchaseRequestData: {
        intDepartmentId: '', //
        intSBUId: '',  //okey
        strDepartmentName: '', //
        strSBUName: '',  //okey
        intBusinessUnitId: '', //this is branch 
        strBusinessUnitName: '', //
        intShipID: '', // 
        strRemarks: '',
        strLicenseNo: '',
        isQCComplete: '',
        isFullPO: '',
        isApprovedAll: '',
        isActive: '',
        intActionBy: '',
        requestRow: [
            {
                intPurchaseRequestID: '',
                intitemid: '',
                strItemName: '',
                numPurchaseRequestQty: '',
                strPurchaseRequestPurpose: '',
                isPOIssued: '',
                isFullPOIssued: '',
                intQCBy: '',
                intItemCategoryID: '',
                intActionBy: ''
            }
        ]

    }
};
const PurhasesRequestReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.PURCHASE_REQUEST_INPUT_CHANGE:
            const purchaseRequestData = { ...state.purchaseRequestData };
            purchaseRequestData[action.payload.name] = action.payload.value;
            return {
                ...state,
                purchaseRequestData
            }

        default:
            break;
    }
    return newState;
};
export default PurhasesRequestReducer;