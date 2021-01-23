import * as Types from "../types/Types";
export const itemAddInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.CHANGE_ITEM_INPUT, payload: formData })
}

export const multipleItemAddInput = (itemDataInput) => (dispatch) => {
    dispatch({ type: Types.MULTIPLE_ITEM_ADD_INPUT, payload: itemDataInput })
}
export const deleteMultipleItemInput = (index) => (dispatch) => {
    dispatch({ type: Types.DELETE_MULTIPLE_ITEM, payload: index })
}