import React, { Component } from 'react';
import { View, StyleSheet, } from 'react-native';
import { connect } from 'react-redux';

class LoadingScreen extends Component {

    componentDidMount() {
        console.log('Loading')
        console.log(this.props.user)
        if (!this.props.user)
            this.props.navigation.navigate('Login')
        else
            this.props.navigation.navigate('Home')
    }


    render() {

        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: '#F4F4FA',
    }
});

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(LoadingScreen);