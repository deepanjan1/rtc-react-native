import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  ButtonGroup,
  Icon,
  Button,
} from 'react-native-elements';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    datePickerModal: false,
    name: '',
    personID: '',
    date: '',
    selectedFrequency: 0,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.editReminder !== this.props.editReminder) {
      this.setState(
        {
          name: nextProps.editReminder.name,
          personID: nextProps.editReminder.personID,  // to firebase
          date: nextProps.editReminder.date, // to firebase
          selectedFrequency: nextProps.editReminder.frequency, // to firebase
        }
      );
    }
  };

  updateFrequency = (selectedFrequency) => {
    this.setState({ selectedFrequency });
  };

  render() {
    const frequency = ['Bi-Weekly', 'Quarterly', 'Bi-Annually', 'Annually'];
    return (
      <Modal
        isVisible={ this.props.showEditForm }
        onBackdropPress={ this.props.closeEditForm }
        animationIn='fadeIn'
        animationInTiming={200}
        animationOut='fadeOut'
        animationOutTiming={200}>
        <View style={styles.container}>
          <FormLabel>Name</FormLabel>
          <FormInput
            value={ this.state.name }
            inputStyle={ styles.input }
            onFocus={this.onFocus}
            editable={ false }
          />
          <View style={ styles.row } />
          <View>
            <FormLabel>Frequency</FormLabel>
            <View style={styles.frequency}>
              <ButtonGroup
                onPress={this.updateFrequency}
                selectedIndex={this.state.selectedFrequency}
                buttons={frequency}
                buttonStyle={ styles.frequencyButton }
                textStyle={ styles.frequencyButtonText }
                containerStyle={{ height: 50 }}
                selectedButtonStyle={ styles.selectedFrequencyButton }
                selectedTextStyle={ styles.selectedFrequencyButtonText }
              />
            </View>
            <View style={ styles.row } />
            <FormLabel>First Reminder</FormLabel>
            <View style={ styles.datePicker }>
              <Icon
                name='date-range'
                color='#1a9bfc'
                containerStyle={{ marginTop: 0, flex: 1, }}
                onPress={() => this.setState({ datePickerModal: true })}
              />
              <Text style={ styles.dateStyle }>
                { this.state.date }
              </Text>
              <Icon
                name='check-circle'
                color='#1a9bfc'
                containerStyle={{ marginTop: 0, flex: 1, }}
                onPress={() => {
                  this.props.updateReminder(this.props.user, {
                    name: this.state.name,
                    date: this.state.date,
                    personID: this.state.personID,
                    frequency: this.state.selectedFrequency,
                    key: this.props.editReminder.key,
                  });
                  this.props.closeEditForm();
                }}

              />
            </View>
            <Modal
              isVisible={ this.state.datePickerModal }
              onBackdropPress={() => this.setState({ datePickerModal: false })}
              animationIn='fadeIn'
              animationInTiming={200}
              animationOut='fadeOut'
              animationOutTiming={200}>
                <Calendar
                  onChange={(date) => this.setState({
                    date: date.format('MM/DD/YYYY'),
                    datePickerModal: false, })}
                  selected={ this.state.date }
                  minDate={Moment().startOf('day')}
                  maxDate={Moment().add(10, 'years').startOf('day')}
                  style={ styles.calendar }
                  barView = { styles.barView }
                  barText = { styles.barText }
                />
            </Modal>
          </View>
        </View>
      </Modal>
    );
  }
}

EditForm.propTypes = {
  showEditForm: PropTypes.bool.isRequired,
  closeEditForm: PropTypes.func.isRequired,
  editReminder: PropTypes.object.isRequired,
  updateReminder: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 600,
  },
  row: {
    marginTop: 20,
  },
  input: {
    fontSize: 20,
    width: '100%',
    color: '#8e8e8e',
  },
  frequency: {
    padding: 15,
  },
  datePicker: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 15,
  },
  calendar: {
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  barView: {
    backgroundColor: '#1a9bfc',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  barText: {
    color: '#ffffff',
  },
  frequencyButton: {
    borderColor: '#1a9bfc',
    backgroundColor: '#ffffff',
  },
  frequencyButtonText: {
    fontSize: 12,
    color: '#1a9bfc',
  },
  selectedFrequencyButton: {
    borderColor: '#1a9bfc',
    backgroundColor: '#1a9bfc',
  },
  selectedFrequencyButtonText: {
    fontSize: 12,
    color: '#ffffff',
  },
  dateStyle: {
    fontSize: 20,
    color: '#1a9bfc',
    flex: 4,
  },
});
