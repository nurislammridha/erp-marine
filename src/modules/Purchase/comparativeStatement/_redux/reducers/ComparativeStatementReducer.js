import * as Types from "../types/Types";
import moment from "moment";
const initialState = {
  comparativeList: [],
  comparativePaginationList: [],
  isLoading: false,
  comparativeSubmitList: [],
  RQFOptionList: [],
  rfqNo: ""


};

const ComparativeStatementReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_COMPARATIVE_STATEMENT_LIST:
      if (action.payload.status) {
        return {
          ...state,
          comparativeList: action.payload.comparativeList,
          comparativePaginationList: action.payload.comparativePaginationList,
          isLoading: false,
        };
      } else {
        return {
          ...state,
          isLoading: true,
        };
      }
    case Types.COMPARATIVE_STATEMENT_INPUT_CHANGE:
      console.log('action.payload :>> ', action.payload);
      // let comparativeSubmitList = state.comparativeSubmitList.slice();
      // for (let i = 0; i < comparativeSubmitList.length; i++) {
      //   if (i === action.payload.index) {
      //     comparativeSubmitList[i][action.payload.name] = action.payload.value;
      //     POApproval[i].intPurchaseOrdertId = action.payload.item.intPOId;
      //     POApproval[i].intItemId = action.payload.item.intItemId;
      //     POApproval[i].strItemName = action.payload.item.strItemName;
      //     POApproval[i].isApproved = null;
      //     POApproval[i].numRequestQty = action.payload.item.numOrderQty;
      //     POApproval[i].numApprovedQtybyShip = null;
      //     POApproval[i].intApprovedByshipId = null;
      //     POApproval[i].strApprovedByShip = null;
      //     POApproval[i].numApprovedQtybyOffice = null;
      //     POApproval[i].intApprovedByOfficeId = null;
      //     POApproval[i].strApprovedByOffice = null;
      //     POApproval[i].numApprovedQtybyFinance = null;
      //     POApproval[i].intApprovedByFinanceId = null;
      //     POApproval[i].strApprovedByFinance = null;
      //     POApproval[i].intActionBy = action.payload.item.intActionBy;
      //     POApproval[i].isActive = action.payload.item.isActive;
      //   }
      // }
      // const newMultipleData = {
      //   intStatus: null,
      //   strStatus: '',
      //   poApprovalStatus: POApproval,
      // }
      return {
        ...state,
        // POApprovalMultiple: POApproval,
        // POApprovalData: newMultipleData,
      };
    case Types.GET_RQF_OPTION_LIST:
      return {
        ...state,
        RQFOptionList: action.payload.length > 0 ? action.payload.data : [],
        isLoading: action.payload.isLoading,
        rfqNo: null,
      };
    case Types.COMPARATIVE_STATEMENT_SELECT_ITEM:
      return {
        ...state,
        rfqNo:action.payload.strQuotationNo,
        RQFOptionList:[]
      };
    default:
      break;
  }
  return newState;
};
export default ComparativeStatementReducer;
