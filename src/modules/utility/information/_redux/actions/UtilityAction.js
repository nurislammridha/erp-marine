import * as Types from '../types/Types'

export const changeTextInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.CHANGE_TEXT_INPUT, payload: formData })
    dispatch({ type: Types.CALCULATE_ALL, payload: null })
}