import React from 'react';
import { View, StyleSheet } from 'react-native';

const ContentBox = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 50,
        padding: 15
    }
});

export { ContentBox };