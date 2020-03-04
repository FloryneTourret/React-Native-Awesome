import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const HeaderNav = ({ label, onPress, icon }) => {
    return (
        <View style={styles.linksNav}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Icon
                    name={icon}
                    style={styles.iconLink}
                />
            </TouchableOpacity>
            <Text style={styles.heading}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    linksNav: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconLink: {
        fontSize: 20,
        color: '#384356',
    },
    heading: {
        color: '#364354',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 0,
        flex: 1,
        textAlign: 'center'
    },
});

export default HeaderNav;