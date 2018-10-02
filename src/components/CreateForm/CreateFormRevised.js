import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Input, Button } from 'react-native-elements';
import { loadContacts } from '../SyncContacts/loadContacts';
import { MaterialIcons } from '@expo/vector-icons';
import { createLocalNotification } from '../Notifications/NotificationFunctions';

export default class CreateFormRevised extends React.Component {
  constructor(props) {
    super(props);
    this.addReminder = this.props.addReminder.bind(this);
  }

  state = {
    showForm: false,
    visible: true,
    person: {},
    personID: '',
    results: [],
    search: '',
    showSearchResults: true,
    nameSelected: false,
    datePickerModal: false,
    date: Moment().add(1, 'days').startOf('day'),  // to firebase
    frequency: 'Every Two Weeks',
    frequencyModal: false,
  };

  // loading contacts
  loadContacts = () => {
    if (this.props.contacts) {
      return this.props.contacts;
    } else {
      return ['Either loading, or YOU HAVE NO FRIENDS!'];
    }
  };

  // iterating through phone numbers to help differentiate duplicate contacts
  showPhone = (item) => {
    if (item.name) {
      try {
        return (
          <View style={styles.contactSearch}>
              { item.phoneNumbers.map((data) => (
                    <Text
                      key={ data.key + data.number }
                      style={ styles.email }>
                      { (data.label) ? data.label + ': ' + data.number : 'phone: ' + data.number }
                    </Text>
                ))
              }
          </View>
        );
      } catch (err) {
        return (null);
      }
    }
  };

  // on selecting a person from the search
  onPress = (person) => {
    console.log(person.name);
    this.setState({
      person: person,
      personID: person.id,
      nameSelected: true,
      showSearchResults: false,
      showForm: true,
      search: person.name,
    });
  };

  // the search bar
  showSearchResults = () => {
    if (this.state.showSearchResults && this.props.contactsLoaded) {
      return (
        <FlatList
          keyboardShouldPersistTaps='always'
          data={ this.state.results ? this.state.results : this.props.contacts }
          renderItem={ ({ item }) => {
            if (item.firstName || item.lastName) {
              return (
                <TouchableHighlight
                  onPress={ () => this.onPress(item) }
                  underlayColor='transparent'>
                  <View style={ styles.entryContainer }>
                      <Text key={item.key} style={styles.name}>{item.name}</Text>
                      { this.showPhone(item) }
                  </View>
                </TouchableHighlight>
              );
            } else if (item.company) {
              return (
                <TouchableHighlight
                  onPress={ this.onPress(item) }
                  underlayColor='transparent'>
                  <View style={ styles.entryContainer }>
                      <Text key={item.key} style={styles.name}>{item.company}</Text>
                      {this.showPhone(item)}
                  </View>
                </TouchableHighlight>
              );
            }
          }
          }
          keyExtractor={ (item, index) => item.id }
        />
      );
    } else if (!this.props.contactsLoaded) {
      return (
          <View style={ styles.headerContainer }>
            <Text style={ styles.headerText }>To begin, sync your contacts!</Text>
            <View style={ styles.buttonContainer }>
              <Button
                title='Sync My Contacts!'
                buttonStyle={ styles.button }
                onPress= { () =>
                  {
                    loadContacts(this.props.user, this.props.contacts);
                  }
                }>
              </Button>
            </View>
          </View>
      );
    }
  };

  showResults = (search) => {
    if (this.props.contacts) {
      const filter = [];
      this.props.contacts
      .filter(a => (a.firstName + ' ' + a.lastName)
      .toLowerCase().indexOf(search.toLowerCase()) !== -1)
      .map(a => {
        if (a.firstName || a.lastName) {
          filter.push(a);
          return (
            this.setState({ results: filter })
          );
        } else if (a.company) {
          filter.push(a);
          return (
            this.setState({ results: filter })
          );
        }
      }
    );
    };
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

  restOfForm = () => {
    const frequency = ['Bi-Weekly', 'Quarterly', 'Bi-Annually', 'Annually'];
    if (this.state.showForm) {
      return (
        <View>
          <View style={ { marginTop: 20 } }>
            <Text style={styles.name}>When do you want your first reminder?</Text>

              <View style={ styles.inputField }>
                <MaterialIcons
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
                  <Text style={ styles.name }>{this.state.date.format('MM/DD/YYYY')}</Text>
                </TouchableHighlight>
              </View>
          </View>
          <View style={ { marginTop: 20 } }>
            <Text style={styles.name}>How often do you want to reach out?</Text>
            <View style={ styles.inputField }>
              <MaterialIcons
                name='cached'
                size={25}
                color='#1787fb'
              />
              <View style={{ width: '100%', }}>
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
              onPress={ async () => {
                let phoneNumbers;
                this.state.person.phoneNumbers
                ? phoneNumbers = this.state.person.phoneNumbers : phoneNumbers = 0;
                const notificationID = await createLocalNotification(
                  this.state.date.toDate(),
                  this.state.person.name);
                this.addReminder(this.props.user, {
                  name: this.state.person.name,
                  date: this.state.date.format('MM/DD/YYYY'),
                  personID: this.state.personID,
                  frequency: this.state.frequency,
                  phoneNumber: phoneNumbers,
                  notificationID: notificationID,
                  streak: 0,
                });

                // set form variables to null
                this.setState({
                  person: {},
                  personID: '',
                  date: Moment().startOf('day'),
                  search: '',
                  results: [],
                  frequency: 'Every Two Weeks',
                });
                this.props.actionFunction();
                this.props.closeCreateForm();
              } }

            />
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <Modal
        isVisible={ this.props.showCreateForm }
        onBackdropPress={ () => {
          this.props.closeCreateForm();
          this.setState({
            showForm: false,
            person: {},
            personID: '',
            results: [],
            search: '',
            showSearchResults: true,
            nameSelected: false,
            datePickerModal: false,
            date: Moment().startOf('day'),  // to firebase
            // selectedFrequency: 0, // to firebase
          });
        } }

        animationIn='slideInUp'
        animationInTiming={200}
        animationOut='slideOutDown'
        animationOutTiming={200}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset= { 150 }
          enabled>
        <View style={styles.container}>
            <Text style={styles.name}>Who do you want to remember to call?</Text>
            <View style={styles.inputField}>
              <MaterialIcons
                name='person'
                size={25}
                color='#1787fb'
              />
              <Input
                inputStyle = { styles.input }
                containerStyle = { styles.inputContainer }
                onChangeText={(search) => {
                  if (search !== '') {
                    this.setState({ search: search, });
                    this.showResults(search);
                  } else {
                    this.setState({ search: search, });
                  };
                }}

                onChange={ () => {
                  if (this.state.nameSelected &&
                    this.state.search !== this.state.person.name) {
                    this.setState({ person: {}, });
                  };
                } }

                clearTextOnFocus={true}
                placeholder="Type in your friend's name"
                onFocus={ () => this.setState(
                  {
                    showSearchResults: true,
                    showForm: false,
                    person: {},
                  }) }
                value={ this.state.search }
              />
            </View>
            { this.showSearchResults() }
            { this.restOfForm() }
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
                  minDate={Moment().add(1, 'days').startOf('day')}
                  maxDate={Moment().add(10, 'years').startOf('day')}
                  style={ styles.calendar }
                  barView = { styles.barView }
                  barText = { styles.barText }
                  dayHeaderText = { styles.dayHeaderText }
                  dayRowView = { styles.dayRowView }
                  dayText = { styles.dayText }
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
      </KeyboardAvoidingView>
      </Modal>
    );
  }
}

CreateFormRevised.propTypes = {
  showCreateForm: PropTypes.bool.isRequired,
  closeCreateForm: PropTypes.func.isRequired,
  addReminder: PropTypes.func.isRequired,
  contacts: PropTypes.array,
  user: PropTypes.string,
  actionFunction: PropTypes.func.isRequired,
  contactsLoaded: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 325,
  },
  header: {
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
    color: '#1787fb',
    marginBottom: 5,
  },
  entryContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e8e9ea',
    padding: 10,
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
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#1787fb',
    marginTop: 10,
    marginBottom: 10,
  },
  calendar: {
    width: '100%',
    height: '45%',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignSelf: 'center',
  },
  barView: {
    backgroundColor: '#1a9bfc',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  barText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 25,
    color: '#ffffff',
  },
  dayRowView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHeaderText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
  },
  dayText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
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
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#000000',
    flex: 4,
  },
  saveButton: {
      borderRadius: 25,
      backgroundColor: '#1787fb',
      width: '100%',
      elevation: 0,
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
  syncContacts: {
    backgroundColor: 'white',
    padding: 10,
  },
});
