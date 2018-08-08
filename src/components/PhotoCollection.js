import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';
// import Icon from 'react-native-vector-icons/Ionicons';

import PhotoCollectionItem from '../components/PhotoCollectionItem.js';

class PhotoCollection extends React.Component {
  state = {
    // logInUser: this.props.logInUser,
  }

  componentWillMount() {
    this.fetchLogInUid();
    if (this.props.uid) { this.fetchPhotos(this.props.uid); }
  }

  // eslint-disable-next-line
  fetchLogInUid = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      this.setState({ logInUid: value });
    } catch (error) {
    //
    }
  }

  // eslint-disable-next-line
  fetchPhotos = (uid) => {
    const db = firebase.firestore();
    const photosRef = db.collection('photos')
      .where('uid', '==', uid);

    photosRef.onSnapshot((querySnapshot) => {
      const photos = [];
      querySnapshot.forEach((doc) => {
        const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.logInUid];
        if (!isBlocked) {
        // if (!doc.data().hasArranged) {
          photos.push({
            id: doc.id,
            data: doc.data(),
          });
        }
      });
      this.addGifts(uid, photos);
    });
  }

  // componentDidMount() {
  //   if (this.props.uid) {
  //     this.fetchPhotos(this.props.uid);
  //   }
  // }

  // eslint-disable-next-line
  addGifts = (uid, photos) => {
    const db = firebase.firestore();
    const givenPhotosRef = db.collection('photos')
      .where(`accesses.${uid}`, '==', true);

    givenPhotosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.logInUid];
          const { invisibleInMyPage } = doc.data();
          const isInvisible = invisibleInMyPage && invisibleInMyPage[this.props.uid];
          if (!(isBlocked || isInvisible)) {
            photos.push({
              id: doc.id,
              data: doc.data(),
              isCertificated: true,
            });
          }
        });
        this.setState({ photos });
      });
  }

  // // eslint-disable-next-line
  // fetchPhotos = (uid) => {
  //   console.log('fetchPhotos');
  //   const photos = [];
  //
  //   const db = firebase.firestore();
  //   // eslint-disable-next-line
  //   const maxResults = 30;
  //   // eslint-disable-next-line
  //   // const photosRef = db.collection('photos').where('uid', '==', this.state.uid)
  //   //   .orderBy('createdAt', 'desc')
  //   //   .limit(maxResults);
  //   const photosRef = db.collection('photos').where('uid', '==', uid);
  //
  //   photosRef.get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         photos.push({
  //           id: doc.id,
  //           data: doc.data(),
  //         });
  //       });
  //     });
  //
  //   const givenPhotosRef = db.collection('photos').where(`accesses.${uid}`, '==', true);
  //   givenPhotosRef.get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         photos.push({
  //           id: doc.id,
  //           data: doc.data(),
  //           isCertificated: true,
  //         });
  //       });
  //     });
  //   this.setState({ photos });
  // }

  sortDesc = (array) => {
    array.sort((a, b) => (a.data.createdAt - b.data.createdAt));
    array.reverse();
    return array;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <PhotoCollectionItem
      navigation={this.props.navigation}
      photo={item}
      isCertificated={item.isCertificated}
      // style={item.data.hasArranged && { display: 'none' }}
      photoStyle={styles.photoItem}
      iconStyle={styles.ribbon}
      iconDia={24}
    />
  );

  render() {
    if (!this.state.photos) {
      return (
        <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!this.state.photos.length) {
      return (
        <Text style={styles.alert}>
           投稿画像はありません.
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.sortDesc(this.state.photos)}
          renderItem={this.renderItem}
          numColumns={3}
          // horizontal={true}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
          columnWrapperStyle={styles.column}
        />
        <View style={styles.whitelineLeft} />
        <View style={styles.whitelineRight} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ribbon: {
    position: 'absolute',
    top: 4,
    right: 4,
    // color: '#DB4D5E',
    marginBottom: 1,
    zIndex: 50,
  },
  photoItem: {
    // width: (Dimensions.get('window').width / 3) - 1,
    width: (Dimensions.get('window').width / 3),
    height: Dimensions.get('window').width / 3,
    marginBottom: 1,
    zIndex: 30,
    // borderWidth: 1,
    // borderColor: '#fff',
  },
  column: {
    // justifyContent: 'space-between',
  },
  whitelineLeft: {
    position: 'absolute',
    height: '100%',
    left: (Dimensions.get('window').width / 3),
    width: 1,
    backgroundColor: '#fff',
  },
  whitelineRight: {
    position: 'absolute',
    height: '100%',
    right: (Dimensions.get('window').width / 3),
    width: 1,
    backgroundColor: '#fff',
  },
  alert: {
    padding: 16,
    // alignSelf: 'center',
  },
});

export default PhotoCollection;
