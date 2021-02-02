import * as Types from "../types/Types";

export const purchasesOrderInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.GET_ORDER_INPUT, payload: formData });
}