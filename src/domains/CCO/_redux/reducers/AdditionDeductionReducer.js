import * as Types from "../../types/Types";

const initialState = {
  additionDeductionTypeList: [],
  additionDeductionByEmployeeList: [],
  vesselAccountDetails:[],
  vesselItemList:[],
  addMessage: "",
  editMessage: "",
  deleteMessage: "",

  addStatus: false,
  editStatus: false,
  deleteStatus: false,
};

const AdditionDeductionReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_ADDITION_DEDUCTION:
      return {
        ...state,
        additionDeductionList: action.payload.data,
      };
    case Types.GET_ADDITION_DEDUCTION_BY_EMPLOYEE:
      return {
        ...state,
        additionDeductionByEmployeeList: action.payload.data,
      };
    case Types.GET_VESSEL_ACCOUNT_DETAILS:
      return{
        ...state,
        vesselAccountDetails:action.payload.data,
      }
      case Types.GET_VESSEL_ITEM:
        return{
          ...state,
          vesselItemList:action.payload.data,
        }

    case Types.GET_ADDITION_DEDUCTION_TYPE:
      return {
        ...state,
        additionDeductionTypeList: action.payload.data,
      };

    case Types.DELETE_ADDITION_DEDUCTION:
      let deletedList = state.additionDeductionByEmployeeList.filter(function(
        el
      ) {
        return el.intID !== action.payload.data;
      });
      return {
        ...state,
        additionDeductionByEmployeeList: deletedList,
        deleteStatus: action.payload.status,
        deleteMessage: action.payload.message,
      };

    case Types.POST_ADDITION_DEDUCTION:
      return {
        ...state,
        addStatus: action.payload.status,
        addMessage: action.payload.message,
        isLoading: action.payload.isLoading,
      };

    case Types.UPLOAD_ADDITION_DEDUCTION:
      return {
        ...state,
        addStatus: action.payload.status,
        addMessage: action.payload.message,
        isLoading: action.payload.isLoading,
      };

    case Types.UPPDATE_ADDITION_DEDUCTION:
      let updatedList = state.additionDeductionByEmployeeList;

      updatedList.map((item, index) => {
        if (item.intID == action.payload.data.intID) {
          item.amount = action.payload.data.amount;
        }
        updatedList[index] = item;
      });

      return {
        ...state,
        additionDeductionByEmployeeList: updatedList,
        editStatus: action.payload.status,
        editMessage: action.payload.message,
      };

    case Types.EMPTY_ADDITION_DEDUCTION_ADD_MESSAGE:
      return {
        ...state,
        addMessage: "",
      };

    case Types.EMPTY_ADDITION_DEDUCTION_UPDATE_MESSAGE:
      return {
        ...state,
        editMessage: "",
      };

    case Types.EMPTY_ADDITION_DEDUCTION_DELETE_MESSAGE:
      return {
        ...state,
        deleteMessage: "",
      };

    default:
      break;
  }
  return newState;
};
export default AdditionDeductionReducer;
