import * as Types from "../Type/Types";
import Axios from "axios";

//get voyage type data
export const getBookingStatusList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}voyage/bookingStatus`;
    Axios.get(url)
        .then((res) => {
            dispatch({ type: Types.GET_BOOKING_STATUS, payload: res.data.data });
        });
};