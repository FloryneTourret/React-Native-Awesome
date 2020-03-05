import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, Dimensions } from 'react-native';
import { Navbar, NavigationLink, ContentBox, Avatar, Container, Heading, SubHeading } from '../components/'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { AsyncStorage } from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';


class ProfileScreen extends Component {

    constructor(props) {
        super(props)

        if (this.props.profileNav.link1.active) {
            this.content1 = new Animated.ValueXY({ x: 0, y: 0 })
            this.content2 = new Animated.ValueXY({ x: 0, y: 0 })
        }
        if (this.props.profileNav.link2.active) {
            this.content1 = new Animated.ValueXY({ x: (-1 * Dimensions.get('window').width), y: 0 })
            // + 60 because padding 30 on container
            this.content2 = new Animated.ValueXY({ x: (-1 * Dimensions.get('window').width + 60), y: 0 })
        }
    }
    _appear1 = () => (
        Animated.parallel([
            Animated.spring(
                this.content1, {
                toValue: { x: 0, y: 0 },
            }),
            Animated.spring(
                this.content2, {
                toValue: { x: 0, y: 0 },
            }),
        ]).start()
    )
    _appear2 = () => (
        Animated.parallel([
            Animated.spring(
                this.content1, {
                toValue: { x: (-1 * Dimensions.get('window').width), y: 0 },
            }),
            Animated.spring(
                this.content2, {
                toValue: { x: (-1 * Dimensions.get('window').width + 60), y: 0 },
            }),
        ]).start()
    )

    async componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {

        const { profileNav, toggleActive } = this.props
        const { link1, link2 } = profileNav

        const { auth } = this.props
        const { userAuth } = auth

        const config = {
            velocityThreshold: 0,
            directionalOffsetThreshold: 80
        };
        return (
            <Container>
                <View style={styles.linksNav}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')} >
                        <Icon name="setting" style={styles.iconLinkSettings} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.removeItem('user')
                            firebase.auth().signOut()
                            this.props.navigation.navigate('Loading')
                        }} >
                        <Icon name="logout" style={styles.iconLinkLogout} />
                    </TouchableOpacity>
                </View>

                {userAuth.photoURL ?
                    <Avatar
                        source={{ uri: userAuth.photoURL }}
                    />
                    :
                    <Avatar
                        source={require('../../assets/img/user.png')}
                    />
                }
                {
                    userAuth.displayName ?
                        <Heading>{userAuth.displayName}</Heading>
                        :
                        <Heading>{userAuth.email.split('@')[0]}</Heading>
                }
                <SubHeading>Sub Heading</SubHeading>

                <View style={styles.navigation}>
                    <Navbar>
                        <NavigationLink data={link1} onPress={() => { toggleActive(link1); this._appear1() }}></NavigationLink>
                        <NavigationLink data={link2} onPress={() => { toggleActive(link2); this._appear2() }}></NavigationLink>
                    </Navbar>
                </View>

                <GestureRecognizer
                    onSwipeLeft={() => { toggleActive(link2); this._appear2() }}
                    onSwipeRight={() => { toggleActive(link1); this._appear1() }}
                    config={config}
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Animated.View style={[this.content1.getLayout()]}>
                        <ContentBox>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                        </ContentBox >
                    </Animated.View>
                    <Animated.View style={[this.content2.getLayout()]}>
                        <ContentBox>
                            <Text>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</Text>
                        </ContentBox >
                    </Animated.View>
                </GestureRecognizer>

            </Container >
        );
    }
}


const styles = StyleSheet.create({
    linksNav: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    iconLinkSettings: {
        fontSize: 25,
        color: '#384356',
        margin: 5
    },
    iconLinkLogout: {
        fontSize: 23,
        color: '#384356',
        margin: 5
    },
    navigation: {
        marginTop: 15
    }
});

const toggleActive = (value) => {
    return {
        type: 'active',
        payload: { item: value }
    }
}
const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, { toggleActive })(ProfileScreen);