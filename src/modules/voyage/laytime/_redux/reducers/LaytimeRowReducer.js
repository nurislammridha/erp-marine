import * as Types from "../types/Types";

const initialState = {

    // laytimeRowInput: {
    //     intLayTimeHeaderID: "",
    //     intLayTimeRowID: "",
    //     numTimeUsed: '',
    //     numRatio: null,
    //     strRemarks: "",
    //     intShipID: "",
    //     intType: "",
    //     intPortID: "",
    //     intCargoID: "",
    //     numBLQty: "",
    //     intTermsID: "",
    //     numTimeAllowed: "",
    //     intTimeAllowedTypeID: "",
    //     numDemurrageRate: "",
    //     numDespatchRate: "",
    //     numDespatchRatePercent: "",
    //     intDemurrageCurrID: "",
    //     numLaytimeUsed: "",
    //     numDemurrageDespatchAmount: "",
    //     numLodingOrDischargeRate: "",
    //     dteLaytimeCommenced: "",
    //     dteLaytimeCompleted: "",
    //     dteTermArraivalTime: "",
    //     dteTermSailTime: "",
    //     dteNORtender: "",
    //     intAdditionalDay: "",
    //     numAdditionalHrs: "",
    //     intActionBy: 1

    // },
    laytimeRowInput: {
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
        default:
            break;
    }
    return newState
}

export default LaytimeRowReducer;
