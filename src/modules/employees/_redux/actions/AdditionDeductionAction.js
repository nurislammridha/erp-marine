import * as Types from "../../types/Types";
import {getEmployeeId, getVesselId} from "../../../../app/modules/Auth/_redux/authCrud";
import axios from "axios";

// export const EmptyAdditionDeductionAddMessage = () => async (dispatch) => {
//   console.log('EmptyConsole')
//   dispatch({ type: Types.EMPTY_ADDITION_DEDUCTION_ADD_MESSAGE, payload: false });
// };

export const EmptyAdditionDeductionAddMessage = () => async (dispatch) => {
  console.log('EmptyConsole');
  dispatch({
    type: Types.EMPTY_ADDITION_DEDUCTION_ADD_MESSAGE,
    payload: true,
  });
};

export const EmptyDeductionDeleteMessage = () => async (dispatch) => {
  dispatch({
    type: Types.EMPTY_ADDITION_DEDUCTION_DELETE_MESSAGE,
    payload: true,
  });
};

export const GetAdditionDeductionTypeList = () => async (dispatch) => {
  let data = {};
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/getAdditionDeductionTypeList`,
      { headers: headers }
    )
    .then((res) => {
      let data = res.data;
      dispatch({ type: Types.GET_ADDITION_DEDUCTION_TYPE, payload: data });
    });
};

export const GetTransactionTypeList = () => async (dispatch) => {
  let data = {};
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/getTransactionType`,
      { headers: headers }
    )
    .then((res) => {
      let data = res.data;
      dispatch({ type: Types.GET_TRANSACTION_TYPE, payload: data });
    });
};

export const GetVesselAccountDetails = (intVesselId) => async (
  dispatch
) => {
  let data = {
    data: [],
  };
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(
      // `http://10.3.203.142:8081/ASSLAPI/public/api/v1/asllhr/getVesselAccountInfo/${intVesselId}`,
      `${process.env.REACT_APP_API_URL}asllhr/getVesselAccountInfo/${intVesselId}`,
      { headers: headers }
    )
    .then((res) => {
      data = res.data;
      dispatch({
        type: Types.GET_VESSEL_ACCOUNT_DETAILS,
        payload: data,
      });
    });
};

export const GetVesselItem = (intVesselId) => async (
  dispatch
) => {
  let vesselId=null;
  if(typeof intVesselId!=='undefined'){
    vesselId=intVesselId;
  }
  let data = {
    data: [],
  };
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/vesselItem?intVesselId=${vesselId}`,
      { headers: headers }
    )
    .then((res) => {
      data = res.data;
      dispatch({
        type: Types.GET_VESSEL_ITEM,
        payload: data,
      });
    });
};

export const GetVesselItemById = (intID) => async (
  dispatch
) => {
 
  let data = {
    data: [],
  };
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/vesselItem/`+intID,
      { headers: headers }
    )
    .then((res) => {
      console.log('ItemDetailsResponse',res);
      data = res.data;
      dispatch({
        type: Types.GET_VESSEL_ITEM_DETAILS,
        payload: data,
      });
    });
};

export const GetAdditionDeductionListByEmployee = (intEmployeeId) => async (
  dispatch
) => {
  let data = {
    data: [],
  };
  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .get(
      `${process.env.REACT_APP_API_URL}asllhr/additionDeductionListByEmployee?intEmployeeId=${intEmployeeId}`,
      { headers: headers }
    )
    .then((res) => {
      console.log('ResponseAddition',res);
      data.data = res.data.data;
      dispatch({
        type: Types.GET_ADDITION_DEDUCTION_BY_EMPLOYEE,
        payload: data,
      });
    });
};

export const DeleteEmployeeAdditionDeductionData = (id) => async (dispatch) => {
  let data = {
    status: false,
    message: "",
    isLoading: false,
    data: 0,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  data.isLoading = true;
  axios
    .delete(
      `${process.env.REACT_APP_API_URL}asllhr/deleteAdditionDetailsData?intID=` +
        id,
      { headers: headers }
    )
    .then((res) => {
      console.log('AdditionDeleteResponse',res);
      data.status = res.data.status;
      data.isLoading = false;
      data.data = res.data.data;
      data.message = res.data.message;
      dispatch({ type: Types.DELETE_ADDITION_DEDUCTION, payload: data });
    });
};

export const UpdateEmployeeAdditionDeduction = (
  id,
  amount,
  isServerUpdate = false
) => async (dispatch) => {
  let data = {
    status: false,
    message: "",
    isLoading: false,
    data: {},
  };

  const headers = {
    "Content-Type": "application/json",
  };

  data.isLoading = true;
  if (isServerUpdate) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}asllhr/updateAdditionDetailsData?intID=${id}&amount=${amount}`,
        { headers: headers }
      )
      .then((res) => {
        data.status = res.data.status;
        data.isLoading = false;
        data.message = res.data.message;
        data.data = res.data.data;
        dispatch({ type: Types.UPPDATE_ADDITION_DEDUCTION, payload: data });
      });
  } else {
    data.status = true;
    data.isLoading = false;
    data.message = "Updating...";
    data.data = {
      intID: id,
      amount: amount,
    };
    dispatch({ type: Types.UPPDATE_ADDITION_DEDUCTION, payload: data });
  }
};

export const AddAdditionDeductionAction = (additionDeduction) => async (
  dispatch
) => {
  let data = {
    status: false,
    message: "",
    isLoading: false,
  };
  let intActionBy=await getEmployeeId();
  // let intVesselId=await getVesselId();

  let rowData = [];
  additionDeduction.multipleList.forEach((element) => {
    let intVesselItemId;
    let strVesselItemName;
    let images;
    let strRemarks;
 

    if(typeof element.intVesselItemId==='undefined' && typeof element.strVesselItemName==='undefined'){
     intVesselItemId=null;
     strVesselItemName=null;
    }else{
      intVesselItemId=element.intVesselItemId;
      strVesselItemName=element.strVesselItemName;
    }
    if(typeof element.images==='undefined' || typeof element.images==="" ){
      images=null;
    }else{
      images=element.images;
    }

    if(typeof element.strRemarks==='undefined'){
      strRemarks=null;
    }else{
      strRemarks=element.strRemarks;
    }
    let dataItem = {
      intTypeId: element.intTypeId,
      decQty: parseFloat(element.decQty),
      intVesselItemId:intVesselItemId,
      strVesselItemName: strVesselItemName,
      strAttachment: images,
      strAmount: parseFloat(element.strAmount),
      strRemarks: strRemarks,
      strTypeName: element.strTypeName,
      intTransactionTypeId: element.intTransactionTypeId,
      ysnAddition: element.ysnAddition,
      intMonthId: parseInt(element.intMonthId),
      intYear: parseInt(element.intYear),
    };
    rowData.push(dataItem);
  });

  let  intEmployeeId;
  let intVesselId;
  let strVesselName;
  if(additionDeduction.employeeDetails==""){
   intEmployeeId=null;
  }else{
    intEmployeeId=additionDeduction.employeeDetails.intID;
  }

  if(additionDeduction.vesselData==""){
    intVesselId=null;
    strVesselName=null;
   }else{
     intVesselId=additionDeduction.vesselData.value;
     strVesselName=additionDeduction.vesselData.label;
   }
  let postData = {
    additionDeductionMultipleList: rowData,
    intEmployeeId: intEmployeeId,
    intVesselId: intVesselId,
    intActionBy:intActionBy,
    strVesselName: strVesselName,
    currencyId: additionDeduction.currencyData.value,
    strCurrencyName: additionDeduction.currencyData.label,
    decTotal: additionDeduction.strSubtotal,
  };

  axios
    .post(
      `${process.env.REACT_APP_API_URL}asllhr/createAdditionDeduction`,postData
    )
    .then(async (res) => {
      console.log('ResponseAdditionPost',res);
      data = {
        status: true,
        message: res.data.message,
        isLoading: true,
      };
      dispatch({ type: Types.POST_ADDITION_DEDUCTION, payload: data });
    })
    .catch((err) => {
      console.log("ErrorData", err);
      data = {
        status: false,
        message: err.data,
        isLoading: false,
      };
      dispatch({ type: Types.POST_ADDITION_DEDUCTION, payload: data });
    });
};
