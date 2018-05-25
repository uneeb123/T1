import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Picker,
  Platform,
  TouchableHighlight,
  Button,
} from 'react-native';
import Modal from "react-native-modal";

import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
 * TODO
 * break down the components and
 * use redux for state management
 */

class MemberInput extends Component<{}> {
  state = {
    number: '',
    country: {
      cca2: 'US',
      callingCode: '1',
    }
  }

  _changeCountry = (country) => {
    this.setState({ country });
  }

  _onChangeText = (number) => {
    this.props.numberHandler(number);
  }

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
        style={styles.numberTextInput}
        returnKeyType='go'
        selectionColor={'#AAA'}
        maxLength={20} />
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
  constructor(props) {
    super(props);
    this.state = {
      treasurer: this.props.treasurer,
      last: this.props.last,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      treasurer: nextProps.treasurer,
      last: nextProps.last,
    });
  }

  _handleTreasurer = () => {
    this.setState({
      treasurer: true,
    });
    this.props.treasurerHandler();
  }

  _renderAddButton = () => {
    return (<Icon.Button backgroundColor='#FFF' name="plus" size={30} color='#66CD00' onPress={this.props.addHandler} />);
  }

  _renderRemoveButton = () => {
    if (!this.props.first) {
      return (<Icon.Button backgroundColor='#FFF' name="minus" size={30} color='red' onPress={this.props.removeHandler} />);
    }
    return null;
  }

  _renderTreasurer = (treasurer) => {
    if (treasurer) {
      return (<Icon.Button backgroundColor='#FFF' name="key" size={30} color='#808000' onPress={this._handleTreasurer} />);
    } else {
      return (<Icon.Button backgroundColor='#FFF' name="key" size={30} color='#CCCCCC' onPress={this._handleTreasurer} />);
    }
  }

  render() {
    let treasurer = this.state.treasurer;
    let last = this.state.last;

    return (
      <View style={styles.memberInviteWrap}>
        <View style={styles.memberInviteContainer}>
          <Icon name="phone" size={30} color='#38B0DE' />
          <MemberInput numberHandler={this.props.numberHandler} />
          {this._renderTreasurer(treasurer)}
          {last? this._renderAddButton(): null}
          {last? this._renderRemoveButton(): null}
        </View>
      </View>
    );
  }
}

export default class NewTreasury extends Component<{}> {

  state = {
    amount: '',
    cadence: '1',
    inviteCount: 1,
    treasurer: 0,
    numbers: {},
  };

  constructor(props) {
    super(props);
  }

  _generateInvites = () => {
    let allInvites = [];
    let count = this.state.inviteCount;
    for (index = 0; index < count; index++) {
      let key = index.toString();
      let first = false;
      let last = false;
      let isTreasurer = false;
      if (index == 0) {
        first = true;
      }
      if (index == count-1) {
        last = true;
      }
      if (index == this.state.treasurer) {
        isTreasurer = true;
      }
      let addHandler = this._addInvite.bind(this);
      let removeHandler = this._removeInvite.bind(this);
      let treasurerHandler = this._changeTreasurer.bind(this, key);
      let numberHandler = this._onChangeNumber.bind(this, key); 
      let element = (<MemberInviteContainer
        key={key}
        first={first}
        last={last}
        treasurer={isTreasurer}
        addHandler={addHandler}
        removeHandler={removeHandler}
        treasurerHandler={treasurerHandler}
        numberHandler={numberHandler}/>);
      allInvites.push(element);
    }
    return allInvites;
  }

  _onChangeNumber = (key, phoneNumber) => {
    let updatedNumbers = this.state.numbers;
    updatedNumbers[key] = phoneNumber;
    this.setState({
      numbers: updatedNumbers,
    });
  }

  _addInvite = () => {
    let inviteCount = this.state.inviteCount;
    this.setState({
      inviteCount: inviteCount + 1,
    });
  }

  _removeInvite = () => {
    let inviteCount = this.state.inviteCount;
    let treasurer = this.state.treasurer;
    if (treasurer == inviteCount - 1) {
      treasurer = 0;
    }
    this.setState({
      inviteCount: inviteCount - 1,
      treasurer: treasurer,
    });
  }
  
  _changeTreasurer = (newTreasurer) => {
    let previousTreasurer = this.state.treasurer;
    this.setState({
      treasurer: newTreasurer,
    });
  }

  _onChangeAmount = (newAmount) => {
    this.setState({
      amount: newAmount,
    });
  }

  _submitNewTreasury = () => {
    let numbers = this.state.numbers;
    let treasurerIndex = this.state.treasurer;
    let treasurerNumber = numbers[treasurerIndex];
    delete numbers[treasurerIndex];
    let memberPhoneNumbers = Object.values(numbers);
    let amount = this.state.amount;
    let cadence = this.state.cadence;
    this.props.handleSubmit(treasurerNumber, memberPhoneNumbers, amount, cadence);
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
        style={styles.amountTextInput}
        returnKeyType='go'
        selectionColor={'#AAA'}
        maxLength={10} />
    );
  }

  /*
   * TODO support more options for cadence
   */
  render() {
    return (
      <Modal {...this.props}>
        <View style={styles.modalContainer}>
          <View style={styles.contentWrap}>
            <View style={styles.inviteTitleContainer}>
              <Text style={styles.inviteTitle}>Invite members</Text>
            </View>
            <View>
              {this._generateInvites()}
            </View>
            <View style={styles.cadenceTitleContainer}>
              <Text style={styles.cadenceTitle}>Cadence</Text>
            </View>
            <View style={styles.cadenceContainer}>
              <Text style={{marginRight: 20, marginLeft: 20}}>mBTC</Text>
              <View style={styles.cadenceInputContainer}>
                {this._renderInputText()}
              </View>
              <Text style={{marginLeft: 5, marginRight: 5}}>{'/'}</Text>
              <Picker
                selectedValue={this.state.cadence}
                style={{ height: 50, width: 70 }}
                onValueChange={(itemValue, itemIndex) => this.setState({cadence: itemValue})}>
                <Picker.Item label="1" value="1" />
              </Picker>
              <Text>{' days '}</Text>
            </View>
          </View>
          {this.props.children}
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.button} onPress={this._submitNewTreasury}>
              <View style={{transform: [{scaleX: 1/2}]}}>
                <Text style={styles.buttonText}>Submit</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this.props.handleCancel}>
              <View style={{transform: [{scaleX: 1/2}]}}>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </TouchableHighlight>
          </View>
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
  numberTextInput: {
    padding: 0,
    margin: 0,
    width: 100,
  },
  amountTextInput: {
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
  memberInviteWrap: {
    height: 50,
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
    height: 50,
    width: 100,
    padding: 2,
    borderWidth: 1,
    borderRadius: 5,
  },
  cadenceTitleContainer: {
    margin: 10,
  },
  inviteTitleContainer: {
    margin: 10,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#0EBFE9',
    width: 50,
    height: 25,
    borderRadius: 50,
    margin: 20,
    transform: [
      {scaleX: 2}
    ]
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonText: {
    color: 'white',
  }
});
