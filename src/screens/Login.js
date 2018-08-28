import React from 'react';
import { StyleSheet, View, Image, Dimensions, AsyncStorage, Platform } from 'react-native';
import Expo, { Constants } from 'expo';
import firebase from 'firebase';

import TermOfService from '../components/TermOfService.js';
import BackgroundImage from '../../assets/splash.png';
import ENV from '../../env.json';
import EmailLoginButton from '../elements/EmailLoginButton';
import FacebookLoginButton from '../elements/FacebookLoginButton';

class Login extends React.Component {
  state = {
    showTerm: false,
    // agreed: false,
  }

  componentWillMount() {
    AsyncStorage.setItem('uid', '');
  }

  logInWithFacebook = async () => {
    // const provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().languageCode = 'ja_JP';
    // firebase.auth().useDeviceLanguage();
    // firebase.auth().signInWithRedirect(provider);
    const appId = ENV.FACEBOOK_APP_ID;
    const { appOwnership } = Constants;
    const behavior = (appOwnership === 'standalone') ? 'native' : 'web';

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      appId,
      {
        permissions: ['public_profile'],
        behavior,
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
    console.log('handleFacebookUser');
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(user.uid);
    userRef.get().then((DocumentSnapshot) => {
      if (DocumentSnapshot.exists) {
        this.navigateToMain();
      } else {
        // eslint-disable-next-line
        console.log('No exist in handle facebook user');
        // this.setState({ user });
        this.handleGuest(user);
      }
    });
  }

  signUp = async (user) => {
    // const { user } = this.state;
    const timestamp = Date.now().toString();
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
      since: timestamp,
    })
      .then(() => {
        this.storeUser(user.uid, `${user.photoURL}?type=normal`);
        this.navigateToMain();
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
      routeName: 'MainStack',
      key: 'MainStack' + timestamp,
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
    // this.navigateToMain();
    const isAndroid = Platform.OS === 'android';
    if (isAndroid) {
      // this.handleAgree();
      this.setState({ showTerm: true });
    } else {
      this.setState({ showTerm: true });
    }
  }

  handleAgree = () => {
    this.signUp();
  }

  handleDisagree = () => {
    this.signOut();
    this.setState({ showTerm: false });
  }

  render() {
    const { appOwnership } = Constants;
    const isTest = appOwnership === 'expo';

    // const isAndroid = Platform.OS === 'android';

    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={BackgroundImage}
          resizeMode="cover"
        />
        <TermOfService
          style={[
            styles.termOfService,
          ]}
          show={this.state.showTerm}
          onPressDisagree={this.handleDisagree}
          onPressAgree={this.handleAgree}
        />
        <View style={styles.upperArea} />
        <View style={styles.underArea}>
          <FacebookLoginButton
            show={!this.state.showTerm}
            onPress={this.logInWithFacebook}
            title="Facebookでログイン"
          />
          <EmailLoginButton
            show
            onPress={this.navigateToEmailLogin}
            title="Emailでログイン"
            style={[
              // { display: 'none' },
            ]}
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
  termOfService: {
    position: 'absolute',
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
