import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Icon, Button } from 'react-native-elements';
import { getPermissionNotifications } from './NotificationFunctions';

export default class Notifications extends React.Component {
  render = () => (
    <Modal
      isVisible={ this.props.showNotificationsModal }
      onBackdropPress={ this.props.closeNotificationsModal }
      animationIn='fadeIn'
      animationInTiming={200}
      animationOut='fadeOut'
      animationOutTiming={200}
      >
      <View style={ styles.container }>
        <View style={ styles.headerContainer }>
          <Text style={ styles.headerText }>
            Lets make sure we can send you reminders!
          </Text>
        </View>
        <View style={ styles.buttonContainer }>
          <Button
            title='Enable Notifications'
            buttonStyle={ styles.button }
            onPress= { async () =>
              {
                await getPermissionNotifications(
                  this.props.loadNotificationToken
                );
                this.props.closeNotificationsModal();
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
};

const styles = StyleSheet.create({
    container: {
      height: '30%',
      borderRadius: 15,
      backgroundColor: 'white',
    },
    headerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flex: 1,
    },
    button: {
      borderRadius: 15,
      backgroundColor: '#1787fb',
    },
  });
