import * as Types from "../../types/Types";

const initialState = {
  employeeList: [],
  employeeInfoList: [],
  addMessage: "",
  editMessage: "",
  deleteMessage: "",

  addStatus: false,
  editStatus: false,
  deleteStatus: false,
  tabIndex: 0,
  isLoading:false,
};

const EmployeeReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_EMPLOYEE_PERSONAL:
      console.log(' action.payload.data', action.payload);
      return {
        ...state,
        employeeInfoList: action.payload.data === null ? [] : action.payload.data,
        isLoading:action.payload.isLoading
      };

    case Types.GET_EMPLOYEE_TAB:
      return {
        ...state,
        tabIndex: action.payload,
      };
    case Types.GET_EMPLOYEE_RANK:
      return {
        ...state,
        employeeRank: action.payload,
      };

    case Types.GET_EMPLOYEE_PERSONAL_DETAILS:
      return {
        ...state,
        employeeInfoDetails: action.payload.data,
      };
    case Types.GET_EMPLOYEE_SEARCH:
      return {
        ...state,
        employeeInfoList: action.payload.data,
        isLoading:action.payload.isLoading
      };

    case Types.POST_EMPLOYEE_PERSONAL:
      return {
        ...state,
        addStatus: action.payload.status,
        addMessage: action.payload.message,
        intEmployeeId: action.payload.intEmployeeId,
      };

    case Types.EDIT_EMPLOYEE_PERSONAL:
      return {
        ...state,
        editStatus: action.payload.status,
        editMessage: action.payload.message,
      };

    case Types.DELETE_EMPLOYEE_PERSONAL:
      let DeleteemployeeList = state.employeeInfoList.filter(function(el) {
        return el.intID !== action.payload.data.intID;
      });
      return {
        ...state,
        employeeInfoList: DeleteemployeeList,
        deleteStatus: action.payload.status,
        deleteMessage: action.payload.message,
      };

    case Types.EMPTY_EMPLOYEE_ADD_MESSAGE:
      return {
        ...state,
        addMessage: "",
      };

    case Types.EMPTY_EMPLOYEE_DELETE_MESSAGE:
      return {
        ...state,
        deleteMessage: "",
      };

    default:
      break;
  }
  return newState;
};
export default EmployeeReducer;
