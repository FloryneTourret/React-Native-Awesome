import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Message = ({ children }) => {
    return (
        <Text style={styles.message}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    message: {
        fontSize: 15,
        color: '#5768FC',
        paddingBottom: 15,
        fontWeight: 'bold',
        paddingLeft: 5
    },
});

export { Message };