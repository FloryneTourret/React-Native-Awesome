import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

const Container = ({ children }) => {
    return (
        <ScrollView style={styles.container}>
            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#F4F4FA',
        flex: 1
    },
});

export { Container };