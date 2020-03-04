import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const NavLink = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity style={styles.link} onPress={onPress}>
            <Icon
                name={icon}
                style={styles.iconLink}
            />
            <Text style={styles.textLink}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    link: {
        flexDirection: 'row',
        marginVertical: 15
    },
    iconLink: {
        fontSize: 20,
        color: '#7F8B9E',
        marginRight: 20
    },
    textLink: {
        fontSize: 18,
        color: '#7F8B9E',
    }
});

export { NavLink };