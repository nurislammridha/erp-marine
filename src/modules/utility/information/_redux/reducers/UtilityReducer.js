import * as Types from '../types/Types'

const initialState = {
    LoadableCalculatorInput: {
        intDraft: 0,
        intDWT: 0,
        intFW: 0,
        intTPC: 0,
        intIFO: 0,
        intMGO: 0,
        intFWA: 0,
        intSummerDraft: 0,
        intUnpumpableBallast: 0,
        intConstant: 0,

        // Calculative Data
        differ: 0,
        differincm: 0,
        deductable: 0,
        actualLoad: 0,
        deductableLoad: 0,
        deductableForFWA: 0,
        totalDeductable: 0,
        freshwater: 0,
        seawater: 0
    }
}

const UtilityReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case Types.CHANGE_TEXT_INPUT:
            const inputValue = parseFloat(action.payload.value);
            if (!isNaN(inputValue)) {
                const LoadableCalculatorInput = { ...state.LoadableCalculatorInput };
                LoadableCalculatorInput[action.payload.name] = inputValue;
                return {
                    ...state,
                    LoadableCalculatorInput
                }
            } else {
                return {
                    ...state
                }
            }


        case Types.CALCULATE_ALL:
            const calcData = { ...state.LoadableCalculatorInput };
            calcData.differ = calculateDiffer(calcData);
            calcData.differincm = calculateDifferincm(calcData);
            calcData.deductable = calculateDeductable(calcData);
            calcData.actualLoad = calculateActualLoad(calcData);
            calcData.deductableLoad = calculateDeductableLoad(calcData);
            calcData.deductableForFWA = calculateDeductableForFWA(calcData);
            calcData.totalDeductable = calculateTotalDeductable(calcData);
            calcData.freshwater = calculateFreshwater(calcData);
            calcData.seawater = calculateSeawater(calcData);

            return {
                ...state,
                LoadableCalculatorInput: calcData
            }

        default:
            break;
    }

    return newState;

}


const calculateDiffer = (state) => {
    return formatValue(state.intSummerDraft - state.intDraft)
}
const calculateDifferincm = (state) => {
    return formatValue(state.differ * 100)
}
const calculateDeductable = (state) => {
    return formatValue(state.differincm * state.intTPC)
}
const calculateActualLoad = (state) => {
    return formatValue(state.intDWT - state.deductable)
}
const calculateDeductableLoad = (state) => {
    return formatValue(state.intFW + state.intIFO + state.intMGO + state.intUnpumpableBallast + state.intConstant)
}
const calculateDeductableForFWA = (state) => {
    return formatValue((state.intFWA / 10) * state.intTPC)
}
const calculateTotalDeductable = (state) => {
    return formatValue(state.deductableLoad + state.deductableForFWA)
}
const calculateFreshwater = (state) => {
    return formatValue(state.actualLoad - state.totalDeductable)
}
const calculateSeawater = (state) => {
    return formatValue(state.actualLoad - state.deductable)
}

const formatValue = (value) => {
    return parseFloat(value).toFixed(4)
}
export default UtilityReducer;