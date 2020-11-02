import { ADD_CAR_DATA, DELETE_CAR_DATA } from '../actions/Actions';


var initialState = {}

export default function CarReducer (state = initialState, action) {
    switch(action.type){
        case ADD_CAR_DATA:
            return action.payload
        case DELETE_CAR_DATA:
            return initialState
        default:
            return state
    }
}