import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
  Constants,
} from 'expo';
import firebase from 'firebase';

import PhotoFeed from '../components/PhotoFeed.js';
import Header from '../components/Header.js';
import UploadButton from '../elements/UploadButton.js';

class Home extends React.Component {
  state = {
    headerTitle: 'FLEGO',
    // feedType: 'home',
    // logInUser: null,
  }

  // componentWillMount() {
  //   if (this.props.navigation.state.params && this.props.navigation.state.params.feedType) {
  //     const { feedType, itemId } = this.props.navigation.state.params;
  //     this.setState({ feedType, itemId });
  //   }
  // }
  componentWillMount() {
    this.fetchData();

    firebase.auth().onAuthStateChanged(async (user) => {
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

        try {
          await AsyncStorage.setItem('uid', uid);
          // await AsyncStorage.setItem('facebookId', providerData[0].uid);
        } catch (error) {
          console.log('failed to saving AsyncStorage');
        }
      // eslint-disable-next-line
      } else {
        console.log('not login');
        this.props.navigation.navigate({ routeName: 'Login' });
      }
    });
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
    userRef.onSnapshot((doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      console.log(source, ' data: ', doc.data());
      const logInUser = {
        id: doc.id,
        data: doc.data(),
      };
      this.storeLogInUser(logInUser);
      this.setState({ logInUser });
    });
  }

  storeLogInUser = async (logInUser) => {
    try {
      // await AsyncStorage.setItem('uid', logInUser.id);
      await AsyncStorage.setItem('photoURL', logInUser.data.photoURL);
      await AsyncStorage.setItem('name', logInUser.data.name);
      await AsyncStorage.setItem('desc', logInUser.data.desc);
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
      key: 'UserPage' + item,
    });
  }

  onPressMatch = (item) => {
    // this.setState({
    //   feedType: 'match',
    //   itemId: item.data.matchId,
    // });
    this.props.navigation.navigate({
      routeName: 'MatchFeed',
      params: {
        feedType: 'match',
        itemId: item.data.matchId,
        matchPath: item.data.matchPath,
        logInUser: this.state.logInUser,
      },
    });
  }

  onPressTeam = (item) => {
    // this.setState({
    //   feedType: 'TeamFeed',
    //   itemId: item.data.teamId,
    // });
    this.props.navigation.navigate({
      routeName: 'TeamFeed',
      params: {
        feedType: 'team',
        itemId: item.data.teamId,
        logInUser: this.state.logInUser,
      },
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
      aspect: [4, 4],
      // aspect: [4, 3],
      // base64: true,
    });
    console.log(result);

    if (result.cancelled) {
      // this.props.navigation.navigate({ routeName: 'Home' });
      // Alert.alert('カメラロールの使用が許可されていません。');
    } else {
      this.props.navigation.navigate({
        routeName: 'PhotoUploader',
        params: {
          image: result,
          logInUser: this.state.logInUser,
        },
      });
    }
  };


  render() {
    console.log(Constants.statusBarHeight);
    return (
      <View style={styles.container}>
        <Header
          headerTitle={this.state.headerTitle}
          navigation={this.props.navigation}
        />
        <PhotoFeed
          logInUser={this.state.logInUser}
          uid={this.state.uid}
          feedType="home"
          // feedType={this.state.feedType}
          itemId={this.state.itemId}
          onPressUser={this.onPressUser}
          onPressPhoto={this.onPressPhoto}
          onPressMatch={this.onPressMatch}
          onPressTeam={this.onPressTeam}
          navigation={this.props.navigation}
          // scheduleId={scheduleId}
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
    paddingTop: 80,
  },
});

export default Home;
