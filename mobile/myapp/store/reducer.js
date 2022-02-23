// store/reducer/reducer.js

const initialState = { index: 0, name: "", ip: '10.26.111.79', accessToken: ""}

function Store(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'index':
            nextState = {
                ...state,
                index: action.value
            }
        return nextState || state
        case 'name':
            nextState = {
                ...state,
                name: action.value
            }
        return nextState || state
        case 'ip':
            nextState = {
                ...state,
                ip: action.value
            }
        return nextState || state
        case 'accessToken':
            nextState = {
                ...state,
                accessToken: action.value
            }
        return nextState || state
        default:
            return state
    }
}

export default Store