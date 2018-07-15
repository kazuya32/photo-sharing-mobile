import React from 'react';
import { StyleSheet, View, Image, Dimensions, AsyncStorage } from 'react-native';
import Expo from 'expo';
import firebase from 'firebase';
import { SocialIcon } from 'react-native-elements';

import BackgroundImage from '../../assets/splash.png';
import ENV from '../../env.json';

class Login extends React.Component {
  logInTest = (testEmail) => {
    // const testEmail = 'testuser@example.com';
    const testPassword = 'testuser';

    firebase.auth().signInWithEmailAndPassword(testEmail, testPassword)
      .then((user) => {
        AsyncStorage.setItem('uid', user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
      .then(() => {
        this.props.navigation.navigate('Home');
      });
  }

  logInWithFacebook = async () => {
    // const provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().languageCode = 'ja_JP';
    // firebase.auth().useDeviceLanguage();
    // firebase.auth().signInWithRedirect(provider);
    const appId = ENV.FACEBOOK_APP_ID;

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      appId,
      {
        permissions: ['public_profile'],
        // behavior: 'native',
      },
    );

    // if (type === 'success') {
    // // Get the user's name using Facebook's Graph API
    //   const response = await fetch(
    //     `https://graph.facebook.com/me?access_token=${token}`
    //   );
    //   console.log(await response.json());
    //   // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    // }

    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((user) => {
          this.handleFacebookUser(user);
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          console.error(error)
        });
    }
  }

  handleFacebookUser = (user) => {
    console.log(user);
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(user.uid);
    userRef.get().then((DocumentSnapshot) => {
      if (DocumentSnapshot.exist) {
        console.log(DocumentSnapshot.data());
      } else {
        console.log('No exist');
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
            console.log('Document successfully written!');
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
      }
    });
  }

  storeUser = async (uid, photoURL) => {
    try {
      await AsyncStorage.setItem('uid', uid);
      await AsyncStorage.setItem('photoURL', photoURL);
    } catch (error) {
      console.error('Error writing document: ', error);
    }
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
            title="Facebookでログイン"
            button
            type="facebook"
            raised
            onPress={this.logInWithFacebook}
          />
          <SocialIcon
            title="ファンテストユーザー"
            button
            type="facebook"
            raised
            onPress={() => { this.logInTest('testuser@example.com'); }}
          />
          <SocialIcon
            title="アスリートテストユーザー"
            button
            type="facebook"
            raised
            onPress={() => { this.logInTest('testuser2@example.com'); }}
          />
        </View>
      </View>
    );
  }
}

// <SocialIcon
//   title="Facebookでログイン"
//   button
//   type="facebook"
//   raised
//   onPress={this.onPress}
// />

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
    flex: 2,
    alignContent:'center',
    justifyContent: 'center',
  },
  underArea: {
    flex: 2,
    padding: 20,
    alignContent:'center',
    justifyContent: 'center',
  },
});

export default Login;
