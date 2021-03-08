import * as Types from "../../types/Types";

const initialState = {
    employeeEducationList: [],
    addMessage: "",
    editMessage: "",
    deleteMessage: "",

    addStatus: false,
    editStatus: false,
    deleteStatus: false,
};

const EmployeeRecordReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_EMPLOYEE_RECORD:
            return {
                ...state,
                employeeEducationList: action.payload,
            };

        case Types.POST_EMPLOYEE_RECORD:
            return {
                ...state,
                addStatus: action.payload.status,
                addMessage: action.payload.message,
            };

        case Types.EDIT_EMPLOYEE_RECORD:
            return {
                ...state,
                editStatus: action.payload.status,
                editMessage: action.payload.message,
            };


        case Types.EMPTY_EMPLOYEE_RECORD_ADD_MESSAGE:
            return {
                ...state,
                addMessage: "",
            };
        case Types.EMPTY_EMPLOYEE_RECORD_EDIT_MESSAGE:
            return {
                ...state,
                editMessage: "",
                editStatus: false,
            };

        default:
            break;
    }
    return newState;
};
export default EmployeeRecordReducer;
