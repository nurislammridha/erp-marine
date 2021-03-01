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

// // export const postBasicInformation = (data) => async (dispatch) => {
// //     let responseList = {
// //         isLoading: true,
// //         data: {},
// //         status: false,
// //     };
// //     // dispatch({ type: Types.SUBMITTING, payload: responseList })

// //     data.dteDatePlaceInServiceDate = moment().format("YYYY-MM-DD");
// //     data.dteGRNDate = moment().format("YYYY-MM-DD");
// //     data.dteStoreIssueDate = moment().format("YYYY-MM-DD");


// //     const url = `${process.env.REACT_APP_API_URL}asset/assetBasicInfoRegistration`;
// //     await Axios.post(url, data)
// //         .then((res) => {
// //             if (res.data.status) {
// //                 responseList.isLoading = false;
// //                 responseList.data = res.data
// //                 responseList.status = res.status


// //                 showToast('success', res.data.message)
// //                 dispatch({ type: Types.SUBMITTING, payload: responseList })
// //             } else {
// //                 showToast('success', res.data.message)
// //             }
// //         }).catch(function (error) {
// //             const message = "Sorry, something went wrong!"
// //             showToast('error', message);
// //             dispatch({ type: Types.SUBMITTING, payload: responseList })
// //         })
// }