import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Text,
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

  // eslint-disable-next-line
  fetchData = () => {
    this.setAuth();
  }

  setAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData,
        } = user;

        this.setState({
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData,
        });

        this.fetchUser();
        this.fetchPhotos();
      // eslint-disable-next-line
      } else {
        this.props.navigation.navigate({ routeName: 'Login' });
      }
    });
  }

  fetchUser = () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.get().then((doc) => {
      const user = doc.data();
      this.setState({ user });
      console.log('detail');
      console.log(user);
    });
  }

  // eslint-disable-next-line
  fetchPhotos = () => {
    const db = firebase.firestore();
    const maxResults = 30;
    // const photosRef = db.collection('photos').where('uid', '==', this.state.uid).orderBy('createdAt', 'desc').limit(maxResults);
    const photosRef = db.collection('photos').where('uid', '==', this.state.uid);

    const photos = [];
    photosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          photos.push({
            id: doc.id,
            data: doc.data(),
          });
          this.setState({ photos });
        });
      });
  }

  onPressTest = () => {
    Alert.alert('button pressed')
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
            onPress={this.onPressTest}
            userName={this.state.user.name}
            userDesc={this.state.user.desc}
            photoURL={this.state.user.photoURL}
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
          onPress={this.onPressTest}
          userName={this.state.user.name}
          userDesc={this.state.user.desc}
          photoURL={this.state.user.photoURL}
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
