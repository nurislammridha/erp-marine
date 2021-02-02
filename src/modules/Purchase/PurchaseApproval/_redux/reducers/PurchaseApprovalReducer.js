import React from 'react';
import * as Types from "../types/Types";

const initialState = {
    PurchaseApprovalFilterInput: {
        strSBUName: "",
        intSBUId: "",
        strBusinessUnitName: "",
        intBusinessUnitId: "",
        strShipName: "",
        intShipID: "",
        dteFromDate: "",
        dteToDate: ""
    },

    listPaginatedData: null,
    purchaseApprovalList: [],
    status: false,
    isLoading: false,
    editStatus: false
}

const PurchaseApprovalReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_PURCHASE_APPROVAL_FILTER_INPUT:
            const PurchaseApprovalFilterInput = { ...state.PurchaseApprovalFilterInput };
            PurchaseApprovalFilterInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                PurchaseApprovalFilterInput,

            };

        case Types.GET_SBU_NAME:
            return {
                ...state,
                SBUNameData: getSBUName(action.payload),
            };

        case Types.GET_SHIP_NAME:
            return {
                ...state,
                shipNameData: getShipName(action.payload),
            };

        case Types.GET_PURCHASE_APPROVAL_LIST:
            return {
                ...state,
                purchaseApprovalList: action.payload.purchaseApprovalList,
                isLoading: action.payload.isLoading
            };

        default:
            break;
    }
    return newState
}

export default PurchaseApprovalReducer;



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

const getShipName = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intShipID,
                label: item.strShipName,
            };
            options.push(itemData);
        });
    }
    return options;
};