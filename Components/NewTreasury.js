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

  _getSubmitAction = () => {
    console.log("submitted action");
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
  constructor(props) {
    super(props);
    this.state = {
      treasurer: this.props.treasurer,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.treasurer != null) {
      this.setState({
        treasurer: nextProps.treasurer,
      });
    }
  }

  unsetTreasurer() {
    this.setState({
      treasurer: false,
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

    return (
      <View style={styles.memberInviteWrap}>
        <View style={styles.memberInviteContainer}>
          <Icon name="phone" size={30} color='#38B0DE' />
          <MemberInput numberHandler={this.props.numberHandler} />
          {this._renderTreasurer(treasurer)}
          {this._renderAddButton()}
          {this._renderRemoveButton()}
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
      let isTreasurer = false;
      if (index == 0) {
        first = true;
      }
      if (index == this.state.treasurer) {
        isTreasurer = true;
      }
      let addHandler = this._addInvite.bind(this);
      let removeHandler = this._removeInvite.bind(this);
      let treasurerHandler = this._changeTreasurer.bind(this, key);
      let numberHandler = null // for now
      let element = (<MemberInviteContainer
        key={key}
        first={first}
        treasurer={isTreasurer}
        addHandler={addHandler}
        removeHandler={removeHandler}
        treasurerHandler={treasurerHandler}
        numberHandler={numberHandler}/>);
      allInvites.push(element);
    }
    return allInvites;
  }

  _addInvite = () => {
    let inviteCount = this.state.inviteCount;
    this.setState({
      inviteCount: inviteCount + 1,
    });
  }

  _removeInvite = () => {
    let inviteCount = this.state.inviteCount;
    this.setState({
      inviteCount: inviteCount - 1,
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
        style={styles.amountTextInput}
        returnKeyType='go'
        selectionColor={'#AAA'}
        maxLength={10} />
    );
  }

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
});
