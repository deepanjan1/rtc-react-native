import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Welcome } from '../screens/Welcome';
import { Dashboard } from '../screens/Dashboard';

const MainScreenNavigator = (Component) =>
  StackNavigator({
    Welcome: {
      screen: { Welcome },
    },
    Dashboard: {
      screen: { Dashboard },
    },
  });



export default routesConfig;
