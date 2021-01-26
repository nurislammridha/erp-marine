import * as Types from "../types/Types";
import Axios from "axios";

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