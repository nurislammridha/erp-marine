import * as Types from "../types/Types";

const initialState = {
  warehouseList: [],
  cargoList:[],
  pendingTopSheet:[],
  pendingDetaillsList:[],
  portList:[],
  unitList: [],
  addMessage: "",
  editMessage: "",
  deleteMessage: "",
  approveTopSheet:[],
  shipperlist:[],
  chartererlist:[],
  addStatus: false,
  editStatus: false,
  deleteStatus: false,
};

const DemandReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {

    case Types.GET_CARGO_TYPE_LIST:
      return {
        ...state,
        cargoList:action.payload.data
      };
    case Types.GET_PORT_LIST:
      return {
        ...state,
        portList:action.payload.data
      };
    case Types.GET_PENDING_TOPSHEET_LIST:
      return {
        ...state,
        pendingTopSheet:action.payload.data
      };
    case Types.GET_PENDING_DETAILLS_LIST:
      return {
        ...state,
        pendingDetaillsList:action.payload.data
      };
    case Types.GET_PORT_LIST:
      return {
        ...state,
        portList:action.payload.data
      };

    case Types.GET_WAREHOUSE_LIST:
      return {
        ...state,
        warehouseList: action.payload.data
      };

    case Types.SUBMIT_DEMAND:
      return {
        ...state,
        addStatus: action.payload.status,
        addMessage: action.payload.message
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

      case Types.GET_APPROVE_TOPSHEET_LIST:
        console.log('action.payload',action.payload);
        return {
          ...state,
          approveTopSheet:action.payload.data
        };
        case Types.UPDATE_DEMANDINFO:
          return {
            ...state,
            addStatus: action.payload.status,
            addMessage: action.payload.message
          };
          case Types.GET_SHIPPER_LIST:
            return {
              ...state,
              shipperlist:action.payload.data
            };
            case Types.GET_CHARTERER_LIST:
              return {
                ...state,
                chartererlist:action.payload.data
              };
    default:
      break;
  }
  return newState;
};
export default DemandReducer;
