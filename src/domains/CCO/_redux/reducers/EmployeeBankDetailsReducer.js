import * as Types from "../../types/Types";

const initialState = {
    employeeDocumentList: [],
    addMessage: "",
    editMessage: "",
    deleteMessage: "",

    addStatus: false,
    editStatus: false,
    deleteStatus: false,
    isLoading: false
};

const EmployeeBankDetailsReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_EMPLOYEE_BANK_DETAILS:
            return {
                ...state,
                employeeEducationList: action.payload,
            };

        case Types.POST_EMPLOYEE_BANK_DETAILS:
            return {
                ...state,
                addStatus: action.payload.status,
                addMessage: action.payload.message,
                isLoading: false
            };

        case Types.EDIT_EMPLOYEE_BANK_DETAILS:
            return {
                ...state,
                editStatus: action.payload.status,
                editMessage: action.payload.message,
                isLoading: false
            };
        case Types.EMPTY_EMPLOYEE_BANK_DETAILS_ADD_MESSAGE:
            return {
                ...state,
                addMessage: "",
            };
        case Types.EMPTY_EMPLOYEE_BANK_DETAILS_EDIT_MESSAGE:
            return {
                ...state,
                editMessage: "",
            };

        case Types.LOADING_EMPLOYEE_BANK_DETAILS:
            return {
                ...state,
                isLoading: action.payload
            };

        default:
            break;
    }
    return newState;
};
export default EmployeeBankDetailsReducer;
