import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { loginWithFacebook } from '../services/facebookAPI';
import { userLoginStatus } from '../services/firebase';
import * as Action from '../actions/actions';

class Login extends React.Component {
  // componentDidMount = () => {
  //   userLoginStatus();
  // };

  render() {
    const { navigate } = this.props.navigation;
    const { loadUser, user } = this.props;
    return (
      <View style={ styles.container }>
        <Button
          title='Login'
          onPress={ async() => {
            const currentUser = userLoginStatus();
            console.log(currentUser);
            if (currentUser) {
              console.log(currentUser.displayName + ' is already logged in!');
              await loadUser(currentUser);
              navigate('Dashboard');
            } else {
              await loginWithFacebook();
              const currentUser = userLoginStatus();
              loadUser(currentUser);
              console.log(currentUser.displayName + ' is logged in!');
              navigate('Dashboard');
            }
          } }

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

mapStateToProps = (state) => (
  {
    user: state.user.user,
  }
);

mapDispatchToProps = (dispatch) => (
  ({
    loadUser: (user) => {
      dispatch(Action.loadUser(user));
    },
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
