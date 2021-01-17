import * as Types from "../types/Types";


const initialState = {

    laytimeHeaderInput: {
        intShipID: "",
        intVoyageNumber: "",
        intLoadingPortID: "",
        dteCommencedDate: "",
        intDischargingPortID: "",
        dteCompletionDate: "",
        dteCPDate: "",
        intBrokerID: "",
        intLaytimeCalculationTypeID: "",
        isRevAllPorts: "",
        isRevLoadingPorts: "",
        isRevDischargePorts: "",
        strOnceOnDemmurrage: "",
        intDemurrageCurrencyID: "",
        numCommision: "",
        strSaveOrAdditionalTime: "",
        intSaveOrAdditionalTimePerMin: "",
        numCommisionPercent: "",
        numDemurrageAmount: "",
        numDespatchAmount: "",
        intDemurrageDespatchCurrencyID: "",
        intActionBy: 502648

    },


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
    }

    return newState
}

export default LaytimeHeaderReducer;
