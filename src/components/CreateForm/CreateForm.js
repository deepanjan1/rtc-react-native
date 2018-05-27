import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import SearchList from './SearchList';
import { Permissions, Contacts } from 'expo';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  ButtonGroup,
  Icon,
  Button,
} from 'react-native-elements';
import { getContacts } from '../../services/api';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.filterItems = this.filterItems.bind(this);
    this.addReminder = this.props.addReminder.bind(this);
  }

  state = {
    contacts: [],
    filteredContacts: [],
    searchText: '',
    showForm: false,
    datePickerModal: false,
    visible: true,
    person: {},
    personID: '',  // to firebase
    date: Moment().startOf('day'), // to firebase
    selectedFrequency: 0, // to firebase
  };

  updateFrequency = (selectedFrequency) => {
    this.setState({ selectedFrequency });
  };

  onPress = (person) => {
    this.setState({
      visible: false,
      person: person,
      showForm: true,
      personID: person.id,
    });
  };

  componentDidMount() {
    getContacts().then((snapshot) => {
      this.setState({
        contacts: Object.values(snapshot.val())[0],
        filteredContacts: Object.values(snapshot.val())[0],
      });
    });
  }

  filterItems = (e) => {
    this.setState({
      searchText: { e },
    });

    var text = this.state.searchText.e;
    try {
      var filteredContacts = this.state.contacts.filter((el) =>
        el.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
      this.setState({
        filteredContacts: filteredContacts,
      });
    } catch (err) {
      console.log('Undefined text');
    }
  };

  onFocus = () => {
    this.setState({
      visible: true,
      showForm: false,
    });
  };

  restOfForm = () => {
    const frequency = ['Bi-Weekly', 'Quarterly', 'Bi-Annually', 'Annually'];
    const { selectedFrequency } = this.state;

    if (this.state.showForm) {
      return (
        <View>
          <FormLabel>Frequency</FormLabel>
          <View style={styles.frequency}>
            <ButtonGroup
              onPress={this.updateFrequency}
              selectedIndex={selectedFrequency}
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
              { this.state.date.format('MM/DD/YYYY') }
            </Text>
            <Icon
              name='check-circle'
              color='#1a9bfc'
              containerStyle={{ marginTop: 0, flex: 1, }}
              onPress={() => {
                this.addReminder({
                  name: this.state.person.name,
                  date: this.state.date.format('MM/DD/YYYY'),
                  personID: this.state.personID,
                  frequency: this.state.selectedFrequency,
                });
                this.setState({
                  person: {},
                  personID: '',  // to firebase
                  date: Moment().startOf('day'), // to firebase
                  selectedFrequency: 0, // to firebase
                });
                this.props.closeCreateForm();
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
                  date: date,
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
      );
    }
  };

  render() {
    return (
      <Modal
        isVisible={ this.props.showCreateForm }
        onBackdropPress={ this.props.closeCreateForm }
        animationIn='fadeIn'
        animationInTiming={200}
        animationOut='fadeOut'
        animationOutTiming={200}>
        <View style={styles.container}>
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={ this.filterItems.bind(this) }
            value={ this.state.person.name }
            clearButtonMode='always'
            inputStyle={ styles.input }
            onFocus={this.onFocus}
          />
          <SearchList
            filteredContacts={ this.state.filteredContacts }
            visible={ this.state.visible }
            onPress={ this.onPress }
          />
          <View style={ styles.row } />
          { this.restOfForm() }
        </View>
      </Modal>
    );
  }
}

CreateForm.propTypes = {
  showCreateForm: PropTypes.bool.isRequired,
  closeCreateForm: PropTypes.func.isRequired,
  addReminder: PropTypes.func.isRequired,
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
    color: '#1a9bfc',
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
