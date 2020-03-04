import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { HeaderNav, Container } from '../components';


class SettingsEmail extends Component {

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { userAuth } = this.props.auth

        return (
            <Container>
                <HeaderNav icon="arrowleft" label="Edit Email" onPress={() => { this.props.navigation.goBack() }} />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.links}>
                        <Text>Edit email fields</Text>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    data: {
        marginTop: 30,
    },
    links: {
        marginTop: 40,
    },
});

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {})(SettingsEmail);