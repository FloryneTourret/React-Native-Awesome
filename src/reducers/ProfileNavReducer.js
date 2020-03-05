import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const initalState = {
    link1: {
        id: 1,
        label:
            <>
                <Icon
                    name="appstore1"
                />
                <Text> Lorem</Text>
            </>,
        active: true
    },
    link2: {
        id: 2,
        label:
            <>
                <Icon
                    name="bulb1"
                />
                < Text > Ipsum</Text >
            </>,
        active: false
    },
}

const ProfileNav = (state = initalState, action) => {
    switch (action.type) {
        case 'active':
            newstate = {}
            for (let [key, value] of Object.entries(state)) {
                if (state[key] === action.payload.item) {
                    newstate[key] = { ...state[key], active: true }
                }
                else {
                    newstate[key] = { ...state[key], active: false }
                }
            }
            return newstate
        default:
            return state
    }
}

export default ProfileNav