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
      this.setState({ logInUser });
      // if (this.state.isMyPage) {
      //   this.storeUserPhoto(user.photoURL);
      // }
    });
  }

  storeUserPhoto = async (photoURL) => {
    try {
      await AsyncStorage.setItem('photoURL', photoURL);
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
    this.selectImage();
  }

  selectImage = async () => {
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
      aspect: [4, 3],
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

    // if (!this.state.logInUser) {
    //   return (
    //     <Text style={{ flex: 1, padding: 20, alignSelf: 'center' }}>
    //       ログイン中・・・
    //     </Text>
    //   );
    // }

    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => {
            this.props.navigation.navigate({
              routeName: 'UserPage',
              params: {
                logInUser: this.state.logInUser,
                uid: this.state.uid,
                // user: item,
              },
              key: 'UserPage' + this.state.uid,
            });
          }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle={this.state.headerTitle}
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
        <UploadButton
          // onPress={() => {
          //   this.props.navigation.navigate({
          //     routeName: 'PhotoPicker',
          //     params: {
          //       logInUser: this.state.logInUser,
          //       // user: item,
          //     },
          //   });
          // }}
          onPress={this.onPressUpload}
        />
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
