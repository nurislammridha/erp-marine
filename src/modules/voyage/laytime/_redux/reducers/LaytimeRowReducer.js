import { concat } from "lodash";
import * as Types from "../types/Types";

const initialState = {
    loading: false,
    laytimeRowData:[],
    layTimeRowList: [],
    laytimeDataList:[],
    laytimeRowInput: {
        intLayTimeHeaderID: null,
        intLayTimeRowID: null,
        numTimeUsed: null,
        numRatio: null,
        strRemarks: '',
        intShipID: null,
        intType: null,
        intPortID: null,
        intCargoID: null,
        numBLQty: null,
        intTermsID: null,
        numTimeAllowed: null,
        intTimeAllowedTypeID: null,
        numDemurrageRate: null,
        numDespatchRate: null,
        numDespatchRatePercent: null,
        intDemurrageCurrID: null,
        numLaytimeUsed: null,
        numDemurrageDespatchAmount: null,
        numLodingOrDischargeRate: null,
        dteLaytimeCommenced: '',
        dteLaytimeCompleted: '',
        dteTermArraivalTime: '',
        numTimeAllowence: null,
        dteTermSailTime: '',
        dteNORtender: '',
        intAdditionalDay: null,
        numAdditionalHrs: null,
        intActionBy: 1,
    },

    // layTimeRows: [
    // {
    //     intLayTimeHeaderID: null,
    //     intType: null,
    //     intPortID: null,
    //     intCargoID: null,
    //     numBLQty: null,
    //     intTermsID: null,
    //     numTimeAllowence: null,
    //     intTimeAllowedTypeID: null,
    //     numDemurrageRate: null,
    //     numDespatchRate: null,
    //     numDespatchRatePercent: null,
    //     intDemurrageCurrID: null,
    //     numTimeAllowed: null,
    //     intAdditionalDay: null,
    //     numAdditionalHrs: null,
    //     numLaytimeUsed: null,
    //     strTimeRemaining: ''
    // }
    // ]

}

const LaytimeRowReducer = (state = initialState, action) => {

    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_LAYTIME_DETAIL_INPUT:
            const laytimeRowInput = { ...state.laytimeRowInput };
            laytimeRowInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                laytimeRowInput,
            };

        case Types.GET_LAYTIMEROW_LIST_FROM_API:
           

            if(action.payload){
                const rowPayload = action.payload;
                let newRowList = state.laytimeDataList;
                return {
                    ...state,
                  laytimeDataList: concat(state.laytimeDataList, rowPayload),
                    //  laytimeDataList:newRowList,
                    };
                }         
        case Types.LAYTIME_DATA_SUBMIT:
            let cloneObj = state.laytimeDataList;
            cloneObj.push(action.payload.data.data);

            if (action.payload.status) {
                return {
                    ...state,
                    laytimeRowInput: initialState.laytimeRowInput,
                    loading: action.payload.loading,
                    layTimeRowList:action.payload.layTimeRowList,
                    laytimeDataList:cloneObj,
                };
            } else {
                return {
                    ...state,
                    loading: false,
                };
            }
            break;
        case Types.LAYTIME_DATA_SUBMITTING:
            
            return {
                ...state,
                loading: action.payload,
            };
            break;

        case Types.DELETE_LAYTIMEROW_DATA:

        let deleteData = state.laytimeDataList.filter(item=>item.intLayTimeRowID !==action.payload.intLayTimeRowID);
        return {
            ...state,
            laytimeDataList:deleteData

        };
       
        default:
            break;
    }
    return newState
}

export default LaytimeRowReducer;
