import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import LoginScreen from './src/screens/LoginScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import SettingsScreen from './src/screens/SettingsScreen'


const LoginFlow = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      }
    }
  },
  {
    initialRouteName: 'Login'
  }
);

const ProfileFlow = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: false,
      }
    }
  },
  {
    initialRouteName: 'Profile'
  }
)

const AuthFlow = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={25} />
        )
      }
    },
    Profile: {
      screen: ProfileFlow,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color={tintColor} size={25} />
        )
      }
    },
  },
  {
    initialRouteName: 'Profile',
    tabBarOptions: {
      activeTintColor: '#5468FF',
      inactiveTintColor: '#364257',
      style: {
        backgroundColor: '#fff',
        borderTopWidth: 0
      }
    }
  }
);

const switchNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    LoginFlow,
    AuthFlow,
  },
  {
    initialRouteName: 'Loading'
  }
);

const AppContainer = createAppContainer(switchNavigator);

class App extends Component {

  state = { user: null };

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBo55JzwyrWY3QeA9nGWHEOWDSuNiLBpsk",
        authDomain: "awesome-c338c.firebaseapp.com",
        databaseURL: "https://awesome-c338c.firebaseio.com",
        projectId: "awesome-c338c",
        storageBucket: "awesome-c338c.appspot.com",
        messagingSenderId: "1029016023096",
        appId: "1:1029016023096:web:8a0e0d8445aa80b799b6cd",
        measurementId: "G-GWGFVB9X8M"
      });
    }
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <AppContainer user={this.state.user} />
      </Provider>
    );
  }

}

export default App;
