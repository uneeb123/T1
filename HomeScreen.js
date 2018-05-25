import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import ReadyTreasuries from './Components/ReadyTreasuries';
import InvitedTreasuries from './Components/InvitedTreasuries';
import PendingTreasuries from './Components/PendingTreasuries';
import Container from './Components/Container';
import GoldenButton from './Components/GoldenButton';
import NewTreasury from './Components/NewTreasury';

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
    newDialog: false,
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      ready: true,
      user: params.user,
      treasuries: params.treasuries,
    });
  }

  _showCreate = () => {
    this.setState({
      newDialog: true,
    });
  }

  _cancelCreate = () => {
    this.setState({
      newDialog: false,
    });
  }

  _submitCreate = (treasurer, members, amount, cadence) => {
    console.log(treasurer);
    console.log(members);
    console.log(amount);
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
    let showNewDialog = this.state.newDialog;

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
        <View style={{alignItems: 'center'}}>
          <GoldenButton onPress={this._showCreate}>
            <Text style={styles.buttonText}>New</Text>
          </GoldenButton>
        </View>
        <NewTreasury
          isVisible={showNewDialog}
          onBackdropPress={this._cancelCreate}
          handleCancel={this._cancelCreate}
          handleSubmit={this._submitCreate}
          avoidKeyboard={true} />
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
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  }
});
