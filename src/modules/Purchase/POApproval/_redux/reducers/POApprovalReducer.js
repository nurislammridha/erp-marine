import React from 'react';
import * as Types from "../types/Types";

const initialState = {
    POApprovalFilterInput: {
        strSBUName: "",
        intSBUId: "",
        strBusinessUnitName: "",
        intBusinessUnitId: "",
        strShipName: "",
        intShipID: "",
        dteFromDate: "",
        dteToDate: ""
    }
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

        case Types.GET_SHIP_NAME:
            return {
                ...state,
                shipNameData: getShipName(action.payload),
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
