import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

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
        <View style={ styles.container }>
            <TouchableHighlight
              onPress={ () => this.props.closeSettingsModal() }
              underlayColor='transparent'
              style={ styles.upperPadding }>
              <View
                style={ styles.upperPadding }
              />
            </TouchableHighlight>
          <View style={ styles.settings }>
            <Text style={ styles.modalHeader }>
              Settings
            </Text>
            <View style={ styles.visibleModal }>
              <View style={ styles.userInformation }>
                <Image
                  style={ styles.image }
                  source={ { uri: user.photo } }
                />
                <View style={ styles.nameEmail }>
                  <Text style={ styles.nameText }>{ user.name }</Text>
                  <Text style={ styles.emailText }>{ user.email }</Text>
                </View>
                <View style={ styles.logoutButtonContainer }>
                  <Button
                    title='Logout'
                    buttonStyle={ styles.logoutButton }
                    textStyle={ styles.logoutButtonText }
                    onPress={ () => console.log('logout button pressed') }>
                  </Button>
                </View>
              </View>
              <View
                style={ styles.horizontalRule }
              />
            </View>
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
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    marginLeft: -18,
  },
  upperPadding: {
    flex: 3,
  },
  settings: {
    flex: 2,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  visibleModal: {
    height: 100,
    marginTop: 10,
    marginLeft: 10,
  },
  userInformation: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  horizontalRule: {
    borderTopColor: '#c0c0c0',
    borderTopWidth: 1,
    marginLeft: -18,
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
    },
  logoutButtonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});
