import React from 'react';

import { StackNavigator } from 'react-navigation';
import Welcome from '../screens/Welcome';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';

// routeNames = {
//   Welcome: { screen: Welcome },
//   Dashboard: { screen: Dashboard },
//   Login: { screen: Login },
// };
//
// config = {
//   navigationOptions: ({
//     header: 'null',
//     headerStyle: {
//       backgroundColor: 'white',
//       borderBottomWidth: 0,
//     },
//     headerLeft: null,
//     headerTitleStyle: {
//       fontSize: 30,
//       fontFamily: 'Roboto-Bold',
//     },
//   }),
//   initialRouteName: 'Dashboard',
// };
//
// export const AppNavigator = StackNavigator(routeNames, config);

export const AppNavigator = StackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: ({
        header: 'null',
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
  },
  {
    initialRouteName: 'Dashboard',
  },
);
