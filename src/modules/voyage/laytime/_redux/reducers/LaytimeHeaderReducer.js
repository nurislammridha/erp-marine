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
        numCurrencyRate: null,
        strVoyageNo: null,
        dteCPDate: '',
        commmencePort: null,
        voyage: [],
        completionPort: null,
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
        //======================
        strReversibleIType: '',
        numDemurrageRate: null,
        intCurrencyID: null,
        numDespatchRate: null,
        numDespatchPercent: null,
        
        demurrages: [
            // {
            //     strReversibleIType: 'Reversible Type',
             //    numDemurrageRate: null
            //     intCurrencyID: null,
            //     numDespatchRate: null,
            //     numDespatchPercent: null
            // }
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
            console.log('layTimeHeaderData :>> ', layTimeHeaderData);
            return {
                laytimeHeaderInput: layTimeHeaderData
            }
        case Types.GET_VOYAGE_ID:
            let voyageIDList = action.payload;
            console.log('voyageIDList :>> ', voyageIDList);
            return {
                voyage: action.payload.data
            }
        case Types.ADD_MULTIPLE_DUMMARAGES:
            console.log('action.payload :>> ', action.payload);
            const demurrages = {...state.laytimeHeaderInput};
            // demurrages.demurrages = [action.payload];
            demurrages.demurrages.push(action.payload)
            return {
                ...state,
                laytimeHeaderInput: demurrages,
            };
        default:
            break;

    }
    return newState
}

export default LaytimeHeaderReducer;
