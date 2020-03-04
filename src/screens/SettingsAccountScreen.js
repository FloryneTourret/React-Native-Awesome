import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { HeaderNav, Container, Avatar, Input, Button, Message } from '../components';
import firebase from 'firebase';
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import ImagePicker from 'react-native-image-picker'


class SettingsAccount extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => { })
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    state = {
        loading: false,
        message: '',
        displayName: this.props.auth.userAuth.displayName ? this.props.auth.userAuth.displayName : this.props.auth.userAuth.email.split('@')[0],
        avatar: this.props.auth.userAuth.photoURL ? this.props.auth.userAuth.photoURL : null,
    }

    async onAvatarPress() {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'Delete picture', title: 'Delete actual avatar' }],
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.customButton) {
                this.setState({ avatar: null })
            }
            else {
                this.setState({ avatar: response.uri })
            }
        })
    }

    async onButtonUpdatePress(updateUser) {

        this.setState({
            loading: true,
            message: '',
        })

        await firebase.auth().currentUser.updateProfile(
            {
                displayName: this.state.displayName,
                photoURL: this.state.avatar
            }
        ).then(() => {
            this.setState({ message: 'Success !' })
        }).catch((error) => {
            this.setState({ message: error.message })
        });

        await updateUser(firebase.auth().currentUser)

        this.setState({
            loading: false,
        })
    }

    render() {
        const { updateUser } = this.props

        return (
            <Container>
                <HeaderNav icon="arrowleft" label="Edit Account" onPress={() => { this.props.navigation.goBack() }} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.fields}>

                    <TouchableOpacity onPress={() => this.onAvatarPress()} style={styles.badgeContainer}>
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