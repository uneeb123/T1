import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Treasury from './Components/Treasury';
import Container from './Components/Container';

export default class HomeScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Treasury',
  }

  render() {
    return (
      <Container>
        <Treasury />
        <Text>Hello World!</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
