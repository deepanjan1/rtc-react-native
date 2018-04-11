import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { routesConfig } from './src/config/routes';
import Welcome from './src/screens/Welcome';
import Dashboard from './src/screens/Dashboard';
import { StackNavigator } from 'react-navigation';

// const AppNavigator = TabNavigator(routesConfig, {
//   navigationOptions: {
//     tabBarVisible: false,
//   },
// });

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
      })
    },
  },
  {
    initialRouteName: 'Dashboard',
  },
);

export default class App extends React.Component {
  render() {
    return (
      <Navigator />
      // <View style={styles.container}>
      //   <Welcome />
      // </View>
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
