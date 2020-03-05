import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { ContainerNotScrollable, Heading, UserList, ContentBox } from '../components/';
import { connect } from 'react-redux';
import firebase from 'firebase';

class CommunityScreen extends Component {

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
        const usersArray = Object.values(users)

        return (
            <ContainerNotScrollable>
                <Heading>Community</Heading>
                <View style={styles.content}>
                    <ContentBox>
                        {
                            !this.isEmpty(users) ?
                                <FlatList
                                    data={usersArray}
                                    renderItem={({ item }) => (
                                        item.uid != userAuth.uid ?
                                            <UserList username={item.displayName} avatar={item.photoURL} onPress={() => this.props.navigation.navigate('User', { user: item })} />
                                            :
                                            null
                                    )}
                                    keyExtractor={item => item.uid}
                                />
                                :
                                <ActivityIndicator size="large" color="#0000ff" />
                        }
                    </ContentBox>
                </View>

            </ContainerNotScrollable>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        marginTop: 30
    }
});

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(CommunityScreen);