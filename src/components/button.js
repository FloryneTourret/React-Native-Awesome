import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Button = ({ label, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.link}>{label}</Text>
                <Icon
                    name="arrowright"
                    style={styles.icon}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#5468FF',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    link: {
        textTransform: 'uppercase',
        color: '#F9FBF5',
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    icon: {
        color: '#F9FBF5',
        fontSize: 16,
        alignSelf: 'center',
        backgroundColor: '#3C56F2',
        padding: 10,
        borderRadius: 100,

    },
});

export { Button };