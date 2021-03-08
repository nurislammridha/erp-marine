import * as Types from "../../types/Types";

const initialState = {
  employeePromotionList: [],
  rankList: [],
  addMessage: "",
  editMessage: "",
  deleteMessage: "",

  addStatus: false,
  editStatus: false,
  deleteStatus: false,
};

const EmployeePromotionReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_EMPLOYEE_PROMOTION:
      return {
        ...state,
        employeePromotionList: action.payload,
      };
    case Types.GET_EMPLOYEE_RANK:
      return {
        ...state,
        rankList: action.payload.data,
      };

    case Types.POST_EMPLOYEE_PROMOTION:
      return {
        ...state,
        addStatus: action.payload.status,
        addMessage: action.payload.message,
      };

    case Types.EDIT_EMPLOYEE_PROMOTION:
      return {
        ...state,
        editStatus: action.payload.status,
        editMessage: action.payload.message,
      };

    case Types.DELETE_EMPLOYEE_PROMOTION:
      let deletedSignInList = state.employeePromotionList.filter(function(el) {
        return el.intID !== action.payload.data;
      });
      return {
        ...state,
        employeePromotionList: deletedSignInList,
        deleteStatus: action.payload.status,
        deleteMessage: action.payload.message,
      };

    case Types.EMPTY_EMPLOYEE_PROMOTION_ADD_MESSAGE:
      return {
        ...state,
        addMessage: "",
      };
    case Types.EMPTY_EMPLOYEE_PROMOTION_EDIT_MESSAGE:
      return {
        ...state,
        editMessage: "",
      };

    case Types.EMPTY_EMPLOYEE_PROMOTION_DELETE_MESSAGE:
      return {
        ...state,
        deleteMessage: "",
      };

    default:
      break;
  }
  return newState;
};
export default EmployeePromotionReducer;
