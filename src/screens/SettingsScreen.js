import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import firebase from 'firebase';


class Settings extends Component {

    componentDidMount() {

        firebase.auth().onAuthStateChanged(async (user) => {
            console.log(user)
        })

    }
    render() {
        const { auth } = this.props
        const { userAuth } = auth

        return (
            <ScrollView style={styles.container} >
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
        fontSize: 30,
        color: '#384356',
    },
    heading: {
        color: '#364354',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 0,
        flex: 1,
        textAlign: 'center'
    },
});

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {})(Settings);