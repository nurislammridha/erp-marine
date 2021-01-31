import * as Types from "../types/Types";
import moment from "moment";

const initialState = {
    voyageActivityList: [],
    shipConditionTypeListData: [],
    windDirectionList: [],
    windDirectionListOptionData: [],
    shipConditionTypeListOptionData: [],
    shipConditionDropdown: [],
    voyageActivityDetail: null,
    isLoading: false,
    status: false,
    addMessage: "",
    voyageActivityInput: {
        date: moment().format("YYYY-MM-DD"),
        intToPortID: 1,
        intShipConditionTypeId: "",
        strSeaDirection: "",
        strWindDirection: "",
        latitude: "",
        longitude: "",
        course: "",
        streaming: "",
        stoppage: "",
        dailySpeed: "",
        generalSpeed: "",
        direction: "",
        windBF: "",
        seaDSS: "",
        portTo: "",
        remarks: "",
        production: "",
        consumption: "",
        setTemp: "",
        airtemperature: "",
        baroPressure: "",
        distance: "",
        totalDistance: "",
        decSeaDistance: "",
        etadate: ""
    },
};

const VoyageActivityOfficerReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case Types.CHANGE_VOYAGE_ACTIVITY_INPUT:
            const voyageActivityInput = { ...state.voyageActivityInput };
            voyageActivityInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                voyageActivityInput,
            };
        case Types.GET_VOYAGE_SHIP_CONDITION:
            return {
                ...state,
                shipConditionTypeListData: action.payload,
                shipConditionTypeListOptionData: getShipConditionType(action.payload),
            };
        case Types.VOYAGE_WIND_DIREACTION_DATA:
            return {
                ...state,
                windDirectionList: action.payload,
                windDirectionListOptionData: getWindDirectionType(action.payload),
            };
        case Types.VOYAGE_ACTIVITY_CREATE_OFFICER_SUBMIT:
            return {
                ...state,
                status: action.payload.status,
                addMessage: action.payload.data.message,
                isLoading: false,
                voyageActivityInput: initialState.voyageActivityInput
            };

        case Types.VOYAGE_ACTIVITY_CREATE_OFFICER_SUBMITTING:
            return {
                ...state,
                isLoading: action.payload
            };

        default:
            break;
    }
    return newState;
};



const getShipConditionType = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.intID,
                label: item.strShipConditionType,
            };
            options.push(itemData);
        });
    }
    return options;
}
const getWindDirectionType = (data) => {
    let options = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.id,
                label: item.name,
            };
            options.push(itemData);
        });
    }
    return options;
}

export default VoyageActivityOfficerReducer;
