import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

import {
  DotIndicator,
} from 'react-native-indicators';

import Container from './Components/Container';

import TreasuryModel from './Model/TreasuryModel';

export default class LoadingScreen extends Component<{}> {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.model = new TreasuryModel();
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    this.model.getDetailedInformation().then((details) => {
      navigate('Home', {
        user: details.user,
        treasuries: details.treasuries,
      });
    }, (e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <Container>
      <View style={styles.wrap}>
      <Image
        style={styles.logo}
        source={require('./Resources/logo.png')}
      />
      <DotIndicator size={6} color='white' />
      </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
//    flex: 1,
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 20,
    marginBottom: 30,
  }
});
