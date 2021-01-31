import moment from "moment";
import * as Types from "../types/Types";

const initialState = {
  voyageActivityAuxEngnList: [],
  isLoading: false,
  voyageActivityAuxEngnInput: {
    intShipEngineID: 2,
    strShipEngineName: "Exht. Engine 1",
    dceMainEngineFuelRPM: "",
    dceRH: 0,
    dceLoad: 0,
    dceExhtTemp1: 0,
    dceExhtTemp2: 0,
    dceJacketTemp: moment().format("YYYY-MM-DD"),
    dceScavTemp: 0,
    dceLubOilTemp: 0,
    dceLubOilPressure: 0,
    dceJacketPressure: 0,
    dceScavPressure: 0,
  },
};

const VoyageActivityAuxEngnReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_VOYAGE_ACTIVITY_AUX_ENGN_INPUT:
      const voyageActivityAuxEngnInput = {
        ...state.voyageActivityAuxEngnInput,
      };
      voyageActivityAuxEngnInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        voyageActivityAuxEngnInput,
      };
      break;

    case Types.VOYAGE_AUX_ENGN_SUBMIT:
      return {
        ...state,
        voyageActivityAuxEngnInput: initialState.voyageActivityAuxEngnInput,
        isLoading: false,
      };
      break;

    case Types.VOYAGE_AUX_ENGN_SUBMITTING:
      return {
        ...state,
        isLoading: action.payload,
      };
      break;

    default:
      break;
  }
  return newState;
};
export default VoyageActivityAuxEngnReducer;
