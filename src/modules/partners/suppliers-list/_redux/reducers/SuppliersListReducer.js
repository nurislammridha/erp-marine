import * as Types from "../types/Types";

const initialState = {
    listPaginatedData: null,
    supplierList: [],
    status: false,
    isLoading: false,
    editStatus: false
}

const SuppliersListReducer = (state = initialState, action) => {
    const newState = { ...state }

    switch (action.type) {
        case Types.GET_SUPPLIER_LIST:
            // console.log('action.payload', action.payload)
            return {
                ...state,
                supplierList: action.payload.supplierList,
                isLoading: action.payload.isLoading
            };

        case Types.DELETE_SUPPLIER_LIST:
            return {
                ...state,
                isLoading: action.payload,
            };

        default:
            break;
    }
    return newState;
}

export default SuppliersListReducer;