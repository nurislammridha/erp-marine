import * as Types from "../Type/Types";
const initialstate = {
};
const PaymentTermsReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_PAYMENT_METHOD:
            return {
                ...state,
                paymentTerms: getPaymentMethod(action.payload),
            };
        default:
            break;
    }
    return state;
};

// voyage type list
const getPaymentMethod = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intPaymentTermsId,
                label: item.strPaymentTermsName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default PaymentTermsReducer;