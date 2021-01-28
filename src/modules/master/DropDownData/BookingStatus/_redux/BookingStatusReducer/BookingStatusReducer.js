import * as Types from "../Type/Types";
const initialstate = {
};
const BookingStatusReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_BOOKING_STATUS:
            return {
                ...state,
                bookingStatusList: getBookingStatus(action.payload),
            };
        default:
            break;
    }
    return state;
};

// booking status list
const getBookingStatus = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intBookigStatusId,
                label: item.strBookingStatusName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default BookingStatusReducer;