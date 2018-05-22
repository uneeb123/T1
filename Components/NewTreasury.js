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

  render() {
    return (
      <View style={styles.memberInviteContainer}>
        <Icon name="phone" size={30} color='#38B0DE' />
        <MemberInput />
        <Icon.Button backgroundColor='#FFF' name="key" size={30} color='#CCCCCC' onPress={this._handleTreasurer} />
        <Icon.Button backgroundColor='#FFF' name="plus" size={30} color='#66CD00' />
        <Icon.Button backgroundColor='#FFF' name="minus" size={30} color='red' />
      </View>
    );
  }
}

export default class NewTreasury extends Component<{}> {

  state = {
    amount: '',
    cadence: '1',
    inviteCount: 1,
    numbers: [],
    currentInvites: [<MemberInviteContainer key={'1'} />, <MemberInviteContainer key={'2'} />],
  };

  constructor(props) {
    super(props);
  }

  _appendInvite = () => {
    let updatedInvites = this.state.currentInvites;
    updatedInvites.push(<MemberInviteContainer />);
    this.setState({
      currentInvites: updatedInvites,
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
                style={{ height: 50, width: 50 }}
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
