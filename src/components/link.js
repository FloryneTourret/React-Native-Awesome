import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Link = ({ data, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            {data.active ? <Text style={styles.active}>{data.label}</Text> : <Text style={styles.link}>{data.label}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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

export default Link;