import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Button from 'apsl-react-native-button';

export default class Dashboard extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container }>
          <View style={ styles.row }>
            <Button
              style={ styles.button }
              textStyle={{ color: '#fff' }}
              onPress={() => console.log('Profile')}>
              Profile
            </Button>
            <Button
              style={ styles.button }
              textStyle={{ color: '#fff' }}
              onPress={() => console.log('Create Reminder')}>
              Create Reminder
            </Button>
          </View>
          <View style={ styles.subHeading }>
            <Text style={ styles.subHeadingText }>
              Below are your existing reminders.
            </Text>
            {/* <Button
              style={ styles.button }
              textStyle={{ color: '#fff' }}
              onPress={() => console.log('Placeholder')}>
              Placeholder
            </Button> */}
          </View>
        {/* <Button
          title="Welcome"
          onPress={ () =>
            navigate('Welcome')
          }
        /> */}
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
  button: {
    backgroundColor: '#1a9bfc',
    borderWidth: 0,
    width: '33%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  subHeadingText: {
    fontSize: 15,
    fontWeight: '200',
  },
});
