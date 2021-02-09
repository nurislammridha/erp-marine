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
    }
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
            return { ...state, supplierCSInput }

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