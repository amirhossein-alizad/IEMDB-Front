import Actions from './actions'

export const initialState = {
    user: null
}

export const Reducer = (state, action) => {
    switch(action.type) {
        case Actions.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case Actions.UNSET_USER:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}