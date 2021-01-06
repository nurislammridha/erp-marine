import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../master/utils/ToastHelper";
import { getVesselId } from "../../../../app/modules/Auth/_redux/authCrud";

export const GetVoyageActivityList = (searchValue, voyageId, vessel) => async (dispatch) => {
  let url = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity`;
  const vesselId = await getVesselId();
  let isSearchCondition = false;
  if (typeof voyageId === 'undefined') {
    voyageId = "";
  }
  if (typeof vessel === 'undefined') {
    vessel = "";
  }
  if (typeof searchValue === 'undefined') {
    searchValue = "";
  }
  if (searchValue !== "" || voyageId !== "" || vessel !== "") {
    if (vesselId !== null) {
      isSearchCondition = true;
      url += `?search=${searchValue}&voyage=${voyageId}&vessel=${vesselId}`;
    } else {
      // isSearchCondition = true;
      url += `?search=${searchValue}&voyage=${voyageId}&vessel=${vessel}`;
    }
  }

  if (!isSearchCondition && vesselId !== null) {
    url += `?vessel=${vesselId}`;
  }

  console.log('url', url);


  axios
    .get(url)
    .then((res) => {
      let data = res.data;
      dispatch({ type: Types.GET_VOYAGE_ACTIVITY, payload: data });
    });
};

export const GetVoyageActivityDetail = (id) => (dispatch) => {
  axios
    .get(
      `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/show/${id}`
    )

    .then((res) => {
      let data = res.data.data;
      console.log('res.data', res.data)
      dispatch({ type: Types.GET_VOYAGE_ACTIVITY_DETAIL, payload: data });
    });
};


export const handleChangeVoyageActivityCreateInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  console.log('formData', formData)
  dispatch({
    type: Types.CHANGE_VOYAGE_ACTIVITY_CREATE_INPUT,
    payload: formData,
  });
};

export const getShipConditionType = () => async (dispatch) => {
  axios
    .get(
      `http://iapps.akij.net/asll/public/api/v1/asll/getShipConditionType`
    )
    .then((res) => {
      let data = res.data.data;
      dispatch({ type: Types.GET_VOYAGE_SHIP_CONDITION, payload: data });
    });
};

export const handleChangeVoyageActivityInput = (name, value) => (
  dispatch
) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.CHANGE_VOYAGE_ACTIVITY_INPUT,
    payload: formData,
  });
};
export const voyageWindDirection = () => (
  dispatch
) => {
  let responsList = {
    isLoading: false,
    data: [],
    status: false,
  };

  let windData = [
    {
      id: 1,
      name: 'N',
    },
    {
      id: 2,
      name: 'NNE',
    },
    {
      id: 3,
      name: 'NE',
    },
    {
      id: 4,
      name: 'ENE',
    },
    {
      id: 5,
      name: 'E',
    },
    {
      id: 6,
      name: 'ESE',
    },
    {
      id: 7,
      name: 'SE',
    },
    {
      id: 8,
      name: 'SSE',
    },
    {
      id: 9,
      name: 'S',
    },
    {
      id: 10,
      name: 'SSW',
    },
    {
      id: 11,
      name: 'SW',
    },
    {
      id: 12,
      name: 'WSW',
    },
    {
      id: 13,
      name: 'W',
    },
    {
      id: 14,
      name: 'WNW',
    },
    {
      id: 15,
      name: 'NW',
    },
    {
      id: 16,
      name: 'NNW',
    },
  ];
  dispatch({
    type: Types.VOYAGE_WIND_DIREACTION_DATA,
    payload: windData,
  });
  // const url = `http://iapps.akij.net/asll/public/api/v1/asll/voyage/ports`;

  return responsList;
};

export const officerActivitySubmissionAction = (data, intVoyageID) => (dispatch) => {
  let unitId = 17; //await getUnit();
  let actionId = 1; //await getUserId();

  // return false;

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  const postData = {
    intUnitId: unitId,
    intVoyageID: intVoyageID,
    intShipPositionID: data.positionSelected,
    intShipConditionTypeID: data.intShipConditionTypeId.value,
    dteCreatedAt: data.date,
    decLatitude: parseFloat(data.latitude),
    decLongitude: parseFloat(data.longitude),
    intCourse: parseInt(data.course),
    timeSeaStreaming: data.streaming,
    timeSeaStoppage: data.stoppage,
    decSeaDistance: data.decSeaDistance,
    decSeaDailyAvgSpeed: parseFloat(data.dailySpeed),
    decSeaGenAvgSpeed: parseFloat(data.generalSpeed),
    strSeaDirection: typeof data.strSeaDirection.label == undefined ? data.strSeaDirection.label : null,
    strSeaState: data.seaDSS,
    strWindDirection: typeof data.strWindDirection.label == undefined ? data.strWindDirection.label : null,
    decWindBF: parseFloat(data.windBF),
    intETAPortToID: null,
    strETAPortToName: null,
    intETDPortToID: null,
    strETDPortToName: null,
    strETADateTime: data.etadate,
    strETDDateTime: data.etaTime,
    strRemarks: data.remarks,
    intVoyagePortID: null,
    decTimePortWorking: 0,
    strPortDirection: null,
    strPortDSS: null,
    decCargoTobeLD: 0,
    decCargoPrevLD: 0,
    decCargoDailyLD: 0,
    decCargoTTLLD: 0,
    intVlsfoRcvd: 0,
    intLsmgRcvd: 0,
    intLuboilRcvd: 0,
    decCargoBalanceCGO: 0,
  };

  // console.log('postData', postData);
  // return false;

  dispatch({
    type: Types.VOYAGE_ACTIVITY_CREATE_OFFICER_SUBMITTING,
    payload: true,
  });

  let postUrl = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/store`;
  axios
    .post(postUrl, postData)
    .then(function (response) {
      const { status, message } = response.data;

      if (status) {
        showToast("success", message);
      } else {
        showToast("error", message);
      }
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      if (response.data.status) {
        dispatch({
          type: Types.VOYAGE_ACTIVITY_CREATE_OFFICER_SUBMIT,
          payload: responseList,
        });
      } else {
        showToast("error", message);
      }
    })
    .catch(function (error) {
      responseList.isLoading = false;

      dispatch({
        type: Types.VOYAGE_ACTIVITY_CREATE_OFFICER_SUBMIT,
        payload: responseList,
      });
    });
}


