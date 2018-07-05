import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  FlatList,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import PhotoTile from '../components/PhotoTile.js';

class Feed extends React.Component {
  state = {}

  componentWillMount() {
    const { feedType } = this.props;
    this.setState({ feedType });
    this.fetchData();
  }

  // eslint-disable-next-line
  fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        this.setState({ uid: value });
        // this.fetchUser();
        this.fetchPhotos();
      }
    } catch (error) {
    //
    }
  }

  // eslint-disable-next-line
  fetchPhotos = () => {
    const db = firebase.firestore();
    const maxResults = 5;

    let photosRef;

    switch (this.state.feedType) {
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
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.setState({ lastVisible });
        // this.setState({ photosRef, lastVisible });
      });
  }

  // eslint-disable-next-line
  reloadPhotos = () => {
    console.log('reload');
    const db = firebase.firestore();
    const maxResults = 4;

    // 画像URLの取得だけは最初に一度におこない、レンダリングだけ順番に行う機能を実装する

    // let photosRef;
    //
    // switch (this.state.feedType) {
    //   case 'home':
    //     photosRef = db.collection('photos')
    //       .orderBy('createdAt', 'desc')
    //       .startAfter(this.state.lastVisible)
    //       .limit(maxResults);
    //     break;
    //   case 'user':
    //     photosRef = db.collection('photos')
    //       .where('uid', '==', this.state.uid)
    //       .startAfter(this.state.lastVisible)
    //       .limit(maxResults);
    //     break;
    //   case 'match':
    //     photosRef = db.collection('photos')
    //       .where('matchId', '==', this.props.itemId)
    //       .startAfter(this.state.lastVisible)
    //       .limit(maxResults);
    //     break;
    //   case 'team':
    //     photosRef = db.collection('photos')
    //       .where('teamId', '==', this.props.itemId)
    //       .startAfter(this.state.lastVisible)
    //       .limit(maxResults);
    //     break;
    //
    //   default:
    //     console.log('invalid type');
    //     break;
    // }
    //
    // const photos = this.state;

    // photosRef.get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       photos.push({
    //         id: doc.id,
    //         data: doc.data(),
    //       });
    //       this.setState({ photos });
    //     });
    //     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    //     this.setState({ lastVisible });
    //     // this.setState({ photosRef, lastVisible });
    //   });
  }

  onPressTest = () => {
    Alert.alert('Pressed');
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <PhotoTile
      photo={item}
      onPressPhoto={() => { this.props.onPressPhoto(item); }}
      onPressUser={this.props.onPressUser}
      onPressMatch={() => { this.props.onPressMatch(item); }}
      onPressTeam={() => { this.props.onPressTeam(item); }}
      photoStyle={styles.photoItem}
      uid={this.state.uid}
      scheduleId={this.state}
      navigation={this.props.navigation}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.feedArea}>
          <FlatList
            data={this.state.photos}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            onEndReachedThreshold={0.2}
            // onEndReached={this.reloadPhotos}
            getItemLayout={(data, index) => (
             { length: 400, offset: 400 * index, index }
            )}
            extraData={this.state}
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
