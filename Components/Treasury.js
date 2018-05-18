import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import TreasuryModel from '../Model/TreasuryModel';

export default class Treasury extends Component<{}> {
  state = {
    creator: null,
  }

  componentDidMount() {
    this.model = new TreasuryModel();
    this.model.getUserDetails(this.props.treasury.created_by).then((creator) => {
      this.setState({
        creator: creator.phone_number,
      });
    }, (e) => {
      console.log(e);
    });
  }

  _doStuff = () => {
    Alert.alert("you clicked");
  }

  render() {
    let creator = this.state.creator;

    return (
      <TouchableOpacity onPress={this._doStuff}>
        <View style={styles.treasuryContainer}>
          <Text style={styles.id}>{this.props.treasury._id}</Text>
          <Text style={styles.test}>created by: {creator}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  treasuryContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#333300',
    height: 100,
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
  test: {
    color: 'white',
  },
  id: {
    fontSize: 10,
    color: '#909090',
  }
});
