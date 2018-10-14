import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
  Linking,
} from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

const window = Dimensions.get('window');
const screenHeight = window.height;
const screenWidth = window.width;

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  };

  render = () => {
    const user = {
      name: this.props.user.name,
      photo: this.props.user.photo,
      email: this.props.user.email,
    };
    return (
      <Modal
        isVisible={ this.props.showSettingsModal}
        onBackdropPress={ this.props.closeSettingsModal }
        >
        <TouchableHighlight
              onPress={ () => this.props.closeSettingsModal() }
              underlayColor='transparent'
              style={ { flex: 6, } }>
              <View />
        </TouchableHighlight>
        <View style={ styles.settings }>
          <View style={ styles.userInformation }>
            <Image
              style={ styles.image }
              source={ { uri: user.photo } }
            />
            <View style={ styles.nameEmail }>
              <Text style={ styles.nameText }>{ user.name }</Text>
              <Text style={ styles.emailText }>{ user.email }</Text>
            </View>
          </View>
          <View
            style={ styles.horizontalRule }
          />
          <TouchableHighlight
            style={ styles.nameEmail }
            onPress={ () => Linking.openURL('mailto:deep@deepcreations.net') }
            underlayColor='transparent'>
            <View style={ styles.contactUsContainer }>
              <MaterialIcons
                name='info-outline'
                size={ 30 }
                style={ styles.info }
              />
              <Text style={ styles.nameText }>Contact Us</Text>
            </View>
          </TouchableHighlight>
          <View style={ styles.logoutButtonContainer }>
            <Button
              title='Logout'
              buttonStyle={ styles.logoutButton }
              textStyle={ styles.logoutButtonText }
              onPress={ () => this.props.logout() }>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };
}

Settings.propTypes = {
  showSettingsModal: PropTypes.bool.isRequired,
  closeSettingsModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  settings: {
    flex: 2,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInformation: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  nameEmail: {
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  nameText: {
    fontFamily: 'Roboto-Medium',
    color: 'black',
    fontSize: 16,
  },
  emailText: {
    fontFamily: 'Roboto-Regular',
    color: 'grey',
    fontSize: 16,
  },
  logoutButtonContainer: {
    justifyContent: 'center',
  },
  logoutButton: {
      borderRadius: 25,
      backgroundColor: '#1787fb',
      elevation: 0,
    },
  logoutButtonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  horizontalRule: {
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    marginBottom: 10,
  },
  contactUsContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginRight: 10,
  },
});
