import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackNavigator } from 'react-navigation';

class IntroFlow extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnTap = this.handleOnTap.bind(this);
  }

  handleOnTap() {
    this.props.onTap('Login');
  }

  render() {
    return (
      <Swiper loop={false} bounces={true}>
        <View style={styles.container}>
          <Text style={ styles.caption }>
            Stay in touch with the friends you love but can't find the time.
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={ styles.caption }>
            Pick Your Friends
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={ styles.caption }>
            Create Reminders and Always Remember to Call!
          </Text>
          <Button
            title='Login'
            onPress={ this.handleOnTap }
          />
        </View>
      </Swiper>
    );
  }
}

IntroFlow.propTypes = {
  onTap: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default IntroFlow;
