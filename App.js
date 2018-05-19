import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import showModal from './src/reducers/modalReducer';

import Welcome from './src/screens/Welcome';
import Dashboard from './src/screens/Dashboard';
import SyncContacts from './src/screens/SyncContacts';
import CreateReminder from './src/screens/CreateReminder';

import { StackNavigator } from 'react-navigation';
import { initApi } from './src/services/api';
import { Font, AppLoading, Asset } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

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
    SyncContacts: {
      screen: SyncContacts,
      navigationOptions: ({
        title: 'Sync Your Contacts',
      }),
    },
    CreateReminder: {
      screen: CreateReminder,
      navigationOptions: ({
        title: 'Create Your Reminder',
      }),
    },
  },
  {
    initialRouteName: 'SyncContacts',
  },
);

const store = createStore(showModal, applyMiddleware(logger));

store.subscribe(SyncContacts);

export default class App extends React.Component {
  state = {
    appIsReady: false,
  };

  componentDidMount() {
    initApi();
    this._loadAssetsAsync();
  }

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <Navigator />
        </Provider>
      );
    }
  }

  async _loadAssetsAsync() {
    await Font.loadAsync({
      'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
    });

    this.setState({
      appIsReady: true,
    });
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
