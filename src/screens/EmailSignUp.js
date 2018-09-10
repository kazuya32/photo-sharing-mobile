import React from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Segment } from 'expo';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import TermOfService from '../components/TermOfService.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';
import LogInHeader from '../components/LogInHeader.js';

class EmailSignUp extends React.Component {
  state = {
    isUploading: false,
    showTerm: false,
    headerTitle: '新規ユーザー登録',
    // emailErrorMessage: 'Emailの形式が間違っています。',
    // passErrorMessage: 'パスワードが空白になっています。',
  }

  componentsWillMount() {
    Segment.screen('EmailSignUp');
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
  validateEmailConfirm = () => {
    // eslint-disable-next-line
    if (this.state.email && this.state.email === this.state.emailConfirm) {
      this.setState({
        emailConfirmValidated: true,
        emailConfirmErrorMessage: null,
      });
    } else {
      this.setState({
        emailConfirmValidated: false,
        emailConfirmErrorMessage: 'Emailが一致していません。',
      });
    }
  }

  // eslint-disable-next-line
  validatePass = () => {
    const { pass } = this.state;

    const isAlphanumeric = (pass && pass.match(/^[0-9a-zA-Z]+$/));
    const isLong = ((pass && this.state.pass.length) > 5);

    if (isAlphanumeric && isLong) {
      this.setState({
        passValidated: true,
        passErrorMessage: null,
      });
    } else {
      this.setState({
        passValidated: false,
        passErrorMessage: 'パスワード欄は6文字以上英数字である必要があります。',
      });
    }
  }

  // eslint-disable-next-line
  validateConfirm = () => {
    if (this.state.pass && this.state.pass === this.state.passConfirm) {
      this.setState({
        confirmValidated: true,
        confirmErrorMessage: null,
      });
    } else {
      this.setState({
        confirmValidated: false,
        confirmErrorMessage: 'パスワードが一致していません。',
      });
    }
  }

  // signUpWithEmail = async () => {
  //   const {
  //     email,
  //   } = this.state;
  //
  //   const actionCodeSettings = {
  //     // url: 'https://www.example.com/?email=' + firebase.auth().currentUser.email,
  //     iOS: {
  //       bundleId: 'com.flego.ios',
  //     },
  //     android: {
  //       packageName: 'com.flego.android',
  //       installApp: true,
  //       // minimumVersion: '1'
  //     },
  //     handleCodeInApp: true,
  //   };
  //
  //   firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  //     .then((user) => {
  //       // The link was successfully sent. Inform the user.
  //       // Save the email locally so you don't need to ask the user for it again
  //       // if they open the link on the same device.
  //       window.localStorage.setItem('emailForSignIn', email);
  //     })
  //     .catch((error) => {
  //       // Some error occurred, you can inspect the code: error.code
  //     });
  // }

  // indexUser = async (user) => {
  //   console.log(user);
  //   const db = firebase.firestore();
  //   db.collection('users').doc(user.uid).set({
  //     name: user.displayName,
  //     facebookId: '',
  //     phoneNumber: user.phoneNumber,
  //     photoURL: `${user.photoURL}?type=normal`,
  //     desc: '',
  //     followers: {},
  //     following: {},
  //     isAthlete: false,
  //   })
  //     .then(() => {
  //       AsyncStorage.setItem('uid', user.uid);
  //       this.navigateToPhoneConfimation();
  //     })
  //     .catch((error) => {
  //       // eslint-disable-next-line
  //       console.error('Error writing document: ', error);
  //     });
  // }

  navigateToInitUser = () => {
    const {
      email,
      pass,
    } = this.state;

    const timestamp = Date.now().toString();
    const key = 'InitUser' + timestamp;
    this.props.navigation.navigate({
      routeName: 'InitUser',
      params: { email, pass, key },
      key,
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

  onChangeTextEmailConfirm = (text) => {
    this.setState({ emailConfirm: text });
  }

  onChangeTextPass = (text) => {
    this.setState({ pass: text });
  }

  onChangeTextConfirm = (text) => {
    this.setState({ passConfirm: text });
  }

  handleAgree = () => {
    this.navigateToInitUser();
  }

  handleDisagree = () => {
    this.setState({ showTerm: false });
  }

  showTerm = () => {
    const {
      emailConfirmValidated,
      confirmValidated,
    } = this.state;

    if (emailConfirmValidated && confirmValidated) {
      this.setState({ showTerm: true });
    } else {
      const validationErrorMessage = '入力内容にエラーがあります。';
      Alert.alert(validationErrorMessage);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LogInHeader
          headerTitle={this.state.headerTitle}
        />
        <View style={[
            styles.activityIndicatorContainer,
            this.state.isUploading && { zIndex: 150 },
          ]}
        >
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#DB4D5E" animating={this.state.isUploading} />
          </View>
        </View>
        <TermOfService
          style={[
            styles.termOfService,
          ]}
          show={this.state.showTerm}
          onPressDisagree={this.handleDisagree}
          onPressAgree={this.handleAgree}
        />
        <ScrollView
          style={styles.form}
          // enabled
          // behavior={Platform.OS === 'ios' ? 'padding' : null}
          // keyboardVerticalOffset={-80}
        >

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

          <FormLabel>確認用Email</FormLabel>
          <FormInput
            onChangeText={this.onChangeTextEmailConfirm}
            shake={!this.state.emailValidated || this.state.error}
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={this.validateEmailConfirm}
            autoCorrect={false}
          />
          <FormValidationMessage>
            {!this.state.validateEmailConfirm && this.state.emailConfirmErrorMessage}
          </FormValidationMessage>

          <FormLabel>パスワード</FormLabel>
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

          <FormLabel>確認用パスワード</FormLabel>
          <FormInput
            onChangeText={this.onChangeTextConfirm}
            secureTextEntry
            shake={!this.state.confirmValidated || this.state.error}
            style={styles.passForm}
            onBlur={this.validateConfirm}
            autoCorrect={false}
          />
          <FormValidationMessage>
            {!this.state.confirmValidated && this.state.confirmErrorMessage}
          </FormValidationMessage>

        </ScrollView>

        <View style={styles.footer}>
          <CancelButton
            onPress={() => { this.props.navigation.goBack(); }}
            style={{ marginRight: 12 }}
          >
            戻る
          </CancelButton>
          <SaveButton onPress={this.showTerm} shadow >
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
  activityIndicatorContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termOfService: {
    position: 'absolute',
    zIndex: 100,
  },
  form: {
    margin: 16,
    paddingBottom: 400,
  },
  passForm: {
    marginTop: 16,
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

export default EmailSignUp;
