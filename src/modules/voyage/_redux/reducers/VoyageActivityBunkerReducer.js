import moment from "moment";
import * as Types from "../types/Types";
// Test
const initialState = {
  isLoading: false,
  voyageActivityBunkerInput: {
    intUnitId: null,
    intVoyageID: null,
    intShipPositionID: null,
    intShipConditionTypeID: null,
    dteCreatedAt: moment().format("YYYY-MM-DD"),
    strRPM: null,
    strRemarks: null,
    decEngineSpeed: 0,
    decSlip: 0,
    
    decBunkerVlsfoCon: 0,
    decBunkerVlsfoAdj: 0,
    decBunkerVlsfoRob: 0,
    decBunkerLsmgoCon: 0,
    decBunkerLsmgoAdj: 0,
    decBunkerLsmgoRob: 0,
    decLubMeccCon: 0,
    decLubMeccAdj: 0,
    decLubMeccRob: 0,
    decLubMecylCon: 0,
    decLubMecylAdj: 0,
    decLubMecylRob: 0,
    decLubAeccCon: 0,
    decLubAeccAdj: 0,
    decLubAeccRob: 0,
    intCreatedBy: null,
  },
};

const VoyageActivityBunkerReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_VOYAGE_ACTIVITY_BUNKER_INPUT:
      const voyageActivityBunkerInput = { ...state.voyageActivityBunkerInput };
      voyageActivityBunkerInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        voyageActivityBunkerInput,
      };
      break;
    
    case Types.VOYAGE_BUNKER_SUBMIT:
      return {
        ...state,
        voyageActivityBunkerInput: initialState.voyageActivityBunkerInput,
        isLoading : false
      };
      break;
    
    case Types.VOYAGE_BUNKER_SUBMITTING:
      return {
        ...state,
        isLoading : action.payload
      };
      break;
    default:
      break;
  }
  return newState;
};
export default VoyageActivityBunkerReducer;
