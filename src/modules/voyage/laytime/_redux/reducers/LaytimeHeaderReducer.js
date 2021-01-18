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
        isRevLoadingPorts: null,
        isRevDischargePorts: null,
        strOnceOnDemmurrage: '',
        intDemurrageCurrencyID: null,
        numCommision: null,
        CommisionPercent: null,
        numDemurrageDespatchAmount: null,
        intDemurrageDespatchCurrencyID: null,
        intActionBy: null,
        isActive: null,
        layTimeRows: [
            {
                intLayTimeHeaderID: null,
                intType: null,
                intPortID: null,
                intCargoID: null,
                numBLQty: null,
                intTermsID: null,
                numTimeAllowence: null,
                intTimeAllowedTypeID: null,
                numDemurrageRate: null,
                numDespatchRate: null,
                numDespatchRatePercent: null,
                intDemurrageCurrID: null,
                numTimeAllowed: null,
                intAdditionalDay: null,
                numAdditionalHrs: null,
                numLaytimeUsed: null,
                strTimeRemaining: ''
            }
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
        default:
            break;

    }
    return newState
}

export default LaytimeHeaderReducer;
