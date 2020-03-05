import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ContentBox, Avatar, Container, Heading, SubHeading, HeaderNav } from '../components/'
import { connect } from 'react-redux';


class ProfileScreen extends Component {
    async componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const user = this.props.navigation.getParam('user')

        return (
            <Container>
                <HeaderNav icon="arrowleft" onPress={() => { this.props.navigation.goBack() }} />
                <View style={styles.content}>
                    {user.photoURL ?
                        <Avatar
                            source={{ uri: user.photoURL }}
                        />
                        :
                        <Avatar
                            source={require('../../assets/img/user.png')}
                        />
                    }
                    {
                        user.displayName ?
                            <Heading>{user.displayName}</Heading>
                            :
                            <Heading>{user.email.split('@')[0]}</Heading>
                    }
                    <SubHeading>Sub Heading</SubHeading>


                    <ContentBox>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                    </ContentBox >
                </View>

            </Container >
        );
    }
}


const styles = StyleSheet.create({
    content: {
        marginTop: 30
    }
});


const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {})(ProfileScreen);