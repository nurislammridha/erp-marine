import * as Types from "../types/Types";
import moment from "moment";
const initialState = {
  comparativeList: [],
  isLoading: false,
  comparativeSubmitList: [],
  RQFOptionList: [],
  rfqNo: "",
  csOptionList: [],
  csInputData: {
    intWinSupplierId: "",
    strWinCause: "",
    supplier: null,
  }

};

const ComparativeStatementReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_COMPARATIVE_STATEMENT_LIST:
      return {
        ...state,
        comparativeList: action.payload.comparativeList,
        isLoading: false,
      };

    case Types.COMPARATIVE_STATEMENT_INPUT_CHANGE:
      const csInputData = { ...state.csInputData };
      csInputData[action.payload.name] = action.payload.value;
      return {
        ...state,
        csInputData
      };

    case Types.GET_RQF_OPTION_LIST:
      return {
        ...state,
        RQFOptionList: action.payload.length > 0 ? action.payload.data : [],
        isLoading: action.payload.isLoading,
        rfqNo: null,
        comparativeList: [],
        csOptionList: [],
      };
    case Types.COMPARATIVE_STATEMENT_SELECT_ITEM:
      return {
        ...state,
        rfqNo: action.payload.strQuotationNo,
        RQFOptionList: [],
      };
    case Types.CS_OPTION_LIST:
      return {
        ...state,
        csOptionList: getCSOptionList(action.payload),
      };
    case Types.UPDATED_CS:
      return {
        ...state,
        csInputData: initialState.csInputData,
        isLoading: action.payload.isLoading,
      };
    default:
      break;
  }
  return newState;
};
// cs option list
const getCSOptionList = (data) => {
  let options = [];
  if (data) {
    data.forEach((item) => {
      let itemData = {
        value: item.intSupplierId,
        label: item.strSupplierName,
      };
      options.push(itemData);
    });
  }
  return options;
};
export default ComparativeStatementReducer;
