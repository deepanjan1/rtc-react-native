import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './src/reducers/rootReducer';

import Welcome from './src/screens/Welcome';
import Dashboard from './src/screens/Dashboard';
import Login from './src/screens/Login';

import { addNavigationHelpers } from 'react-navigation';
import { initApi } from './src/services/api';
import { Font, AppLoading, Asset } from 'expo';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import reduxThunk from 'redux-thunk';
import AppWithInternalState from './src/navigators/AppWithInternalState';
import { middleware } from './src/navigators/middleware';

// const store = createStore(rootReducer, applyMiddleware(logger, reduxThunk));
const store = createStore(rootReducer, applyMiddleware(middleware, reduxThunk));

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
          <AppWithInternalState />
        </Provider>
      );
    }
  }

  async _loadAssetsAsync() {
    await Font.loadAsync({
      'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      'Roboto-Regular': require('./src/assets/Roboto/Roboto-Regular.ttf'),
      'Roboto-Light': require('./src/assets/Roboto/Roboto-Light.ttf'),
      'Roboto-Thin': require('./src/assets/Roboto/Roboto-Thin.ttf'),
      'Roboto-Medium': require('./src/assets/Roboto/Roboto-Medium.ttf'),
      'Roboto-Bold': require('./src/assets/Roboto/Roboto-Bold.ttf'),
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
