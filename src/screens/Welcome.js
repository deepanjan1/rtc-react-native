import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Header from '../components/Header';
import IntroFlow from '../components/IntroFlow';
import { connect } from 'react-redux';
import { loginWithFacebook, loginWithGoogle } from '../services/facebookAPI';
import * as Action from '../actions/actions';

class Welcome extends React.Component {

  state = {
    showTitle: true,
  };

  componentDidMount = () => {
    this.unsubscribeCurrentUserListener = this.props.watchUserDataForLogin();
    setTimeout(() => {
      this.setState({
        showTitle: false,
      });
    }, 2000);
  };

  componentWillUnmount = () => {
    if (this.unsubscribeCurrentUserListener) {
      this.unsubscribeCurrentUserListener();
    }
  };

  logUserIn = async (provider) => {
    if (provider === 'facebook') {
      await loginWithFacebook();
    } else if (provider === 'google') {
      await loginWithGoogle();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <IntroFlow
          logUserIn={ this.logUserIn }
        />
      </View>
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

mapDispatchToProps = (dispatch) => (
  ({

    watchUserDataForLogin: () => {
      dispatch(Action.watchUserDataForLogin());
    },

  })
);

export default connect(null, mapDispatchToProps)(Welcome);
