
import * as Types from "../types/Types";

const initialState = {
    QuotationFilterInput: {
        search: "",
        strQuotationNo: "",
        strSupplierName: "",
        intSupplierId: "",
        strCurrencyCode: "",
        intCurrencyId: "",
    },
    quotationDetailInput: [],
    quotationDetailList: [],
    status: false,
    isLoading: false,
}

const QuotationFilterReducer = (state = initialState, action) => {

    const newState = { ...state }

    switch (action.type) {
        case Types.CHANGE_QUOTATION_FILTER_INPUT:
            const QuotationFilterInput = { ...state.QuotationFilterInput }
            QuotationFilterInput[action.payload.name] = action.payload.value;

            return {
                ...state,
                QuotationFilterInput,
            }

        case Types.CHANGE_QUOTATION_DETAIL_INPUT:
            const quotationDetails = state.quotationDetailList.slice();
            console.log('quotationDetails', quotationDetails);
            console.log('action.payload', action.payload);
            for (let i = 0; i < quotationDetails.length; i++) {
                if (quotationDetails[i].intAutoId == action.payload.item.intAutoId) {
                    quotationDetails[i][action.payload.name] = action.payload.value;
                    quotationDetails[i].intTotal = action.payload.item.numQuotationQty * action.payload.value
                }
            }

            return {
                ...state,
                quotationDetailList: quotationDetails,
            };

        case Types.GET_SUPPLIER_NAME:

            return {
                ...state,

                supplierData: action.payload,

                supplierNameData: supplierName(action.payload),
            }

        case Types.GET_CURRENCY_TYPE:
            return {
                ...state,
                currencyTypeData: currencyType(action.payload),
            }

        case Types.GET_QUOTATION_DETAILS:
            console.log('quotation list', action.payload)

            return {
                ...state,
                quotationDetailList: action.payload.quotationDetailList,

            }

        case Types.SUBMIT_QUOTATION:
            return {
                ...state,
                status: action.payload.status,
                isLoading: action.payload.isLoading,
            }
        default:
            break;
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