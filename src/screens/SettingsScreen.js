import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker'
import Input from '../components/input';
import Button from '../components/button';


class Settings extends Component {

    userAuth = this.props.auth.userAuth
    state = {
        authChanged: false,
        displayName: this.userAuth.displayName ? this.userAuth.displayName : this.userAuth.email.split('@')[0],
        avatar: this.userAuth.photoURL ? this.userAuth.photoURL : null,
        email: this.userAuth.email,
        loading: '',
        message: '',
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
    };


    async onButtonPress(updateUser) {

        this.setState({ loading: true, message: '' })
        //Update user info
        firebase.auth().onAuthStateChanged(async (user) => {
            if (this.state.displayName !== this.userAuth.displayName
                || this.state.email !== this.userAuth.email
                || this.state.avatar !== this.userAuth.photoURL) {
                await user.updateProfile({
                    displayName: this.state.displayName,
                    email: this.state.email.trim(),
                    photoURL: this.state.avatar
                }).then(async function () {
                    user = firebase.auth().currentUser
                    await updateUser(user)
                }).catch((error) => {
                    this.setState({ message: error.message })
                });
            }
            //If passwords -> login again -> updatde password
            if (this.state.newPassword && this.state.newPasswordRepeat && this.state.oldPassword) {
                if (this.state.newPassword === this.state.newPasswordRepeat) {
                    await firebase.auth().signInWithEmailAndPassword(this.userAuth.email.trim(), this.state.oldPassword)
                        .then(async () => {
                            await user.updatePassword(this.state.newPassword)
                                .then(async () => {
                                    user = firebase.auth().currentUser
                                    await updateUser(user)
                                    this.setState({ message: 'Your password has been updated' })
                                }).catch((error) => {
                                    this.setState({ message: error.message })
                                });
                        })
                        .catch((error) => {
                            this.setState({ message: 'Something went wrong. Your actual password doesn\'t match.' })
                        })
                    this.setState({ newPassword: '', newPasswordRepeat: '', oldPassword: '' })
                }
                else
                    this.setState({ message: 'Something went wrong. Your passwords doesn\'t match.' })
            }
            //errors messages
            if (this.userAuth.email !== this.state.email)
                this.setState({ message: 'Something went wrong. This email is already used.' })
            if (this.userAuth.displayName !== this.state.displayName)
                this.setState({ message: 'Something went wrong. Your display name hasn\'t been changed.' })
            //reset state
            this.setState({
                loading: false,
                authChanged: true,
                displayName: this.userAuth.displayName ? this.userAuth.displayName : this.userAuth.email.split('@')[0],
                email: this.userAuth.email,
                avatar: this.userAuth.photoURL,
                newPassword: '',
                newPasswordRepeat: '',
                oldPassword: ''
            })
        })
    }

    onAvatarPress() {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'Delete picture', title: 'Delete actual avatar' }],
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
                this.setState({ avatar: null })
            }
            else {
                this.setState({ avatar: response.uri })
            }
        })
    }

    render() {
        const { updateUser } = this.props

        return (
            <ScrollView style={styles.container}>
                <View style={styles.linksNav}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Icon
                            name="arrowleft"
                            style={styles.iconLinkBack}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Settings</Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.onAvatarPress()}
                >
                    {this.state.avatar ?
                        <Image
                            style={styles.avatar}
                            source={{ uri: this.state.avatar }}
                        />
                        :
                        <Image
                            style={styles.avatar}
                            source={require('../../assets/img/user.png')}
                        />
                    }
                </TouchableOpacity>
                <View style={styles.form}>
                    {this.state.message ? <Text style={styles.error}>{this.state.message}</Text> : null}
                    <Input
                        icon="user"
                        placeholder="Display Name"
                        value={this.state.displayName}
                        onChangeText={(displayName) => this.setState({ displayName })}
                    />
                    <Input
                        icon="mail"
                        placeholder="john.doe@gmail.com"
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
                </View>
                <View style={styles.buttonSection}>
                    {this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> :
                        <Button label='Update' onPress={() => { this.onButtonPress(updateUser) }}></Button>
                    }
                </View>

            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#F4F4FA',
    },
    linksNav: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
    iconLinkBack: {
        fontSize: 25,
        color: '#384356',
    },
    heading: {
        color: '#364354',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 0,
        flex: 1,
        textAlign: 'center'
    },
    form: {
        marginTop: 10,
    },
    buttonSection: {
        marginTop: 10,
        marginBottom: 30
    },
    error: {
        fontSize: 15,
        color: '#5768FC',
        paddingBottom: 15,
        fontWeight: 'bold',
        paddingLeft: 5
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 100,
        alignSelf: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 8,
        marginTop: 20
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

export default connect(mapStateToProps, { updateUser })(Settings);