import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { loginWithFacebook, loginWithGoogle } from '../services/facebookAPI';
import * as Action from '../actions/actions';

class Login extends React.Component {
  constructor (props) {
    super(props);
  };

  componentDidMount = () => {
    this.unsubscribeCurrentUserListener = this.props.watchUserDataForLogin();
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

  render = () => {
    const { navigate } = this.props.navigation;
    const {
      user,
      isLoggedIn,
      setLoggedInUser,
    } = this.props;
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          onPress={ () => this.logUserIn('facebook') }
          underlayColor='transparent'>
          <View style={ styles.facebookLoginButtonViewContainer }>
            <View style={ styles.iconView }>
              <Ionicons
                name='logo-facebook'
                color='#ffffff'
                size={40} />
            </View>
            <View style={ styles.textView }>
              <Text style={ styles.loginButtonText }>
                Continue with Facebook
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        {/* <TouchableHighlight
          onPress={ () => this.logUserIn('google') }
          underlayColor='transparent'>
          <View style={ styles.googleLoginButtonViewContainer }>
            <View style={ styles.iconView }>
              <Ionicons
                name='logo-google'
                color='#ffffff'
                size={40} />
            </View>
            <View style={ styles.textView }>
              <Text style={ styles.loginButtonText }>
                Continue with Google
              </Text>
            </View>
          </View>
        </TouchableHighlight> */}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  facebookLoginButtonViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: '#4468b0',
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
  googleLoginButtonViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: '#e8453c',
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    flex: 4,
  },
  loginButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    color: '#ffffff',
  },
});

mapStateToProps = (state) => (
  {
    user: state.user.user,
    isLoggedIn: state.user.isLoggedIn,
    notificationToken: state.user.notificationToken,
  }
);

mapDispatchToProps = (dispatch) => (
  ({
    loadUser: (user) => {
      dispatch(Action.loadUser(user));
    },

    setLoggedInUser: (isLoggedIn) => {
      dispatch(Action.setLoggedInUser(isLoggedIn));
    },

    loadNotificationToken: (notificationToken) => {
      dispatch(Action.loadNotificationToken(notificationToken));
    },

    watchUserDataForLogin: () => {
      dispatch(Action.watchUserDataForLogin());
    },

  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
