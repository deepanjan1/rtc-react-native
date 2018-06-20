import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { AppNavigator } from './AppNavigator';
import {
  initializeListeners,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { navigationPropConstructor } from './middleware';
import { loadCurrentUser } from '../services/facebookAPI';
import * as Action from '../actions/actions';

class AppWithInternalState extends React.Component {
  componentDidMount = async () => {
    initializeListeners('root', this.props.nav);
  };

  render = () => {
    const { dispatch, nav } = this.props;
    const navigation = {
      dispatch,
      state: nav,
      addListener: createReduxBoundAddListener('root'),
    };
    return <AppNavigator navigation={ navigation } />;
  };
}

AppWithInternalState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithInternalState);
