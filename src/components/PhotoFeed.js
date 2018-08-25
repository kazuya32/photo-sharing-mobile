import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

import PhotoTile from '../components/PhotoTile.js';

class Feed extends React.Component {
  state = {
    isReloading: false,
    refreshing: false,
  }

  componentWillMount() {
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

    const photosRef = db.collection('photos')
      .orderBy('createdAt', 'desc')
      .limit(maxResults);

    const photos = [];
    photosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted } = doc.data();
          const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.uid];
          if (!(userDeleted || isBlocked)) {
            photos.push({
              id: doc.id,
              data: doc.data(),
            });
          }
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

      const db = firebase.firestore();
      const maxResults = 3;

      // 画像URLの取得だけは最初に一度におこない、レンダリングだけ順番に行う機能を実装するべき

      const photosRef = db.collection('photos')
        .orderBy('createdAt', 'desc')
        .startAfter(this.state.lastVisible)
        .limit(maxResults);

      const { photos } = this.state;

      photosRef.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.uid];
            const { userDeleted } = doc.data();
            if (!(userDeleted || isBlocked)) {
              photos.push({
                id: doc.id,
                data: doc.data(),
              });
            }
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
    this.setState({ refreshing: true, photos: [] }); // photosに一旦空の配列を入れるとリフレッシュ時にバグらない
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
      onPressUser={this.props.onPressUser}
      onPressMatch={this.props.onPressMatch}
      onPressTeam={this.props.onPressTeam}
      photoStyle={styles.photoItem}
      uid={this.state.uid}
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
          onEndReachedThreshold={0.5}
          onEndReached={this.reloadPhotos}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
        <View style={[
            styles.activityIndicator,
            !this.state.isReloading && { display: 'none' },
          ]}
        >
          <ActivityIndicator size="small" color="#DB4D5E" />
        </View>
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
  activityIndicator: {
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Feed;
