import * as Types from '../types/Types'
const initialState = {

}
const SupplierCsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case Types.GET_DEPARTMENT_LIST:
            return { ...state, departmentList: DepartmentList(action.payload) }
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