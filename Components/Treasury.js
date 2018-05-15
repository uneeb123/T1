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
        <Text>Treasury 1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  treasuryContainer: {
    backgroundColor: 'white',
    height: 200,
  }
});
