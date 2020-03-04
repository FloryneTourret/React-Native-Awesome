import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { HeaderNav, Avatar, Container, Heading, SubHeading, NavLink } from '../components/';


class Settings extends Component {

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { userAuth } = this.props.auth

        return (
            <Container>
                <HeaderNav icon="arrowleft" label="Settings" onPress={() => { this.props.navigation.goBack() }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.data}>
                        {userAuth.avatar ?
                            <Avatar source={{ uri: userAuth.avatar }} />
                            :
                            <Avatar source={require('../../assets/img/user.png')} />
                        }

                        {
                            userAuth.displayName ?
                                <Heading>{userAuth.displayName}</Heading>
                                :
                                <Heading>{userAuth.email.split('@')[0]}</Heading>
                        }

                        <SubHeading>{userAuth.email}</SubHeading>

                    </View>
                    <View style={styles.links}>
                        <NavLink
                            onPress={() => this.props.navigation.navigate('Profile')}
                            icon="user"
                            label="Edit account"
                        />

                        <NavLink
                            onPress={() => this.props.navigation.navigate('Profile')}
                            icon="mail"
                            label="Edit email"
                        />

                        <NavLink
                            onPress={() => this.props.navigation.navigate('Profile')}
                            icon="lock"
                            label="Edit password"
                        />

                        <NavLink
                            onPress={() => this.props.navigation.navigate('Profile')}
                            icon="deleteuser"
                            label="Delete account"
                        />
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    data: {
        marginTop: 30,
    },
    links: {
        marginTop: 40,
    },
});

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {})(Settings);