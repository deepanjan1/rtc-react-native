import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { loginWithFacebook, loadCurrentUser } from '../services/facebookAPI';
import * as Action from '../actions/actions';
import { currentUserListener } from '../services/api';

class Splash extends React.Component {
  constructor (props) {
    super(props);
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.unsubscribeCurrentUserListener = this.props.watchUserDataForLoad();
    }, 1000);
  };

  componentWillUnmount = () => {
    if (this.unsubscribeCurrentUserListener) {
      this.unsubscribeCurrentUserListener();
    }
  };

  render = () => (
    <View style={styles.container}>
      <View style={ styles.imageContainer }>
        <Image
          style={styles.image}
          source={require('../assets/images/splash_logo.png')}
          resizeMode='contain'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: '50%',
  },
  imageContainer: {
    flex: 1,
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

    watchUserDataForLoad: () => {
      dispatch(Action.watchUserDataForLoad());
    },

  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
