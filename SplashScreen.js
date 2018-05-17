import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import TreasuryModel from './Model/TreasuryModel';

export default class SplashScreen extends Component<{}> {
  static navigationOptions = {
    header: null,
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
      </View>
    );
  }

  componentDidMount() {
    this._fetchNumber();
  }

  async _fetchNumber() {
    const { navigate } = this.props.navigation;
    TreasuryModel.userSaved().then((saved) => {
      if (saved) {
        navigate('Home');
      } else {
        navigate('Phone');
      }
    }, (e) => {
      console.log(e);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
