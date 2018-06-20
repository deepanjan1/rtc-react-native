import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import SearchEntry from './SearchEntry';

import { Font, AppLoading, Asset } from 'expo';

export default class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.props.filteredContacts;
    this.visible = this.props.visible;
  }

  // _keyExtractor = (item, index) => item.id;

  showList = () => {
    if (this.props.visible === true) {
      var filteredContacts = this.props.filteredContacts;
      return (
        <View style={ styles.container }>
          <FlatList
            data={ this.props.filteredContacts }
            renderItem={
              ({ item }) => (
                <SearchEntry
                  onPress={ (e) => this.props.onPress(item) }
                  item={ item }
                />
              )
            }
          />
        </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  };

  render() {
    return (
      <View>
        { this.showList() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '95%',
  },
});

SearchList.propTypes = {
  filteredContacts: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
