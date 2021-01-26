import * as Types from "../types/Types";
import moment from "moment";

const initialState = {
  voyageList: [],
  cargoList: [],
  portList: [],
  portsOptions: [],
  cargoOptionList: [],
  voyageIDList: [],
  voyageListDetail: null,
  isLoading: false,
  voyageInput: {
    strVesselName: "",
    intVesselID: null,
    intVoyageNo: null,
    intCargoTypeID: null,
    strCargoTypeName: "",
    intCargoQty: 0,
    dteVoyageDate: moment().format("YYYY-MM-DD"),
    strPlaceOfVoyageCommencement: "",
    decBunkerQty: 0,
    decDistance: 0,
    intFromPortID: null,
    strFromPortName: "",
    intToPortID: null,
    intVlsfoRob: 0,
    intLsmgRob: 0,
    intLubOilRob: 0,
    intMeccRob: 0,
    intAeccRob: 0,
    strToPortName: "",
  },
  lastVoyageData: null
};

const VoyageReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_VOYAGE:
      return {
        ...state,
        voyageList: action.payload.data,
        voyageIDList: getVoyageIDList(action.payload.data),
      };

    case Types.GET_CARGO:
      return {
        ...state,
        cargoList: action.payload.data,
        cargoOptionList: getSelectCargoList(action.payload),
      };

    case Types.GET_PORT_LIST:
      return {
        ...state,
        portList: action.payload,
        portsOptions: getSelectPortList(action.payload),
      };

    case Types.GET_VOYAGE_LIST_DETAIL:
      return {
        ...state,
        voyageListDetail: action.payload,
      };

    case Types.CHANGE_VOYAGE_INPUT:
      const voyageInput = { ...state.voyageInput };
      voyageInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        voyageInput,
      };
      break;

    case Types.VOYAGE_SUBMIT:
      if (action.payload.status) {
        return {
          ...state,
          voyageInput: initialState.voyageInput,
          isLoading: false,
        };
      } else {
        return {
          ...state,
          isLoading: false,
        };
      }

      break;

    case Types.VOYAGE_SUBMITTING:
      return {
        ...state,
        isLoading: action.payload,
      };
      break;

    case Types.GET_LAST_VOYAGE:
      return {
        ...state,
        lastVoyageData: action.payload.data
      };
      break;

    default:
      break;
  }
  return newState;
};

const getSelectCargoList = (data) => {
  let selectData = [];
  if (data.length > 0) {
    data.forEach((item) => {
      const itemData = {
        label: item.strCargoTypeName,
        value: item.intID,
      };
      selectData.push(itemData);
    });
  }
  return selectData;
};

const getSelectPortList = (data) => {
  let selectData = [];
  if (data.length > 0) {
    data.forEach((item) => {
      const itemData = {
        label: `${item.strPortName} - ${item.strCountryName}`,
        value: item.intPortId,
      };
      selectData.push(itemData);
    });
  }
  return selectData;
};

//voyage id list 
const getVoyageIDList = (data) => {
  let selectData = [];
  if (data.length > 0) {
    data.forEach((item) => {
      const itemData = {
        label: `#${item.intVoyageNo}-(${item.strVesselName})`,
        value: item.intID,
      };
      selectData.push(itemData);
    });
  }
  return selectData;
};

export default VoyageReducer;
