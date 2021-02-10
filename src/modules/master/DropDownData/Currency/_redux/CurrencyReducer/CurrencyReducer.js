import * as Types from "../Type/Types";
const initialstate = {
};
const CurrencyListReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_CURRENCY_LIST:
            return {
                ...state,
                CurrencyList: GetCurrencyData(action.payload),
            };
        default:
            break;
    }
    return state;
};

// voyage type list
const GetCurrencyData = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intCurrencyId,
                label: item.strCurrencyName,
            };
            options.push(itemData);
        });
    }
    return options;
};
export default CurrencyListReducer;