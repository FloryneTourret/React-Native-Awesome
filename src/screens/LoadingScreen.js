import React, { Component } from 'react';
import { View, StyleSheet, } from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native";

class LoadingScreen extends Component {

    async componentDidMount() {
        const { toggleUser } = this.props

        const getUser = async () => {
            try {
                user = await AsyncStorage.getItem('user')
                if (user) {
                    await toggleUser(JSON.parse(user))
                }
                else {
                    await toggleUser(null)
                }
            } catch (error) {
            }
        }
        await getUser()
        if (!this.props.userAuth) {
            this.props.navigation.navigate('Login')
        }
        else
            this.props.navigation.navigate('Home')
    }


    render() {

        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: '#F4F4FA',
    }
});

const toggleUser = (value) => {
    return {
        type: 'SET_USER',
        payload: { userAuth: value }
    }
}
const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps, { toggleUser })(LoadingScreen);