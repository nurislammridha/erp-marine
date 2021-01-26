import * as Types from "../../types/Types";

const initialState = {
    currencyList: [],
    addMessage: "",
    editMessage: "",
    deleteMessage: "",

    addStatus: false,
    editStatus: false,
    deleteStatus: false,
};

const CurrencyReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_CURRENCY:
            return {
                ...state,
                currencyList: action.payload.data,
            };

        case Types.POST_CURRENCY:
            return {
                ...state,
                addStatus: action.payload.status,
                addMessage: action.payload.message,
            };

        case Types.EDIT_CURRENCY:
            return {
                ...state,
                editStatus: action.payload.status,
                editMessage: action.payload.message,
            };


        case Types.EMPTY_CURRENCY_ADD_MESSAGE:
            return {
                ...state,
                addMessage: "",
            };
        case Types.EMPTY_CURRENCY_EDIT_MESSAGE:
            return {
                ...state,
                editMessage: "",
            };

        default:
            break;
    }
    return newState;
};
export default CurrencyReducer;
