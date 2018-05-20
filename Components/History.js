import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

class Panel extends Component<{}> {
  render() {
    return (
      <View style={styles.panelContainer}>
        <Text style={styles.text}>{this.props.amount}</Text>
        <Text style={styles.text}>{this.props.address}</Text>
        <Text style={styles.text}>{new Date(this.props.date).toDateString()}</Text>
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
            <Text style={styles.heading}>Amount</Text>
            <Text style={styles.heading}>Address</Text>
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
  text: {
    color: '#000',
  },
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
  }
});
