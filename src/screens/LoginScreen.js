import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button onPress={() => { navigation.navigate('Profile') }} title="Log In" />
        </View>
    );
}

const styles = StyleSheet.create({});

export default LoginScreen;