import axios from "axios";
import { showToast } from "../../../master/utils/ToastHelper";
import * as Types from "../types/Types";


export const GetCargoTypeList = () => async (dispatch) => {
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
            dispatch({ type: Types.GET_CARGO_TYPE_LIST, payload: data });
        });

};
export const GetPortList = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/asll/voyage/ports`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_PORT_LIST, payload: data });
        });

};
export const handleChangeBrands = (name, value, e = null) => (dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_ATTACHMENT, payload: data });
  
    if (name === 'banner' || name === 'image') {
        let reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            if (name === "banner") {
                data.name = 'bannerPreviewUrl';
            } else {
                data.name = 'logoPreviewUrl';
            }
            data.value = reader.result;
            dispatch({ type: Types.CHANGE_ATTACHMENT, payload: data });
        }
        reader.readAsDataURL(file)
    }
  };
  export const deleteBrandsImage = (name) => (dispatch) => {
    let data = {
        name: name,
        value: null,
    }
    dispatch({ type: Types.CHANGE_ATTACHMENT, payload: data });
  
    if (name === 'banner') {
        data.name = 'bannerPreviewUrl';
    } else {
        data.name = 'logoPreviewUrl';
    }
    dispatch({ type: Types.CHANGE_ATTACHMENT, payload: data });
  };
export const SaveDemandEntry = (stateData,attachmentPreview) => async (dispatch) => {
    const intCreatedBy = 1;
    console.log('stateData', stateData);
    
    let data = {
        status: false,
        message: "",
        isLoading: false,
        data: []
    };

    let postData = {
        dteLayCanFromDate: stateData.fromDate,
        dteLayCanToDate: stateData.fromDate,
        intCountryID: stateData.strCountry != null ? stateData.strCountry.value : 0,
        strCountry: stateData.strCountry != null ? stateData.strCountry.label : 'NA',
        dteETADateFromLoadPort: stateData.etaDateLoadPort,
        dteETADateToLoadPort: stateData.etaDateCtgPort,
        strComments: stateData.remarks,
        intCreatedBy: intCreatedBy,
        intPortFrom: stateData.portFrom != null ? stateData.portFrom.value : 0,
        strPortFrom: stateData.portFrom != null ? stateData.portFrom.label : "NO",
        intPortTo: stateData.portTo != null ? stateData.portTo.value : 0,
        strPortTo: stateData.portTo != null ? stateData.portTo.label : "NO",
        demandSheetData: stateData.multipleList,
        strImagePath : stateData.shipper != null ? stateData.shipper.label : "NO",
        intCharterer : stateData.charterer != null ? stateData.charterer.value : 0,
        strCharterer :  stateData.charterer != null ? stateData.charterer.label : "NO",
        intShipper : stateData.shipper != null ? stateData.shipper.value : 0,
        strShipper : stateData.shipper != null ? stateData.shipper.label : "NO",
       
    }

    console.log('postData2',postData);

    axios
        // .post(`http://iapps.akij.net/asll/public/api/v1/voyageLighter/postvesselDemandQntStore`,postData)
        .post(`http://iapps.akij.net/asll/public/api/v1/voyageLighter/postvesselDemandQntStore`, postData)
        .then(res => {
            console.log('res', res.data);
            data = {
                status: res.data.status,
                message: res.data.message,
                isLoading: false,
                data: res.data.data
            };
            showToast('success', res.data.message);
            dispatch({ type: Types.SUBMIT_DEMAND, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
                isLoading: false,
                data: []
            };
            showToast('error', 'Something went wrong. Please check all data !');
        });
    dispatch({ type: Types.SUBMIT_DEMAND, payload: data });
};


export const GetApprovePendingList = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    // const intVesselId = await getVesselId();
    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/voyageLighter/getPendingDataForAprv`,
            { headers: headers }
        )
        .then((res) => {
            console.log('demand det  data', res);
            let data = res.data;
            dispatch({ type: Types.GET_PENDING_TOPSHEET_LIST, payload: data });
        });

};


// export const GetDemandSheetDetByID = (intID) => async (dispatch) => {
//     // alert('enter');
//     let data = {};
//     const headers = {
//         "Content-Type": "application/json",
//     };
//     console.log("intdemandid",intID);


//     axios
//         .get(
//             `http://iapps.akij.net/asll/public/api/v1/voyageLighter/getDemandSheetDetailByID?intID=${intID}`,
//             { headers: headers }
//         )
//         .then((res) => {
//             console.log('ResponseDetails',res);
//             let data = res.data;
//             dispatch({ type: Types.GET_PENDING_DETAILLS_LIST, payload: data });
//         });

// };
export const GetDemandSheetDetByID = async (intID) => {
    // alert('enter');
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };
    console.log("intdemandid",intID);


    await axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/voyageLighter/getDemandSheetDetailByID?intID=${intID}`,
            { headers: headers }
        )
        .then((res) => {
            console.log('ResponseDetails',res);
             data = res.data;
            return data;

        });
        return data;

};


export const SaveDemandApproveEntry = (stateData) => async (dispatch) => {

    console.log('update approve data',stateData);

    const intCreatedBy = 1;
    console.log('stateData', stateData);
    let data = {
        status: false,
        message: "",
        isLoading: false,
        data: []
    };

    let postData = {
        intVesselDemandSheetID:stateData.intDemandsheetid,
        dteLayCanFromDate: stateData.fromDate,
        dteLayCanToDate: stateData.fromDate,
        intCountryID: stateData.strCountry != null ? stateData.strCountry.value : 0,
        strCountry: stateData.strCountry != null ? stateData.strCountry.label : 'NA',
        dteETADateFromLoadPort: stateData.etaDateLoadPort,
        dteETADateToLoadPort: stateData.etaDateCtgPort,
        strComments: stateData.remarks,
        intCreatedBy: intCreatedBy,
        intPortFrom: stateData.portFrom != null ? stateData.portFrom.value : 0,
        strPortFrom: stateData.portFrom != null ? stateData.portFrom.label : "null",
        intPortTo: stateData.portTo != null ? stateData.portTo.value : 0,
        strPortTo: stateData.portTo != null ? stateData.portTo.label : 'null',
        demandSheetAprvData: stateData.multipleList,
        // portFrom:stateData.portFrom.
    }

    console.log('postData Aprv',postData);

    axios
        // .post(`http://iapps.akij.net/asll/public/api/v1/voyageLighter/postvesselDemandQntStore`, postData)
        .post(`http://iapps.akij.net/asll/public/api/v1/voyageLighter/postvesselDemandQntApproveStore`, postData)
        .then(res => {
            console.log('res', res);
            data = {
                status: res.data.status,
                message: res.data.message,
                isLoading: false,
                data: res.data.data
            };
            showToast('success', res.data.message);
            dispatch({ type: Types.SUBMIT_DEMAND, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
                isLoading: false,
                data: []
            };
            showToast('error', 'Something went wrong. Please check all data !');
        });
    dispatch({ type: Types.SUBMIT_DEMAND, payload: data });
};


export const GetApproveCompleteList = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    // const intVesselId = await getVesselId();
    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/voyageLighter/getApproveDataDemandSheet`,
            { headers: headers }
        )
        .then((res) => {
            console.log('demand det  data', res);
            let data = res.data;
            dispatch({ type: Types.GET_APPROVE_TOPSHEET_LIST, payload: data });
        });

};


export const GetDemanApproveDetByID = async (intID) => {
    // alert('enter');
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };
    console.log("intdemandid",intID);


    await axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/voyageLighter/getApproveDataByID?intID=${intID}`,
            { headers: headers }
        )
        .then((res) => {
            console.log('ResponseDetails',res);
             data = res.data;
            return data;

        });
        return data;

};


export const UpdateDemandInformation = (stateData) => async (dispatch) => {

    console.log('UpdateDemandInformation',stateData);

    const intUpdatedBy = 1;
    console.log('stateData', stateData);
    let data = {
        status: false,
        message: "",
        isLoading: false,
        data: []
    };

    let postData = {
        strComments: stateData.remarks,
        intUpdatedBy: intUpdatedBy
        // portFrom:stateData.portFrom.
    }

    console.log('UpdateDemandInformation before Axios',postData);

    axios
        
        
        .put(
            `http://iapps.akij.net/asll/public/api/v1/voyageLighter/updateApprovedInformationDataDemandSheet?intID=${stateData.intDemandsheetid}`, postData
        )
        .then(res => {
            console.log('res', res);
            data = {
                status: res.data.status,
                message: res.data.message,
                isLoading: false,
                data: res.data.data
            };
            showToast('success', res.data.message);
            dispatch({ type: Types.UPDATE_DEMANDINFO, payload: data });
        })
        .catch((err) => {
            console.log("ErrorData", err);
            data = {
                status: false,
                message: err.data,
                isLoading: false,
                data: []
            };
            showToast('error', 'Something went wrong. Please check all data !');
        });
    dispatch({ type: Types.UPDATE_DEMANDINFO, payload: data });
};

export const GetShipperList = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/voyageLighter/getShipperList`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_SHIPPER_LIST, payload: data });
        });

};


export const GetChartererList = () => async (dispatch) => {
    let data = {};
    const headers = {
        "Content-Type": "application/json",
    };

    axios
        .get(
            `http://iapps.akij.net/asll/public/api/v1/voyageLighter/getChartererList`,
            { headers: headers }
        )
        .then((res) => {
            let data = res.data;
            dispatch({ type: Types.GET_CHARTERER_LIST, payload: data });
        });

};

