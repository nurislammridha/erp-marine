import { forEach } from "jszip";
import * as Types from "../types/Types";

const initialState = {
    QuotationFilterInput: {
        search: "",
        strQuotationNo: "",
        strSupplierName: "",
        intSupplierId: "",
        strCurrencyCode: "",
        intCurrencyId: "",

    }
}

const QuotationFilterReducer = (state = initialState, action) => {

    const newState = { ...state }

    switch (action.type) {
        case Types.CHANGE_QUOTATION_FILTER_INPUT:
            const QuotationFilterInput = { ...state.QuotationFilterInput }
            QuotationFilterInput[action.payload.name] = action.payload.value

            return {
                ...state,
                QuotationFilterInput,
            }

        case Types.GET_SUPPLIER_NAME:
            return {
                ...state,
                supplierNameData: supplierName(action.payload),
            }

        case Types.GET_CURRENCY_TYPE:
            return {
                ...state,
                currencyTypeData: currencyType(action.payload),
            }
    }

    return (
        newState
    );
}

export default QuotationFilterReducer;


const currencyType = (data) => {
    let option = []
    if (data) {
        data.forEach((item) => {
            let itemData = {
                label: item.strCurrencyCode,
                value: item.intCurrencyId,
            };
            option.push(itemData);
        })
    };
    return option;

}

const supplierName = (data) => {
    let option = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                label: item.strSupplierName,
                value: item.intSupplierId
            };
            option.push(itemData);
        });
    }
    return option;
}