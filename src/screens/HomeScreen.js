import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import Container from '../components/container';
import Heading from '../components/heading';

class HomeScreen extends Component {

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { userAuth } = this.props

        return (
            <Container>
                <Heading>Home</Heading>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
});

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(HomeScreen);