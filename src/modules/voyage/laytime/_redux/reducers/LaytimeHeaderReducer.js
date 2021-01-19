import * as Types from "../types/Types";

const initialState = {
    // laytimeHeaderInput: {
    //     intShipID: "",
    //     intVoyageNumber: "",
    //     intLoadingPortID: "",
    //     dteCommencedDate: "",
    //     intDischargingPortID: "",
    //     dteCompletionDate: "",
    //     dteCPDate: "",
    //     intBrokerID: "",
    //     intLaytimeCalculationTypeID: "",
    //     isRevAllPorts: "",
    //     isRevLoadingPorts: "",
    //     isRevDischargePorts: "",
    //     strOnceOnDemmurrage: "",
    //     intDemurrageCurrencyID: "",
    //     numCommision: "",
    //     strSaveOrAdditionalTime: "",
    //     intSaveOrAdditionalTimePerMin: "",
    //     numCommisionPercent: "",
    //     numDemurrageAmount: "",
    //     numDespatchAmount: "",
    //     intDemurrageDespatchCurrencyID: "",
    //     intActionBy: 502648
    // },
    laytimeHeaderInput: {
        intShipID: null,
        intCharterVoyageID: null,
        intBrokerID: null,
        intLaytimeCalculationTypeID: null,
        isRevAllPorts: null,
        isRevLoadingPorts: false,
        isRevDischargePorts: false,
        strOnceOnDemmurrage: false,
        intDemurrageCurrencyID: null,
        numCommision: null,
        CommisionPercent: null,
        numDemurrageDespatchAmount: null,
        intDemurrageDespatchCurrencyID: null,
        // load from server 
        intCurrencyID: null,
        numCurrencyRate: null,
        strVoyageNo: null,
        dteCPDate: '',
        intCommenPortID: null,
        intComplationPortID: null,
        dteCommenDate: '',
        dteComplationDate: '',
        numTotalIDLE: null,
        numTotalPortDays: null,
        numTotalDistance: null,
        numTotalDuration: null,
        numTotalSteamingTime: null,
        numAVGSpeed: null,
        intActionBy: null,
        dteLastActionDateTime: '',
        dteServerDateTime: null,
        isActive: null,

        demurage: [
            {
                intDemurrageRate: null,                
                intDemurrageCurrencyID: null,                
                intDemurrageDespatchRate: null,                
                intDemurrageDespatchPercentageID: null,                
            }
        ],
        layTimeRows: [
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
        ]
    }
};
const LaytimeHeaderReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_LAYTIME_HEADER_INPUT:
            const laytimeHeaderInput = { ...state.laytimeHeaderInput };
            laytimeHeaderInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                laytimeHeaderInput,
            };
        case Types.GET_HEADER_INPUT_FROM_API: 
            const layTimeHeaderData = action.payload
            return {
                laytimeHeaderInput: layTimeHeaderData
            }
        default:
            break;

    }
    return newState
}

export default LaytimeHeaderReducer;
