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
    layTimeOperations: [],
  },
};

const LaytimeMultiple = (state = initialState, action) => {
  switch (action.type) {
      
    case Types.LAYTIME_MULTIPLE_DATA:
        console.log('action.payload', action.payload);
       
    
         let laytimeDetailsData = {...state.layTimeMultipleInput};
        for (let i = 0; i < laytimeDetailsData.layTimeDetails.length; i++) {
            if(action.payload.index === i){
               laytimeDetailsData.layTimeDetails[i][action.payload.name]=action.payload.value;
            }    
        }  
      return {
        ...state,
        layTimeMultipleInput:laytimeDetailsData
      };

    case Types.LAYTIMEROW_SOF_LIST:
      return {
        ...state,
        softShow: !state.softShow,
      };


    case Types.ADD_NEW_SOF:
      console.log("action.payload", action.payload);
      let softObj = {
        dteOperationDate: "",
        dteStartTime: "",
        dteEndTime: "",
        numTimeUsed: null,
        numRatio: null,
        strRemarks: "",
      };

      let laytimedetailsDataset = { ...state.layTimeMultipleInput };
      const newSofts = laytimedetailsDataset.layTimeDetails = [...laytimedetailsDataset.layTimeDetails, softObj];
      laytimedetailsDataset.layTimeDetails = newSofts;
      return {
        ...state,
        layTimeMultipleInput: laytimedetailsDataset
      };

      case Types.ADD_NEW_OPERATION:
        console.log("action.payload", action.payload);
        let softObj = {
          dteOperationDate: "",
          dteStartTime: "",
          dteEndTime: "",
          numTimeUsed: null,
          numRatio: null,
          strRemarks: "",
        };
  
        let laytimedetailsDataset = { ...state.layTimeMultipleInput };
        const newSofts = laytimedetailsDataset.layTimeDetails = [...laytimedetailsDataset.layTimeDetails, softObj];
        laytimedetailsDataset.layTimeDetails = newSofts;
        return {
          ...state,
          layTimeMultipleInput: laytimedetailsDataset
        };

    default:
      break;
  }
  return state;
};

export default LaytimeMultiple;
