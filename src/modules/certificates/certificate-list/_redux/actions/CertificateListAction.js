import Axios from "axios";
import { toast } from 'react-toastify';
import { generateFormDataFromObject } from "../../../../master/utils/FileHelper";
import { showToast } from "../../../../master/utils/ToastHelper";

import * as Types from "../types/Types";


export const GetCertificateList = () => async (dispatch) =>  {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/voyageLighter/getItemType`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.CERTIFICATE_LIST_MAIN, payload: data });
        });

};

