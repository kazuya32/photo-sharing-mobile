import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
} from 'expo';
import firebase from 'firebase';

import PhotoFeed from '../components/PhotoFeed.js';
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

        console.log('We are authenticated now! yey!');
        // firebase.auth().signOut();

        this.setState({ logined: true });

        try {
          await AsyncStorage.setItem('uid', uid);
          // await AsyncStorage.setItem('facebookId', providerData[0].uid);
          // this.fetchData();
        } catch (error) {
          console.log('failed to saving AsyncStorage');
        }
      // eslint-disable-next-line
      } else {
        console.log('not login');
        // unsubscribe();
        this.props.navigation.navigate({ routeName: 'LoginStack' });
      }
    });
  }

  componentDidMount() {
    // console.log('home');
    // this.props.navigation.navigate({ routeName: 'LoginStack' });
    this.fetchData();
  }

  // eslint-disable-next-line
  fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      this.setState({ uid: value });
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
        this.storeLogInUser(logInUser);
        this.setState({ logInUser });
      } else {
        firebase.auth().signOut();
        this.props.navigation.navigate({ routeName: 'LoginStack' });
      }
    });
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

  onPressPhoto = (item) => {
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo: item,
        logInUser: this.state.logInUser,
      },
      key: 'PhotoDetail' + item.id,
    });
  }

  onPressUser = (item) => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: item,
        logInUser: this.state.logInUser,
        // user: item,
      },
      key: 'UserPage' + item.id,
    });
  }

  onPressMatch = (item) => {
    this.props.navigation.navigate({
      routeName: 'MatchFeed',
      params: {
        match: item,
      },
      key: 'MatchFeed' + item.id,
    });
  }

  onPressTeam = (team) => {
    this.props.navigation.navigate({
      routeName: 'TeamFeed',
      params: {
        feedType: 'team',
        itemId: team.id,
      },
      key: 'TeamFeed' + team.id,
    });
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
        <PhotoFeed
          uid={this.state.uid}
          itemId={this.state.itemId}
          onPressUser={this.onPressUser}
          onPressPhoto={this.onPressPhoto}
          onPressMatch={this.onPressMatch}
          onPressTeam={this.onPressTeam}
          navigation={this.props.navigation}
        />
        <UploadButton onPress={this.onPressUpload} />
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
