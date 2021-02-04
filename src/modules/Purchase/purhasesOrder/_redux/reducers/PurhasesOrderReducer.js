import * as Types from "../types/Types";
const initialstate = {
    orderInput: {
        intPOId: "",
        intReferenceId: "",
        intItemId: "",
        intUoMId: "",
        strReferenceCode: "",
        strItemName: "",
        strUoMName: "",
        numReferenceQty: "",
        numOrderQty: "",
        numRate: "",
        numAmount: "",
        numTotalAmount: "",
        numTaxAmount: "",
        strPurchaseDescription: "",
        strCostCenterName: "",
        strCostElementName: "",
        intCostCenterId: "",
        intCostElementId: "",
        intInventoryReceiveNo: "",
        intActionBy: 1
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
    },
    finalOrderInput: {
        strPONo: "",
        intAccountId: "",
        intBusinessLineId: "",
        strBusinessLineName: "",
        intBusinessUnitId: "",
        strBusinessUnitName: "",
        intPurchaseOrganizationId: "",
        strPurchaseOrganizationName: "",
        intShipId: "",
        intWarehouseId: "",
        strWarehouseName: "",
        intPurchaseTypeId: "",
        inSupplierId: "",
        strSupplierName: "",
        intPOTypeId: "",
        intIncotermsId: "",
        intCurrencyId: "",
        strCurrencyCode: "",
        strSupplierReference: "",
        intReferenceTypeId: "",
        strReferenceTypeName: "",
        isApproved: "",
        intApproveBy: "",
        intPaymentTerms: "",
        intPercent: "",
        strOtherTerms: "",
        intPaymentDaysAfterDelivery: "",
        strDeliveryAddress: "",
        monFreight: "",
        monOthers: "",
        monDiscount: "",
        intTaxType: "",
        isClosed: "",
        intActionBy: 1,
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
            return { ...state, multipleOrder: multipleOrderInput, orderInput: initialstate.orderInput, editOptionReference: "", editOptionItem: "" }
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
        case Types.DELETE_MULTIPLE:
            const multipleOrderOld = [...state.multipleOrder]
            multipleOrderOld.splice(action.payload, 1);
            return { ...state, multipleOrder: multipleOrderOld }
        case Types.EDIT_MULTIPLE:
            const editData = { ...state.multipleOrder[action.payload] }
            const editOptionItem = optionItem(editData);
            const editOptionReference = optionReference(editData);
            return { ...state, orderInput: editData, editOptionReference: editOptionReference, editOptionItem: editOptionItem }
        case Types.GET_PURCHASE_ORDER:
            return { ...state, purchaseOrderList: action.payload }
        case Types.FINAL_ORDER_INPUT:
            const finalOrderInput = { ...state.finalOrderInput };
            finalOrderInput[action.payload.name] = action.payload.value;
            return { ...state, finalOrderInput }
        case Types.CREATE_FIANL_INPUT:
            const data = action.payload;
            const finalOrderList = { ...state.finalOrderInput, orderRow: data }
            return { ...state, finalOrderInput: finalOrderList }
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
const optionReference = (data) => {
    const dataOption = {
        value: data.intRefferenceId,
        label: data.strRefferenceName
    }
    return dataOption;
}
const optionItem = (data) => {
    const dataOption = {
        value: data.intItemId,
        label: data.strItemName
    }
    return dataOption;
}