import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class GoldenButton extends Component<{}> {
  _handle = () => {
  }

  render() {
    return (
      <TouchableOpacity style={styles.goldenButton}>
        <View style={{transform: [{scaleX: 1/2}]}}>
          <Text style={styles.text}>Spend</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  goldenButton: {
    justifyContent: 'center',
    backgroundColor: 'rgba(255,215,0,1)',
    width: 100,
    height: 50,
    borderRadius: 50,
    margin: 20,
    transform: [
      {scaleX: 2}
    ]
  },
  text: {
    textAlign: 'center',
    color: 'white',
  }
});
