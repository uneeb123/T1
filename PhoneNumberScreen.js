import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Form from 'react-native-form';
import CountryPicker from 'react-native-country-picker-modal';

import PhoneVerification from './PhoneVerification';

const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 20;

// if you want to customize the country picker
const countryPickerCustomStyles = {};

// your brand's theme primary color
const brandColor = '#FFDF00';

export default class PhoneNumberScreen extends Component<{}> {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      enterCode: false,
      spinner: false,
      country: {
        cca2: 'US',
        callingCode: '1'
      }
    };
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;

    DeviceEventEmitter.addListener('codeSent', (e) => {
      console.log(e);
      this.setState({
        spinner: false,
        enterCode: true,
      });
      this.refs.form.refs.textInput.setNativeProps({ text: '' });

      setTimeout(() => {
        Alert.alert('Sent!', "We've sent you a verification code", [{
          text: 'OK',
          onPress: () => this.refs.form.refs.textInput.focus()
        }]);
      }, 100);
    });

    DeviceEventEmitter.addListener('codeVerified', (e) => {
      console.log(e);

      this.refs.form.refs.textInput.blur();
      this.setState({ spinner: false });
      setTimeout(() => {
        Alert.alert('Success!', 'You have successfully verified your phone number');
      }, 100);
      
      // FIXME Currently disabled because functionality is mocked
      // await AsyncStorage.getItem('number');
      navigate('Home');
    });

    DeviceEventEmitter.addListener('retry', (e) => {
      console.log(e);

      this.refs.form.refs.textInput.blur();
      this.setState({
        spinner: false,
        enterCode: false,
      });
      setTimeout(() => {
        Alert.alert('Failed!', 'Verification code incorrect');
      }, 100);
    });
  }

  _getCode = () => {
    this.setState({ spinner: true });

    setTimeout(async () => {

      number = this.refs.form.getValues().phoneNumber;
      callingCode = this.state.country.callingCode;
      // TODO: validate number

      PhoneVerification.sendCode(callingCode, number).catch((e) => {
        console.error(e);
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert('Oops!', e.message);
        }, 100);
      });
    }, 100);
  }

  _verifyCode = () => {
    this.setState({ spinner: true });

    setTimeout(async () => {

      code = this.refs.form.getValues().code;
      // TODO: validate code

      PhoneVerification.verifyCode(code).catch((e) => {
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert('Oops!', e.message);
        }, 100);
      });
    }, 100);
  }

  _onChangeText = (val) => {
    if (!this.state.enterCode) return;
    if (val.length === MAX_LENGTH_CODE)
      this._verifyCode();
  }

  _tryAgain = () => {
    this.refs.form.refs.textInput.setNativeProps({ text: '' })
    this.refs.form.refs.textInput.focus();
    this.setState({ enterCode: false });
  }

  _getSubmitAction = () => {
    this.state.enterCode ? this._verifyCode() : this._getCode();
  }

  _changeCountry = (country) => {
    this.setState({ country });
    this.refs.form.refs.textInput.focus();
  }

  _renderFooter = () => {

    if (this.state.enterCode)
      return (
        <View>
        <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
        Enter the wrong number or need a new code?
        </Text>
        </View>
      );

    return (
      <View>
      <Text style={styles.disclaimerText}>By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number. Message &amp; data rates may apply.</Text>
      </View>
    );

  }

  _renderCountryPicker = () => {

    if (this.state.enterCode)
      return (
        <View />
      );

    return (
      <CountryPicker
      ref={'countryPicker'}
      closeable
      style={styles.countryPicker}
      onChange={this._changeCountry}
      cca2={this.state.country.cca2}
      styles={countryPickerCustomStyles}
      translation='eng'/>
    );

  }

  _renderCallingCode = () => {

    if (this.state.enterCode)
      return (
        <View />
      );

    return (
      <View style={styles.callingCodeView}>
      <Text style={styles.callingCodeText}>+{this.state.country.callingCode}</Text>
      </View>
    );

  }

  render() {

    let headerText = `What's your ${this.state.enterCode ? 'verification code' : 'phone number'}?`
    let buttonText = this.state.enterCode ? 'Verify confirmation code' : 'Send confirmation code';
    let textStyle = this.state.enterCode ? {
      height: 50,
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'Courier'
    } : {};

    return (

      <View style={styles.container}>

      <Text style={styles.header}>{headerText}</Text>

      <Form ref={'form'} style={styles.form}>

      <View style={{ flexDirection: 'row' }}>

      {this._renderCountryPicker()}
      {this._renderCallingCode()}

      <TextInput
      ref={'textInput'}
      name={this.state.enterCode ? 'code' : 'phoneNumber' }
      type={'TextInput'}
      underlineColorAndroid={'transparent'}
      autoCapitalize={'none'}
      autoCorrect={false}
      onChangeText={this._onChangeText}
      placeholder={this.state.enterCode ? '_ _ _ _ _ _' : 'Phone Number'}
      keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
      keyboardAppearance={'dark'}
      style={[ styles.textInput, textStyle ]}
      returnKeyType='go'
      autoFocus
      placeholderTextColor={brandColor}
      selectionColor={brandColor}
      maxLength={this.state.enterCode ? 6 : 20}
      onSubmitEditing={this._getSubmitAction} />

      </View>

      <TouchableOpacity style={styles.button} onPress={this._getSubmitAction}>
      <Text style={styles.buttonText}>{ buttonText }</Text>
      </TouchableOpacity>

      {this._renderFooter()}

      </Form>

      <Spinner
      visible={this.state.spinner}
      textContent={'One moment...'}
      textStyle={{ color: '#fff' }} />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#040404',
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    margin: 20,
    color: '#4A4A4A',
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: 20,
    color: brandColor
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: brandColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold'
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    textAlign: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'grey'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 20,
    color: brandColor,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    paddingRight: 10
  }
});
