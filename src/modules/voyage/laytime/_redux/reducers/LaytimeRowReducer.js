import * as Types from "../types/Types";

const initialState = {
    loading: false,
    layTimeRowList: [],
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
        case Types.LAYTIME_DATA_SUBMIT:
            if (action.payload.status) {
                return {
                    ...state,
                    laytimeRowInput: initialState.laytimeRowInput,
                    loading: action.payload.loading,
                    layTimeRowList:action.payload.layTimeRowList,
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

        default:
            break;
    }
    return newState
}

export default LaytimeRowReducer;
