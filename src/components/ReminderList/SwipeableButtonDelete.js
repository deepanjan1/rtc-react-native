import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import PropTypes from 'prop-types';

export default class SwipeableButtonDelete extends React.Component {
  constructor(props) {
    super(props);
    this.swipeable = null;
  };

  render = () => (
    <TouchableHighlight
      onPress={() => {
        this.swipeable.recenter();

        // cancel first reminder
        cancelNotification(this.state.notificationID.firstReminder);

        // cancel follow up reminder
        cancelNotification(this.state.notificationID.followUpNotification);

        removeReminder(this.props.user, this.state.activeKey); // remove from database
        this.props.actionFunction();
      }}

      underlayColor='white'
      >
      <View style={{
        justifyContent: 'center',
        height: '100%',
        alignItems: 'flex-start',
        paddingLeft: 25,
      }}>
        <View
          style={{
            backgroundColor: '#c20828',
            padding: 10,
            borderRadius: 23,
          }}>
          <MaterialIcons
            name='delete'
            color='white'
            size={ 30 }
          />
        </View>
      </View>
    </TouchableHighlight>
  );
}

SwipeableButtonDelete.propTypes = {
  reminders: PropTypes.array.isRequired,
  loadActiveReminder: PropTypes.func.isRequired,
  showEditModal: PropTypes.func.isRequired,
  user: PropTypes.string,
  actionFunction: PropTypes.func.isRequired,
  updateReminder: PropTypes.func.isRequired,
};
