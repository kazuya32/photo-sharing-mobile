import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import PhoneCodeInput from '../elements/PhoneCodeInput.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';
import LogInHeader from '../components/LogInHeader.js';

class PhoneConfimation extends React.Component {
  state = {
    headerTitle: '電話番号認証',
    showPhoneCodeInput: false,
  }

  componentWillMount() {
    firebase.auth().useDeviceLanguage();
  }

  // eslint-disable-next-line
  sendConfirmationCode = () => {
    const phoneNumber = this.state;
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.setState({ showPhoneCodeInput: true });
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }

  // eslint-disable-next-line
  validatePhoneNumber = () => {
    const { phoneNumber } = this.state;
    const numeric = !phoneNumber.isNaN();
    const long = phoneNumber.length === 11;

    if (numeric && long) {
      this.setState({
        phoneValidated: true,
        phoneErrorMessage: null,
      });
    } else {
      this.setState({
        phoneValidated: false,
        phoneErrorMessage: '電話番号は10桁の数字にしてください。',
      });
    }
  }


  navigateToEmailSignUp = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'EmailSignUp',
      key: 'EmailSignUp' + timestamp,
    });
  }

  // eslint-disable-next-line
  onChangeText = (text) => {
    this.setState({ phoneNumber: text });
  }

  onPress = () => {
    this.navigateToEmailSignUp();
  }


  render() {
    return (
      <View style={styles.container}>
        <LogInHeader
          headerTitle={this.state.headerTitle}
        />
        <PhoneCodeInput
          show={this.state.showPhoneCodeInput}
          style={[styles.codeInput]}
          codeLength={5}
          onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
        />

        <View style={styles.form}>
          <FormValidationMessage>
            {this.state.error}
          </FormValidationMessage>

          <FormLabel>電話番号を入力してください。</FormLabel>
          <FormInput
            onChangeText={this.onChangeText}
            shake={!this.state.phoneValidated || this.state.error}
            keyboardType="phone-pad"
            autoCapitalize="none"
            onBlur={this.validatePhoneNumber}
          />
          <FormValidationMessage>
            {!this.state.validateEmail && this.state.emailErrorMessage}
          </FormValidationMessage>
        </View>

        <View style={styles.footer}>
          <CancelButton
            onPress={() => { this.props.navigation.goBack(); }}
            style={{ marginRight: 12 }}
          >
            戻る
          </CancelButton>
          <SaveButton onPress={this.logInWithEmail} shadow >
            次へ
          </SaveButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  form: {
    margin: 16,
  },
  passForm: {
    marginTop: 16,
  },
  signUpText: {
    fontSize: 16,
    color: '#DB4D5E',
    fontWeight: '500',
  },
  signUp: {
    marginTop: 32,
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#C4C4C4',
    // paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    height: 80,
  },
});

export default PhoneConfimation;
