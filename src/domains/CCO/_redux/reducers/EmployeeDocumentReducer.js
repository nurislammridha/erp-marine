import * as Types from "../../types/Types";

const initialState = {
    employeeDocumentList: [],
    employeeCDCList:[],
    addMessage: "",
    editMessage: "",
    deleteMessage: "",

    addStatus: false,
    editStatus: false,
    deleteStatus: false,
};

const EmployeeDocumentReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_EMPLOYEE_DOCUMENT:
            return {
                ...state,
                employeeEducationList: action.payload,
            };
        case Types.GET_EMPLOYEE_DOCUMENT_CDC:

        return {
            ...state,
            employeeCDCList:action.payload.data
        };

        case Types.POST_EMPLOYEE_DOCUMENT:
            return {
                ...state,
                addStatus: action.payload.status,
                addMessage: action.payload.message,
            };

        case Types.EDIT_EMPLOYEE_DOCUMENT:
            return {
                ...state,
                editStatus: action.payload.status,
                editMessage: action.payload.message,
            };


        case Types.EMPTY_EMPLOYEE_DOCUMENT_ADD_MESSAGE:
            return {
                ...state,
                addMessage: "",
            };
        case Types.EMPTY_EMPLOYEE_DOCUMENT_EDIT_MESSAGE:
            return {
                ...state,
                editMessage: "",
                // editStatus: "",
            };

        default:
            break;
    }
    return newState;
};
export default EmployeeDocumentReducer;
