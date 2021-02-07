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
    POApprovalMultiple: []
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

        case Types.CHANGE_PO_APPROVAL_DETAIL_INPUT:
            const purchaseDetails = state.POApprovalMultiple;
            for (let i = 0; i < purchaseDetails.length; i++) {
                if (purchaseDetails[i].intRowId == action.payload.item.intRowId) {
                    purchaseDetails[i][action.payload.name] = action.payload.value
                }
            }
            console.log('purchaseDetails', purchaseDetails)
            return {
                ...state,
                POApprovalMultiple: purchaseDetails,

            };


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
