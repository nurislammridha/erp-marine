import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../master/utils/ToastHelper";

export const GetVoyageList = (searchValue = "", containerTypeId = "", vessel ="") => async(dispatch) => {
    const headers = {
        "Content-Type": "application/json",
    };
    
    containerTypeId = (containerTypeId === "" || containerTypeId === null) ? "" : containerTypeId;
    vessel = (vessel === null || vessel === "") ? "" : vessel;

    let url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage`;
    if (searchValue !== "" || containerTypeId !== "" || vessel !== "") {
        url += `?search=${searchValue}&cargoType=${containerTypeId}&vessel=${vessel}`;
    }

    axios
        .get(url, {
            headers: headers,
        })
        .then((res) => {
            console.log("Response", res);
            let data = res.data;
            console.log('data', data)
            dispatch({ type: Types.GET_VOYAGE, payload: data });
        });
};


export const GetVoyageListDetail = (id) => async(dispatch) => {
    axios
        .get(`http://iapps.akij.net/asll/public/api/v1/asll/voyage/show/${id}`)
        .then((res) => {
            let data = res.data.data;
            dispatch({ type: Types.GET_VOYAGE_LIST_DETAIL, payload: data });
        });
};

/*==voyage input change==*/
export const handleChangeVoyageInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    console.log("formData", formData);
    dispatch({
        type: Types.CHANGE_VOYAGE_INPUT,
        payload: formData,
    });
};
/*=========voyage submit=======*/
export const voyageSubmitAction = (voyageInput) => (dispatch) => {
    let responseList = {
        isLoading: true,
        data: {},
        status: false,
    };
    dispatch({
        type: Types.VOYAGE_SUBMITTING,
        payload: responseList,
    });

    let postUrl = `http://iapps.akij.net/asll/public/api/v1/asll/voyage/store`;
    axios
        .post(postUrl, voyageInput)
        .then(function(response) {
            responseList.data = response.data;
            responseList.isLoading = false;
            responseList.status = response.data.status;
            if (response.data.status) {
                showToast("success", response.data.message);
                dispatch({
                    type: Types.VOYAGE_SUBMIT,
                    payload: responseList,
                });
            } else {
                showToast("error", response.data.message);
            }
        })
        .catch(function(error) {
            responseList.isLoading = false;
            // const errorsResponse = JSON.parse(error.request.response);
            // const message = errorsResponse.message;
            // responseList.message = message;
            // responseList.errors = errorsResponse.errors;
            const message =
                "Something went wrong ! Please fill all inputs and try again !";
            showToast("error", message);

            dispatch({
                type: Types.VOYAGE_SUBMIT,
                payload: responseList,
            });
        });
};

// export const voyageSubmitAction = async (state) => {
//   let payloadData = {
//     isLoading: false,
//     data: [],
//     status: false,
//     message: "",
//   };

//   const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage/store`;
//   const postData = {
//     strVesselName: state.strVesselName.trim(),
//     intVesselID: parseInt(state.intVesselID),
//     intVoyageNo: parseInt(state.intVoyageNo),
//     intCargoTypeID: parseInt(state.intCargoTypeID),
//     strCargoTypeName: state.strCargoTypeName.trim(),
//     intCargoQty: parseInt(state.intCargoQty),
//     dteVoyageDate: state.dteVoyageDate,
//     strPlaceOfVoyageCommencement: state.strPlaceOfVoyageCommencement.trim(),
//     decBunkerQty: parseFloat(state.decBunkerQty),
//     decDistance: parseFloat(state.decDistance),
//     intFromPortID: parseInt(state.intFromPortID),
//     strFromPortName: state.strFromPortName.trim(),
//     intToPortID: parseInt(state.intToPortID),
//     intVlsfoRob: parseInt(state.intVlsfoRob),
//     intLsmgRob: parseInt(state.intLsmgRob),
//     intLubOilRob: parseInt(state.intLubOilRob),
//     intMeccRob: parseInt(state.intMeccRob),
//     intAeccRob: parseInt(state.intAeccRob),
//     strToPortName: state.strToPortName.trim(),
//   };

//   try {
//     payloadData.isLoading = true;
//     return axios.post(url, postData).then((res) => {
//       payloadData.data = res.data.data;
//       payloadData.isLoading = false;
//       payloadData.status = true;
//       payloadData.message = res.data.message;
//       return payloadData;
//     });
//   } catch (error) {
//     console.log("error", error);
//     payloadData.isLoading = false;
//   }
//   return payloadData;
// };

export const GetCargoList = () => (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}asll/voyage/cargo`).then((res) => {
        let data = res.data.data;
        dispatch({ type: Types.GET_CARGO, payload: data });
    });
};

export const GetLastVoyageByVesselId = (vesselId) => async(dispatch) => {
    const headers = {
        "Content-Type": "application/json",
    };

    let url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage/getVoyageByLastVesselId?intVesselId=${vesselId}`;
    axios
        .get(url, {
            headers: headers,
        })
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_LAST_VOYAGE, payload: data });
        });
};

export const getPortsAction = () => (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}asll/voyage/ports`).then((res) => {
        let data = res.data.data;
        dispatch({ type: Types.GET_PORT_LIST, payload: data });
    });
};