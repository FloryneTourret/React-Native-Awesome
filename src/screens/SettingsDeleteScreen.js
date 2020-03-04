import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { HeaderNav, Container, Input, ButtonDanger, Message } from '../components';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native";


class SettingsDelete extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => { })
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        loading: true,
        message: '',
        oldPassword: '',
    };

    async onButtonDeletePress() {
        this.setState({
            message: '',
        })

        if (this.state.oldPassword) {
            Alert.alert(
                'Delete my account',
                'Are you sure? This action can\'t be reversed',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Yes delete my account',
                        onPress: async () => {
                            var user = firebase.auth().currentUser;
                            var credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.oldPassword);

                            await user.reauthenticateWithCredential(credential)
                                .then(async () => {
                                    await firebase.auth().currentUser.delete()
                                        .then(async () => {
                                            AsyncStorage.removeItem('user')
                                            firebase.auth().signOut()
                                            this.props.navigation.navigate('Loading')
                                        })
                                        .catch((error) => {
                                            this.setState({ message: 'Something went wrong. Your account hasn\'t been deleted.' })
                                        });
                                })
                                .catch((error) => {
                                    this.setState({ message: 'Something went wrong. Your password does not match.' })
                                });
                        }
                    },
                ],
                { cancelable: false },
            );
        } else {
            this.setState({ message: 'Something went wrong. Actual password is required.' })
        }
    }

    render() {
        const { updateUser } = this.props

        return (
            <Container>
                <HeaderNav icon="arrowleft" label="Delete account" onPress={() => { this.props.navigation.goBack() }} />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.fields}>

                        {this.state.message ? <Message>{this.state.message}</Message> : null}
                        <Input
                            icon="lock"
                            placeholder="Actual Password"
                            value={this.state.oldPassword}
                            onChangeText={(oldPassword) => this.setState({ oldPassword })}
                            secured
                        />
                        <ButtonDanger label='Delete my account' onPress={() => { this.onButtonDeletePress(updateUser) }}></ButtonDanger>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    fields: {
        marginTop: 60,
    },
});
const updateUser = (value) => {
    return {
        type: 'SET_USER',
        payload: { userAuth: value }
    }
}
const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, { updateUser })(SettingsDelete);