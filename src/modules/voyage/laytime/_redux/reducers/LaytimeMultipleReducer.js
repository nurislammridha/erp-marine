import * as Types from "../types/Types";
const initialState = {
  loading: false,
  softShow: false,

  laytimeOperationData: {
    intShipID: null,
    strVoyageNo: null,
    intOperationRemarkID: null,
  },

  layTimeDetailsSofs: [],

  layTimeSof: [],
  layTimeOperation: [],

  // final submit
  layTimeMultipleInput: {
    intLayTimeHeaderID: null,
    intLayTimeRowID: null,
    layTimeDetails: [
      {
        dteOperationDate: "",
        dteStartTime: "",
        dteEndTime: "",
        numTimeUsed: null,
        numRatio: null,
        strRemarks: "",
      },
    ],
    layTimeOperations: [
      {
        intShipID: null,
        strVoyageNo: null,
        intOperationRemarkID: null,
      },
    ],
  },
};

const LaytimeMultiple = (state = initialState, action) => {
  switch (action.type) {
    case Types.LAYTIME_MULTIPLE_DATA:
      console.log("action.payload", action.payload);

      let laytimeDetailsData = { ...state.layTimeMultipleInput };
      for (let i = 0; i < laytimeDetailsData.layTimeDetails.length; i++) {
        if (action.payload.index === i) {
          laytimeDetailsData.layTimeDetails[i][action.payload.name] =
            action.payload.value;
        }
      }
      return {
        ...state,
        layTimeMultipleInput: laytimeDetailsData,
      };

    case Types.LAYTIME_OPERATION_DATA:
      console.log("action.payload.operation.data", action.payload);

      let layTimeOperationData = { ...state.layTimeMultipleInput };
      for (let i = 0; i < layTimeOperationData.layTimeOperations.length; i++) {
        if (action.payload.index === i) {
          layTimeOperationData.layTimeOperations[i][action.payload.name] =
            action.payload.value;
        }
      }
      return {
        ...state,
        layTimeMultipleInput: layTimeOperationData,
      };

    case Types.LAYTIMEROW_SOF_LIST:
      // if(action.payload){
      //   console.log("LAYTIMEROW_SOF_LIST : >>>>>>>>>",action.payload);
      // }

      console.log(
        "LAYTIMEROW_SOF_LIST ACTION PAYLOAD : >>>>>>>> ",
        action.payload
      );
      console.log("LAYTIMEROW_SOF_LIST : >>>>>>>>>", action.payload.sof);
      console.log(
        "LAYTIMEROW_OPERATION_LIST : >>>>>>>>>",
        action.payload.operation
      );
      // const sof = action.payload.;

      const sof = action.payload.sof;
      const operation = action.payload.operation;

      let headerData = { ...state.layTimeMultipleInput };
      // console.log("headerData: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>", headerData);
      // console.log("action.payload", action.payload);

      // headerData.intLayTimeRowID = headerData[0].intLayTimeRowID;
      // headerData.intLayTimeHeaderID = headerData[0].intLayTimeHeaderID;
      return {
        ...state,
        softShow: !state.softShow,
        layTimeMultipleInput: headerData,
        // layTimeSof:sof,
        // layTimeOperation:operation,
      };

    case Types.REMOVE_PARENT_SOF_LIST:
      console.log("PARENT DATA : ", action.payload);

      return {
        ...state,
        softShow: false,
      };

    case Types.LAYTIME_DETAILS_ENTRY_HEADER_DATA:
      const layTimeMultipleInputData = { ...state.layTimeMultipleInput };
      layTimeMultipleInputData[action.payload.name] = action.payload.value;
      return {
        ...state,
        layTimeMultipleInput: layTimeMultipleInputData,
      };

    case Types.ADD_NEW_SOF:
      console.log("action.payload ADD_NEW_SOF >>>>>>>> ", action.payload);
      let softObj = null;
      if (action.payload === null) {
        softObj = {
          dteOperationDate: "",
          dteStartTime: "",
          dteEndTime: "",
          numTimeUsed: null,
          numRatio: null,
          strRemarks: "",
        };
      } else {
        softObj = action.payload;
      }

      if (softObj !== null) {
        let laytimedetailsDataset = { ...state.layTimeMultipleInput };
        laytimedetailsDataset.intLayTimeRowID = softObj.intLayTimeRowID;
        laytimedetailsDataset.intLayTimeHeaderID = softObj.intLayTimeHeaderID;

        const newSofts = (laytimedetailsDataset.layTimeDetails = [
          ...laytimedetailsDataset.layTimeDetails,
          softObj,
        ]);
        laytimedetailsDataset.layTimeDetails = newSofts;

        return {
          ...state,
          layTimeMultipleInput: laytimedetailsDataset,
          softShow: true,
        };
      } else {
        return {
          ...state,
        };
      }

    case Types.ADD_NEW_OPERATION:
      let operationObj = null;
      if (action.payload === null) {
        operationObj = {
          intShipID: null,
          strVoyageNo: null,
          intOperationRemarkID: null,
        };

      }

      if (operationObj !== null) {
        let layTimeOperationDataSet = { ...state.layTimeMultipleInput };  
        const newOperation = (layTimeOperationDataSet.layTimeOperations = [
          ...layTimeOperationDataSet.layTimeOperations,
          operationObj,
        ]);
        layTimeOperationDataSet.layTimeOperations = newOperation;

        return {
          ...state,
          layTimeMultipleInput: layTimeOperationDataSet,
          softShow: true,
        };
      } else {
        return {
          ...state,
        };
      }

    case Types.SOFANDOPERATION_DATA_SUBMITTING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case Types.SOFANDOPERATION_DATA_SUBMIT:
      //   let cloneObj = state.layTimeMultipleInput;
      //   console.log('action.payload laytime', action.payload);
      //  cloneObj.push(action.payload.data);

      if (action.payload.status) {
        return {
          ...state,
          // laytimeRowInput: initialState.laytimeRowInput,
          loading: action.payload.loading,
          // layTimeRowList:action.payload.layTimeRowList,
          // layTimeMultipleInput:cloneObj,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }

    case Types.DELETE_SOF_DATA:
      let deleteSofData = { ...state.layTimeMultipleInput };
      deleteSofData.layTimeDetails.splice(action.payload, 1);
      return {
        ...state,
        layTimeMultipleInput: deleteSofData,
      };

    case Types.DELETE_OPERATION_DATA:
      let deleteOperationData = { ...state.layTimeMultipleInput };
      deleteOperationData.layTimeOperations.splice(action.payload, 1);
      return {
        ...state,
        layTimeMultipleInput: deleteOperationData,
      };

    default:
      break;
  }
  return state;
};

export default LaytimeMultiple;
