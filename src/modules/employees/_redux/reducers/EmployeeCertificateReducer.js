import * as Types from "../../types/Types";

const initialState = {
    employeeDocumentList: [],
    courseList:[],
    addMessage: "",
    editMessage: "",
    deleteMessage: "",

    addStatus: false,
    editStatus: false,
    deleteStatus: false,
};

const EmployeeCertificateReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_EMPLOYEE_CERTIFICATE:
            return {
                ...state,
                employeeEducationList: action.payload,
            };
        case Types.GET_EMPLOYEE_CERTIFICATE_LIST:
            return {
                ...state,
                courseList:action.payload
            };

        case Types.POST_EMPLOYEE_CERTIFICATE:
            return {
                ...state,
                addStatus: action.payload.status,
                addMessage: action.payload.message,
            };

        case Types.EDIT_EMPLOYEE_CERTIFICATE:
            return {
                ...state,
                editStatus: action.payload.status,
                editMessage: action.payload.message,
            };


        case Types.EMPTY_EMPLOYEE_CERTIFICATE_ADD_MESSAGE:
            return {
                ...state,
                addMessage: "",
            };
        case Types.EMPTY_EMPLOYEE_CERTIFICATE_EDIT_MESSAGE:
            return {
                ...state,
                editMessage: "",
            };

        default:
            break;
    }
    return newState;
};
export default EmployeeCertificateReducer;
