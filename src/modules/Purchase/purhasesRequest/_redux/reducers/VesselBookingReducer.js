import * as Types from "../types/Types";
import moment from "moment";
const initialstate = {
    isLoading: false,
    VesselBooking: {
        strBookingRefNo: '',
        intShipId: null,
        strShipName: '',
        strVoyageNo: '',
        intVoyageTypeId: null,
        intBrokerId: null,
        strBrokerName: '',
        intCharterId: null,
        strCharterName: '',
        intCommencePortId: null,
        strCommencePortName: '',
        dteCommenceDate: '',
        intCompletionPortId: null,
        strCompletionPortName: '',
        dteCompletionDate: '',
        numFreightOrHireRate: null,
        numLoadRate: null,
        numDischargeRate: null,
        numVesselDWT: null,
        numAddCommission: null,
        numBrockCommission: null,
        intCargoId: null,
        strCargoName: '',
        intTotalCargoQty: null,
        dteLaycanStart: '',
        dteLaycanEnd: '',
        dteOnHireDate: '',
        dteRedeliveryDate: '',
        dteCPDate: '',
        intBookingStatusId: 1,
        strBookingStatus: '',
        strRemarks: '',
        intActionBy: null,
        dteLastActionDateTime: '',
        dteServerDateTime: '',
        isActive: true,
    },
    VesselBookingList: [],
    VesselBookingDetails: {},
    vesselPaginateData: null,
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
        //vessel booking submit
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
        //vessel booking submitting
        case Types.VESSEL_BOOKING_SUBMITTING:
            return {
                ...state,
                isLoading: action.payload,
            };
            break;
        //vessel booking edit
        case Types.VESSEL_BOOKING_EDIT:
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
        //vessel booking editting
        case Types.VESSEL_BOOKING_EDITTING:
            return {
                ...state,
                isLoading: action.payload,
            };
            break;

        case Types.GET_VESSEL_BOOKING_LIST:
            if (action.payload.status) {
                return {
                    ...state,
                    VesselBookingList: action.payload.VesselBookingList,
                    vesselPaginateData: action.payload.vesselPaginateData,

                    isLoading: false,
                };
            } else {
                return {
                    ...state,
                    isLoading: true,
                };
            }
        case Types.GET_VESSEL_BOOKING_DETAILS:
            return {
                ...state,
                VesselBookingDetails: action.payload === null ? initialstate.VesselBookingDetails : action.payload,
                VesselBooking: action.payload === null ? initialstate.VesselBooking : action.payload,
            }
        case Types.DELETE_VESSEL_BOOKING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            break;
    }
    return newState;
};
export default VesselBookingReducer;