import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TextInput, Keyboard, ActivityIndicator, Image, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button, Container, Link } from '../components/'

class LoginScreen extends Component {

    componentDidMount() {
        this.mounted = true;
        Animated.parallel([
            Animated.timing(
                this.state.fadeHeading,
                {
                    toValue: 1,
                    duration: 1000,
                }
            ),
            Animated.timing(
                this.state.fadeSubHeading,
                {
                    toValue: 1,
                    duration: 1000,
                    delay: 500
                }
            )
        ]).start();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    state = { email: '', password: '', errorMessage: '', loading: '', loggedIn: false, fadeHeading: new Animated.Value(0), fadeSubHeading: new Animated.Value(0) }

    async onButtonPress(toggleUser) {
        const { email, password } = this.state;
        if (!email)
            this.setState({ errorMessage: 'Email is required' })
        else if (!password)
            this.setState({ errorMessage: 'Password is required' })
        else {
            this.setState({ errorMessage: '' })
            this.setState({ loading: true })
            await firebase.auth().signInWithEmailAndPassword(email.trim(), password)
                .then(() => {
                    this.setState({ email: '', password: '', errorMessage: '', loading: '' })
                })
                .catch((err) => {
                    firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
                        .then(() => {
                            this.setState({ email: '', password: '', errorMessage: '', loading: '' })
                        })
                        .catch((err) => {
                            this.setState({ errorMessage: err.message, loading: '' })
                        })
                })
        }

        Keyboard.dismiss()

        firebase.auth().onAuthStateChanged(async (user) => {
            firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {
                if (!(snapshot.val() && snapshot.val().username)) {
                    firebase.database().ref('users/' + user.uid).set({
                        displayName: user.email.split('@')[0],
                        photoURL: null
                    });
                }
            });
            if (user) {
                await toggleUser(user);
                this.props.navigation.navigate('Loading')
            } else {
                await toggleUser(null);
            }
        });
    }

    render() {
        const { toggleUser } = this.props


        return (
            <ScrollView>
                <Image
                    style={styles.background}
                    source={require('../../assets/img/background.jpg')}
                />
                <Container>
                    <Animated.View style={{ opacity: this.state.fadeHeading }}>
                        <Text style={styles.heading}>Welcome</Text>
                    </Animated.View>
                    <Animated.View style={{ opacity: this.state.fadeSubHeading }}>
                        <Text style={styles.subheading}>Log In or Join now !</Text>
                    </Animated.View>
                    {this.state.errorMessage ? <Text style={styles.error}>{this.state.errorMessage}</Text> : null}
                    <View style={styles.section}>
                        <Icon
                            name="mail"
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="john.doe@gmail.com"
                            value={this.state.email}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={email => this.setState({ email })}
                        />
                    </View>

                    <View style={styles.section}>
                        <Icon
                            name="lock"
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={this.state.password}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.buttonSection}>
                        {this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> :
                            <Button label='Log In' onPress={() => { this.onButtonPress(toggleUser) }}></Button>
                        }
                    </View>
                    <Link
                        onPress={() => this.props.navigation.navigate('ForgotPassword')}
                        icon="questioncircleo"
                        label="Forgot password?"
                    />
                </Container>
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    background: {
        height: 200,
        width: 'auto'
    },
    heading: {
        color: '#364354',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 60,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    subheading: {
        color: '#67707A',
        textTransform: 'uppercase',
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 50
    },
    error: {
        fontSize: 15,
        color: '#5768FC',
        paddingBottom: 15,
        fontWeight: 'bold',
        paddingLeft: 5
    },
    section: {
        marginTop: 5,
        backgroundColor: '#FCFBFD',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 20,
        paddingLeft: 10
    },
    input: {
        fontSize: 16,
        fontWeight: '100',
        paddingLeft: 10,
        flex: 1
    },
    buttonSection: {
        marginTop: 30
    },
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

export default connect(mapStateToProps, { toggleUser })(LoginScreen);