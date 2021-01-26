import * as Types from "../../types/Types";
import { generateNewDate, currentdate } from "../../../CCO/utils/DateHelper";
import axios from "axios";
import { getVesselId } from "../../../../app/modules/Auth/_redux/authCrud";



export const VesselEmptyMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_VESSEL_ADD_MESSAGE, payload: true });
};

export const VesselEmptyEditMessage = () => async (dispatch) => {
    dispatch({ type: Types.EMPTY_VESSEL_EDIT_MESSAGE, payload: true });
};

export const GetVesselList = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };
    const intVesselId = await getVesselId();
    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/asll/vessel?intVesselId=${intVesselId}`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_VESSEL, payload: data });
        });

};

export const GetVesselDetails = async (vesselId) => {
    let intID = vesselId.vesselId;
    let responseList = {
        isLoading: true,
        data: {},
    };
    const headers = {
        "Content-Type": "application/json",
    };


    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/asll/vessel/show/${intID}`,
            { headers: headers }
        )
        .then((res) => {
            responseList.data = res.data.data;
            // return data;
        })
        .catch((err) => {
            console.log("ErrorData", err);
        });
    return responseList;
};

export const GetVesselTypeAction = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/asll/vessel/types`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            console.log('data', data);
            dispatch({ type: Types.GET_VESSEL_TYPE, payload: data });
        });

};

export const GetCountryDataAction = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/asll/getCountries`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_COUNTRY, payload: data });
        });

};



export const AddVessel = (vesselData) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: false
    };
    let postData = {
        strVesselName: vesselData.strVesselName,
        intVesselTypeID: vesselData.vesselTypeData.value,
        strVesselTypeName: vesselData.vesselTypeData.label,
        intYardCountryId: vesselData.countryData.value,
        strYardCountryName: vesselData.countryData.label,
        strVesselFlag: vesselData.strVesselFlag,
        numDeadWeight: vesselData.numDeadWeight,
        strBuildYear: vesselData.strBuildYear,
        strEngineName: vesselData.strEngineName,
        intTotalCrew: vesselData.intTotalCrew,
    }


    axios
        .post(
            `http://iapps.akij.net/asll/public/api/v1/asll/vessel/store`, postData
        )
        .then(async (res) => {
            data = {
                status: true,
                message: res.data.message,
                isLoading: true
            };
            dispatch({ type: Types.POST_VESSEL, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
                isLoading: false
            };
            dispatch({ type: Types.POST_VESSEL, payload: data });
        });
};

export const UpdateVessel = (vesselData) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: false
    };
    let postData = {
        intID: vesselData.intID,
        strVesselName: vesselData.strVesselName,
        intVesselTypeID: vesselData.vesselTypeData.value,
        strVesselTypeName: vesselData.vesselTypeData.label,
        intYardCountryId: vesselData.countryData.value,
        strYardCountryName: vesselData.countryData.label,
        strVesselFlag: vesselData.strVesselFlag,
        numDeadWeight: vesselData.numDeadWeight,
        strBuildYear: vesselData.strBuildYear,
        strEngineName: vesselData.strEngineName,
        intTotalCrew: vesselData.intTotalCrew,
    }

    axios
        .put(
            `http://iapps.akij.net/asll/public/api/v1/asll/vessel/update`, postData
        )
        .then(async (res) => {
            data = {
                status: true,
                message: res.data.message,
                isLoading: true
            };
            dispatch({ type: Types.EDIT_VESSEL, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
                isLoading: false
            };
            dispatch({ type: Types.EDIT_VESSEL, payload: data });
        });
};


export const DeleteVessel = (intID) => async (dispatch) => {
    let data = {
        data: {},
        status: false,
        addMessage: ''
    };
    axios
        .delete(
            `http://iapps.akij.net/asll/public/api/v1/asll/vessel/delete/${intID}`
        )
        .then((res) => {
            dispatch({ type: Types.DELETE_VESSEL, payload: res.data.data });
        });
};