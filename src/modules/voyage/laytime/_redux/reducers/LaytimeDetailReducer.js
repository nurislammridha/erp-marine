import * as Types from "../types/Types";

const initialState = {

    laytimeDetailInput: {

        intLayTimeHeaderID: "",
        intLayTimeRowID: "",
        numTimeUsed: '',
        numRatio: null,
        strRemarks: "",
        intShipID: "",
        intType: "",
        intPortID: "",
        intCargoID: "",
        numBLQty: "",
        intTermsID: "",
        numTimeAllowed: "",
        intTimeAllowedTypeID: "",
        numDemurrageRate: "",
        numDespatchRate: "",
        numDespatchRatePercent: "",
        intDemurrageCurrID: "",
        numLaytimeUsed: "",
        numDemurrageDespatchAmount: "",
        numLodingOrDischargeRate: "",
        dteLaytimeCommenced: "",
        dteLaytimeCompleted: "",
        dteTermArraivalTime: "",
        dteTermSailTime: "",
        dteNORtender: "",
        intAdditionalDay: "",
        numAdditionalHrs: "",
        intActionBy: 1

    },
}

const LaytimeDetailReducer = (state = initialState, action) => {

    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_LAYTIME_DETAIL_INPUT:
            const laytimeDetailInput = { ...state.laytimeDetailInput };
            laytimeDetailInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                laytimeDetailInput,
            };
    }
    return newState
}

export default LaytimeDetailReducer;
