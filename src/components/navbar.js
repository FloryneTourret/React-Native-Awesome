import React from 'react';
import { View, StyleSheet } from 'react-native';

const Navbar = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'space-around',
        marginTop: 15
    }
});

export default Navbar;