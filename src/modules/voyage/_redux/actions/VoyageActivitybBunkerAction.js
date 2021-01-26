import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../master/utils/ToastHelper";

/*==voyage boiler input handle==*/
export const handleChangeVoyageActivityBunkerInput = (name, value) => (
  dispatch
) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.CHANGE_VOYAGE_ACTIVITY_BUNKER_INPUT,
    payload: formData,
  });
};
/*==add multiple boiler data==*/
export const bunkerSubmitAction = (bunkerInput, voyageInput, intVoyageID) => (
  dispatch
) => {
  //form validatation check For Engineer
  if (voyageInput.positionSelected.length === 0) {
    showToast("error", "Position can't be blank !");
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
    showToast("error", "R.P.M can't be blank !");
    return false;
  }
  if (voyageInput.decEngineSpeed.length === 0) {
    showToast("error", "Engin Speed can't be blank !");
    return false;
  }
  if (voyageInput.decSlip.length === 0) {
    showToast("error", "Slip can't be blank !");
    return false;
  }
  //form validatation check For Bunker
  if (bunkerInput.decBunkerVlsfoCon.length === 0) {
    showToast("error", "CON can't be blank !");
    return false;
  }
  if (bunkerInput.decBunkerVlsfoAdj.length === 0) {
    showToast("error", "RCVD/ADJ can't be blank !");
    return false;
  }
  if (bunkerInput.decBunkerVlsfoRob.length === 0) {
    showToast("error", "ROB can't be blank !");
    return false;
  }
  if (bunkerInput.decBunkerLsmgoCon.length === 0) {
    showToast("error", "CON can't be blank !");
    return false;
  }
  if (bunkerInput.decBunkerLsmgoAdj.length === 0) {
    showToast("error", "RCVD/ADJ can't be blank !");
    return false;
  }
  if (bunkerInput.decBunkerLsmgoRob.length === 0) {
    showToast("error", "ROB can't be blank !");
    return false;
  }
  if (bunkerInput.decLubMeccCon.length === 0) {
    showToast("error", "CON can't be blank !");
    return false;
  }
  if (bunkerInput.decLubMeccAdj.length === 0) {
    showToast("error", "RCVD/ADJ can't be blank !");
    return false;
  }
  if (bunkerInput.decLubMeccRob.length === 0) {
    showToast("error", "ROB can't be blank !");
    return false;
  }
  if (bunkerInput.decLubMecylCon.length === 0) {
    showToast("error", "CON can't be blank !");
    return false;
  }
  if (bunkerInput.decLubMecylAdj.length === 0) {
    showToast("error", "RCVD/ADJ can't be blank !");
    return false;
  }
  if (bunkerInput.decLubMecylRob.length === 0) {
    showToast("error", "ROB can't be blank !");
    return false;
  }

  let unitId = 17; //await getUnit();
  let actionId = 1; //await getUserId();
  bunkerInput.intCreatedBy = actionId;
  bunkerInput.intShipConditionTypeID = voyageInput.conditionSelected;
  bunkerInput.intShipPositionID = voyageInput.positionSelected;
  bunkerInput.intUnitId = unitId;
  bunkerInput.intVoyageID = intVoyageID;
  bunkerInput.strRPM = voyageInput.strRPM;
  bunkerInput.decEngineSpeed = voyageInput.decEngineSpeed;
  bunkerInput.decSlip = voyageInput.decSlip;
  bunkerInput.intShipEngineID = null;
  bunkerInput.strRemarks = null;
  bunkerInput.strShipEngineName = null;

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  dispatch({
    type: Types.VOYAGE_BUNKER_SUBMITTING,
    payload: true,
  });

  let postUrl = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/vlsfoStore`;

  let storeRequisitionPost = axios
    .post(postUrl, bunkerInput)
    .then(function(response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      dispatch({
        type: Types.VOYAGE_BUNKER_SUBMIT,
        payload: responseList,
      });
      if (response.data.status) {
        showToast("success", "Voyage bunker info submited successfully !");
        dispatch({
          type: Types.VOYAGE_BUNKER_SUBMIT,
          payload: responseList,
        });
      } else {
        showToast("error", response.data.message);
      }
    })
    .catch(function(error) {
      responseList.isLoading = false;

      dispatch({
        type: Types.VOYAGE_BUNKER_SUBMIT,
        payload: responseList,
      });
    });
};
