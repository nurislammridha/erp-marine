import * as Types from "../types/Types";
import Axios from "axios";

//get vessel booking list 
export const getVesselBookingList = () => (dispatch) => {
    const VesselAPI = `${process.env.REACT_APP_API_URL}voyage/bookingList`;
    Axios.get(VesselAPI)
        .then((res) => {
            if (res.status === 200) {
                const listData = res.data.data;
                if (listData.length) {
                    dispatch({ type: Types.GET_VESSEL_BOOKING_LIST, payload: listData });
                }
            }

        })
}
// get single vessel booking list by matching intShipBookingID
export const getVesselBookingDetails = (bookingID) => (dispatch) => {
    Axios.get(`${process.env.REACT_APP_API_URL}voyage/bookingList/${bookingID}`)
        .then((res) => {
        if(res.status === 200){
            const data = res.data.data;
            dispatch({type: Types.GET_VESSEL_BOOKING_DETAILS, payload: data})
        }
    })
}