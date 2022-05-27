import Actions from './actions'

export const initialState = {
    user: null,
    token: null
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
        case Actions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case Actions.UNSET_TOKEN:
            return {
                ...state,
                token: null
            }
        default:
            return state;
    }
}