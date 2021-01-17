import * as Types from "../types/Types";

export const handleChangePartnerAddressInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    console.log('formData :>> ', formData);
    dispatch({ type: Types.CHANGE_PARTNER_ADDRESS_INPUT, payload: formData })
}
// export const partnerAddressInput = (partnerAddress) => (dispatch) => {
//     const response = partnerAddress;
//     dispatch({ type: Types.GET_ADDRESS_ACTION_INPUT, payload: response })
//     console.log('response :>> ', response);
// }

