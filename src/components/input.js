import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Input = ({ icon, placeholder, value, onChangeText, secured }) => {
    return (
        <View style={styles.section}>
            <Icon
                name={icon}
                style={styles.icon}
            />
            {secured ?
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChangeText}
                    secureTextEntry
                />
                : <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChangeText}
                />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 5,
        backgroundColor: '#FCFBFD',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 20,
        paddingLeft: 10
    },
    input: {
        fontSize: 16,
        fontWeight: '100',
        paddingLeft: 10,
        flex: 1
    },
});

export { Input };