import PhoneNumberScreen from './PhoneNumberScreen';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';
import { MessageBar, showMessage } from 'react-native-messages';

const StackNav = StackNavigator(
  {
    Splash: { screen: SplashScreen },
    Phone: { screen: PhoneNumberScreen },
    Home: { screen: HomeScreen },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.overall}>
        <StackNav/>
        <MessageBar/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overall: {
    flex: 1,
    backgroundColor: '#000000',
  }
});
