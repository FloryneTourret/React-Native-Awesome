import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const NavigationLink = ({ data, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                {data.active ? <Text style={styles.active}>{data.label}</Text> : <Text style={styles.link}>{data.label}</Text>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 15
    },
    link: {
        textTransform: 'uppercase',
        color: '#909AA2',
        fontSize: 14
    },
    active: {
        textTransform: 'uppercase',
        color: '#575F71',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export { NavigationLink };