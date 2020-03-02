import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { AsyncStorage } from "react-native";

import Navbar from '../components/navbar'
import Link from '../components/link'
import ContentBox from '../components/contentBox'

class ProfileScreen extends Component {

    render() {

        const { profileNav, toggleActive } = this.props
        const { link1, link2, link3 } = profileNav

        const { auth } = this.props
        const { userAuth } = auth

        return (
            <ScrollView style={styles.container} >
                <View style={styles.linksNav}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Settings')}
                    >
                        <Icon
                            name="setting"
                            style={styles.iconLinkSettings}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.removeItem('user')
                            firebase.auth().signOut()
                            await AsyncStorage.getItem('user')
                            this.props.navigation.navigate('Loading')
                        }}
                    >
                        <Icon
                            name="logout"
                            style={styles.iconLinkLogout}
                        />
                    </TouchableOpacity>
                </View>
                <Image
                    style={styles.avatar}
                    source={require('../../assets/img/user.jpg')}
                />
                {
                    userAuth.displayName ?
                        <Text style={styles.heading}>{userAuth.displayName}</Text>
                        :
                        <Text style={styles.heading}>{userAuth.email.split('@')[0]}</Text>
                }
                <Text style={styles.subHeading}>{userAuth.email}</Text>

                <View style={styles.navigation}>
                    <Navbar>
                        <Link data={link1} onPress={() => { toggleActive(link1) }}></Link>
                        <Link data={link2} onPress={() => { toggleActive(link2) }}></Link>
                        <Link data={link3} onPress={() => { toggleActive(link3) }}></Link>
                    </Navbar>
                </View>

                {
                    link1.active ?
                        <ContentBox>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                        </ContentBox >
                        : null
                }
                {
                    link2.active ?
                        <ContentBox>
                            <Text>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</Text>
                        </ContentBox>
                        : null
                }
                {
                    link3.active ?
                        <ContentBox>
                            <Text>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</Text>
                        </ContentBox>
                        : null
                }

            </ScrollView >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: '#F4F4FA',
    },
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
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 8
    },
    heading: {
        color: '#364354',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 15
    },
    subHeading: {
        color: '#67707A',
        alignSelf: 'center',
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: '100',
        marginTop: 5
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