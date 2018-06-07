import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
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
        >
        <View style={ styles.container }>
          <View
            style={ styles.upperPadding }
          />
          <View style={ styles.settings }>
            <Text style={ styles.modalHeader }>
              Settings
            </Text>
            <View style={ styles.userInformation }>
              <Image
                style={ styles.image }
                source={ { uri: user.photo } }
              />
              <Text>{ user.name }</Text>
              <Text>{ user.email }</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
}

Settings.propTypes = {
  showSettingsModal: PropTypes.bool.isRequired,
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
  },
  userInformation: {
    height: 100,
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
});
