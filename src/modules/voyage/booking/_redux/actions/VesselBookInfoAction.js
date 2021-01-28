import * as Types from "../types/Types";
import Axios from "axios";
import { showToast } from "../../../../master/utils/ToastHelper";

//get vessel booking list 
export const getVesselBookingList = () => (dispatch) => {
    const VesselAPI = `${process.env.REACT_APP_API_URL}voyage/bookingList`;
    Axios.get(VesselAPI)
        .then((res) => {
            if (res.status === 200) {
                const listData = res.data.data;
                if (listData.length) {
                    dispatch({ type: Types.GET_VESSEL_BOOKING_LIST, payload: listData });
                }
            }

        })
}
// get single vessel booking list by matching intShipBookingID
export const getVesselBookingDetails = (bookingID = null) => (dispatch) => {
    if (bookingID === null) {
        dispatch({ type: Types.GET_VESSEL_BOOKING_DETAILS, payload: null });
    } else {
        Axios.get(`${process.env.REACT_APP_API_URL}voyage/bookingList/${bookingID}`)
            .then((res) => {
                if (res.data.status) {
                    let data = res.data.data;
                    //create broker item
                    if (data.intBrokerId !== null && data.strBrokerName !== "") {
                        data.broker = {
                            label: data.strBrokerName,
                            value: data.intBrokerId
                        }
                    } else {
                        data.broker = ""
                    }
                    //create charter item
                    if (data.intCharterId !== null && data.strCharterName !== "") {
                        data.charter = {
                            label: data.strCharterName,
                            value: data.intCharterId
                        }
                    } else {
                        data.charter = ""
                    }
                    //create ship item
                    if (data.intShipId !== null && data.strShipName !== "") {
                        data.ship = {
                            label: data.strShipName,
                            value: data.intShipId
                        }
                    } else {
                        data.ship = ""
                    }
                    //create voyage type item
                    if (data.intVoyageTypeId !== null && data.strVoyageNo !== "") {
                        data.voyageType = {
                            label: data.strVoyageNo,
                            value: data.intVoyageTypeId
                        }
                    } else {
                        data.voyageType = ""
                    }
                    //create commence port item
                    if (data.intCommencePortId !== null && data.strCommencePortName !== "") {
                        data.commencePort = {
                            label: data.strCommencePortName,
                            value: data.intCommencePortId
                        }
                    } else {
                        data.commencePort = ""
                    }
                    //create completion port item
                    if (data.intCompletionPortId !== null && data.strCompletionPortName !== "") {
                        data.completionPort = {
                            label: data.strCompletionPortName,
                            value: data.intCompletionPortId
                        }
                    } else {
                        data.completionPort = ""
                    }
                    //create cargo item
                    if (data.intCargoId !== null && data.strCargoName !== "") {
                        data.cargo = {
                            label: data.strCargoName,
                            value: data.intCargoId
                        }
                    } else {
                        data.cargo = ""
                    }
                    if (data.intBookingStatusId !== null && data.strBookingStatus !== "") {
                        data.bookingStatus = {
                            label: data.strBookingStatus,
                            value: data.intBookingStatusId
                        }
                    } else {
                        data.bookingStatus = ""
                    }
                    dispatch({ type: Types.GET_VESSEL_BOOKING_DETAILS, payload: data })
                }
            })
    }
}
// delete vesselBooking
export const vesselBookingDelete = (id) => (dispatch) => {
    let isLoading = true;
    dispatch({type: Types.DELETE_VESSEL_BOOKING, payload: isLoading})
    
    Axios.delete(`${process.env.REACT_APP_API_URL}certificate/issuingAuthority/${id}`)
    .then((res)=>{
      if(res.status === 200){
        const data = res.data;
        showToast('success', data.message);
        dispatch({type: Types.DELETE_VESSEL_BOOKING, payload: false});
        dispatch(getVesselBookingList())
      }
    })
  }