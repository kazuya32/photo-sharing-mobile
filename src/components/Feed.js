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

import designLanguage from '../../designLanguage.json';
import PhotoTile from '../components/PhotoTile.js';

class Feed extends React.Component {
  state = {
    showingPhotos: [],
    isReloading: false,
    refreshing: false,
    photoCollectionList: [],
    showedPhotos: {},
  }

  componentWillMount() {
    this.fetchData();
  }

  // eslint-disable-next-line
  fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        this.setState({ logInUid: value });
        // this.fetchUser();
        this.fetchPhotoCollections();
      }
    } catch (error) {
    //
    }
  }

  // eslint-disable-next-line
  fetchPhotoCollections = async () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.logInUid);
    userRef.get().then((doc) => {
      // const user = doc.data();
      const logInUser = { id: doc.id, data: doc.data() };
      // this.setState({ logInUser });

      const { isAthlete, myTeams } = logInUser.data;

      if (isAthlete) {
        this.fetchTagged(100);
      }

      if (myTeams && Object.keys(myTeams).length) {
        Object.keys(myTeams).forEach((teamId) => {
          if (teamId !== 'undefined' && myTeams[teamId]) {
            this.fetchTeamPhotos(teamId, 100);
          }
        });
      } else {
        this.fetchRecent(100);
      }

      this.fetchPopular(30);
    });
  }

  // eslint-disable-next-line
  fetchTagged = (maxResults) => {
    const db = firebase.firestore();
    const photosRef = db.collection('photos').where(`people.${this.state.logInUid}`, '==', true);

    photosRef.get()
      .then((querySnapshot) => {
        const photos = [];
        querySnapshot.forEach((doc) => {
          const { userDeleted, unlisted } = doc.data();
          const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.logInUid];
          if (!(unlisted || userDeleted || isBlocked)) {
            photos.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        // this.setState({ photos: this.sortDesc(photos) });
        if (photos.length) {
          const taggedPhotos = this.sortDesc(photos);
          const { photoCollectionList } = this.state;
          photoCollectionList.push(taggedPhotos);
          this.setState({ photoCollectionList });
        }

        // if (photos.length) {
        //   this.addPhotos();
        // } else {
        //   this.setState({ showingPhotos: [] });
        // }
      });
  }

  fetchTeamPhotos = (teamId, maxResults) => {
    const db = firebase.firestore();
    const photosRef = db.collection('photos')
      .where('teamId', '==', teamId);

    const photos = [];
    photosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted, unlisted } = doc.data();
          const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.logInUid];
          if (!(unlisted || userDeleted || isBlocked)) {
            const photo = {
              id: doc.id,
              data: doc.data(),
            };
            // photo.uri = doc.data().downloadURL;
            // photo.onPress = () => { this.onPressPhoto(photo); };
            photos.push(photo);
          }
        });

        if (photos.length) {
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

          const teamPhotos = this.sortDesc(photos);
          const { photoCollectionList } = this.state;
          photoCollectionList.push(teamPhotos);
          this.setState({ photoCollectionList });
          this.addPhotos();
        }

        if (photos.length < 30) {
          this.fetchRecent(100);
        }
      });
  }


  fetchRecent = async (maxResults) => {
    const db = firebase.firestore();
    // const maxResults = 100;

    const photosRef = db.collection('photos')
      .orderBy('createdAt', 'desc')
      .limit(maxResults);

    const photos = [];
    photosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted, unlisted } = doc.data();
          const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.logInUid];
          if (!(unlisted || userDeleted || isBlocked)) {
            photos.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        // const recentPhotos = photos.slice(0, recentNumber);
        // photos.splice(0, recentNumber);
        // const generalPhotos = this.shuffle(photos);
        const { photoCollectionList } = this.state;
        photoCollectionList.push(photos);
        this.setState({ photoCollectionList });

        // this.setState({ generalPhotos, recentPhotos, lastVisible });
        // this.setState({ photos, lastVisible });

        // this.addPhotos();
      });
  }

  fetchPopular = async (maxResults) => {
    const db = firebase.firestore();

    const photosRef = db.collection('photos')
      .orderBy('likesSum', 'desc')
      .limit(maxResults);

    const photos = [];
    photosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted, unlisted } = doc.data();
          const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.logInUid];
          if (!(unlisted || userDeleted || isBlocked)) {
            photos.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        const popularPhotos = this.shuffle(photos);
        const { photoCollectionList } = this.state;
        photoCollectionList.push(popularPhotos);
        this.setState({ photoCollectionList });

        // this.setState({ generalPhotos, recentPhotos, lastVisible });
        // this.setState({ photos, lastVisible });
        this.addPhotos();
      });
  }

  // eslint-disable-next-line
  addPhotos = () => {
    const {
      isReloading,
      showingPhotos,
      photoCollectionList,
      showedPhotos,
    } = this.state;

    if (photoCollectionList.length && !isReloading) {
      this.setState({ isReloading: true });

      photoCollectionList.forEach((collection) => {
        if (collection.length) {
          const photo = collection[0];
          const photoId = photo.id;
          if (!showedPhotos[photoId]) {
            showingPhotos.push(photo);
            showedPhotos[photoId] = true;
          }
          collection.shift();
        }
      });

      this.setState({
        isReloading: false,
        showingPhotos,
        photoCollectionList,
        showedPhotos,
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
  //           const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.logInUid];
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
    this.fetchPhotoCollections().then(() => {
      this.setState({ refreshing: false });
    });
  }

  sortDesc = (array) => {
    array.sort((a, b) => (a.data.createdAt - b.data.createdAt));
    array.reverse();
    return array;
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
    if (!this.state.showingPhotos.length) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
            <ActivityIndicator color={designLanguage.colorPrimary} />
          </View>
        </View>
      );
    }

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
