import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native";
import { Container } from '../components/';

class LoadingScreen extends Component {

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async componentDidMount() {
        const { toggleUser } = this.props
        try {
            user = await AsyncStorage.getItem('user')
        } catch (error) {
        }
        if (user) {
            await toggleUser(JSON.parse(user))
            this.props.navigation.navigate('Home')
        }
        else {
            await toggleUser(null)
            this.props.navigation.navigate('Login')
        }
    }


    render() {

        return (
            <Container>
            </Container>
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