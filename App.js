import PhoneNumberScreen from './PhoneNumberScreen';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';

import React, { Component } from 'react';
import { View } from 'react-native';

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
      <View style={{ flex: 1 }}>
        <StackNav/>
        <MessageBar/>
      </View>
    );
  }
}
