import { AsyncStorage } from "react-native";

const initalState = { userAuth: null };

const Auth = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_USER':
            saveUser(JSON.stringify(action.payload.userAuth))
            return { userAuth: action.payload.userAuth }
        case 'GET_USER':
            return JSON.parse(getUser())
        default:
            return state
    }
}

const saveUser = async (user) => {
    if (user)
        try {
            await AsyncStorage.setItem('user', user);
            await firebase.auth().signInWithCustomToken(user.uid)
                .catch(function (error) {
                })
        } catch (error) {
        }
    else
        try {
            await AsyncStorage.removeItem('user');
        } catch (error) {
        }
}

const getUser = async () => {
    try {
        user = await AsyncStorage.getItem('user')
        return user.userAuth
    } catch (error) {
        return null
    }
}

export default Auth