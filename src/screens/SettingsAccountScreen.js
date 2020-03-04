import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { HeaderNav, Container, Avatar, Input, Button, Message } from '../components';
import firebase from 'firebase';
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import '../components/fixTimerBug';


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class SettingsAccount extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => { })
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    state = {
        loadingAvatar: false,
        loading: false,
        message: '',
        displayName: this.props.auth.userAuth.displayName ? this.props.auth.userAuth.displayName : this.props.auth.userAuth.email.split('@')[0],
        avatar: this.props.auth.userAuth.photoURL ? this.props.auth.userAuth.photoURL : null,
    }


    async onButtonUpdatePress(updateUser) {
        this.setState({ loading: true, message: '' })

        await firebase.auth().currentUser.updateProfile({ displayName: this.state.displayName })
            .then(() => {
                this.setState({ message: 'Success !' })
            }).catch((error) => {
                this.setState({ message: error.message })
            });

        await updateUser(firebase.auth().currentUser)

        this.setState({ loading: false })
    }

    async onAvatarPress(updateUser) {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'Delete picture', title: 'Delete actual avatar' }],
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
                firebase.auth().currentUser.updateProfile({ photoURL: null })
                    .then(async () => {
                        await updateUser(firebase.auth().currentUser)
                        this.setState({ message: 'Succes ! Avatar removed' })
                    }).catch((error) => {
                        this.setState({ message: error.message })
                    });
                this.setState({ avatar: null })
            }
            else {
                this.setState({ loadingAvatar: true, message: '' })
                this.uploadImage(response.uri)
                    .then(async (url) => {
                        this.setState({ avatar: url, loadingAvatar: false })
                        await firebase.auth().currentUser.updateProfile({ photoURL: url })
                            .then(async () => {
                                await updateUser(firebase.auth().currentUser)
                                this.setState({ message: 'Succes ! Avatar uploaded' })
                            }).catch((error) => {
                                this.setState({ message: error.message })
                            });
                    }).catch((error) => {
                        this.setState({ loadingAvatar: false, message: error })
                    })
            }
        })
    }

    uploadImage(uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null
            const imageRef = firebase.storage().ref('images').child('_' + Math.random().toString(36).substr(2, 9))

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                }).then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                }).then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                }).then((url) => {
                    resolve(url)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    render() {
        const { updateUser } = this.props

        return (
            <Container>
                <HeaderNav icon="arrowleft" label="Edit Account" onPress={() => { this.props.navigation.goBack() }} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.fields}>

                    {this.state.loadingAvatar ?
                        <ActivityIndicator size="large" color="#0000ff" style={{ height: 170 }} />
                        :
                        <TouchableOpacity onPress={() => this.onAvatarPress(updateUser)} style={styles.badgeContainer}>
                            <IconBadge
                                MainElement={
                                    this.state.avatar ?
                                        <Avatar source={{ uri: this.state.avatar }} />
                                        :
                                        <Avatar source={require('../../assets/img/user.png')} />
                                }
                                BadgeElement={<Text style={styles.badgeText}>+</Text>}
                                IconBadgeStyle={styles.badgeStyle}
                            />
                        </TouchableOpacity>
                    }

                    {this.state.message ? <Message>{this.state.message}</Message> : null}
                    <Input
                        icon="user"
                        placeholder="Display Name"
                        value={this.state.displayName}
                        onChangeText={(displayName) => this.setState({ displayName })}
                    />
                    {this.state.loading ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <Button label='Update account' onPress={() => { this.onButtonUpdatePress(updateUser) }}></Button>
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
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    badgeStyle: {
        width: 45,
        height: 45,
        backgroundColor: '#5468FF',
        borderRadius: 50
    }
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

export default connect(mapStateToProps, { updateUser })(SettingsAccount);