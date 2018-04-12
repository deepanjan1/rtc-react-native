import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './src/screens/Welcome';
import Dashboard from './src/screens/Dashboard';
import { StackNavigator } from 'react-navigation';
import { initApi } from './src/services/api';

const Navigator = StackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: ({
        header: 'null',
      }),
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: ({
        title: 'Your Dashboard',
      }),
    },
  },
  {
    initialRouteName: 'Dashboard',
  },
);

export default class App extends React.Component {
  componentWillMount() {
    initApi();
  }

  render() {
    return (
      <Navigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
