import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackNavigator } from 'react-navigation';

class IntroFlow extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnTap = this.handleOnTap.bind(this);
    this.activeDot = (<View style=
      {{
        backgroundColor: '#ffffff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }} />);
  }

  handleOnTap() {
    this.props.onTap('Login');
  }

  render() {
    return (
      <Swiper loop={false} bounces={true} activeDot={ this.activeDot }>
        <View style={styles.containerOne}>
          <View style={ styles.captionContainer }>
            <Text style={ styles.caption }>
              We all have people we wish we talked to move often.
            </Text>
          </View>
          <View style={ { flex: 2, justifyContent: 'center', } }>
            <View style={ { flexDirection: 'row', } }>
              <Image
                style={{ width: 120, height: 120, margin: 10, }}
                resizeMethod='scale'
                source={require('../assets/images/person1.png')}
              />
              <Image
                style={{ width: 120, height: 120, margin: 10, }}
                resizeMethod='scale'
                source={require('../assets/images/person2.png')}
              />
            </View>
            <View style={ { flexDirection: 'row', justifyContent: 'center', } }>
              <Image
                style={{ width: 120, height: 120, margin: 10, }}
                resizeMethod='scale'
                source={require('../assets/images/person3.png')}
              />
            </View>
          </View>
          <View style={ styles.captionContainer }>
            <Text style={ styles.caption }>
              We're here to help.
            </Text>
          </View>
        </View>
        <View style={styles.containerTwo}>
          <Text style={ styles.caption }>
            Pick your friends.
          </Text>
        </View>
        <View style={styles.containerThree}>
          <Text style={ styles.caption }>
            Create reminders, and always Remember to Call!
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
  containerOne: {
    height: '100%',
    backgroundColor: '#1a9bfc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  captionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  containerTwo: {
    height: '100%',
    backgroundColor: '#db5149',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containerThree: {
    height: '100%',
    backgroundColor: '#e78e54',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default IntroFlow;
