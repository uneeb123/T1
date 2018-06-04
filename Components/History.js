import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Panel extends Component<{}> {
  _mBTC (satoshis) {
    return (Math.abs(satoshis)/100000).toFixed(2);
  }

  render() {
    let positive = (<Icon name="chevron-up" size={30} color='green' />);
    let negative = (<Icon name="chevron-down" size={30} color='red' />);
    let direction = positive;
    if (this.props.item.amount < 0) {
      direction = negative;
    }

    let amount = this._mBTC(this.props.item.amount);
    let date = new Date(this.props.item.timestamp);

    return (
      <TouchableOpacity onPress={()=>{console.log("not implemented")}} style={styles.panelContainer}>
        <View style={styles.directionContainer}>
          {direction}
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text>mBTC</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date.toLocaleDateString('en-US')}</Text>
          <Text style={styles.date}>{date.toLocaleTimeString('en-US')}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class History extends Component<{}> {
  render() {
    console.log(this.props.list);
    return (
      <View style={styles.panelsWrap}>
        <View style={styles.panelsContainer}>
          <FlatList
            data={this.props.list}
            renderItem={({item}) => 
              <Panel item={item} />
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  panelsContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    margin: 10,
  },
  panelsWrap: {
    backgroundColor: 'rgba(255,215,0, 0.5)',
    borderRadius: 10,
    margin: 15,
  },
  date: {
    fontSize: 10,
  },
  address: {
    fontFamily: 'monospace',
  },
  amount: {
    fontSize: 18,
    textAlign: 'right',
  },
  directionContainer: {
    justifyContent: 'center',
  },
  amountContainer: {
    justifyContent: 'center',
  },
  labelContainer: {
    justifyContent: 'center',
  },
  dateContainer: {
    flexDirection: 'column',
  }
});
