import React from 'react';
import { StyleSheet, Text, View, Alert, Linking } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Icon, Button } from 'react-native-elements';
import { getPermissionNotifications } from './NotificationFunctions';

export default class Notifications extends React.Component {
  render = () => (
    <Modal
      isVisible={ this.props.showNotificationsModal }
      animationIn='fadeIn'
      animationInTiming={200}
      animationOut='fadeOut'
      animationOutTiming={200}
      >
      <View style={ styles.container }>
        <View style={ styles.headerContainer }>
          <Text style={ styles.headerText }>
            Turn on Notifications!
          </Text>
        </View>
        <View style={ styles.descriptionContainer }>
          <Text style={ styles.descriptionText }>
            We use notifications to send you reminders to reach out to
            the people you want to stay in touch with.
          </Text>
        </View>
        <View style={ styles.buttonContainer }>
          <Button
            title='Enable Notifications'
            buttonStyle={ styles.button }
            onPress= { async () =>
              {
                let status = await getPermissionNotifications(
                  this.props.loadNotificationToken, this.props.uid
                );
                if (status) {
                  this.props.closeNotificationsModal();
                } else {
                  Alert.alert(
                    'Go To Settings',
                    'You probably already declined notification permissions. Please go to your settings to enable notifications.',
                    [
                      { text: 'Go To Settings', onPress: () => Linking.openURL('app-settings:') },
                    ]
                  );
                };
              }
            }>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

Notifications.propTypes = {
  showNotificationsModal: PropTypes.bool.isRequired,
  closeNotificationsModal: PropTypes.func.isRequired,
  loadNotificationToken: PropTypes.func.isRequired,
  uid: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
      height: '30%',
      borderRadius: 15,
      backgroundColor: 'white',
      padding: 10,
    },
    headerContainer: {
      flex: 1,
      margin: 10,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      textAlign: 'center',
    },
    descriptionContainer: {
      justifyContent: 'flex-start',
      flex: 2,
    },
    descriptionText: {
      fontSize: 15,
      fontFamily: 'Roboto-Light',
      justifyContent: 'center',
      textAlign: 'center',
    },
    buttonContainer: {
      flex: 1,
      margin: 10,
    },
    button: {
      borderRadius: 15,
      backgroundColor: '#1787fb',
    },
  });
