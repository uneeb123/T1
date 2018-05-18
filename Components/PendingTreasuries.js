import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

import TreasuryModel from '../Model/TreasuryModel';
import Treasury from './Treasury';

export default class PendingTreasuries extends Component<{}> {

  render() {
    return (
      <FlatList
        data={this.props.list}
        renderItem={({item}) => <Treasury treasury={item} pending={true} />}
        keyExtractor={(item) => item._id}
      />
    );
  }
}

const styles = StyleSheet.create({
  treasuryContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#101010',
    height: 100,
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
  test: {
    color: 'white',
  }
});
