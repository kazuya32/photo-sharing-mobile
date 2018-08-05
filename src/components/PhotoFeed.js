import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
  RefreshControl,
} from 'react-native';
import firebase from 'firebase';

import PhotoTile from '../components/PhotoTile.js';

class Feed extends React.Component {
  state = {
    logInUser: this.props.logInUser,
    isReloading: false,
    refreshing: false,
  }

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
  fetchPhotos = async () => {
    const db = firebase.firestore();
    const maxResults = 3;

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
        });
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.setState({ photos, lastVisible });
        // this.setState({ photosRef, lastVisible });
      });
  }

  // eslint-disable-next-line
  reloadPhotos = async() => {
    if (!this.state.isReloading && this.state.lastVisible) {
      this.setState({ isReloading: true });

      console.log('reload');
      const db = firebase.firestore();
      const maxResults = 2;

      // 画像URLの取得だけは最初に一度におこない、レンダリングだけ順番に行う機能を実装するべき

      let photosRef;

      switch (this.state.feedType) {
        case 'home':
          photosRef = db.collection('photos')
            .orderBy('createdAt', 'desc')
            .startAfter(this.state.lastVisible)
            .limit(maxResults);
          break;
        case 'user':
          photosRef = db.collection('photos')
            .where('uid', '==', this.state.uid)
            .startAfter(this.state.lastVisible)
            .limit(maxResults);
          break;
        case 'match':
          photosRef = db.collection('photos')
            .where('matchId', '==', this.props.itemId)
            .startAfter(this.state.lastVisible)
            .limit(maxResults);
          break;
        case 'team':
          photosRef = db.collection('photos')
            .where('teamId', '==', this.props.itemId)
            .startAfter(this.state.lastVisible)
            .limit(maxResults);
          break;

        default:
          console.log('invalid type');
          break;
      }

      const { photos } = this.state;

      photosRef.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            photos.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          this.setState({ photos, lastVisible, isReloading: false });
          // this.setState({ photosRef, lastVisible });
        });
    }
  }

  // onEndReached = () => {
  //   this.setState({ refreshing: true });
  //   this.reloadPhotos().then(() => {
  //     this.setState({ refreshing: false });
  //   });
  // }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchPhotos().then(() => {
      this.setState({ refreshing: false });
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <PhotoTile
      photo={item}
      style={item.data.hasArranged && { display: 'none' }}
      onPressPhoto={() => { this.props.onPressPhoto(item); }}
      // onPressUser={() => { this.props.onPressUser(item.data.uid); }}
      onPressUser={this.props.onPressUser}
      onPressMatch={() => { this.props.onPressMatch(item); }}
      onPressTeam={() => { this.props.onPressTeam(item); }}
      photoStyle={styles.photoItem}
      uid={this.state.uid}
      logInUser={this.state.logInUser}
      scheduleId={this.state}
      navigation={this.props.navigation}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.photos}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.7}
          onEndReached={this.reloadPhotos}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
           }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 12,
    // paddingBottom: 12,
  },
  photoItem: {
    // width: Dimensions.get('window').width / 3,
    // height: Dimensions.get('window').width / 3,
  },
});

export default Feed;
