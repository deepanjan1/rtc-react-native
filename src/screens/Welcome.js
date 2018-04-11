import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../components/Header';
import IntroFlow from '../components/IntroFlow';

export default class Welcome extends React.Component {

  state = {
    showTitle: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showTitle: false,
      });
    }, 2000)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        { this.state.showTitle ?
          <Header title='Remember to Call' />
          :
          <View>
            <IntroFlow onTap={ navigate }/>
          </View>
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default Welcome;
