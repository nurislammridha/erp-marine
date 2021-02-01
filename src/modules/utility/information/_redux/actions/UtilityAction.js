import Axios from 'axios'
import * as Types from '../types/Types'

export const changeTextInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.CHANGE_TEXT_INPUT, payload: formData })
    dispatch({ type: Types.CALCULATE_ALL, payload: null })
}
export const getShipList = () => (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}voyage/shipList`;
    Axios.get(url).then(
        (res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_SHIP_LIST, payload: data })
        }
    )

}