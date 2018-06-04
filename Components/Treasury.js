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

import Icon from 'react-native-vector-icons/FontAwesome';

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

  _light() {
    if (this.invited) {
      return (<Icon name="circle" size={10} style={styles.greenLight} color='yellow' />);
    } else if (this.pending) {
      return (<Icon name="circle" size={10} style={styles.greenLight} color='red' />);
    } else if (this.ready) {
      return (<Icon name="circle" size={10} style={styles.greenLight} color='#99c140' />);
    } else {
      return null;
    }
  }

  render() {
    let creator = this.state.creator;

    return (
      <TouchableOpacity onPress={this._handleEvent} style={styles.treasuryContainer}>
        {this._light()}
        <Text style={styles.test}>created by: {creator}</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Treasury);

const styles = StyleSheet.create({
  treasuryContainer: {
    flexDirection: 'row',
    margin: 20,
    padding: 10,
    backgroundColor: 'rgba(255,215,0,0.8)',
    borderRadius: 10,
  },
  greenLight: {
    margin: 5,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.7
  },
  test: {
    color: '#FFF',
  },
  id: {
    fontSize: 10,
    color: '#777',
  }
});
