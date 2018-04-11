import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackNavigator } from 'react-navigation';

class IntroFlow extends React.Component {
  constructor(props){
    super(props)
    this.handleOnTap = this.handleOnTap.bind(this)
  }

  handleOnTap() {
    this.props.onTap('Dashboard');
  }

  render() {
    return (
      <Swiper loop={false} bounces={true}>
        <View style={styles.container}>
          <Text>
            Stay in touch with the friends you love but can't find the time.
          </Text>
        </View>
        <View style={styles.container}>
          <Text>
            Pick your Friends
          </Text>
        </View>
        <View style={styles.container}>
          <Text>
            Create Reminders and Get Reminded!
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IntroFlow;
