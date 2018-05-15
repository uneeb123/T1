import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';

export default class Container extends Component<{}> {
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../Resources/background.jpg')}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  }
});
