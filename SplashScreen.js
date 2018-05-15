import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

export default class SplashScreen extends Component<{}> {
  static navigationOptions = {
    header: null,
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
      </View>
    );
  }

  componentDidMount() {
    this._fetchNumber();
  }

  async _fetchNumber() {
    const { navigate } = this.props.navigation;
    var number = await AsyncStorage.getItem('number');
    if (number == null) {
      // navigate to phone page
      navigate('Phone');
    }
    else {
      // navigate to home page
      navigate('Home');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
