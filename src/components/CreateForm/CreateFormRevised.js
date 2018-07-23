import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { SearchBar, Input, Icon, ButtonGroup, Button } from 'react-native-elements';

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
    date: Moment().startOf('day'),  // to firebase
    selectedFrequency: 0, // to firebase
  };

  // loading contacts
  loadContacts = () => {
    if (this.props.contacts) {
      return this.props.contacts;
    } else {
      return ['Either loading, or YOU HAVE NO FRIENDS!'];
    }
  };

  // iterating through emails to help differentiate duplicate contacts
  showEmails = (item) => {
    if (item.name) {
      try {
        return (
          <View style={styles.contactSearch}>
              { item.emails.map((data) => (
                    <Text
                      key={ data.key + data.email }
                      style={ styles.email }>
                      { data.email }
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
    if (this.state.showSearchResults) {
      return (
        <FlatList
          data={ this.state.results ? this.state.results : this.props.contacts }
          renderItem={ ({ item }) => {
            if (item.firstName || item.lastName) {
              return (
                <TouchableHighlight
                  onPress={ () => this.onPress(item) }
                  underlayColor='transparent'>
                  <View style={ styles.entryContainer }>
                      <Text key={item.key} style={styles.name}>{item.name}</Text>
                      { this.showEmails(item) }
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
                      {this.showEmails(item)}
                  </View>
                </TouchableHighlight>
              );
            }
          }
          }
        />
      );
    };
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

  updateFrequency = (selectedFrequency) => {
    this.setState({ selectedFrequency });
  };

  restOfForm = () => {
    const frequency = ['Bi-Weekly', 'Quarterly', 'Bi-Annually', 'Annually'];
    if (this.state.showForm) {
      return (
        <View>
          <View style={ { marginTop: 20 } }>
            <Text style={styles.name}>When do you want your first reminder?</Text>
            <TouchableHighlight
              onPress={ () => this.setState({ datePickerModal: true }) }
              underlayColor='transparent'>
              <View style={ styles.inputField }>
                <Icon
                  name='date-range'
                  size={25}
                  color='#1787fb'
                />
                <Input
                  placeholder='Click on icon to pick date'
                  value={ this.state.date.format('MM/DD/YYYY') }
                />
              </View>
            </TouchableHighlight>
          </View>
          <View style={ { marginTop: 20 } }>
            <Text style={styles.name}>How often to you want to be reminded to call?</Text>
            <View style={ styles.inputField }>
              <Icon
                name='cached'
                size={25}
                color='#1787fb'
              />
              <View style={{ width: '100%' }}>
                <ButtonGroup
                  onPress={this.updateFrequency}
                  selectedIndex={this.state.selectedFrequency}
                  buttons={frequency}
                  buttonStyle={ styles.frequencyButton }
                  textStyle={ styles.frequencyButtonText }
                  containerStyle={{ width: '80%' }}
                  selectedButtonStyle={ styles.selectedFrequencyButton }
                  selectedTextStyle={ styles.selectedFrequencyButtonText }
                />
              </View>
            </View>
          </View>
          <View style={ { marginTop: 20 } }>
            <Button
              title='Save Reminder'
              buttonStyle={ styles.saveButton }
              textStyle={ styles.saveButtonText }
              onPress={ () => {
                this.addReminder(this.props.user, {
                  name: this.state.person.name,
                  date: this.state.date.format('MM/DD/YYYY'),
                  personID: this.state.personID,
                  frequency: this.state.selectedFrequency,
                  streak: 0,
                });

                // set form variables to null
                this.setState({
                  person: {},
                  personID: '',
                  date: Moment().startOf('day'),
                  selectedFrequency: 0,
                  search: '',
                  results: [],
                });

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
            selectedFrequency: 0, // to firebase
          });
        } }

        animationIn='slideInUp'
        animationInTiming={200}
        animationOut='slideOutDown'
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
                clearButtonMode='always'
                containerStyle = { styles.inputContainer }
                onChangeText={(search) => {
                  if (search !== '') {
                    this.setState({ search: search, });
                    this.showResults(search);
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
                  minDate={Moment().startOf('day')}
                  maxDate={Moment().add(10, 'years').startOf('day')}
                  style={ styles.calendar }
                  barView = { styles.barView }
                  barText = { styles.barText }
                  dayHeaderText = { styles.dayHeaderText }
                  dayRowView = { styles.dayRowView }
                  dayText = { styles.dayText }
                />
            </Modal>
        </View>
      </Modal>
    );
  }
}

CreateFormRevised.propTypes = {
  showCreateForm: PropTypes.bool.isRequired,
  closeCreateForm: PropTypes.func.isRequired,
  addReminder: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
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
    marginBottom: 5,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  frequency: {
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
    },
  saveButtonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});
