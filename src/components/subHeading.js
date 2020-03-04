import React from 'react';
import { StyleSheet, Text } from 'react-native';

const SubHeading = ({ children }) => {
    return (
        <Text style={styles.subHeading}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    subHeading: {
        color: '#67707A',
        alignSelf: 'center',
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: '100',
        marginTop: 5
    },
});

export { SubHeading };