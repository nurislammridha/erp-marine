
import * as Types from "../types/Types";

const initialState = {
    adminListFilterInput: {
        serach: "",
    },

    adminListData: [],
}

const AdminInfoListReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_ADMIN_LIST_FILTER_INPUT:
            const adminListFilterInput = { ...state.adminListFilterInput };
            adminListFilterInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                adminListFilterInput
            }

        case Types.GET_ADMIN_INFO_LIST:
            return {
                ...state,
                adminListData: action.payload
            }
    }
    return newState;

}

export default AdminInfoListReducer;
