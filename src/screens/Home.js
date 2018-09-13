import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
  Segment,
  Notifications,
} from 'expo';
import firebase from 'firebase';

import Feed from '../components/Feed.js';
import HomeHeader from '../components/HomeHeader.js';
import UploadButton from '../elements/UploadButton.js';

class Home extends React.Component {
  state = {
    headerTitle: 'FLEGO',
    // feedType: 'home',
    // logInUser: null,
  }

  componentWillMount() {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log('We are authenticated now!');
        const { // eslint-disable-next-line
          displayName,    // eslint-disable-next-line
          email, // eslint-disable-next-line
          emailVerified, // eslint-disable-next-line
          photoURL, // eslint-disable-next-line
          isAnonymous,
          uid, // eslint-disable-next-line
          providerData,
        } = user;

        // firebase.auth().signOut();

        this.setState({ logined: true });

        try {
          await AsyncStorage.setItem('uid', uid);
        } catch (error) {
          // eslint-disable-next-line
          console.log('failed to saving AsyncStorage');
        }
      // eslint-disable-next-line
      } else {
        // eslint-disable-next-line
        console.log('not login');
        // unsubscribe();
        this.props.navigation.navigate({ routeName: 'LoginStack' });
      }
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  // eslint-disable-next-line
  getPushToken = (uid) => {
    // if (Platform.OS === 'android') {
    //   this.registerFCMPushToken(uid);
    // } else {
    //   this.registerForPushNotificationsAsync(uid);
    // }
    this.registerForPushNotificationsAsync(uid);
  }

  // eslint-disable-next-line
  registerForPushNotificationsAsync = async (uid) => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    this.updatePushToken(uid, token);
  }

  // eslint-disable-next-line
  updatePushToken = (uid, token) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.update({
      pushToken: token,
    })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });
  }

  // eslint-disable-next-line
  fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      this.getPushToken(value);
      this.fetchLogInUser(value);
    } catch (error) {
    //
    }
  }

  fetchLogInUser = (uid) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        const logInUser = {
          id: doc.id,
          data: doc.data(),
        };

        this.sendAnalytics(logInUser);

        this.storeLogInUser(logInUser);
        this.setState({ logInUser });
      } else {
        firebase.auth().signOut();
        this.props.navigation.navigate({ routeName: 'LoginStack' });
      }
    });
  }

  sendAnalytics = (logInUser) => {
    const userId = logInUser.id;
    const traits = {
      athlete: logInUser.data.isAthlete.toString(),
    };

    Segment.identifyWithTraits(userId, traits);
    Segment.screen('Home');
  }

  storeLogInUser = async (logInUser) => {
    try {
      // await AsyncStorage.setItem('uid', logInUser.id);
      await AsyncStorage.setItem('photoURL', logInUser.data.photoURL);
      // await AsyncStorage.setItem('name', logInUser.data.name);
      // await AsyncStorage.setItem('desc', logInUser.data.desc);
      await AsyncStorage.setItem('isAthlete', logInUser.data.isAthlete.toString());
    } catch (error) {
      // Error saving data
    }
  }

  onPressUpload = () => {
    this.getPermission();
  }

  getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.pickImage();
    } else {
      // this.props.navigation.navigate({ routeName: 'Home' });
      Alert.alert('カメラロールの使用が許可されていません。');
    }
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1.0,
      aspect: [4, 4],
      // aspect: [4, 3],
      // base64: true,
      exif: true,
    });
    console.log(result);

    if (result.cancelled) {
      // this.props.navigation.navigate({ routeName: 'Home' });
      // Alert.alert('カメラロールの使用が許可されていません。');
    } else {
      const timestamp = Date.now().toString();
      const key = 'PhotoUploader' + timestamp;
      this.props.navigation.navigate({
        routeName: 'PhotoUploader',
        params: {
          image: result,
          logInUser: this.state.logInUser,
          key,
        },
        key,
      });
    }
  };


  render() {
    if (!this.state.logined) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <HomeHeader
          headerTitle={this.state.headerTitle}
          navigation={this.props.navigation}
        />
        <Feed
          onPressUser={this.onPressUser}
          onPressPhoto={this.onPressPhoto}
          onPressMatch={this.onPressMatch}
          onPressTeam={this.onPressTeam}
          navigation={this.props.navigation}
        />
        <UploadButton onPress={this.onPressUpload} show />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;

// // eslint-disable-next-line
// registerFCMPushToken = (uid) => {
//   const messaging = firebase.messaging();
//
//   messaging.requestPermission().then(() => {
//     console.log('Notification permission granted.');
//     // Get Instance ID token. Initially this makes a network call, once retrieved
//     // subsequent calls to getToken will return from cache.
//     messaging.getToken().then((currentToken) => {
//       if (currentToken) {
//         this.updateFCMPushToken(uid, currentToken);
//         // updateUIForPushEnabled(currentToken);
//       } else {
//         // Show permission request.
//         console.log('No Instance ID token available. Request permission to generate one.');
//         // Show permission UI.
//         // updateUIForPushPermissionRequired();
//         // setTokenSentToServer(false);
//       }
//     }).catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//       // showToken('Error retrieving Instance ID token. ', err);
//       // setTokenSentToServer(false);
//     });
//   }).catch((err) => {
//     console.log('Unable to get permission to notify.', err);
//   });
// }
//
// // eslint-disable-next-line
// updateFCMPushToken = (uid, token) => {
//   const db = firebase.firestore();
//
//   const userRef = db.collection('users').doc(uid);
//   userRef.update({
//     FCMPushToken: token,
//   })
//     .catch((error) => {
//       // eslint-disable-next-line
//       console.error('Error updating document: ', error);
//     });
// }
