import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import LoginScreen from './src/screens/LoginScreen'


const LoginFlow = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    initialRouteName: 'Login'
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
    Profile: {
      screen: ProfileScreen,
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
    LoginFlow,
    AuthFlow,
  },
  {
    initialRouteName: 'AuthFlow'
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>
  )
};
