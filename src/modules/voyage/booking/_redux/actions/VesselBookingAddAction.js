import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";

// get voyage id 
export const getBookingBrokerData = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}certificate/category/parent-categories/list`;
    Axios.get(url).then((res) => {
        dispatch({ type: Types.GET_BROKER_LIST, payload: res.data.data });
    });
};

export const handleVesselBookingInput = (name, value, e) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({ type: Types.VESSEL_BOOKING_INPUT_CHANGE, payload: formData });
};

//submit laytime data 
export const VesselBookingSubmit = (VesselBooking, e) => async (dispatch) => {
    if (VesselBooking.intBrokerId === null) {
        showToast('error', "Broker can't be blank!");
        return false;
    }
    if (VesselBooking.intCharterId === null) {
        ;
        showToast('error', "Charter can't be blank!");
        return false;
    }
    if (VesselBooking.intShipId === null) {
        showToast('error', "Ship can't be blank!");
        return false;
    }
    if (VesselBooking.intVoyageTypeId === null) {
        showToast('error', "Voyage can't be blank!");
        return false;
    }
    if (VesselBooking.intCommencePortId === null) {
        showToast('error', "Commence port can't be blank!");
        return false;
    }
    if (VesselBooking.dteCommenceDate.length === 0) {
        showToast('error', "Commence date can't be blank!");
        return false;
    }
    if (VesselBooking.intCompletionPortId === null) {
        showToast('error', "Dischanging or commence port can't be blank!");
        return false;
    }
    if (VesselBooking.dteCompletionDate.length === 0) {
        showToast('error', "Completion date can't be blank!");
        return false;
    }
    if (VesselBooking.dteCPDate.length === 0) {
        showToast('error', "CP date can't be blank!");
        return false;
    }
    if (VesselBooking.numFreightOrHireRate === null) {
        showToast('error', "Freight / hire rate or commence port can't be blank!");
        return false;
    }
    if (VesselBooking.dteOnHireDate.length === 0) {
        showToast('error', "Hire date date can't be blank!");
        return false;
    }
    if (VesselBooking.dteRedeliveryDate.length === 0) {
        showToast('error', "Redelivery date date can't be blank!");
        return false;
    }
    if (VesselBooking.intCargoId === null) {
        showToast('error', "Cargo can't be blank!");
        return false;
    }
    if (VesselBooking.intTotalCargoQty === null) {
        showToast('error', "Cargo Qty can't be blank!");
        return false;
    }
    if (VesselBooking.numVesselDWT === null) {
        showToast('error', "Vessel DWT can't be blank!");
        return false;
    }
    if (VesselBooking.numAddCommission === null) {
        showToast('error', "Add commission can't be blank!");
        return false;
    }
    if (VesselBooking.numBrockCommission === null) {
        showToast('error', "Brockerage commission can't be blank!");
        return false;
    }
    if (VesselBooking.numLoadRate === null) {
        showToast('error', "Load rate can't be blank!");
        return false;
    }
    if (VesselBooking.dteLaycanStart.length === 0) {
        showToast('error', "Laycan start date can't be blank!");
        return false;
    }
    if (VesselBooking.dteLaycanEnd.length === 0) {
        showToast('error', "Laycan end date can't be blank!");
        return false;
    }
    if (VesselBooking.numDischargeRate === null) {
        showToast('error', "Disharge rate commission can't be blank!");
        return false;
    }
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };

    dispatch({ type: Types.VESSEL_BOOKING_SUBMITTING, payload: true });

    Axios.post(`${process.env.REACT_APP_API_URL}voyage/bookingList`, VesselBooking)
        .then((res) => {
            responseList.data = res.data;
            responseList.isLoading = false;
            responseList.status = res.data.status;
            if (responseList.status === true) {
                showToast("success", res.data.message);
                dispatch({ type: Types.VESSEL_BOOKING_SUBMIT, payload: responseList })
            } else {
                showToast("error", res.data.message);
            }
        })
        .catch((error) => {
            responseList.loading = false;
            const message = "Something went wrong, Please try again !";
            showToast("error", message);
            dispatch({ type: Types.VESSEL_BOOKING_SUBMIT, payload: false });
        });
}
// Get Vessel Booking list 
// export const getVesselBookingList = () => (dispatch) => {
//     const VesselAPI = `${process.env.REACT_APP_API_URL}voyage/bookingList`;
//     Axios.get(VesselAPI)
//         .then((res) => {
//             if (res.status === 200) {
//                 const listData = res.data.data;
//                 if (listData.length) {
//                     dispatch({ type: Types.GET_VESSEL_BOOKING_LIST, payload: listData });
//                 }
//             }

//         })
// }