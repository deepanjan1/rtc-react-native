import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

class IntroFlow extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <Swiper
        loop={false}
        bounces={true}
        activeDot={ this.activeDot }
        containerStyle={ styles.swiperStyle }>
        <View style={styles.containerOne}>
          <View style={ styles.captionContainerTop }>
            <Text style={ styles.caption }>
              We all have people we wish we talked to more often.
            </Text>
          </View>
          <View style={ { flex: 1, justifyContent: 'center', } }>
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
          <View style={ styles.captionContainerBottom }>
            <Text style={ styles.caption }>
              We're here to help.
            </Text>
          </View>
        </View>
        <View style={styles.containerTwo}>
          <View style={ styles.captionContainerAlignBottom }>
            <Text style={ styles.caption }>
              Set up reminders
            </Text>
          </View>
          <View style={ { flex: 2, justifyContent: 'flex-start', marginTop: 20, } }>
            <Image
              style={{ width: 150, height: 181, margin: 10, }}
              resizeMethod='scale'
              source={require('../assets/images/alarm_clock.png')}
            />
          </View>
        </View>
        <View style={styles.containerThree}>
          <View style={ styles.captionContainerAlignBottom }>
            <Text style={ styles.caption }>
              Get notifications when it's time to reach out to your friend!
            </Text>
          </View>
          <View style={ { flex: 1, justifyContent: 'center', } }>
            <Image
              style={{ width: 300, height: 89, margin: 10, }}
              resizeMethod='scale'
              source={require('../assets/images/notification_white.png')}
            />
          </View>
          <View style={ styles.captionContainerAlignTop }>
            <Text style={ styles.caption }>
              Reach out within a week and create streaks!
            </Text>
          </View>
        </View>
        <View style={styles.containerFour}>
          <View style={ styles.captionContainerTop }>
            <Text style={ styles.captionWhite }>
              Keep in touch and always remember to call!
            </Text>
          </View>
          <View style={ styles.captionContainerAlignTop }>
            <TouchableHighlight
              onPress={ () => this.props.logUserIn('facebook') }
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
          </View>
        </View>
      </Swiper>
    );
  }
}

IntroFlow.propTypes = {
  logUserIn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  swiperStyle: {
    width: Platform.OS === 'ios' ? '100%' : Dimensions.get('window').width,
  },
  containerOne: {
    height: '100%',
    backgroundColor: '#1a9bfc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  captionContainerTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionContainerAlignBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captionContainerBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionContainerAlignTop: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  caption: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  captionWhite: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    textAlign: 'center',
    color: '#4468b0',
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
  containerFour: {
    height: '100%',
    backgroundColor: '#e8e9ea',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  facebookLoginButtonViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#4468b0',
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

export default IntroFlow;
