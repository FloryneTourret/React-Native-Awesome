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
import CommunityScreen from './src/screens/CommunityScreen'
import UserScreen from './src/screens/UserScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import LoginScreen from './src/screens/LoginScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import SettingsAccountScreen from './src/screens/SettingsAccountScreen'
import SettingsEmailScreen from './src/screens/SettingsEmailScreen'
import SettingsPasswordScreen from './src/screens/SettingsPasswordScreen'
import SettingsDeleteScreen from './src/screens/SettingsDeleteScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'


const LoginFlow = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
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
    SettingsAccount: {
      screen: SettingsAccountScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    SettingsEmail: {
      screen: SettingsEmailScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    SettingsPassword: {
      screen: SettingsPasswordScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    SettingsDelete: {
      screen: SettingsDeleteScreen,
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

const CommunityFlow = createStackNavigator(
  {
    Community: {
      screen: CommunityScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    User: {
      screen: UserScreen,
      navigationOptions: {
        headerShown: false,
      }
    }
  },
  {
    initialRouteName: 'Community'
  }
);


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
    Community: {
      screen: CommunityFlow,
      navigationOptions: {
        tabBarLabel: 'Community',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="team" color={tintColor} size={25} />
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
