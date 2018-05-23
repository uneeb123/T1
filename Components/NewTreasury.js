import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Picker,
  Platform,
  Button,
} from 'react-native';
import Modal from "react-native-modal";

import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
 * TODO
 *
 * Pass the parent handler to the child component.
 * Use indexing to retreive the correct element
 *
 * https://github.com/facebook/react/issues/2429
 * https://stackoverflow.com/questions/35537229/how-to-update-parents-state-in-react
 *
 */

class MemberInput extends Component<{}> {
  state = {
    number: '',
    country: {
      cca2: 'US',
      callingCode: '1',
    }
  }

  _getSubmitAction = () => {
    console.log("submitted action");
  }

  _changeCountry = (country) => {
    this.setState({ country });
  }

  _onChangeText = () => {}

  _renderCountryPicker = () => {
    return (
      <CountryPicker
      closeable
      style={styles.countryPicker}
      onChange={this._changeCountry}
      cca2={this.state.country.cca2}
      translation='eng'/>
    );
  }

  _renderCallingCode = () => {
    return (
      <View style={styles.callingCodeView}>
        <Text style={styles.callingCodeText}>+{this.state.country.callingCode}</Text>
      </View>
    );
  }

  _renderPhoneNumber = () => {
    return (
      <TextInput
        name={'phoneNumber'}
        type={'TextInput'}
        underlineColorAndroid={'transparent'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={this._onChangeText}
        placeholder={'Phone Number'}
        placeholderTextColor={'#AAA'}
        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
        keyboardAppearance={'dark'}
        style={styles.textInput}
        returnKeyType='go'
        selectionColor={'#AAA'}
        maxLength={20}
        onSubmitEditing={this._getSubmitAction} />
    );
  }

  render() {

    return (
      <View style={styles.memberInputContainer}>
        {this._renderCountryPicker()}
        {this._renderCallingCode()}
        {this._renderPhoneNumber()}
      </View>
    );
  }
}

class MemberInviteContainer extends Component<{}> {
  _handleTreasurer = () => {
    console.log(this.key);
  }

  _renderAddButton = () => {
    if (this.props.addHandler) {
      return (<Icon.Button backgroundColor='#FFF' name="plus" size={30} color='#66CD00' onPress={this.props.addHandler} />);
    }
    return null;
  }

  _renderRemoveButton = () => {
    if (this.props.removeHandler) {
      return (<Icon.Button backgroundColor='#FFF' name="minus" size={30} color='red' onPress={this.props.removeHandler} />);
    }
    return null;
  }

  render() {
    return (
      <View style={styles.memberInviteContainer}>
        <Icon name="phone" size={30} color='#38B0DE' />
        <MemberInput />
        <Icon.Button backgroundColor='#FFF' name="key" size={30} color='#CCCCCC' onPress={this._handleTreasurer} />
        {this._renderAddButton()}
        {this._renderRemoveButton()}
      </View>
    );
  }
}

export default class NewTreasury extends Component<{}> {

  state = {
    amount: '',
    cadence: '1',
    inviteCount: 0,
    treasuruerIndex: 0,
    numbers: [],
    currentInvites: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._createFirstInvite();
  }

  _createFirstInvite = () => {
    let firstAddHandler = this._addInvite.bind(this);
    let inviteElement = (<MemberInviteContainer key={'0'} addHandler={firstAddHandler} removeHandler={null} />);
    this.setState({
      currentInvites: [inviteElement],
      inviteCount: 1,
    });
  }

  _removeInvite = () => {
    // first simply remove the last element
    let updatedInvites = this.state.currentInvites;
    updatedInvites.pop();

    // then update the new last element
    let newInviteCount = this.state.inviteCount - 1;
    let lastIndex = newInviteCount - 1;
    let newLastElementInvite = updatedInvites.pop();
    let newAddHandler = this._addInvite.bind(this);
    if (lastIndex == 0) {
      newLastElementInvite = (<MemberInviteContainer key={lastIndex.toString()} addHandler={newAddHandler} removeHandler={null} />);
    } else {
      let newRemoveHandler = this._removeInvite.bind(this);
      newLastElementInvite = (<MemberInviteContainer key={lastIndex.toString()} addHandler={newAddHandler} removeHandler={newRemoveHandler} />);
    }
    updatedInvites.push(newLastElementInvite);
    this.setState({
      currentInvites: updatedInvites,
      inviteCount: newInviteCount,
    });
  }

  _addInvite = () => {
    let updatedInvites = this.state.currentInvites;
    
    // first remove the last element and update it and push it back
    let lastIndex = this.state.inviteCount - 1;
    let lastInviteElement = updatedInvites.pop();
    lastInviteElement = (<MemberInviteContainer key={lastIndex.toString()} addHandler={null} removeHandler={null} />);
    updatedInvites.push(lastInviteElement);

    // then add the new element
    let newIndex = this.state.inviteCount;
    let newAddHandler = this._addInvite.bind(this);
    let lastRemoveHandler = this._removeInvite.bind(this);
    let newInviteElement = (<MemberInviteContainer key={newIndex.toString()} addHandler={newAddHandler} removeHandler={lastRemoveHandler}/>);
    updatedInvites.push(newInviteElement);
    let newInviteCount = this.state.inviteCount + 1;
    this.setState({
      currentInvites: updatedInvites,
      inviteCount: newInviteCount,
    });
  }

  _onChangeAmount = (newAmount) => {
    this.setState({
      amount: newAmount,
    });
  }

  _submitNewTreasury = () => {
    console.log(this.state.amount);
    console.log(this.state.cadence);
  }

  _renderInputText = () => {
    return (
      <TextInput
        name={'amountLimit'}
        type={'TextInput'}
        underlineColorAndroid={'transparent'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={this._onChangeAmount}
        placeholder={'Limit'}
        placeholderTextColor={'#AAA'}
        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
        style={styles.textInput}
        returnKeyType='go'
        selectionColor={'#AAA'}
        maxLength={10} />
    );
  }

  render() {
    let invites = this.state.currentInvites;

    return (
      <Modal {...this.props}>
        <View style={styles.modalContainer}>
          <View style={styles.contentWrap}>
            <Text style={styles.inviteTitle}>Invite members</Text>
            <View style={{height: 150, width: 200}}>
              {invites}
            </View>
            <Text style={styles.cadenceTitle}>Cadence</Text>
            <View style={styles.cadenceContainer}>
              <Text style={{marginRight: 5}}>satoshis</Text>
              <View style={styles.cadenceInputContainer}>
                {this._renderInputText()}
              </View>
              <Text style={{marginLeft: 5, marginRight: 5}}>{'/'}</Text>
              <Picker
                selectedValue={this.state.cadence}
                style={{ height: 50, width: 70 }}
                onValueChange={(itemValue, itemIndex) => this.setState({cadence: itemValue})}>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
              </Picker>
              <Text>{' days '}</Text>
            </View>
          </View>
          <Button title={'submit'} onPress={this._submitNewTreasury}/>
          {this.props.children}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  contentWrap: {
  },
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    paddingRight: 10
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: 16,
  },
  memberInputContainer: {
    marginLeft: 5,
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
  },
  memberInviteContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  cadenceTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  inviteTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  cadenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  cadenceInputContainer: {
    height: 30,
    width: 100,
    padding: 2,
    borderWidth: 1,
    borderRadius: 5,
  }
});
