import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

class HomeScreen extends Component {

    render() {

        return (
            <View style={styles.container}>
                <Text>Home</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: '#F4F4FA',
    },
});

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(HomeScreen);