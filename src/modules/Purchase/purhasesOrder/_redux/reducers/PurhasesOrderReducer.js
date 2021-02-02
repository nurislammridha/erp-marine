import { isFragment } from "react-is";
import * as Types from "../types/Types";
const initialstate = {
    orderInput: {
        intRefferenceId: "",
        strRefferenceName: "",
        intItemId: "",
        strItemName: "",
        strRemarks: "",
        numQTY: ""
    },
    multipleOrder: [],
    orderFilter: {
        intSBUId: "",
        strSBUName: "",
        intBusinessUnitId: "",
        strBusinessUnitName: "",
        intPurchaseOrganizationId: "",
        strPurchaseOrganizationName: "",
        intPOReferenceTypeId: "",
        strPOReferenceType: ""
    }
};
const PurchasesOrderReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {

        case Types.GET_ORDER_INPUT:
            const orderInput = { ...state.orderInput }
            orderInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                orderInput
            };
        case Types.ADD_MULTIPLE_ORDER:
            const multipleOrderInput = [...state.multipleOrder, action.payload]
            return { ...state, multipleOrder: multipleOrderInput, orderInput: initialstate.orderInput }
        case Types.GET_SBU_LIST:
            return { ...state, sbuList: SBUList(action.payload) }
        case Types.GET_BRANCH_LIST:
            return { ...state, branchList: BranchList(action.payload) }
        case Types.GET_PURCHASE_ORGANIZATION:
            return { ...state, purchaseOrganization: PurchaseOrganization(action.payload) }
        case Types.GET_REFERENCE_TYPE:
            return { ...state, referenceType: ReferenceType(action.payload) }
        case Types.PURCHASE_ORDER_FILTER:
            const orderFilter = { ...state.orderFilter };
            orderFilter[action.payload.name] = action.payload.value;
            return { ...state, orderFilter }

        default:
            break;
    }
    return newState;
};
export default PurchasesOrderReducer;

const SBUList = (data) => {
    let options = [];
    if (data) {
        data.forEach(item => {
            let itemData = {
                value: item.intSBUId,
                label: item.strSBUName
            }
            options.push(itemData)
        });
    }
    return options;
};
const BranchList = (data) => {
    let options = [];
    if (data) {
        data.forEach(item => {
            let itemData = {
                value: item.intBusinessUnitId,
                label: item.strBusinessUnitName
            }
            options.push(itemData)
        });

    }
    return options;
}
const PurchaseOrganization = (data) => {
    let options = [];
    if (data) {
        data.forEach(item => {
            let itemData = {
                label: item.strPurchaseOrganizationName,
                value: item.intPurchaseOrganizationId
            }
            options.push(itemData)
        });
    }
    return options;
}
const ReferenceType = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intPOReferenceTypeId,
                label: item.strPOReferenceType
            }
            options.push(itemData)
        })
    }
    return options;
}