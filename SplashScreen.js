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

  constructor() {
    super();
    this.model = new TreasuryModel();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
      </View>
    );
  }

  componentDidMount() {
    this._removeThis();
    // this._fetchNumber();
  }

  _removeThis() {
    AsyncStorage.setItem('userId', '05bb8602-5a92-4ff5-907e-fcf9aad98cc0', () => {
      this._fetchNumber();
    });
  }

  async _fetchNumber() {
    const { navigate } = this.props.navigation;
    this.model.userSaved().then((saved) => {
      if (saved) {
        navigate('Loading');
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
