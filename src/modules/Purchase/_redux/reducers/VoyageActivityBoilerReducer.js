import moment from "moment";
import * as Types from "../types/Types";

const initialState = {
  voyageActivityBoilerList: [],
  multipleVoyageBoilerList: [],
  isLoading: false,
  voyageActivityBoilerInput: {
    decWorkingPressure: 0,
    decPhValue: 0,
    decChloride: 0,
    decAlkalinity: 0,
    dteCreatedAt: moment().format("YYYY-MM-DD"),
    intCreatedBy: null,

    intUnitId: null,
    intVoyageID: null,
    dteCreatedAt: moment().format("YYYY-MM-DD"),
    intShipPositionID: null,
    intShipConditionTypeID: null,
    strRPM: null,
    strRemarks: null,
    decEngineSpeed: 0,
    decSlip: 0,

    intShipEngineID: null,
    strShipEngineName: null,
    boilerlists: [],
  },
};

const VoyageActivityBoilerReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_VOYAGE_ACTIVITY_BOILER_INPUT:
      const voyageActivityBoilerInput = { ...state.voyageActivityBoilerInput };
      voyageActivityBoilerInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        voyageActivityBoilerInput,
      };
      break;

    case Types.ADD_MULTIPLE_BOILER_LIST:
      console.log('action.payload', action.payload)
      const voyageActivityBoilerInputMultiple = {
        ...state.voyageActivityBoilerInput,
      };
      voyageActivityBoilerInputMultiple.boilerlists = [
        action.payload,
        ...voyageActivityBoilerInputMultiple.boilerlists,
      ];
      return {
        ...state,
        voyageActivityBoilerInput: voyageActivityBoilerInputMultiple,
      };
      break;
    case Types.VOYAGE_BOILER_SUBMIT:
      return {
        ...state,
        voyageActivityBoilerInput: initialState.voyageActivityBoilerInput,
        isLoading: false,
      };
      break;
    case Types.VOYAGE_BOILER_SUBMITTING:
      return {
        ...state,
        isLoading: action.payload,
      };
      break;

    case Types.DELETE_BOILER_MULTIPLE_DATA:
      const voyageActivityBoilerInputMultipleOld = {
        ...state.voyageActivityBoilerInput,
      };
      voyageActivityBoilerInputMultipleOld.boilerlists.splice(
        action.payload,
        1
      );
      return {
        ...state,
        voyageActivityBoilerInput: voyageActivityBoilerInputMultipleOld,
      };
      break;

    default:
      break;
  }
  return newState;
};
export default VoyageActivityBoilerReducer;
