import * as Types from "../../types/Types";

const initialState = {
  warehouseList: [],
  unitList: [],
  addMessage: "",
  editMessage: "",
  deleteMessage: "",

  addStatus: false,
  editStatus: false,
  deleteStatus: false,
};

const PurchaseRequisitionReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {

    case Types.UPLOAD_PURCHASE_REQUISITION:
      return {
        ...state,
        addStatus: action.payload.status,
        addMessage: action.payload.message,
        intIndeID: action.payload.data,
      };

    case Types.GET_WAREHOUSE_LIST:
      return {
        ...state,
        warehouseList: action.payload.data
      };

    case Types.GET_UNIT_LIST:
      return {
        ...state,
        unitList: action.payload.data
      };

    case Types.GET_DEPARTMENT_LIST:
      return {
        ...state,
        departmentList: action.payload.data
      };

    default:
      break;
  }
  return newState;
};
export default PurchaseRequisitionReducer;
