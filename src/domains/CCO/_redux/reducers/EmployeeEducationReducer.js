import * as Types from "../../types/Types";

const initialState = {
    isLoading: false,
    employeeEducationList: [],
    addMessage: "",
    editMessage: "",
    deleteMessage: "",

    addStatus: false,
    editStatus: false,
    deleteStatus: false,
};

const EmployeeEducationReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_EMPLOYEE_EDUCATION:
            return {
                ...state,
                employeeEducationList: action.payload,
            };

        case Types.GET_EMPLOYEE_EDUCATION_DETAILS:
            return {
                ...state,
                employeeEducationDetails: action.payload,
            };

        case Types.POST_EMPLOYEE_EDUCATION:
            return {
                ...state,
                addStatus: action.payload.status,
                addMessage: action.payload.message,
                isLoading: false
            };

        case Types.EDIT_EMPLOYEE_EDUCATION:
            return {
                ...state,
                editStatus: action.payload.status,
                editMessage: action.payload.message,
            };


        case Types.EMPTY_EMPLOYEE_EDUCATION_ADD_MESSAGE:
            return {
                ...state,
                addMessage: "",
            };
        case Types.EMPTY_EMPLOYEE_EDUCATION_EDIT_MESSAGE:
            return {
                ...state,
                editMessage: "",
                editStatus: false,
            };
        case Types.LOADING_EDUCATION:
            return {
                ...state,
                isLoading: action.payload
            };

        default:
            break;
    }
    return newState;
};
export default EmployeeEducationReducer;
