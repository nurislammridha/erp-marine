import * as Types from "../types/Types";
import { showToast } from "../../../../master/utils/ToastHelper";
import Axios from "axios";
import { getEmployeeId, getVesselId } from "../../../../../app/modules/Auth/_redux/authCrud";


// get currency 
export const GetCurrencyData = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };
    Axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/asllhr/getCurrency`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_CURRENCY_DATA, payload: data });
        });
};

// get voyage id 
export const GetVoyageID = () => async (dispatch) => {
    let data = {};

    Axios.get(`${process.env.REACT_APP_API_URL}voyage/charterVoyage/`)
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_VOYAGE_ID, payload: data });
        });
};

//get voyage list

export const getVoyageList = ()=>(dispatch)=>{
    // const url = `${process.env.REACT_APP_API_URL}voyage/charterList`;
    const url = `${process.env.REACT_APP_API_URL}voyage/charterVoyage`; 
    Axios.get(url).then((res) => {
      dispatch({
        type: Types.GET_VOYAGE_LIST,
        payload: res.data.data,
      });
    
    });
  }

// get data for lay time header input with voyage id
export const getHearInputData = (id) => (dispatch) => {
    const responseList = {
        isLoading: true,
        status:false,
        data: null,    
    }
    dispatch({ type: Types.GET_HEADER_INPUT_FROM_API, payload: responseList });

    let LayTimeURL = `${process.env.REACT_APP_API_URL}voyage/charterVoyage/${id}`;
    Axios.get(LayTimeURL)
        .then((response) => {
            if (response.data.status) {
                let data = response.data.data;
                responseList.isLoading = false;
                responseList.status = response.data.status;
                responseList.data = data;
                if (data.commmence_port !== null) {
                    data.commmencePort = {
                        label: data.commmence_port.strPortName,
                        value: data.commmence_port.intPortID
                    }
                }
                if (data.completion_port !== null) {
                    data.completionPort = {
                        label: data.completion_port.strPortName,
                        value: data.completion_port.intPortID
                    }
                }
                dispatch({ type: Types.GET_HEADER_INPUT_FROM_API, payload: responseList })
            }
        }).catch((error)=>{
            responseList.isLoading = false;
            dispatch({ type: Types.GET_HEADER_INPUT_FROM_API, payload: responseList })
        })
}

//get data for laytime rowlist with header id
export const getRowList = (id) => (dispatch) => {
    let LayTimeRowListURL = `${process.env.REACT_APP_API_URL}voyage/layTimeRowList/${id}`;
    Axios.get(LayTimeRowListURL)
    .then((response) => {
        let data = response.data.data;
        dispatch({ type: Types.GET_LAYTIMEROW_LIST_FROM_API, payload: data })
    })
}

export const handleChangeLaytimeHeaderInput = (name, value, e) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_LAYTIME_HEADER_INPUT,
        payload: formData,
    });
};
// laytime demurrage input 
export const handleLaytimeDemurrageInput = (name, value, e) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_LAYTIME_HEADER_DEMURRAGE_INPUT,
        payload: formData,
    });
};

// multiple demurrages add 
export const multipleLaytimeAction = (laytimeHeaderInput, handleClose) => (dispatch) => {
    if (laytimeHeaderInput.numDemurrageRate === null) {
        showToast('error', "Demurrage rate can't be blank!")
        return false;
    }
    if (laytimeHeaderInput.intCurrencyID === null) {
        showToast('error', "Currency can't be blank!")
        return false;
    }
    if (laytimeHeaderInput.numDespatchRate === null) {
        showToast('error', "Despatch rate can't be blank!")
        return false;
    }
    if (laytimeHeaderInput.numDespatchPercent === null) {
        showToast('error', "Despatch Percent rate can't be blank!")
        return false;
    }
    let demurrageData = {
        strReversibleIType: laytimeHeaderInput.strReversibleIType,
        numDemurrageRate: laytimeHeaderInput.numDemurrageRate,
        intCurrencyID: laytimeHeaderInput.intCurrencyID,
        numDespatchRate: laytimeHeaderInput.numDespatchRate,
        numDespatchPercent: laytimeHeaderInput.numDespatchPercent
    }
    if (demurrageData) {
        showToast('success', "Demurrage/Dispatch Rate added successfully!");
        dispatch({ type: Types.ADD_MULTIPLE_DUMMARAGES, payload: demurrageData })
        handleClose(true)
    }
}

export const handleChangeLaytimeRowInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch({
        type: Types.CHANGE_LAYTIME_DETAIL_INPUT,
        payload: formData,
    });
};

//submit laytime data 
export const submitLaytime = (laytimeHeaderInput, laytimeRowInput, e, show, setShow) => async (dispatch) => {
    if (laytimeHeaderInput.intCharterVoyageID === null) {
        showToast('error', "Laytime header can't be blank!")
        return false;
    }
    if (laytimeHeaderInput.demurrages.length === 0) {
        showToast('error', "Please add minimum one demurrage!")
        return false;
    }
    if (laytimeHeaderInput.strOnceOnDemmurrage.length === 0) {
        showToast('error', "Please select once demmurrage!")
        return false;
    }
    if (laytimeRowInput.intPortID === null) {
        showToast('error', "Port can't be blank!")
        return false;
    }
    if (laytimeRowInput.dteLaytimeCommenced.length === 0) {
        showToast('error', "Laytime commenced can't be blank!")
        return false;
    }
    if (laytimeRowInput.dteLaytimeCompleted.length === 0) {
        showToast('error', "Laytime completed can't be blank!")
        return false;
    }
    if (laytimeRowInput.intCargoID === null) {
        showToast('error', "Cargo can't be blank!")
        return false;
    }
    if (laytimeRowInput.numBLQty === null) {
        showToast('error', "B/L Quantity can't be blank!")
        return false;
    }
    if (laytimeRowInput.intTermsID === null) {
        showToast('error', "Terms can't be blank!")
        return false;
    }
    if (laytimeRowInput.numTimeAllowence === null) {
        showToast('error', "Time allowed can't be blank!")
        return false;
    }
    if (laytimeRowInput.numTimeAllowence.length === 0) {
        showToast('error', "Time allowed can't be blank!")
        return false;
    }
    if (laytimeRowInput.intAdditionalDay === null) {
        showToast('error', "Additional/saved times can't be blank!")
        return false;
    }
    if (laytimeRowInput.numAdditionalHrs === null) {
        showToast('error', "Additional hrs can't be blank!")
        return false;
    }
    if (laytimeRowInput.dteTermArraivalTime.length === 0) {
        showToast('error', "Arrival time can't be blank!")
        return false;
    }
    if (laytimeRowInput.dteTermSailTime.length === 0) {
        showToast('error', "Sailing time can't be blank!")
        return false;
    }
    if (laytimeRowInput.numDemurrageRate === null) {
        showToast('error', "Demurrage rate can't be blank!")
        return false;
    }
    if (laytimeRowInput.intDemurrageCurrID === null) {
        showToast('error', "USD can't be blank!")
        return false;
    }
    if (laytimeRowInput.numDespatchRate === null) {
        showToast('error', "Despatch rate can't be blank!")
        return false;
    }
    if (laytimeRowInput.numDespatchRatePercent === null) {
        showToast('error', "Percentage can't be blank!")
        return false;
    }
    if (laytimeRowInput.dteNORtender.length === 0) {
        showToast('error', "NOR tender can't be blank!")
        return false;
    }
    if (laytimeRowInput.numLodingOrDischargeRate === null) {
        showToast('error', "Load rate can't be blank!")
        return false;
    }
    const layTimeRowData = [
        {
            intPortID: laytimeRowInput.intPortID,
            intType: parseInt(laytimeRowInput.intType),
            dteLaytimeCommenced: laytimeRowInput.dteLaytimeCommenced,
            dteLaytimeCompleted: laytimeRowInput.dteLaytimeCompleted,
            intCargoID: laytimeRowInput.intCargoID,
            numBLQty: laytimeRowInput.numBLQty,
            intTermsID: laytimeRowInput.intTermsID,
            numTimeAllowence: laytimeRowInput.numTimeAllowence,
            intAdditionalDay: laytimeRowInput.intAdditionalDay,
            numAdditionalHrs: laytimeRowInput.numAdditionalHrs,
            dteTermArraivalTime: laytimeRowInput.dteTermArraivalTime,
            dteTermSailTime: laytimeRowInput.dteTermSailTime,
            numDemurrageRate: laytimeRowInput.numDemurrageRate,
            intDemurrageCurrID: laytimeRowInput.intDemurrageCurrID,
            numDespatchRate: laytimeRowInput.numDespatchRate,
            numDespatchRatePercent: laytimeRowInput.numDespatchRatePercent,
            dteNORtender: laytimeRowInput.dteNORtender,
            numLodingOrDischargeRate: laytimeRowInput.numLodingOrDischargeRate,
        }
    ];

    laytimeHeaderInput.intActionBy = 1;
    const intShipID = await getVesselId();
    if (typeof intShipID === 'undefined' || intShipID === null || intShipID === "") {
        laytimeHeaderInput.intShipID = 1;
    } else {
        laytimeHeaderInput.intShipID = intShipID;
    }
    laytimeHeaderInput.isActive = true;
    laytimeHeaderInput.layTimeRows = layTimeRowData;
    let responseList = {
        loading: true,
        data: {},
        status: false,
    };
    dispatch({ type: Types.LAYTIME_DATA_SUBMITTING, payload: true });

    

    Axios.post(`${process.env.REACT_APP_API_URL}voyage/layTimeHeaderRow`, laytimeHeaderInput)

        .then((res) => {
            const intLayTimeHeaderID = res.data.data.intLayTimeHeaderID;
            const intLayTimeRowID = res.data.data.intLayTimeRowID;
            
            dispatch({ type: Types.LAYTIME_DETAILS_ENTRY_HEADER_DATA, payload: {
                name: 'intLayTimeHeaderID', value: intLayTimeHeaderID
            }});
            dispatch({ type: Types.LAYTIME_DETAILS_ENTRY_HEADER_DATA, payload: {
                name: 'intLayTimeRowID', value: intLayTimeRowID
            }});

            // Update LaytimeMultiple>layTimeMultipleInput:  intLayTimeHeaderID, intLayTimeRowID,

            responseList.data = res.data;
            responseList.loading = false;
            responseList.status = res.data.status;
            if (responseList.status === true) {
                showToast("success", res.data.message);
                dispatch({ type: Types.LAYTIME_DATA_SUBMIT, payload: responseList })
                setShow(true)
            } else {
                showToast("error", res.data.message);
            }
        })
        .catch((error) => {
            responseList.loading = false;
            const message = "Something went wrong, Please try again !";
            showToast("error", message);
            dispatch({ type: Types.LAYTIME_DATA_SUBMIT, payload: false });
        });
}

// laytime demurrage input 
export const deleteMultipleList = (data) => (dispatch) => {
    
    Axios.delete(`${process.env.REACT_APP_API_URL}voyage/layTimeHeaderRow/${data.intLayTimeRowID}`);
    dispatch({
        type: Types.DELETE_LAYTIMEROW_DATA,
        payload: data,
    });
};
export const deleteSofList = (data) => (dispatch) => {

    dispatch({
        type: Types.REMOVE_PARENT_SOF_LIST,
        payload: data,
    });
};
