import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const UserList = ({ username, avatar, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {
                avatar ?
                    <Image
                        style={styles.avatar}
                        source={{ uri: avatar }}
                    />
                    :
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/img/user.png')}
                    />
            }
            <View>
                <Text style={styles.username}>{username}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderColor: '#FFFFFF',
    },
    username: {
        color: '#364354',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 16,
        marginLeft: 10
    },
    subtitle: {
        color: '#67707A',
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: '100',
        marginTop: 5
    },
});

export { UserList };