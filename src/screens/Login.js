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
import { loginWithFacebook, loadCurrentUser } from '../services/facebookAPI';
import * as Action from '../actions/actions';
import { currentUserListener } from '../services/api';

class Login extends React.Component {
  constructor (props) {
    super(props);
  };

  componentDidMount = () => {
    this.unsubscribeCurrentUserListener = currentUserListener((snapshot) => {
      try {
        this.props.watchUserDataForLogin();
      } catch (e) {
        this.setState({ error: e, });
      }
    });
  };

  componentWillUnmount = () => {
    if (this.unsubscribeCurrentUserListener) {
      this.unsubscribeCurrentUserListener();
    }
  };

  logUserIn = async () => {
    await loginWithFacebook();
  };

  render = () => {
    const { navigate } = this.props.navigation;
    const {
      loadUser,
      user,
      isLoggedIn,
      setLoggedInUser,
    } = this.props;
    return (
      <View style={ styles.container }>
        <TouchableHighlight
          onPress={ () => this.logUserIn(loadUser, setLoggedInUser) }
          underlayColor='transparent'>
          <View style={ styles.loginButtonViewContainer }>
            <View style={ styles.fbIconView }>
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
  loginButtonViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: '#4468b0',
    borderRadius: 5,
  },
  fbIconView: {
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
