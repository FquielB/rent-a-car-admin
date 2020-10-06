import { ADD_CAR_DATA, DELETE_CAR_DATA } from '../actions/Actions'

var initialState = null

export default function CarReducer (state = initialState, action) {
    switch(action.type){
        case ADD_CAR_DATA:
            return Object.assign({}, action.payload)
        case DELETE_CAR_DATA:
            return null
        default:
            return state
    }
}