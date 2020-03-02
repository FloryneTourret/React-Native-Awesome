import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: '#F4F4FA',
    },
});

export default HomeScreen;