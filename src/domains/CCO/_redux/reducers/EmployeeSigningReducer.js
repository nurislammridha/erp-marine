import * as Types from "../../types/Types";

const initialState = {
  employeeSigningInfoList: [],
  addMessage: "",
  editMessage: "",
  deleteMessage: "",

  addStatus: false,
  editStatus: false,
  deleteStatus: false,
};

const EmployeeSigningReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_EMPLOYEE_SIGNING:
      return {
        ...state,
        employeeSigningInfoList: action.payload.data,
      };
    case Types.SEARCH_EMPLOYEE_SIGNING:
      return {
        ...state,
        employeeSigningInfoList: action.payload.data,
      };

    case Types.POST_EMPLOYEE_SIGNING:
      return {
        ...state,
        addStatus: action.payload.status,
        addMessage: action.payload.message,
      };

    case Types.EDIT_EMPLOYEE_SIGNING:
      return {
        ...state,
        editStatus: action.payload.status,
        editMessage: action.payload.message,
      };

    case Types.DELETE_EMPLOYEE_SIGNING:
      let deletedSignInList = state.employeeSigningInfoList.filter(function (
        el
      ) {
        return el.intID !== action.payload.data;
      });
      return {
        ...state,
        employeeSigningInfoList: deletedSignInList,
        deleteStatus: action.payload.status,
        deleteMessage: action.payload.message,
      };

    case Types.EMPTY_EMPLOYEE_SIGNING_ADD_MESSAGE:
      return {
        ...state,
        addMessage: "",
      };
    case Types.EMPTY_EMPLOYEE_SIGNING_EDIT_MESSAGE:
      return {
        ...state,
        editMessage: "",
      };

    case Types.EMPTY_EMPLOYEE_SIGNING_DELETE_MESSAGE:
      return {
        ...state,
        deleteMessage: "",
      };

    default:
      break;
  }
  return newState;
};
export default EmployeeSigningReducer;
