import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Container from './Components/Container';
import GoldenButton from './Components/GoldenButton';
import History from './Components/History';
import TreasuryModel from './Model/TreasuryModel';

export default class TreasurerScreen extends Component<{}> {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    if (params) {
      this.state = {
        history: params.treasury.history,
      };
    } else {
      this.state = {
        history: []
      };
    }
  }

  _handleSpend = () => {
    console.log("I am alive");
  }
  
  render() {
    let history = this.state.history;

    return (
      <Container>
        <View style={{flex: 1}}>
          <History list={history} />
        </View>
        <View style={styles.buttonContainer}>
          <GoldenButton onPress={this._handleSpend}>
            <Text style={styles.text}>Spend</Text>
          </GoldenButton>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  }
});
