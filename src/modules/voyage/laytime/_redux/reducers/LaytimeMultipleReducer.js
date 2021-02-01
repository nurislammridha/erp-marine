import * as Types from "../types/Types";
const initialState = {
  loading: false,
  softShow: false,
  laytimeOperationData: {
    intShipID: null,
    strVoyageNo: null,
    intOperationRemarkID: null,
  },
  
  intLayTimeHeaderID: null,
  intLayTimeRowID: null,

  // final submit
  layTimeMultipleInput: {
    intLayTimeHeaderID: null,
    intLayTimeRowID: null,
    // isEmptyData:null,
    layTimeDetails: [
      {
        // intLayTimeDetailsID:null,
        dteOperationDate: "",
        dteStartTime: "",
        dteEndTime: "",
        numTimeUsed: null,
        numRatio: null,
        strRemarks: ""
      },
    ],
    layTimeOperations: [
      {
        // intLaytimeOperationID:null,
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
   
      const sof = action.payload.sof;
      const operation = action.payload.operation;
      let headerData = { ...state.layTimeMultipleInput };
      return {
        ...state,
        softShow: !state.softShow,
        layTimeMultipleInput: headerData,
      };

    case Types.REMOVE_PARENT_SOF_LIST:
      return {
        ...state,
        softShow: false,
      };

    case Types.LAYTIME_DETAILS_ENTRY_HEADER_DATA:
      const layTimeMultipleInputData = { ...state.layTimeMultipleInput };
      layTimeMultipleInputData[action.payload.name] = action.payload.value;
      return {
        ...state,
        intLayTimeHeaderID: action.payload.name === "intLayTimeHeaderID" ? action.payload.value : state.intLayTimeHeaderID,
        intLayTimeRowID: action.payload.name === "intLayTimeRowID" ? action.payload.value : state.intLayTimeRowID,
        layTimeMultipleInput: layTimeMultipleInputData,
      };

    case Types.ADD_NEW_SOF:
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

        const newSofts = [
          ...laytimedetailsDataset.layTimeDetails,
          softObj,
        ];
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
        const newOperation  = [
          ...layTimeOperationDataSet.layTimeOperations,
          operationObj,
        ];
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
      if (action.payload.status) {
        return {
          ...state,
          loading: action.payload.loading,
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
