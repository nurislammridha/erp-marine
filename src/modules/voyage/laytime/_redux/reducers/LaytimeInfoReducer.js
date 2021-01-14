import * as Types from "../types/Types";

const initialstate = {
    laytimeList: []
};
const LaytimeInfoReducer = (state = initialstate, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_LAYTIME_LIST:
            return {
                ...state,
                laytimeList: action.payload.data
            };

        default:
            break;
    }
    return newState;
};

export default LaytimeInfoReducer;