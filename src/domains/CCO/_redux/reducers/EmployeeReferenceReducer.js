import * as Types from "../../types/Types";

const initialState = {
    employeeDocumentList: [],
    addMessage: "",
    editMessage: "",
    deleteMessage: "",

    addStatus: false,
    editStatus: false,
    deleteStatus: false,
    isLoading: false,
};

const EmployeeReferenceReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_EMPLOYEE_REFERENCE:
            return {
                ...state,
                employeeEducationList: action.payload,
            };

        case Types.POST_EMPLOYEE_REFERENCE:
            return {
                ...state,
                addStatus: action.payload.status,
                addMessage: action.payload.message,
                isLoading: false,
            };

        case Types.EDIT_EMPLOYEE_REFERENCE:
            return {
                ...state,
                editStatus: action.payload.status,
                editMessage: action.payload.message,
            };

        case Types.EMPTY_EMPLOYEE_REFERENCE_ADD_MESSAGE:
            return {
                ...state,
                addMessage: "",
            };

        case Types.EMPLOYEE_REFERENCE_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        default:
            break;
    }
    return newState;
};
export default EmployeeReferenceReducer;
