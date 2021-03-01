import * as Types from '../types/Types'
import moment from 'moment'
import Axios from 'axios'
import { showToast } from '../../../../master/utils/ToastHelper'

export const changeAccountsInformation = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.CHANGE_ACCOUNT_INFO_INPUT, payload: formData })
}

export const SubmitAccountsInformation = (accountsInfoInput) => async (dispatch) => {
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    dispatch({ type: Types.SUBMIT_ACCOUNT_INFO, payload: responseList })
    const url = `${process.env.REACT_APP_API_URL}asset/assetAccountInfoRegistration`;
    await Axios.post(url, accountsInfoInput)
        .then((res) => {
            if (res.data.status) {
                responseList.isLoading = false;
                responseList.data = res.data
                responseList.status = res.status
                showToast('success', res.data.message)
                dispatch({ type: Types.SUBMIT_ACCOUNT_INFO, payload: responseList })
            } 
        }).catch(function (error) {
            const message = "Sorry, something went wrong!"
            responseList.isLoading = false;
            showToast('error', message);
            dispatch({ type: Types.SUBMIT_ACCOUNT_INFO, payload: responseList })
        })
}