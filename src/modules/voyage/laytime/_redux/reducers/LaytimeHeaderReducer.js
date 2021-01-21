import * as Types from "../types/Types";

const initialState = {
    layTimeDemurrage: {
        strReversibleIType: '',
        numDemurrageRate: null,
        intCurrencyID: null,
        numDespatchRate: null,
        numDespatchPercent: null,
    },
    laytimeHeaderInput: {
        intShipID: null,
        intCharterVoyageID: null,
        intBrokerID: null,
        intLaytimeCalculationTypeID: null,
        isRevAllPorts: null,
        isRevLoadingPorts: false,
        isRevDischargePorts: false,
        strOnceOnDemmurrage: '',
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
        dteLastActionDateTime: '',
        dteServerDateTime: null,
        //======================
        // strReversibleIType: '',
        // numDemurrageRate: null,
        // intCurrencyID: null,
        // numDespatchRate: null,
        // numDespatchPercent: null,

        demurrages: [],
        layTimeRows: []
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
        case Types.CHANGE_LAYTIME_HEADER_DEMURRAGE_INPUT:
            const layTimeDemurrage = { ...state.layTimeDemurrage };
            layTimeDemurrage[action.payload.name] = action.payload.value;
            return {
                ...state,
                layTimeDemurrage,
            };
        case Types.GET_HEADER_INPUT_FROM_API:
            const getLayTimeDataFromAPI = action.payload;
            let layTimeHeadersData = { ...state.laytimeHeaderInput }
            layTimeHeadersData.commmencePort = getLayTimeDataFromAPI.commmencePort;
            layTimeHeadersData.dteCommenDate = getLayTimeDataFromAPI.dteCommenDate;
            layTimeHeadersData.completionPort = getLayTimeDataFromAPI.completionPort;
            layTimeHeadersData.dteComplationDate = getLayTimeDataFromAPI.dteComplationDate;
            layTimeHeadersData.dteCPDate = getLayTimeDataFromAPI.dteCPDate;
            return {
                ...state,
                laytimeHeaderInput: layTimeHeadersData,
            }
        case Types.GET_VOYAGE_ID:
            return {
                voyage: action.payload.data
            }
        case Types.ADD_MULTIPLE_DUMMARAGES:
            let demurrages = { ...state.laytimeHeaderInput };
            // demurrages.demurrages = [action.payload];
            demurrages.demurrages.push(action.payload);
            return {
                ...state,
                laytimeHeaderInput: demurrages,
                layTimeDemurrage: initialState.layTimeDemurrage
            };
        default:
            break;
    }
    return newState
}

export default LaytimeHeaderReducer;
