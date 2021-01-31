import * as Types from "../types/Types";
import moment from "moment";
const initialstate = {
};
const PurhasesRequestAddReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.VESSEL_BOOKING_INPUT_CHANGE:
            const VesselBooking = { ...state.VesselBooking };
            VesselBooking[action.payload.name] = action.payload.value;
            return {
                ...state,
                VesselBooking
            }

        default:
            break;
    }
    return newState;
};
export default PurhasesRequestAddReducer;