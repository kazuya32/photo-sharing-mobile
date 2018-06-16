import React from 'react';
import { StyleSheet, View, Image, Dimensions, Alert } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import { SocialIcon } from 'react-native-elements';

import BackgroundImage from '../../assets/splash.png';
import ENV from '../../env.json';

// eslint-disable-next-line
const config = {
  apiKey:            ENV.FIREBASE_API_KEY,
  authDomain:        ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL:       ENV.FIREBASE_DB_URL,
  projectId:         ENV.FIREBASE_PROJECT_ID,
  storageBucket:     ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
};
firebase.initializeApp(config);

// const provider = new firebase.auth.FacebookAuthProvider();

async function logIn() {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('<APP_ID>', {
      permissions: ['public_profile'],
      // behavior: 'native',
    });
  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        console.error(error)
        // Handle Errors here.
      });
  }
}

class Login extends React.Component {
  onPress() {
    Alert.alert('現在は使用できません');
  }

  logInTest() {
    const email = 'testuser@example.com'
    const password = 'testuser'

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.navigation.navigate('Home', { currentUser: user });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          // source={this.state.backgroundImage}
          source={BackgroundImage}
          resizeMode="cover"
        />
        <View style={styles.upperArea} />
        <View style={styles.underArea}>
          <SocialIcon
            title="テストユーザーでログイン"
            button
            type="facebook"
            raised
            onPress={this.logInTest}
          />
          <SocialIcon
            title="Facebookでログイン"
            button
            type="facebook"
            raised
            onPress={this.onPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImage: {
    opacity: 0.8,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  upperArea: {
    flex: 3,
    alignContent:'center',
    justifyContent: 'center',
  },
  underArea: {
    flex: 2,
    padding: 20,
    alignContent:'center',
    justifyContent: 'space-around',
  },
});

export default Login;
