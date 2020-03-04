import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Heading = ({ children }) => {
    return (
        <Text style={styles.heading}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    heading: {
        color: '#364354',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 15
    },
});

export { Heading };