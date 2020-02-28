import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

import Navbar from '../components/navbar'
import Link from '../components/link'
import ContentBox from '../components/contentBox'

class ProfileScreen extends Component {

    render() {
        const { link1, link2, link3, toggleActive } = this.props

        return (
            <ScrollView style={styles.container} >
                <TouchableOpacity>
                    <Icon
                        name="setting"
                        style={styles.settings}
                    />
                </TouchableOpacity>
                <Image
                    style={styles.avatar}
                    source={require('../../assets/img/user.jpg')}
                />
                <Text style={styles.heading}>Jane Doe</Text>
                <Text style={styles.subHeading}>Lorem ipsum</Text>

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
                            <Text>Oui</Text>
                        </ContentBox >
                        : null
                }
                {
                    link2.active ?
                        <ContentBox>
                            <Text>Non</Text>
                        </ContentBox>
                        : null
                }
                {
                    link3.active ?
                        <ContentBox>
                            <Text>Peut etre</Text>
                        </ContentBox>
                        : null
                }

            </ScrollView >
        );
    }
}

const toggleActive = (value) => {
    return {
        type: 'active',
        payload: { item: value }
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: '#F4F4FA',
    },
    settings: {
        fontSize: 25,
        color: '#384356',
        alignSelf: 'flex-end'
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
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: '100',
        marginTop: 5
    },
    navigation: {
        marginTop: 15
    }
});

const mapStateToProps = (state) => {
    return state.profileNav;
};

export default connect(mapStateToProps, { toggleActive })(ProfileScreen);