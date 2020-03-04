import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native";
import { Container } from '../components/';

class LoadingScreen extends Component {

    async componentDidMount() {
        this.mounted = true;
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

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {

        return (
            <Container>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
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