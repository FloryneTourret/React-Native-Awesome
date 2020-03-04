import React from 'react';
import { StyleSheet, Image } from 'react-native';

const Avatar = ({ source }) => {
    return (
        <Image
            style={styles.avatar}
            source={source}
        />
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 8,
    },
});

export default Avatar;