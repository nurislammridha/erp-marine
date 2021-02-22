import * as Types from '../types/Types'

export const ChangeBasicInfoInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.BASIC_INFO_INPUT, payload: formData })
}