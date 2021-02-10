import * as Types from '../types/Types'
import moment from "moment"
const initialState = {
    supplierCSInput: {
        intDepartmentId: "",
        strDepartmentName: "",
        intSBUId: "",
        strSBUName: "",
        intBranchId: "",
        strBranchName: "",
        dteFromDate: "",
        dteToDate: "",
        flag1: "",
        flag2: ""
    },
    // moment().format("YYYY-MM-DD") 
}
const SupplierCsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case Types.GET_DEPARTMENT_LIST:
            return { ...state, departmentList: DepartmentList(action.payload) }
        case Types.SUPPLIER_CS_INPUT:
            const supplierCSInput = { ...state.supplierCSInput };
            supplierCSInput[action.payload.name] = action.payload.value;
            return { ...state, supplierCSInput, search: "", supplierList: "" }
        case Types.SEARCH_SUPPLIER:
            return { ...state, search: action.payload, supplierCSInput: initialState.supplierCSInput }
        case Types.SUPPLIER_LIST:
            return { ...state, supplierList: action.payload }
        case Types.GET_SUPPLIER_DETAILS:
            return { ...state, supplierDetailsList: action.payload }
        case Types.GET_SUPPLIER_ADDRESS:
            return { ...state, supplierAddress: action.payload }
        case Types.SEARCH_RFQ:
            return { ...state, valSearchRFQ: action.payload }
        case Types.QUOTATION_RFQ_LIST:
            return { ...state, quotationRFQlist: action.payload }

        default:
            break;
    }
    return newState;
}

export default SupplierCsReducer;

const DepartmentList = (data) => {
    let options = [];
    if (data) {
        data.forEach(item => {
            const departmentOptions = {
                value: item.intRequisitionDptID,
                label: item.strRequisitionDptName
            }
            options.push(departmentOptions);
        });
        return options;
    }

}