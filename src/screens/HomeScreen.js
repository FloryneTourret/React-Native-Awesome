import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Container, Heading } from '../components/';

class HomeScreen extends Component {

    state = { users: {} }

    async componentDidMount() {
        this.mounted = true;
        await firebase.database().ref('users').on('value', (snapshot) => {
            user = snapshot.val()
            this.setState({ ...this.state, users: user })
        });
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { userAuth } = this.props
        const { users } = this.state
        console.log(users)

        return (
            <Container>
                <Heading>Home</Heading>
                {
                    !this.isEmpty(users) ?
                        <Text>{users.ezyM3s3912MY3uhDkKoJTZFl70H3.displayName}</Text>
                        :
                        null
                }
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