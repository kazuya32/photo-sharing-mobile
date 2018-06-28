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

class Feed extends React.Component {
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

        // this.fetchUser();
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
    });
  }

  // eslint-disable-next-line
  fetchPhotos = () => {
    const db = firebase.firestore();
    const maxResults = 15;
    const { feedType } = this.props;

    let photosRef;

    switch (feedType) {
      case 'home':
        photosRef = db.collection('photos')
          .orderBy('createdAt', 'desc')
          .limit(maxResults);
        break;
      case 'user':
        photosRef = db.collection('photos')
          .where('uid', '==', this.state.uid)
          .limit(maxResults);
        break;
      case 'match':
        photosRef = db.collection('photos')
          .where('matchId', '==', this.props.itemId)
          .limit(maxResults);
        break;
      case 'team':
        photosRef = db.collection('photos')
          .where('teamId', '==', this.props.itemId)
          .limit(maxResults);
        break;

      default:
        console.log('invalid type');
        break;
    }

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

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
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


  render() {
    return (
      <View style={styles.container}>
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
  },
  feedArea: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  photoItem: {
    // width: Dimensions.get('window').width / 3,
    // height: Dimensions.get('window').width / 3,
  },
});

export default Feed;