import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Treasury extends Component<{}> {
  render() {
    return (
      <View style={styles.treasuryContainer}>
        <Text style={styles.title}>Treasury</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  treasuryContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#101010',
    height: 200,
  },
  title: {
    color: 'white',
    fontSize: 30,
  }
});
