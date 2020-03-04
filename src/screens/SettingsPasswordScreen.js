import React, { Component } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { HeaderNav, Container, Input, Button, Message } from '../components';
import firebase from 'firebase';
import { connect } from 'react-redux';


class SettingsPassword extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => { })
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        message: '',
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',

    };

    async onButtonUpdatePress(updateUser) {

        this.setState({
            loading: true,
            message: '',
        })

        if (this.state.newPassword && this.state.newPasswordRepeat && this.state.oldPassword) {
            if (this.state.newPassword === this.state.newPasswordRepeat) {
                var user = firebase.auth().currentUser;
                var credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.oldPassword);

                await user.reauthenticateWithCredential(credential)
                    .then(async () => {
                        await firebase.auth().currentUser.updatePassword(this.state.newPassword)
                            .then(() => {
                                this.setState({ message: 'Your password has been updated' })
                            }).catch((error) => {
                                this.setState({ message: error.message })
                            });
                    })
                    .catch((error) => {
                        this.setState({ message: 'Something went wrong. Your password does not match.' })
                    });


                await updateUser(firebase.auth().currentUser)
                this.setState({ newPassword: '', newPasswordRepeat: '', oldPassword: '' })
            }
            else
                this.setState({ message: 'Something went wrong. Your passwords doesn\'t match.' })
        }

        this.setState({
            loading: false,
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: '',
        })
    }

    render() {
        const { updateUser } = this.props

        return (
            <Container>
                <HeaderNav icon="arrowleft" label="Edit Account" onPress={() => { this.props.navigation.goBack() }} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.fields}>

                    {this.state.message ? <Message>{this.state.message}</Message> : null}

                    <Input
                        icon="lock"
                        placeholder="Actual Password"
                        value={this.state.oldPassword}
                        onChangeText={(oldPassword) => this.setState({ oldPassword })}
                        secured
                    />
                    <Input
                        icon="lock"
                        placeholder="New Password"
                        value={this.state.newPassword}
                        onChangeText={(newPassword) => this.setState({ newPassword })}
                        secured
                    />
                    <Input
                        icon="lock"
                        placeholder="New Password Repeat"
                        value={this.state.newPasswordRepeat}
                        onChangeText={(newPasswordRepeat) => this.setState({ newPasswordRepeat })}
                        secured
                    />
                    {this.state.loading ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <Button label='Update password' onPress={() => { this.onButtonUpdatePress(updateUser) }}></Button>
                    }
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

export default connect(mapStateToProps, { updateUser })(SettingsPassword);