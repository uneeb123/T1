import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import TreasuryModel from '../Model/TreasuryModel';
import Treasury from './Treasury';

export default class Treasuries extends Component<{}> {
  _allTreasuries() {
    let allTreasuries = [];
    let allReady = this.props.ready;
    let allInvited = this.props.invited;
    let allPending = this.props.pending;
    for (let i = 0; i < allReady.length; i++) {
      let item = allReady[i];
      treasuryItem = (<Treasury key={"ready" + i} treasury={item} ready={true} />);
      allTreasuries.push(treasuryItem);
    }
    for (let i = 0; i < allInvited.length; i++) {
      let item = allInvited[i];
      treasuryItem = (<Treasury key={"invited" + i} treasury={item} invited={true} />);
      allTreasuries.push(treasuryItem);
    }
    for (let i = 0; i < allPending.length; i++) {
      let item = allPending[i];
      treasuryItem = (<Treasury key={"pending" + i} treasury={item} pending={true} />);
      allTreasuries.push(treasuryItem);
    }
    return allTreasuries;
  }

  render() {
    return (
      <ScrollView>
        {this._allTreasuries()}
      </ScrollView>
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
