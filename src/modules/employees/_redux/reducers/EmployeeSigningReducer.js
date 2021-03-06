import * as Types from "../../types/Types";

const initialState = {
  employeeSigningInfoList: [],
  signingPaginatedData:null,
  addMessage: "",
  editMessage: "",
  deleteMessage: "",

  addStatus: false,
  editStatus: false,
  deleteStatus: false,
  isLoading:false
};

const EmployeeSigningReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_EMPLOYEE_SIGNING:
      console.log('action.payload',action.payload);
      return {
        ...state,
        employeeSigningInfoList: action.payload.employeeSigningInfoList,
        signingPaginatedData: action.payload.signingPaginatedData,
        isLoading: action.payload.isLoading,
      };
    case Types.SEARCH_EMPLOYEE_SIGNING:
      return {
        ...state,
        employeeSigningInfoList: action.payload.data,
        isLoading:action.payload.isLoading
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
