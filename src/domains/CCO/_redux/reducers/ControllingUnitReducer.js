import * as Types from "../../types/Types";

const initialState = {
    controllingUnitList: [],
    addMessage: "",
    editMessage: "",
    deleteMessage: "",

    addStatus: false,
    editStatus: false,
    deleteStatus: false,
};

const ControllingUnitReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.GET_CONTROLLING_UNIT:
            return {
                ...state,
                employeeInfoList: action.payload,
            };

        case Types.POST_CONTROLLING_UNIT:
            return {
                ...state,
                addStatus: action.payload.status,
                addMessage: action.payload.message,
            };

        case Types.EDIT_CONTROLLING_UNIT:
            return {
                ...state,
                editStatus: action.payload.status,
                editMessage: action.payload.message,
            };

        default:
            break;
    }
    return newState;
};
export default ControllingUnitReducer;
