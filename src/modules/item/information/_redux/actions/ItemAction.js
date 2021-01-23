import * as Types from "../types/Types";
export const itemAddInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.CHANGE_ITEM_INPUT, payload: formData })
}