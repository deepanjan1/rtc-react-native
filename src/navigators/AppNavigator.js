import React from 'react';

import { createStackNavigator } from 'react-navigation';
import Welcome from '../screens/Welcome';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import Splash from '../screens/Splash';

export const AppNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: ({
        header: null,
        headerStyle: {
          backgroundColor: 'white',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 30,
          fontFamily: 'Roboto-Bold',
        },
      }),
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: ({
        title: 'Dashboard',
        headerStyle: {
          backgroundColor: 'white',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 30,
          fontFamily: 'Roboto-Bold',
        },
        headerLeft: null,
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: ({
        title: 'Login or Register',
        headerStyle: {
          backgroundColor: 'white',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 30,
          fontFamily: 'Roboto-Bold',
        },
        headerLeft: null,
      }),
    },
    Splash: {
      screen: Splash,
      navigationOptions: ({
        headerStyle: {
          backgroundColor: 'white',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 30,
          fontFamily: 'Roboto-Bold',
        },
        headerLeft: null,
      }),
    },
  },
  {
    initialRouteName: 'Splash',
  },
);
