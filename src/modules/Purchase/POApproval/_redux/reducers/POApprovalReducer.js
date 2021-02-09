import React from 'react';
import * as Types from "../types/Types";

const initialState = {
    POApprovalFilterInput: {
        strSBUName: "",
        intBusinessLineId: "",
        strBusinessUnitName: "",
        intBusinessUnitId: "",
        strPurchaseOrganizationName: "",
        intPurchaseOrganizationId: "",
        strPOReferenceType: "",
        intPOReferenceTypeId: "",
    },
    listPaginatedData: null,
    POApprovalList: [],
    status: false,
    isLoading: false,
    editStatus: false,
    POApprovalMultiple: [],
    POApprovalData: null,
}

const POApprovalReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_PO_APPROVAL_FILTER_INPUT:
            const POApprovalFilterInput = { ...state.POApprovalFilterInput };
            POApprovalFilterInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                POApprovalFilterInput,

            };

        // return {
        //     ...state,
        //     POApprovalMultiple: POApproval,
        // };
        case Types.GET_SBU_NAME:
            return {
                ...state,
                SBUNameData: getSBUName(action.payload),
            };

        case Types.GET_BRANCH_NAME:
            return {
                ...state,
                branchNameData: getBranchName(action.payload),
            };

        case Types.GET_PURCHASE_ORGANISATION_NAME:
            return {
                ...state,
                purchaseOrganisationNameData: getPurchaseOrganisationName(action.payload),
            };

        case Types.GET_REFERENCE_TYPE:
            return {
                ...state,
                referenceTypeData: getRferenceType(action.payload),
            };

        case Types.GET_PO_APPROVAL_LIST:
            return {
                ...state,
                POApprovalList: action.payload.POApprovalList,
                isLoading: action.payload.isLoading
            };

        case Types.GET_PO_APPROVAL_DETAIL:
            return {
                ...state,
                POApprovalDetail: action.payload.data,
                POApprovalMultiple: action.payload.data.purchase_row,
            };

        case Types.SUBMIT_PO_APPROVE:
            return {
                ...state,
                status: action.payload.status,
                isLoading: action.payload.isLoading,
            };
        //**********Purchase Order Approval *********** */
        case Types.PO_APPROVAL_DETAILS_INPUT:
            console.log('action.payload :>> ', action.payload);
            let POApproval = state.POApprovalMultiple.slice();
            for (let i = 0; i < POApproval.length; i++) {
                if (i === action.payload.index) {
                    POApproval[i][action.payload.name] = action.payload.value;
                    POApproval[i].intPurchaseOrdertId = action.payload.item.intPOId;
                    POApproval[i].intItemId = action.payload.item.intItemId;
                    POApproval[i].strItemName = action.payload.item.strItemName;
                    POApproval[i].isApproved = null;
                    POApproval[i].numRequestQty = action.payload.item.numOrderQty;
                    POApproval[i].numApprovedQtybyShip = null;
                    POApproval[i].intApprovedByshipId = null;
                    POApproval[i].strApprovedByShip = null;
                    POApproval[i].numApprovedQtybyOffice = null;
                    POApproval[i].intApprovedByOfficeId = null;
                    POApproval[i].strApprovedByOffice = null;
                    POApproval[i].numApprovedQtybyFinance = null;
                    POApproval[i].intApprovedByFinanceId = null;
                    POApproval[i].strApprovedByFinance = null;
                    POApproval[i].intActionBy = action.payload.item.intActionBy;
                    POApproval[i].isActive = action.payload.item.isActive;
                }
            }
            const newMultipleData = {
                intStatus: null,
                strStatus: '',
                poApprovalStatus: POApproval,
            }
            return {
                ...state,
                POApprovalMultiple: POApproval,
                POApprovalData: newMultipleData,
            };
        case Types.UPDATE_PO_APPROVAL:
            if (action.payload.status) {
                return {
                    ...state,
                    POApprovalFilterInput: initialState.POApprovalFilterInput,
                    POApprovalData: initialState.POApprovalData,
                    isLoading: action.payload.isLoading,
                };
            } else {
                return {
                    ...state,
                    isLoading: action.payload.isLoading,
                };
            }

        default:
            break;
    }
    return newState
}

export default POApprovalReducer;


const getSBUName = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intSBUId,
                label: item.strSBUName,
            };
            options.push(itemData);
        });
    }
    return options;
};

const getBranchName = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intBusinessUnitId,
                label: item.strBusinessUnitName,
            };
            options.push(itemData);
        });
    }
    return options;
};

const getPurchaseOrganisationName = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                label: item.strPurchaseOrganizationName,
                value: item.intPurchaseOrganizationId
            };
            options.push(itemData);
        });
    }
    return options;
};

const getRferenceType = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intPOReferenceTypeId,
                label: item.strPOReferenceType,
            };
            options.push(itemData);
        });
    }
    return options;
};
