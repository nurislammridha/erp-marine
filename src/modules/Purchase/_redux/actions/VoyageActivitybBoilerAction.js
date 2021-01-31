import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../master/utils/ToastHelper";

/*==voyage boiler input handle==*/
export const handleChangeVoyageActivityBoilerInput = (name, value) => (
  dispatch
) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.CHANGE_VOYAGE_ACTIVITY_BOILER_INPUT,
    payload: formData,
  });
};
/*==add multiple boiler data==*/
export const hanldeMultipleBoilerInfo = (
  voyageActivityBoilerInput,
  voyageInput
) => (dispatch) => {

  // validate boiler info
  const userId = 1; // will change latter
  if (voyageInput.positionSelected.length === 0) {
    showToast("error", "Ship position can't be blank !");
    return false;
  }
  if (voyageInput.fromDate.length === 0) {
    showToast("error", "Date can't be blank !");
    return false;
  }
  if (voyageInput.conditionSelected.length === 0) {
    showToast("error", "Condition can't be blank !");
    return false;
  }
  if (voyageInput.strRPM.length === 0) {
    showToast("error", "RPM can't be blank !");
    return false;
  }
  if (voyageInput.decEngineSpeed.length === 0) {
    showToast("error", "Engine speed can't be blank !");
    return false;
  }
  if (voyageInput.decSlip.length === 0) {
    showToast("error", "Slip can't be blank !");
    return false;
  }

  //========================

  if (voyageActivityBoilerInput.decWorkingPressure.length === 0) {
    showToast("error", "Working BAR Pressure can't be blank !");
    return false;
  }
  if (voyageActivityBoilerInput.dteCreatedAt.length === 0) {
    showToast("error", "Date can't be blank !");
    return false;
  }
  if (voyageActivityBoilerInput.decPhValue.length === 0) {
    showToast("error", "PH value can't be blank !");
    return false;
  }
  if (voyageActivityBoilerInput.decChloride.length === 0) {
    showToast("error", "Chloride can't be blank !");
    return false;
  }
  if (voyageActivityBoilerInput.decAlkalinity.length === 0) {
    showToast("error", "Alkalinity can't be blank !");
    return false;
  }
  const boilerSingleInput = {
    decWorkingPressure: parseFloat(voyageActivityBoilerInput.decWorkingPressure),
    decPhValue: parseFloat(voyageActivityBoilerInput.decPhValue),
    decChloride: parseFloat(voyageActivityBoilerInput.decChloride),
    decAlkalinity: parseFloat(voyageActivityBoilerInput.decAlkalinity),
    dteCreatedAt: voyageActivityBoilerInput.dteCreatedAt,
    intCreatedBy: userId,
  };
  dispatch({
    type: Types.ADD_MULTIPLE_BOILER_LIST,
    payload: boilerSingleInput,
  });
};

export const boilerSubmitAction = (boilerInput, voyageInput, intVoyageID) => (
  dispatch
) => {
  let unitId = 17; //await getUnit();
  let actionId = 1; //await getUserId();
  if (boilerInput.boilerlists.length === 0) {
    showToast("error", "Please add minimum one boiler item !");
    return false;
  }

  boilerInput.intCreatedBy = actionId;
  boilerInput.intShipConditionTypeID = voyageInput.conditionSelected;
  boilerInput.intShipPositionID = voyageInput.positionSelected;
  boilerInput.intUnitId = unitId;
  boilerInput.intVoyageID = intVoyageID;
  boilerInput.strRPM = voyageInput.strRPM;
  boilerInput.decEngineSpeed = voyageInput.decEngineSpeed;
  boilerInput.decSlip = voyageInput.decSlip;
  boilerInput.intShipEngineID = null;
  boilerInput.strRemarks = null;
  boilerInput.strShipEngineName = null;

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };
  dispatch({type: Types.VOYAGE_BOILER_SUBMITTING, payload: true});
  boilerInput.intUnitId = 17;
  let postUrl = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/boilerStore`;
  axios
    .post(postUrl, boilerInput)
    .then(function(response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      dispatch({
        type: Types.VOYAGE_BOILER_SUBMIT,
        payload: responseList,
      });
      if (response.data.status) {
        showToast("success", "Voyage boiler info submited successfully !");
      } else {
        showToast("error", response.data.message);
      }
    })
    .catch(function(error) {
      responseList.isLoading = false;
      dispatch({
        type: Types.VOYAGE_BOILER_SUBMIT,
        payload: responseList,
      });
    });
};

export const deleteBoilerMultipleDataByIndexAction = (index) => (dispatch) => {
  dispatch({
    type: Types.DELETE_BOILER_MULTIPLE_DATA,
    payload: index,
  });
};
