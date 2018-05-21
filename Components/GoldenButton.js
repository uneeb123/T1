import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class GoldenButton extends Component<{}> {
  render() {
    return (
      <TouchableOpacity style={styles.goldenButton} {...this.props}>
        <View style={{transform: [{scaleX: 1/2}]}}>
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  goldenButton: {
    justifyContent: 'center',
    backgroundColor: 'rgb(255,223,0)',
    width: 100,
    height: 50,
    borderRadius: 50,
    margin: 20,
    transform: [
      {scaleX: 2}
    ]
  },
});
