import * as Types from "../types/Types";
import moment from "moment";
const initialstate = {
    isLoading: false,
    VesselBooking: {
        strBookingRefNo: '',
        intShipId: '',
        strShipName: '',
        strVoyageNo: '',
        intVoyageTypeId: '',
        intBrokerId: '',
        strBrokerName: '',
        intCharterId: '',
        strCharterName: '',
        intCommencePortId: '',
        strCommencePortName: '',
        dteCommenceDate: '',
        intCompletionPortId: '',
        strCompletionPortName: '',
        dteCompletionDate: '',
        numFreightOrHireRate: '',
        numLoadRate: '',
        numDischargeRate: '',
        numVesselDWT: '',
        numAddCommission: '',
        numBrockCommission: '',
        intCargoId: '',
        strCargoName: '',
        intTotalCargoQty: '',
        dteLaycanStart: '',
        dteLaycanEnd: '',
        dteOnHireDate: '',
        dteRedeliveryDate: '',
        dteCPDate: '',
        intBookingStatusId: '',
        strBookingStatus: '',
        strRemarks: '',
        intActionBy: '',
        dteLastActionDateTime: '',
        dteServerDateTime: '',
        isActive: false
    },
    VesselBookingList: [],
    VesselBookingDetails: {},
};
const VesselBookingReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.VESSEL_BOOKING_INPUT_CHANGE:
            const VesselBooking = { ...state.VesselBooking };
            VesselBooking[action.payload.name] = action.payload.value;
            return {
                ...state,
                VesselBooking
            }
        case Types.VESSEL_BOOKING_SUBMIT:
            if (action.payload.status) {
               
                return {
                    ...state,
                    ...initialstate,
                    isLoading: action.payload.isLoading,
                };
            } else {
                return {
                    ...state,
                    isLoading: false,
                };
            }
            break;
        case Types.VESSEL_BOOKING_SUBMITTING:
            return {
                ...state,
                isLoading: action.payload,
            };
            break;
        case Types.GET_VESSEL_BOOKING_LIST: 
            return {
                ...state,
                VesselBookingList: action.payload,
                    
            }
        case Types.GET_VESSEL_BOOKING_DETAILS: 
            return {
                ...state,
                VesselBookingDetails: action.payload,
                VesselBooking: action.payload      
            }
        default:
            break;
    }
    return newState;
};
export default VesselBookingReducer;