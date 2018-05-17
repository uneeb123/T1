import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Treasury from './Components/Treasury';
import Container from './Components/Container';

import TreasuryModel from './Model/TreasuryModel';

export default class HomeScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Treasury',
  }

  constructor() {
    super();
    TreasuryModel.getDetailsInformation().then((details) => {
      this.state = {
        user: details.user,
        treasuries: details.treasuries,
      };
      console.log(details.user);
    }, (e) => {
      console.log(e);
    });
  }
  
  render() {
    return (
      <Container>
        <Text style={styles.test}>Hello World!</Text>
        <Treasury />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  test: {
    color: 'white',
  }
});
