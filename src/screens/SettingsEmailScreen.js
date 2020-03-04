import React, { Component } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { HeaderNav, Container, Input, Button, Message } from '../components';
import firebase from 'firebase';
import { connect } from 'react-redux';


class SettingsEmail extends Component {

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
        email: this.props.auth.userAuth.email,

    };

    async onButtonUpdatePress(updateUser) {

        this.setState({
            loading: true,
            message: '',
        })

        if (this.state.oldPassword && this.state.email) {
            var user = firebase.auth().currentUser;
            var credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.oldPassword);

            await user.reauthenticateWithCredential(credential)
                .then(async () => {
                    await firebase.auth().currentUser.updateEmail(this.state.email.trim())
                        .then(() => {
                            this.setState({ message: 'Your email has been updated' })
                        }).catch((error) => {
                            this.setState({ message: error.message, email: this.props.auth.userAuth.email })
                        });
                })
                .catch((error) => {
                    this.setState({ message: 'Something went wrong. Your password does not match.' })
                });


            await updateUser(firebase.auth().currentUser)
            this.setState({ newPassword: '', newPasswordRepeat: '', oldPassword: '' })

        }

        this.setState({
            loading: false,
            oldPassword: '',
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
                        icon="mail"
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <Input
                        icon="lock"
                        placeholder="Actual Password"
                        value={this.state.oldPassword}
                        onChangeText={(oldPassword) => this.setState({ oldPassword })}
                        secured
                    />
                    {this.state.loading ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <Button label='Update email' onPress={() => { this.onButtonUpdatePress(updateUser) }}></Button>
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

export default connect(mapStateToProps, { updateUser })(SettingsEmail);