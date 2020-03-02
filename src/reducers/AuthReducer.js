const initalState = { user: null };

const Auth = (state = initalState, action) => {
    console.log('Auth ' + action.type)
    switch (action.type) {
        case 'SET_USER':
            console.log(action.payload)
            return action.payload
        default:
            return state
    }
}

export default Auth