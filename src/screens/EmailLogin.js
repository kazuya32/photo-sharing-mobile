import React from 'react';
import { StyleSheet, View, AsyncStorage, Alert, TouchableOpacity, Text, Dimensions, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';
import LogInHeader from '../components/LogInHeader.js';

class EmailLogin extends React.Component {
  state = {
    isUploading: false,
    headerTitle: 'ログインする',
    // emailErrorMessage: 'Emailの形式が間違っています。',
    // passErrorMessage: 'パスワードが空白になっています。',
  }

  // eslint-disable-next-line
  validateEmail = () => {
    // eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      this.setState({
        emailValidated: true,
        emailErrorMessage: null,
      });
    } else {
      this.setState({
        emailValidated: false,
        emailErrorMessage: 'Emailの形式が間違っています。',
      });
    }
  }

  // eslint-disable-next-line
  validatePass = () => {
    if (this.state.pass) {
      this.setState({
        passValidated: true,
        passErrorMessage: null,
      });
    } else {
      this.setState({
        passValidated: false,
        passErrorMessage: 'パスワード欄が空白です。',
      });
    }
  }

  logInWithEmail = () => {
    const {
      emailValidated,
      passValidated,
      email,
      pass,
    } = this.state;

    if (emailValidated && passValidated) {
      this.setState({ isUploading: true });
      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((user) => {
          AsyncStorage.setItem('uid', user.uid);
          this.setState({ isUploading: false });
          this.navigateToMain();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // eslint-disable-next-line
          console.log(errorCode, errorMessage);
          const customErrorMessage = 'Emailかパスワードに誤りがあります。';
          this.errorHandler(errorCode, customErrorMessage);
          this.setState({ isUploading: false });
        });
    } else {
      const validationErrorMessage = '入力内容にエラーがあります。';
      Alert.alert(validationErrorMessage);
    }
  }

  navigateToMain = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'MainStack',
      key: 'MainStack' + timestamp,
    });
  }

  navigateToEmailSignUp = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'EmailSignUp',
      key: 'EmailSignUp' + timestamp,
    });
  }

  errorHandler = (code, message) => {
    this.setState({
      error: !code ? null : message,
    });
  }


  onChangeTextEmail = (text) => {
    this.setState({ email: text });
  }

  // eslint-disable-next-line
  onChangeTextPass = (text) => {
    this.setState({ pass: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <LogInHeader
          headerTitle={this.state.headerTitle}
        />
        <View style={[
            styles.activityIndicatorContainer,
          ]}
        >
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#DB4D5E" animating={this.state.isUploading} />
          </View>
        </View>

        <View style={styles.form}>
          <FormValidationMessage>
            {this.state.error}
          </FormValidationMessage>

          <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={this.onChangeTextEmail}
            shake={!this.state.emailValidated || this.state.error}
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={this.validateEmail}
            autoCorrect={false}
          />
          <FormValidationMessage>
            {!this.state.validateEmail && this.state.emailErrorMessage}
          </FormValidationMessage>
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={this.onChangeTextPass}
            secureTextEntry
            shake={!this.state.passValidated || this.state.error}
            style={styles.passForm}
            onBlur={this.validatePass}
            autoCorrect={false}
          />
          <FormValidationMessage>
            {!this.state.passValidated && this.state.passErrorMessage}
          </FormValidationMessage>
        </View>

        <TouchableOpacity style={styles.signUp} onPress={this.navigateToEmailSignUp} >
          <Text style={styles.signUpText}>
            新規登録はこちら
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <CancelButton
            onPress={() => { this.props.navigation.goBack(); }}
            style={{ marginRight: 12 }}
          >
            戻る
          </CancelButton>
          <SaveButton onPress={this.logInWithEmail} shadow >
            ログイン
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
  activityIndicatorContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 50,
  },
  activityIndicator: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
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
    zIndex: 100,
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

export default EmailLogin;
