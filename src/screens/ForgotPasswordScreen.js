import React, { Component } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, HeaderNav, Input, Message, Button } from '../components/';
import firebase from 'firebase';

class ForgotPasswordScreen extends Component {

    componentDidMount() {

        firebase.auth().onAuthStateChanged(() => { })
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        message: '',
        email: '',

    };


    async onButtonUpdatePress() {

        this.setState({
            loading: true,
            message: '',
        })

        if (this.state.email) {
            await firebase.auth().sendPasswordResetEmail(this.state.email.trim())
                .then(() => {
                    this.setState({ message: 'Success! Check your emails' })
                }).catch((error) => {
                    this.setState({ message: error.message })
                });
        }
        else {
            this.setState({ message: 'Something went wrong. Email is required.' })
        }

        this.setState({
            loading: false,
            email: '',
        })
    }

    render() {

        return (
            <Container>
                <HeaderNav icon="arrowleft" label="Forgot password?" onPress={() => { this.props.navigation.goBack() }} />

                <ScrollView showsVerticalScrollIndicator={false} style={styles.fields}>

                    {this.state.message ? <Message>{this.state.message}</Message> : null}

                    <Input
                        icon="mail"
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                    />
                    {this.state.loading ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <Button label='Send me a link' onPress={() => { this.onButtonUpdatePress() }}></Button>
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

export default ForgotPasswordScreen;