import React from 'react';
import { StyleSheet, View, Image, Dimensions, AsyncStorage } from 'react-native';
import Expo from 'expo';
import firebase from 'firebase';
import { SocialIcon } from 'react-native-elements';

import TermOfService from '../components/TermOfService.js';
import BackgroundImage from '../../assets/splash.png';
import ENV from '../../env.json';

class Login extends React.Component {
  state = {
    showTerm: false,
    // agreed: false,
  }
  componentWillMount() {
    // firebase.auth().onAuthStateChanged(async (user) => {
    //   if (user) {
    //     console.log('We are authenticated now!');
    //
    //     const { // eslint-disable-next-line
    //       displayName,    // eslint-disable-next-line
    //       email, // eslint-disable-next-line
    //       emailVerified, // eslint-disable-next-line
    //       photoURL, // eslint-disable-next-line
    //       isAnonymous,
    //       uid, // eslint-disable-next-line
    //       providerData,
    //     } = user;
    //
    //     try {
    //       await AsyncStorage.setItem('uid', uid);
    //       // await AsyncStorage.setItem('facebookId', providerData[0].uid);
    //     } catch (error) {
    //       console.log('failed to saving AsyncStorage');
    //     }
    //     this.props.navigation.navigate({ routeName: 'Home' });
    //   // eslint-disable-next-line
    //   } else {
    //     console.log('not login');
    //   }
    // });
  }

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
        // eslint-disable-next-line
        console.log(errorCode, errorMessage);
      })
      .then(() => {
        // this.props.navigation.navigate('Home');
        const timestamp = Date.now().toString();
        this.props.navigation.navigate({
          routeName: 'Home',
          key: 'Home' + timestamp,
        });
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
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    }
  }

  handleFacebookUser = (user) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(user.uid);
    userRef.get().then((DocumentSnapshot) => {
      if (DocumentSnapshot.exists) {
        // this.props.navigation.navigate('Home');
        const timestamp = Date.now().toString();
        this.props.navigation.navigate({
          routeName: 'Home',
          key: 'Home' + timestamp,
        });
      } else {
        // eslint-disable-next-line
        console.log('No exist');
        this.setState({ user });
        this.handleGuest();
      }
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

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          // source={this.state.backgroundImage}
          source={BackgroundImage}
          resizeMode="cover"
        />
        <TermOfService
          style={[
            styles.termOfService,
            !this.state.showTerm && { display: 'none' },
          ]}
          onPressDisagree={this.handleDisagree}
          onPressAgree={this.handleAgree}
        />
        <View style={styles.upperArea} />
        <View style={styles.underArea}>
          <SocialIcon
            style={this.state.showTerm && { display: 'none' }}
            title="Facebookでログイン"
            button
            type="facebook"
            raised
            onPress={this.logInWithFacebook}
          />
          <SocialIcon
            style={{ display: 'none' }}
            title="テストユーザーでお試し"
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
//   title="ファンテストユーザー"
//   button
//   type="facebook"
//   raised
//   onPress={() => { this.logInTest('testuser@example.com'); }}
// />
// <SocialIcon
//   title="アスリートテストユーザー"
//   button
//   type="facebook"
//   raised
//   onPress={() => { this.logInTest('testuser2@example.com'); }}
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  termOfService: {
    position: 'absolute',
    // top: 16,
    // bottom: 16,
    // left: 16,
    // right: 16,
    zIndex: 100,
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
