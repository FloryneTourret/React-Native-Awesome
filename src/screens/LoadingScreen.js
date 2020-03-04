import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native";
import { Container } from '../components/';

class LoadingScreen extends Component {

    async componentDidMount() {
        this.mounted = true;
        try {
            user = await AsyncStorage.getItem('user')
        } catch (error) {
        }
        if (user) {
            await this.props.toggleUser(JSON.parse(user))
            if (this.props.userAuth)
                this.props.navigation.navigate('Home')
            else
                this.props.navigation.navigate('Login')

        }
        else {
            await this.props.toggleUser(null)
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