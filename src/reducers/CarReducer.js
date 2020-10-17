import { ADD_CAR_DATA, DELETE_CAR_DATA } from '../actions/Actions';
import { 
    MODEL,
    BRAND,
    CAPACITY,
    CATEGORY,
    AIRPORT,
    AUTONOMY,
    DOORS,
    GEARBOX,
    EXTRAS,
    PRICE,
    TRUNKCAPACITY,
    URL,
    ACTIVE
} from '../utils/Constants';

var initialState = {
    [AIRPORT]: "",
    [CAPACITY]: 0,
    [URL]: "",
    [TRUNKCAPACITY]: 0,
    [DOORS]: 0,
    [BRAND]: "",
    [MODEL]: "",
    [CATEGORY]: "",
    [AUTONOMY]: 0,
    [GEARBOX]: "",
    [ACTIVE]: true,
    [EXTRAS]: [],
    [PRICE]: {}
}

export default function CarReducer (state = initialState, action) {
    switch(action.type){
        case ADD_CAR_DATA:
            return Object.assign(initialState, action.payload)
        case DELETE_CAR_DATA:
            return initialState
        default:
            return state
    }
}