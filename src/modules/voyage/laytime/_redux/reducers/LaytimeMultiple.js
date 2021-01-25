import * as Types from "../types/Types";
const initialState = {
    loading: false,
    laytimeOperationData: {
        intShipID: null,
        strVoyageNo: null,
        intOperationRemarkID: null
    },
    laytimeDetailsData:  {
        dteOperationDate: "",
        dteStartTime: "",
        dteEndTime: "",
        numTimeUsed: null,
        numRatio: null,
        strRemarks: ""
      },
      
      // final submit
    layTimeMultipleInput:{
        intLayTimeHeaderID: null,
        intLayTimeRowID: null,
        layTimeDetails: [],
        layTimeOperations: []
    }
}

const LaytimeMultiple = (state = initialState, action) => {

    switch (action.type) {
        case Types.LAYTIME_MULTIPLE_DATA:
            const laytimeOperationData = { ...state.laytimeOperationData };
            const laytimeDetailsData = { ...state.laytimeDetailsData };
            const layTimeMultipleInput = { ...state.layTimeMultipleInput };

            laytimeOperationData[action.payload.name] = action.payload.value;
            laytimeDetailsData[action.payload.name] = action.payload.value;
            layTimeMultipleInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                laytimeOperationData,
                laytimeDetailsData,
                layTimeMultipleInput,
            };
       
        default:
            break;
    }
    return state;
}

export default LaytimeMultiple;
