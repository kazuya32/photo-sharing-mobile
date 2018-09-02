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
    showingPhotos: [],
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
    const maxResults = 100;
    const recentNumber = 50;

    const photosRef = db.collection('photos')
      .orderBy('createdAt', 'desc')
      .limit(maxResults);

    const photos = [];
    photosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted, unlisted } = doc.data();
          const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.uid];
          if (!(unlisted || userDeleted || isBlocked)) {
            photos.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        const recentPhotos = photos.slice(0, recentNumber);
        photos.splice(0, recentNumber);

        this.setState({ generalPhotos: this.shuffle(photos), recentPhotos, lastVisible });
        // this.setState({ photos, lastVisible });
        this.addPhotos();
      });
  }

  // eslint-disable-next-line
  addPhotos = () => {
    const {
      isReloading,
      showingPhotos,
      recentPhotos,
      generalPhotos,
    } = this.state;

    if (!isReloading) {
      this.setState({ isReloading: true });

      if (recentPhotos.length) {
        showingPhotos.push(recentPhotos[0]);
        recentPhotos.shift();
      }
      if (recentPhotos.length) {
        showingPhotos.push(recentPhotos[0]);
        recentPhotos.shift();
      }
      if (generalPhotos.length) {
        showingPhotos.push(generalPhotos[0]);
        generalPhotos.shift();
      }
      if (generalPhotos.length) {
        showingPhotos.push(generalPhotos[0]);
        generalPhotos.shift();
      }

      this.setState({
        isReloading: false,
        showingPhotos,
        recentPhotos,
        generalPhotos,
      });
    }
  }

  // eslint-disable-next-line
  // reloadPhotos = async() => {
  //   if (!this.state.isReloading && this.state.lastVisible) {
  //     this.setState({ isReloading: true });
  //
  //     const db = firebase.firestore();
  //     const maxResults = 3;
  //
  //     // 画像URLの取得だけは最初に一度におこない、レンダリングだけ順番に行う機能を実装するべき
  //
  //     const photosRef = db.collection('photos')
  //       .orderBy('createdAt', 'desc')
  //       .startAfter(this.state.lastVisible)
  //       .limit(maxResults);
  //
  //     const { photos } = this.state;
  //
  //     photosRef.get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.uid];
  //           const { userDeleted } = doc.data();
  //           if (!(userDeleted || isBlocked)) {
  //             photos.push({
  //               id: doc.id,
  //               data: doc.data(),
  //             });
  //           }
  //         });
  //         const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  //         this.setState({ photos, lastVisible, isReloading: false });
  //         // this.setState({ photosRef, lastVisible });
  //       });
  //   }
  // }

  onRefresh = () => {
    this.setState({ refreshing: true, showingPhotos: [] }); // photosに一旦空の配列を入れるとリフレッシュ時にバグらない
    this.fetchPhotos().then(() => {
      this.setState({ refreshing: false });
    });
  }

  shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      // eslint-disable-next-line
      array[currentIndex] = array[randomIndex];
      // eslint-disable-next-line
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <PhotoTile
      photo={item}
      show={!item.data.hasArranged}
      photoStyle={styles.photoItem}
      navigation={this.props.navigation}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.showingPhotos}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.5}
          onEndReached={this.addPhotos}
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
          <ActivityIndicator size="small" color="#DB4D5E" animating={this.state.isReloading} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoItem: {
  },
  activityIndicator: {
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Feed;
