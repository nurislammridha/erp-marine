import * as Types from "../types/Types";

const initialState = {
    partnerAddressInput: {
        strSupplierAddress: "",
        strState: "",
        strCity: "",
        strZipCode: "",
        strCountry: "",
        strCountryName: "",
        intCountryID: "",
        isDefault: 1
    },
    addressInfo: [],
    isMultipleAdded: false,
}

const PartnerAddressReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {


        case Types.CHANGE_PARTNER_ADDRESS_INPUT:
            const partnerAddressInput = { ...state.partnerAddressInput };
            partnerAddressInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                partnerAddressInput,
            };

        case Types.GET_COUNTRY_NAME:
            return {
                ...state,
                countryOptionData: getCountryName(action.payload),

            };

        case Types.SUBMIT_PARTNER_ADDRESS:

            const partnerAddressSubmit = { ...state.partnerAddressInput };
            partnerAddressSubmit[action.payload.name] = action.payload.value;

            return {
                ...state, partnerAddressSubmit,
            };

        case Types.EMPTY_ADD_MULTIPLE_FIELDS:
            return {
                ...state,
                isMultipleAdded: false
            };

        case Types.SUBMIT_PARTNER_ADDRESS_MULTIPLE:
            return {
                ...state,
                addressInfo: [...state.addressInfo, action.payload.data],
                partnerAddressInput: initialState.partnerAddressInput,
                isMultipleAdded: action.payload.status
            };

        // case Types.EMPTY_PARTNER_ADDRESS:
        //     return {
        //         ...state,
        //         partnerAddressInput: initialState.partnerAddressInput,
        //         isMultipleAdded: action.payload
        //     };

        case Types.DELETE_PARTNER_ADDRESS_MULTIPLE:
            const addressOld = [...state.addressInfo];
            addressOld.splice(action.payload, 1);
            return {
                ...state,
                addressInfo: addressOld,
            };

        case Types.EMPTY_ADDRESS_INFO:
            return {
                ...state,
                partnerAddressInput: initialState.partnerAddressInput,
                addressInfo: initialState.addressInfo,
            };
        case Types.EDIT_ADDRESS_INFO:
            return {
                ...state,
                addressInfo: action.payload
            }
        default:
            break;
    }

    return newState;
}

export default PartnerAddressReducer;

const getCountryName = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intCountryID,
                label: item.strCountryName,
            };
            options.push(itemData);
        });
    }
    return options;
};