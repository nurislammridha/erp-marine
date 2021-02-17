import * as Types from "../types/Types";

const initialState = {
    supplierFilterInput: {
        search: "",
        strSupplierTypeName: "",
        intSupplierTypeID: "",
    },
    listPaginatedData: null,
    supplierList: [],
    status: false,
    isLoading: false,
    editStatus: false
}

const SuppliersListReducer = (state = initialState, action) => {
    const newState = { ...state }

    switch (action.type) {

        case Types.CHANGE_SUPPLIER_FILTER_INPUT:
            const supplierFilterInput = { ...state.supplierFilterInput }
            supplierFilterInput[action.payload.name] = action.payload.value
            return {
                ...state,
                supplierFilterInput,
            }

        case Types.GET_SUPPLIER_TYPE_NAME:
            return {
                ...state,
                supplierTypeData: supplierTypeName(action.payload)
            }

        case Types.GET_SUPPLIER_LIST:

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
        case Types.SUPPLIER_DETAILS:
            return {
                ...state,
                supplierDetails: action.payload,
            };
        default:
            break;
    }
    return newState;
}

export default SuppliersListReducer;


const supplierTypeName = (data) => {
    let option = [];
    if (data) {
        data.forEach(element => {
            let elementData = {
                label: element.strSupplierTypeName,
                value: element.intSupplierTypeID
            }
            option.push(elementData)
        });
    }
    return option;
}