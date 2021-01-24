import * as Types from "../types/Types";
import moment from "moment";
const initialstate = {
    isLoading: false,
    VesselBooking: {
        strBookingRefNo: '',
        intShipId: null,
        strShipName: null,
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
        intBookingStatusId: null,
        strBookingStatus: '',
        strRemarks: '',
        intActionBy: null,
        dteLastActionDateTime: '',
        dteServerDateTime: '',
        isActive: false
    },
    VesselBookingList: [],
};
const VesselBookingReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_BROKER_LIST:
            return {
                ...state,
                brokerList: getBrokerData(action.payload),
            };
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
                    // VesselBooking: initialstate.VesselBooking,
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
        default:
            break;
    }
    return newState;
};
// Broker list
const getBrokerData = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intCategoryID,
                label: item.strCertificateCategoryName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default VesselBookingReducer;