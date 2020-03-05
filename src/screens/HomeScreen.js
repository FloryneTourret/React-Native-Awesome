import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Heading } from '../components/';

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