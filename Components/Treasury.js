import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import TreasuryModel from '../Model/TreasuryModel';

class Treasury extends Component<{}> {
  state = {
    creator: null,
  }

  componentDidMount() {
    this.model = new TreasuryModel();
    this.invited = this.props.invited || false;
    this.pending = this.props.pending || false;
    this.ready = this.props.ready || false;
    this.model.getUserDetails(this.props.treasury.created_by).then((creator) => {
      this.setState({
        creator: creator.phone_number,
      });
    }, (e) => {
      console.log(e);
    });
    this.model.getUser().then((me) => {
      if (me._id == this.props.treasury.treasurer) {
        this.setState({
          treasurer: true,
        });
      }
    }, (e) => {
      console.log(e);
    });
  }

  _handleEvent = () => {
    if (this.invited) {
      Alert.alert(
        'Treasury',
        'Do you want to accepted invitation to this treasury',
        [
          {text: 'Not now', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    } else if (this.pending) {
      Alert.alert(
        'Treasury',
        'Not all invited members have accepted invite',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    } else if (this.ready) {
      const { navigate } = this.props.navigation;
      if (this.state.treasurer) {
        navigate('Treasurer', {
          treasury: this.props.treasury
        });
      } else {
        navigate('Member', {
          treasury: this.props.treasury
        });
      }
    } else {
      Alert.alert("You clicked something wrong");
    }
  }

  render() {
    let creator = this.state.creator;

    return (
      <TouchableOpacity onPress={this._handleEvent} style={styles.treasuryContainer}>
        <Text style={styles.id}>{this.props.treasury._id}</Text>
        <Text style={styles.test}>created by: {creator}</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Treasury);

const styles = StyleSheet.create({
  treasuryContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: 'rgba(255,215,0, 0.9)',
    borderRadius: 10,
  },
  test: {
    color: '#FFF',
  },
  id: {
    fontSize: 10,
    color: '#909090',
  }
});