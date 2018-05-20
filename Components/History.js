import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Panel extends Component<{}> {
  render() {
    let positive = (<Icon name="chevron-up" size={30} color='green' />);
    let negative = (<Icon name="chevron-down" size={30} color='red' />);
    let direction = positive;
    if (this.props.amount < 0) {
      direction = negative;
    }

    let destination = (<Text style={styles.address}>{this.props.address}</Text>);
    if (this.props.address == 0) {
      destination = (<Text>--</Text>);
    }

    return (
      <View style={styles.panelContainer}>
        {direction}
        <Text style={styles.amount}>{this.props.amount}</Text>
        {destination}
        <Text style={styles.date}>{new Date(this.props.date).toDateString()}</Text>
      </View>
    );
  }
}

export default class History extends Component<{}> {
  render() {
    return (
      <View>
        <View style={styles.headingWrap}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Amount (in satoshis)</Text>
            <Text style={styles.heading}>Destination address</Text>
            <Text style={styles.heading}>Date</Text>
          </View>
        </View>
        <View style={styles.panelsWrap}>
          <View style={styles.panelsContainer}>
            <FlatList
              data={this.props.list}
              renderItem={({item}) => 
                <Panel amount={item.amount} address={item.to_address} date={item.created_on}/>
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  panelsContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    margin: 10,
    padding: 10,
  },
  panelsWrap: {
    backgroundColor: 'rgba(255,215,0, 0.5)',
    borderRadius: 10,
    margin: 15,
  },
  headingWrap: {
    backgroundColor: 'rgba(255,215,0, 0.9)',
    borderRadius: 10,
    margin: 15,
  },
  headingContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    margin: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 10,
  },
  address: {
    fontFamily: 'monospace',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});
