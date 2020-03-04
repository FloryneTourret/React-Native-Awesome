import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import HeaderNav from '../components/headerNav';
import Avatar from '../components/avatar';
import Container from '../components/container';
import Heading from '../components/heading';
import SubHeading from '../components/subHeading';


class Settings extends Component {

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { userAuth } = this.props

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
                        <Text>Liens </Text>
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