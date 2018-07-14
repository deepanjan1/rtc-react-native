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
              </View>
              <View style={ styles.logoutButtonContainer }>
                <Button
                  title='Logout'
                  buttonStyle={ styles.logoutButton }
                  textStyle={ styles.logoutButtonText }
                  onPress={ () => this.props.logout() }>
                </Button>
              </View>
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
  logout: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: '200%',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: '25%',
    width: '100%',
  },
  upperPadding: {
    flex: 3,
  },
  settings: {
    flex: 2,
    backgroundColor: '#ffffff',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  visibleModal: {
    height: 100,
    marginTop: 5,
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
    },
  logoutButtonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});
