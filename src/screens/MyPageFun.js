import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Text,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import Profile from '../components/Profile.js';
import Header from '../components/Header.js';

class MyPageFun extends React.Component {
  state = {
    user: null,
  }

  // componentDidMount() {
  //   this.getUser();
  // }
  //
  // getUser = () => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ user });
  //       this.fetchUser();
  //     } else {
  //       this.props.navigation.navigate({ routeName: 'Login' });
  //     }
  //   });
  // }
  //
  // fetchUser = () => {
  //   const db = firebase.firestore();
  //   db.collection('users').doc(`${this.state.user.uid}`).get()
  //     .then((doc) => {
  //       const { name } = doc.data();
  //       const { desc } = doc.data();
  //       this.setState({ name, desc });
  //     });
  // }
  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        this.setState({ uid: value });
        this.fetchUser();
        this.fetchPhotos();
      }
    } catch (error) {
    //
    }
  }

  fetchUser = () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.onSnapshot((doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      console.log(source, ' data: ', doc.data());
      const user = doc.data();
      this.setState({ user });
      this.storeUserPhoto(user.photoURL);
    });
  }

  storeUserPhoto = async (photoURL) => {
    try {
      await AsyncStorage.setItem('photoURL', photoURL);
    } catch (error) {
      // Error saving data
    }
  }

  // eslint-disable-next-line
  fetchPhotos = () => {
    const db = firebase.firestore();
    const maxResults = 30;
    // const photosRef = db.collection('photos').where('uid', '==', this.state.uid).orderBy('createdAt', 'desc').limit(maxResults);
    const photosRef = db.collection('photos').where('uid', '==', this.state.uid);

    const photos = [];
    photosRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        photos.push({
          id: doc.id,
          data: doc.data(),
        });
        this.setState({ photos });
      });
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate({
          routeName: 'PhotoDetail',
          params: {
            photo: item,
            uid: this.state.uid,
          },
        });
      }}
    >
      <Image
        style={styles.photoItem}
        source={{ uri: item.data.downloadURL }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );


  render() {
    if (!this.state.user) {
      return (
        <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!this.state.photos) {
    // if (this.state.photos && this.state.photos.length === 0) {
      return (
        <View style={styles.container}>
          <Header
            onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
            onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
            headerTitle="FLEGO"
          />
          <Profile
            userName={this.state.user.name}
            userDesc={this.state.user.desc}
            photoURL={this.state.user.photoURL}
            onPress={() => {
              this.props.navigation.navigate({
                routeName: 'EditProfile',
                params: {
                  user: this.state.user,
                  uid: this.state.uid,
                },
              });
            }}
          />
          <Text style={styles.alert}>
             まだ投稿画像はありません.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
        <Profile
          userName={this.state.user.name}
          userDesc={this.state.user.desc}
          photoURL={this.state.user.photoURL}
          onPress={() => {
            this.props.navigation.navigate({
              routeName: 'EditProfile',
              params: {
                user: this.state.user,
                uid: this.state.uid,
              },
            });
          }}
        />
        <FlatList
          navigation={this.props.navigation}
          data={this.state.photos}
          renderItem={this.renderItem}
          numColumns={3}
          // horizontal={true}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  photoItem: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
  alert: {
    padding: 16,
    // alignSelf: 'center',
  },
});

export default MyPageFun;
