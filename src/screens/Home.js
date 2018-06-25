import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  FlatList,
} from 'react-native';
import firebase from 'firebase';

import PhotoTile from '../components/PhotoTile.js';
import Header from '../components/Header.js';

class Home extends React.Component {
  state = {}

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

        this.fetchPhotos();
      // eslint-disable-next-line
      } else {
        console.log('User is signed out.');
      }
    });
  }

  fetchUser = () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.get().then((doc) => {
      const user = doc.data();
      this.setState({ user });
    });
  }

  // eslint-disable-next-line
  fetchPhotos = () => {
    const db = firebase.firestore();
    const maxResults = 10;
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

  onPressTest= () => {
    Alert.alert('button pressed')
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'PhotoDetail',
            params: item,
          });
        }}
        underlayColor="transparent"
      >
        <PhotoTile
          photo={item}
          onPressUser={this.onPressTest}
          photoStyle={styles.photoItem}
          uid={this.state.uid}
        />
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
        <ScrollView style={styles.feedArea}>
          <FlatList
            data={this.state.photos}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedArea: {
    marginTop: 70,
    paddingTop: 12,
    paddingBottom: 12,
  },
  photoItem: {
    // width: Dimensions.get('window').width / 3,
    // height: Dimensions.get('window').width / 3,
  },
});

export default Home;
