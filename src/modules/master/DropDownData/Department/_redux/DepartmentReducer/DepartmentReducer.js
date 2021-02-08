import * as Types from "../Type/Types";
const initialstate = {
};
const DepartmentReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_DEPARTMENT_DATA:
            return {
                ...state,
                departmentList: getDaprtmentData(action.payload),
            };
        default:
            break;
    }
    return state;
};

// voyage type list
const getDaprtmentData = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intRequisitionDptID,
                label: item.strRequisitionDptName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default DepartmentReducer;