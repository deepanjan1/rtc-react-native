import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {
  Input,
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
    frequency: 'Every Two Weeks',
    frequencyModal: false,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.editReminder !== this.props.editReminder) {
      this.setState(
        {
          name: nextProps.editReminder.name,
          personID: nextProps.editReminder.personID,  // to firebase
          date: nextProps.editReminder.date, // to firebase
          frequency: nextProps.editReminder.frequency, // to firebase
        }
      );
    }
  };

  frequencyButton = (frequencySelection) => (
    <TouchableHighlight
      onPress={() => {
        this.setState({
          frequency: frequencySelection,
          frequencyModal: false,
        });
      }}

      underlayColor='transparent'>

      <Text style={ styles.frequency }>{ frequencySelection }</Text>
    </TouchableHighlight>
  );

  render() {
    return (
      <Modal
        isVisible={ this.props.showEditForm }
        onBackdropPress={ this.props.closeEditForm }
        animationIn='fadeIn'
        animationInTiming={200}
        animationOut='fadeOut'
        animationOutTiming={200}>
        <View style={styles.container}>
          <Text style={styles.name}>Who do you want to remember to call?</Text>
          <View style={styles.inputField}>
            <Icon
              name='person'
              size={25}
              color='#1787fb'
            />
            <Input
              inputStyle = { styles.input }
              containerStyle = { styles.inputContainer }
              onFocus={ this.onFocus }
              value={ this.state.name }
              editable={ false }
            />
          </View>
          <View style={ { marginTop: 20 } }>
            <Text style={styles.name}>When do you want your first reminder?</Text>
              <View style={ styles.inputField }>
                <Icon
                  name='date-range'
                  size={25}
                  color='#1787fb'
                />
                <TouchableHighlight
                  onPress={ () => this.setState({ datePickerModal: true }) }
                  underlayColor='transparent'
                  style={{
                    paddingLeft: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#e8e9ea',
                    width: '80%',
                  }}>
                  <Text style={ styles.name }>{this.state.date}</Text>
                </TouchableHighlight>
              </View>
          </View>
          <View style={ { marginTop: 20 } }>
            <Text style={styles.name}>How often to you want to reach out?</Text>
            <View style={ styles.inputField }>
              <Icon
                name='cached'
                size={25}
                color='#1787fb'
              />
              <View style={{ width: '100%' }}>
                <TouchableHighlight
                  style={{
                    paddingLeft: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#e8e9ea',
                    width: '80%',
                  }}
                  onPress= {
                    () => this.setState({
                      frequencyModal: true,
                    })
                  }
                  >
                  <Text style={ styles.name }>{this.state.frequency}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View style={ { marginTop: 20 } }>
            <Button
              title='Save Reminder'
              buttonStyle={ styles.saveButton }
              textStyle={ styles.saveButtonText }
              onPress={ () => {
                this.props.updateReminder(this.props.user, {
                  name: this.state.name,
                  date: this.state.date,
                  personID: this.state.personID,
                  frequency: this.state.frequency,
                  key: this.props.editReminder.key,
                  phoneNumber: this.props.editReminder.phoneNumber,
                  streak: this.props.editReminder.streak,
                });
                this.props.closeEditForm();
                this.props.actionFunction();
              } }

            />
          </View>
          <View>
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
            <Modal
              isVisible={ this.state.frequencyModal }
              onBackdropPress={() => this.setState({ frequencyModal: false })}
              animationIn='fadeIn'
              animationInTiming={200}
              animationOut='fadeOut'
              animationOutTiming={200}>
              <View style={ styles.frequencyModal }>
                { this.frequencyButton('Every Two Weeks') }
                { this.frequencyButton('Every Month') }
                { this.frequencyButton('Every Two Months') }
                { this.frequencyButton('Quarterly') }
                { this.frequencyButton('Twice a Year') }
                { this.frequencyButton('Once a Year') }
              </View>
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
  actionFunction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 300,
  },
  input: {
    fontSize: 20,
    width: '100%',
    color: '#8e8e8e',
    fontFamily: 'Roboto-Regular',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
  },
  input: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  email: {
    fontFamily: 'Roboto-Light',
  },
  name: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    fontFamily: 'Roboto-Medium',
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
    fontFamily: 'Roboto-Regular',
    flex: 4,
  },
  saveButton: {
      borderRadius: 25,
      backgroundColor: '#1787fb',
      width: '100%',
    },
  saveButtonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
  frequencyModal: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  frequency: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#1787fb',
    marginTop: 10,
    marginBottom: 10,
  },
});
