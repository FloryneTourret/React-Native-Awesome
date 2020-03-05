import React from 'react';
import { StyleSheet, View } from 'react-native';

const ContainerNotScrollable = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#F4F4FA',
        flex: 1
    },
});

export { ContainerNotScrollable };