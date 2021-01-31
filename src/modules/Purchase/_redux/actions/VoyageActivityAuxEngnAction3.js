import * as Types from "../types/Types";
import axios from "axios";
import { showToast } from "../../../master/utils/ToastHelper";

/*==voyage boiler input handle==*/
export const handleChangeVoyageActivityAuxEngnInput = (name, value) => (
  dispatch
) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({
    type: Types.CHANGE_VOYAGE_ACTIVITY_AUX_ENGN_INPUT,
    payload: formData,
  });
};

export const AuxEngnSubmitAction = (
  auxEngine3Input,
  voyageInput,
  intVoyageID
) => (dispatch) => {
  let unitId = 17; //await getUnit();
  let actionId = 1; //await getUserId();

  //VALIDATION//
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
  if (auxEngine3Input.dceRH.length === 0) {
    showToast("error", "R/H can't be blank !");
    return false;
  }
  if (auxEngine3Input.dceLoad.length === 0) {
    showToast("error", "Load can't be blank !");
    return false;
  }
  if (auxEngine3Input.dceExhtTemp1.length === 0) {
    showToast("error", "Minimum Aux Temp can't be blank !");
    return false;
  }
  if (auxEngine3Input.dceExhtTemp2.length === 0) {
    showToast("error", "Maximum Aux Temp can't be blank !");
    return false;
  }
  if (auxEngine3Input.dceJacketTemp.length === 0) {
    showToast("error", "Jacket Temp can't be blank !");
    return false;
  }
  if (auxEngine3Input.dceScavTemp.length === 0) {
    showToast("error", "SCAV Temp can't be blank !");
    return false;
  }
  if (auxEngine3Input.dceLubOilTemp.length === 0) {
    showToast("error", "Lub Oil Temp can't be blank !");
    return false;
  }
  if (auxEngine3Input.dceJacketPressure.length === 0) {
    showToast("error", "Jacket Pressure can't be blank !");
    return false;
  }
  if (auxEngine3Input.dceScavPressure.length === 0) {
    showToast("error", "Scav Pressure can't be blank !");
    return false;
  }

  let responseList = {
    isLoading: true,
    data: {},
    status: false,
  };

  dispatch({
    type: Types.VOYAGE_AUX_ENGN_3_SUBMITTING,
    payload: responseList,
  });

  auxEngine3Input.intCreatedBy = actionId;
  auxEngine3Input.intShipConditionTypeID = voyageInput.conditionSelected.id;
  auxEngine3Input.intShipPositionID = voyageInput.positionSelected.id;
  auxEngine3Input.intUnitId = unitId;
  auxEngine3Input.intVoyageID = intVoyageID;
  auxEngine3Input.strRPM = voyageInput.strRPM;
  auxEngine3Input.decEngineSpeed = voyageInput.decEngineSpeed;
  auxEngine3Input.decSlip = voyageInput.decSlip;
  auxEngine3Input.strRemarks = null;

  let postUrl = `http://iapps.akij.net/asll/public/api/v1/asll/voyageActivity/exhtStore`;
  axios
    .post(postUrl, auxEngine3Input)
    .then(function(response) {
      responseList.data = response.data;
      responseList.isLoading = false;
      responseList.status = response.data.status;
      dispatch({
        type: Types.VOYAGE_AUX_ENGN_SUBMIT,
        payload: responseList,
      });

      if (response.data.status) {
        showToast("success", response.data.message);
      } else {
        showToast("error", response.data.message);
      }
    })
    .catch(function(error) {
      responseList.isLoading = false;

      dispatch({
        type: Types.VOYAGE_AUX_ENGN_3_SUBMIT,
        payload: responseList,
      });
      showToast(
        "error",
        "Something went wrong, Please fill all data correctly and try again !"
      );
    });
};
