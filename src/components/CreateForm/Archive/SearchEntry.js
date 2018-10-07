import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

export default class SearchEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.props.onPress.bind(this);
  }

  showContact() {
    item = this.props.item;
    if (item.name) {
      try {
        return (
          <TouchableHighlight
            onPress={ () => this.onPress(item) }>
            <View style={styles.contactSearch}>
                  <Text style={styles.name}>{item.name}</Text>
                  { item.emails.map((data) => (
                        <Text
                          key={ data.key + data.email }
                          style={ styles.email }>
                          { data.email }
                        </Text>
                    ))
                  }
            </View>
          </TouchableHighlight>
        );
      } catch (err) {
        return (null);
      }
    }
  }

  render() {
    return (
      <View>
        { this.showContact() }
      </View>
    );
  }
}

SearchEntry.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  contactSearch: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#5d5d5d',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#5d5d5d',
    paddingBottom: 5,
    paddingTop: 5,
  },
  name: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
  },
  email: {
    fontFamily: 'Roboto-Regular',
  },
});
