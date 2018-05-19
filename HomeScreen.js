import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ReadyTreasuries from './Components/ReadyTreasuries';
import InvitedTreasuries from './Components/InvitedTreasuries';
import PendingTreasuries from './Components/PendingTreasuries';

import Container from './Components/Container';

import TreasuryModel from './Model/TreasuryModel';

export default class HomeScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Treasury',
    header: null,
  }

  state = {
    ready: false,
    user: null,
    treasuries: null,
  };

  constructor() {
    super();
    this.model = new TreasuryModel();
    this.model.getDetailedInformation().then((details) => {
      this.setState({
        ready: true,
        user: details.user,
        treasuries: details.treasuries,
      });
    }, (e) => {
      console.log(e);
    });
  }
  
  render() {
    let ready_treasuries = [];
    let invited_treasuries = [];
    let pending_treasuries = [];
    let ready = this.state.ready;
    if (ready) {
      ready_treasuries = this.state.treasuries.ready_treasuries;
      invited_treasuries = this.state.treasuries.invited_treasuries;
      pending_treasuries = this.state.treasuries.pending_treasuries;
    }

    return (
      <Container>
        <View style={styles.heading}>
          <Text style={styles.test}>Ready Treasuries</Text>
        </View>
        <ReadyTreasuries list={ready_treasuries} />
        <View style={styles.heading}>
          <Text style={styles.test}>Invited Treasuries</Text>
        </View>
        <InvitedTreasuries list={invited_treasuries} />
        <View style={styles.heading}>
          <Text style={styles.test}>Pending Treasuries</Text>
        </View>
        <PendingTreasuries list={pending_treasuries} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    color: 'white',
    fontWeight: 'bold',
  },
  heading: {
    margin: 20,
  }
});
