import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import Container from './Components/Container';
import History from './Components/History';
import TreasuryModel from './Model/TreasuryModel';

export default class TreasurerScreen extends Component<{}> {
  static navigationOptions = {
    header: null,
  }

  state = {
    history: [],
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params) {
      this.setState({
        history: params.treasury.history,
      });
    }
  }

  render() {
    let history = this.state.history;

    return (
      <Container>
        <View>
          <Text>You are a treasurer</Text>
        </View>
        <History list={history} />
      </Container>
    );
  }
}
