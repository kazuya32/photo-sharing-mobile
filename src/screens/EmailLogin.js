import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import TermOfService from '../components/TermOfService.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';

class EmailLogin extends React.Component {
  state = {
    showTerm: false,
    // agreed: false,
  }

  validateEmail = () => {
    // eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      this.setState({ emailValidated : true });
    } else {
      this.setState({ emailValidated : false });
    }
  }

  logIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        AsyncStorage.setItem('uid', user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line
        console.log(errorCode, errorMessage);
      })
      .then(() => {
        this.navigateToMain();
      });
  }

  signUp = async () => {
    const { user } = this.state;
    const db = firebase.firestore();
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      facebookId: user.providerData[0].uid,
      phoneNumber: user.phoneNumber,
      photoURL: `${user.photoURL}?type=normal`,
      desc: '',
      followers: {},
      following: {},
      isAthlete: false,
    })
      .then(() => {
        this.storeUser(user.uid, `${user.photoURL}?type=normal`);
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error writing document: ', error);
      });
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  storeUser = async (uid, photoURL) => {
    try {
      await AsyncStorage.setItem('uid', uid);
      await AsyncStorage.setItem('photoURL', photoURL);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error writing document: ', error);
    }
  }

  navigateToMain = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'Main',
      key: 'Main' + timestamp,
    });
  }

  navigateToEmailLogin = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'EmailLogin',
      key: 'EmailLogin' + timestamp,
    });
  }

  handleGuest = () => {
    this.setState({ showTerm: true });
  }

  handleAgree = () => {
    this.signUp();
  }

  handleDisagree = () => {
    this.signOut();
    this.setState({ showTerm: false });
  }

  log = (text) => {
    console.log(text);
  }

  errorHandler = (code, message) => {
    this.setState({
      error: !code ? null : { code, message },
    });
  }

  onPressNext = () => {
    this.errorHandler(400, 'test');
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
        <TermOfService
          style={[
            styles.termOfService,
            !this.state.showTerm && { display: 'none' },
          ]}
          onPressDisagree={this.handleDisagree}
          onPressAgree={this.handleAgree}
        />
        <View style={styles.form}>
          <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={this.onChangeTextEmail}
            keyboardType="email-address"
          />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={this.onChangeTextEmail}
            secureTextEntry
            shake={this.state.error}
          />
          <FormValidationMessage>
            {this.state.error && this.state.error.message}
          </FormValidationMessage>
        </View>

        <View style={styles.footer}>
          <CancelButton
            onPress={() => { this.props.navigation.goBack(); }}
            style={{ marginRight: 12 }}
          >
            戻る
          </CancelButton>
          <SaveButton onPress={this.onPressNext} shadow >
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
    paddingTop: 50,
  },
  termOfService: {
    position: 'absolute',
    zIndex: 100,
  },
  form: {
    margin: 16,
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
